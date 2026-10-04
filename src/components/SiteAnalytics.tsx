"use client";

import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { featureGuides } from "@/data/feature-guides";
import type { Locale } from "@/i18n/config";
import type { MessageCatalog } from "@/i18n/messages";
import {
  CONSENT_KEY,
  CONSENT_MAX_AGE,
  getAnalyticsPage,
  getAnalyticsReferrer,
  readAnalyticsConsent,
} from "@/lib/analytics";

type Gtag = (...args: unknown[]) => void;
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: Gtag;
} & Partial<Record<`ga-disable-${string}`, boolean>>;

function privacyOptOut() {
  if (typeof navigator === "undefined") return false;
  return (
    navigator.doNotTrack === "1" ||
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true
  );
}

function consentSnapshot() {
  if (privacyOptOut()) return "rejected";
  try {
    return readAnalyticsConsent(localStorage.getItem(CONSENT_KEY));
  } catch {
    return "pending";
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("aido:consent", callback);
  const timer = window.setInterval(callback, 60_000);
  return () => {
    window.clearInterval(timer);
    window.removeEventListener("storage", callback);
    window.removeEventListener("aido:consent", callback);
  };
}

function clearAnalyticsCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    for (const domain of [
      "",
      `;domain=${window.location.hostname}`,
      ";domain=.aido.kr",
    ]) {
      // biome-ignore lint/suspicious/noDocumentCookie: Clear GA cookies on withdrawal in browsers without Cookie Store support.
      document.cookie = `${name}=;path=/;max-age=0${domain};SameSite=Lax`;
    }
  }
}

function GoogleAnalytics({
  measurementId,
  locale,
}: {
  measurementId: string;
  locale: Locale;
}) {
  const pathname = usePathname();
  const previousLocation = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || consentSnapshot() !== "accepted") return;
    const page = getAnalyticsPage(window.location.href, locale);
    if (!page || previousLocation.current === page.page_location) return;
    const analyticsWindow = window as unknown as AnalyticsWindow;
    if (!analyticsWindow.gtag) {
      analyticsWindow.dataLayer = [];
      analyticsWindow.gtag = function () {
        // biome-ignore lint/complexity/noArguments: gtag requires the vendor's IArguments queue format.
        analyticsWindow.dataLayer?.push(arguments);
      };
      const gtag = analyticsWindow.gtag;
      gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      gtag("consent", "update", { analytics_storage: "granted" });
      gtag("js", new Date());
      gtag("config", measurementId, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        cookie_flags: "SameSite=Lax;Secure",
        page_location: page.page_location,
        page_referrer: getAnalyticsReferrer(document.referrer),
        ...(new URL(window.location.href).searchParams.get(
          "analytics_debug",
        ) === "1"
          ? { debug_mode: true }
          : {}),
      });
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
    }
    const referrer =
      previousLocation.current ?? getAnalyticsReferrer(document.referrer);
    // Keep Google's automatic session/engagement events on the same safe URL.
    analyticsWindow.gtag("set", {
      page_location: page.page_location,
      page_referrer: referrer,
    });
    analyticsWindow.gtag("event", "page_view", {
      ...page,
      page_title: document.title,
      page_referrer: referrer,
    });
    previousLocation.current = page.page_location;
  }, [pathname, locale, measurementId]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        consentSnapshot() !== "accepted" ||
        !(event.target instanceof Element)
      )
        return;
      const link = event.target.closest<HTMLAnchorElement>(
        "a[data-analytics-event]",
      );
      if (!link) return;
      const page = getAnalyticsPage(window.location.href, locale);
      if (!page) return;
      const eventName = link.dataset.analyticsEvent;
      let params: Record<string, string>;
      if (
        eventName === "download_click" &&
        (link.dataset.store === "app_store" ||
          link.dataset.store === "google_play") &&
        (link.dataset.placement === "hero" ||
          link.dataset.placement === "download")
      ) {
        params = {
          store: link.dataset.store,
          cta_placement: link.dataset.placement,
        };
      } else if (
        eventName === "select_content" &&
        featureGuides.some((guide) => guide.slug === link.dataset.featureSlug)
      ) {
        params = {
          content_type: "feature_guide",
          item_id: link.dataset.featureSlug ?? "",
          cta_placement:
            link.dataset.placement === "related_guides"
              ? "related_guides"
              : "home_guides",
        };
      } else if (
        eventName === "language_switch" &&
        (link.dataset.targetLocale === "ko" ||
          link.dataset.targetLocale === "en") &&
        link.dataset.targetLocale !== locale
      ) {
        params = { target_locale: link.dataset.targetLocale };
      } else return;
      (window as unknown as AnalyticsWindow).gtag?.("event", eventName, {
        ...page,
        ...params,
        transport_type: "beacon",
      });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [locale]);

  return null;
}

