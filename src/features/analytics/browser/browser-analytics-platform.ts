import type { BeforeSend } from "@vercel/analytics";
import type {
  GoogleParameters,
  GooglePlatform,
  GoogleTransport,
} from "../adapters/ga4-adapter";
import type { VercelPlatform } from "../adapters/vercel-adapter";
import {
  CONSENT_KEY,
  type ConsentPlatform,
} from "../runtime/create-consent-store";
import {
  getAnalyticsPage,
  getAnalyticsReferrer,
} from "../utils/sanitize-analytics-page";

// Vendor globals are confined to this integration boundary.
type GoogleCommand =
  | ["consent", "default" | "update", Record<string, "denied" | "granted">]
  | ["js", Date]
  | ["config", string, Record<string, string | boolean>]
  | ["set", GoogleParameters]
  | ["event", string, GoogleParameters];
declare global {
  interface Navigator {
    readonly globalPrivacyControl?: boolean;
  }
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...command: GoogleCommand) => void;
  }
}
export function privacyOptOut() {
  return (
    typeof navigator !== "undefined" &&
    (navigator.doNotTrack === "1" || navigator.globalPrivacyControl === true)
  );
}
export const browserConsentPlatform: ConsentPlatform = {
  read: () => localStorage.getItem(CONSENT_KEY),
  write: (value) => localStorage.setItem(CONSENT_KEY, value),
  now: Date.now,
  privacyOptOut,
  subscribe(callback) {
    window.addEventListener("storage", callback);
    const timer = window.setInterval(callback, 60_000);
    return () => {
      window.removeEventListener("storage", callback);
      window.clearInterval(timer);
    };
  },
};
const scripts = new Map<string, Promise<void>>();
function waitForScript(script: HTMLScriptElement) {
  return new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(
      () => finish(new Error("Analytics script timed out")),
      15_000,
    );
    function finish(error?: Error) {
      window.clearTimeout(timeout);
      script.removeEventListener("load", loaded);
      script.removeEventListener("error", failed);
      if (error) reject(error);
      else resolve();
    }
    function loaded() {
      finish();
    }
    function failed() {
      finish(new Error("Analytics script failed"));
    }
    script.addEventListener("load", loaded);
    script.addEventListener("error", failed);
  });
}
async function abortable<T>(
  promise: Promise<T>,
  signal: AbortSignal,
): Promise<T> {
  if (signal.aborted) throw signal.reason;
  let onAbort: () => void = () => {};
  const aborted = new Promise<never>((_resolve, reject) => {
    onAbort = () => reject(signal.reason);
    signal.addEventListener("abort", onAbort, { once: true });
  });
  try {
    return await Promise.race([promise, aborted]);
  } finally {
    signal.removeEventListener("abort", onAbort);
  }
}
function loadScript(src: string, signal: AbortSignal) {
  let promise = scripts.get(src);
  if (!promise) {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    promise = waitForScript(script);
    scripts.set(src, promise);
    document.head.appendChild(script);
  }
  return abortable(promise, signal);
}
export function clearAnalyticsCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim() ?? "";
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    for (const domain of [
      "",
      `;domain=${window.location.hostname}`,
      ";domain=.aido.kr",
    ]) {
      // biome-ignore lint/suspicious/noDocumentCookie: GA withdrawal must clear cookies on browsers without Cookie Store.
      document.cookie = `${name}=;path=/;max-age=0${domain};SameSite=Lax`;
    }
  }
}
const googleTransports = new Map<string, GoogleTransport>();
export const browserGooglePlatform: GooglePlatform = {
  async initialize(measurementId, page, signal) {
    let transport = googleTransports.get(measurementId);
    if (!transport) {
      window.dataLayer ??= [];
      window.gtag ??= function () {
        // biome-ignore lint/complexity/noArguments: Google's documented queue requires IArguments.
        window.dataLayer?.push(arguments);
      };
      const send = (...command: GoogleCommand) => window.gtag?.(...command);
      Reflect.set(window, `ga-disable-${measurementId}`, false);
      send("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      send("consent", "update", { analytics_storage: "granted" });
      send("js", new Date());
      let previous = getAnalyticsReferrer(document.referrer);
      send("config", measurementId, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        cookie_flags: "SameSite=Lax;Secure",
        page_location: page.location,
        page_referrer: previous,
        ...(new URL(window.location.href).searchParams.get(
          "analytics_debug",
        ) === "1"
          ? { debug_mode: true }
          : {}),
      });
      transport = {
        pageView(params) {
          send("set", {
            page_location: params.page_location ?? "",
            page_referrer: previous,
          });
          send("event", "page_view", {
            ...params,
            page_title: document.title,
            page_referrer: previous,
          });
          previous = String(params.page_location ?? "");
        },
        event(name, params) {
          send("event", name, params);
        },
        revoke() {
          Reflect.set(window, `ga-disable-${measurementId}`, true);
          send("consent", "update", { analytics_storage: "denied" });
          clearAnalyticsCookies();
        },
      };
      googleTransports.set(measurementId, transport);
    }
    await loadScript(
      `https://www.googletagmanager.com/gtag/js?id=${measurementId}`,
      signal,
    );
    return transport;
  },
};
export function createBrowserVercelPlatform(
  getConsent: () => string,
): VercelPlatform {
  return {
    async initialize(config, signal) {
      const sdk = await import("@vercel/analytics");
      if (signal.aborted || getConsent() !== "accepted")
        throw new Error("Consent withdrawn");
      let requested:
        | import("../schemas/analytics.schema").AnalyticsPage
        | undefined;
      let previous = "";
      let disposed = false;
      const beforeSend: BeforeSend = (event) => {
        if (
          disposed ||
          getConsent() !== "accepted" ||
          !requested ||
          event.type !== "pageview"
        )
          return null;
        const page = getAnalyticsPage(event.url, requested.locale);
        if (
          !page ||
          page.location !== requested.location ||
          previous === page.location
        )
          return null;
        previous = page.location;
        return { ...event, url: page.location };
      };
      sdk.inject(
        {
          framework: "next",
          mode: "production",
          disableAutoTrack: true,
          beforeSend,
          ...(config.basePath ? { basePath: config.basePath } : {}),
        },
        config.configuration,
      );
      const script = document.querySelector<HTMLScriptElement>(
        'script[data-sdkn="@vercel/analytics/next"]',
      );
      if (!script) throw new Error("Vercel script unavailable");
      let promise = scripts.get(script.src);
      if (!promise) {
        promise = waitForScript(script);
        scripts.set(script.src, promise);
      }
      await abortable(promise, signal);
      return {
        pageView(page) {
          requested = page;
          sdk.pageview({
            route: page.path,
            path: `${page.path}${new URL(page.location).search}`,
          });
        },
        dispose() {
          disposed = true;
        },
      };
    },
  };
}
