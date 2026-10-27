import {
  inject as injectVercelAnalytics,
  track as sendVercelEvent,
  pageview as sendVercelPageView,
} from "@vercel/analytics";
import type { Locale } from "@/i18n/config";
import {
  clearAnalyticsCookies,
  getGoogleTag,
  googlePageParameters,
} from "../browser/google-tag";
import {
  type AnalyticsConsent,
  type AnalyticsEvent,
  type AnalyticsPage,
  analyticsEventSchema,
  type VercelAnalyticsConfig,
} from "../schemas/analytics.schema";
import {
  createVercelBeforeSend,
  getAnalyticsReferrer,
} from "../utils/sanitize-analytics-page";
import { getGoogleConsentUpdate, googleConsentDefault } from "./google-consent";

let googleStarted = false;
let googleConsent: AnalyticsConsent = "pending";
let vercelStarted = false;
let currentPage: AnalyticsPage | undefined;
let previousLocation = "";

// 기본값을 먼저 넣고, 저장된 동의가 있으면 config보다 앞서 granted로 바꾼다.
export function startGoogleAnalytics(
  measurementId: string,
  consent: AnalyticsConsent,
  page: AnalyticsPage,
) {
  if (googleStarted) return;
  googleStarted = true;
  googleConsent = consent;
  const gtag = getGoogleTag();
  gtag("consent", "default", googleConsentDefault);
  if (consent === "accepted")
    gtag("consent", "update", getGoogleConsentUpdate(consent));
  gtag("js", new Date());
  previousLocation = getAnalyticsReferrer(document.referrer);
  gtag("config", measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_flags: "SameSite=Lax;Secure",
    page_location: page.location,
    page_referrer: previousLocation,
    ...(new URL(window.location.href).searchParams.get("analytics_debug") ===
    "1"
      ? { debug_mode: true }
      : {}),
  });
}
export function updateGoogleConsent(consent: AnalyticsConsent) {
  if (!googleStarted || consent === googleConsent) return;
  googleConsent = consent;
  window.gtag?.("consent", "update", getGoogleConsentUpdate(consent));
  if (consent !== "accepted") clearAnalyticsCookies();
}
export function startVercelAnalytics(
  config: VercelAnalyticsConfig,
  locale: Locale,
) {
  if (vercelStarted) return;
  vercelStarted = true;
  injectVercelAnalytics(
    {
      framework: "next",
      mode: "production",
      disableAutoTrack: true,
      beforeSend: createVercelBeforeSend(locale),
      ...(config.basePath ? { basePath: config.basePath } : {}),
    },
    config.configuration,
  );
}
export function trackPageView(page: AnalyticsPage) {
  if (currentPage?.location === page.location) return;
  currentPage = page;
  window.gtag?.("set", {
    page_location: page.location,
    page_referrer: previousLocation,
  });
  window.gtag?.("event", "page_view", {
    ...googlePageParameters(page),
    page_title: document.title,
    page_referrer: previousLocation,
  });
  previousLocation = page.location;
  sendVercelPageView({
    route: page.path,
    path: `${page.path}${new URL(page.location).search}`,
  });
}
export function track(event: AnalyticsEvent) {
  const parsed = analyticsEventSchema.safeParse(event);
  if (!parsed.success || currentPage == null) return;
  if (
    parsed.data.name === "language_switch" &&
    parsed.data.target_locale === currentPage.locale
  )
    return;
  const { name, ...params } = parsed.data;
  window.gtag?.("event", name, {
    ...googlePageParameters(currentPage),
    ...params,
    transport_type: "beacon",
  });
  sendVercelEvent(name, params);
}