export function SiteAnalytics({
  locale,
  labels,
  measurementId,
  vercelAnalytics,
}: {
  locale: Locale;
  labels: MessageCatalog["analyticsConsent"];
  measurementId?: string;
  vercelAnalytics: boolean;
}) {
  const consent = useSyncExternalStore(
    subscribe,
    consentSnapshot,
    () => "pending",
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const wasAccepted = useRef(false);
  const validMeasurementId =
    measurementId && /^G-[A-Z0-9]+$/.test(measurementId)
      ? measurementId
      : undefined;

  useEffect(() => {
    if (consent === "accepted") wasAccepted.current = true;
    else if (wasAccepted.current) {
      if (validMeasurementId) {
        (window as unknown as AnalyticsWindow)[
          `ga-disable-${validMeasurementId}`
        ] = true;
        (window as unknown as AnalyticsWindow).gtag?.("consent", "update", {
          analytics_storage: "denied",
        });
      }
      clearAnalyticsCookies();
      // Unload already-loaded third-party tags, including their event listeners.
      window.location.reload();
    }
  }, [consent, validMeasurementId]);

  function choose(choice: "accepted" | "rejected") {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ choice, expiresAt: Date.now() + CONSENT_MAX_AGE }),
      );
    } catch {
      // Without a persistent preference, remain opted out.
      return;
    }
    window.dispatchEvent(new Event("aido:consent"));
    setSettingsOpen(false);
  }

  if (!validMeasurementId && !vercelAnalytics) return null;
  return (
    <>
      {consent === "accepted" && (
        <>
          {validMeasurementId && (
            <GoogleAnalytics
              measurementId={validMeasurementId}
              locale={locale}
            />
          )}
          {vercelAnalytics && (
            <Analytics
              beforeSend={(event) => {
                if (consentSnapshot() !== "accepted") return null;
                const page = getAnalyticsPage(event.url, locale);
                return page ? { ...event, url: page.page_location } : null;
              }}
            />
          )}
        </>
      )}
      <div className="analytics-settings page-width">
        <button
          type="button"
          onClick={() => setSettingsOpen(!settingsOpen)}
          aria-expanded={settingsOpen}
        >
          {labels.settings}
        </button>
      </div>
      {(consent === "pending" || settingsOpen) && (
        <section className="analytics-consent" aria-label={labels.title}>
          <div>
            <strong>{labels.title}</strong>
            <p>
              {labels.description}{" "}
              <Link href={`/${locale}/privacy`}>{labels.privacy}</Link>
            </p>
          </div>
          <div className="analytics-consent-actions">
            <button type="button" onClick={() => choose("rejected")}>
              {labels.reject}
            </button>
            <button
              type="button"
              disabled={privacyOptOut()}
              onClick={() => choose("accepted")}
            >
              {labels.accept}
            </button>
            {settingsOpen && consent !== "pending" && (
              <button type="button" onClick={() => setSettingsOpen(false)}>
                {labels.close}
              </button>
            )}
          </div>
        </section>
      )}
    </>
  );
}
