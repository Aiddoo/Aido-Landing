import type {
  GoogleConsentUpdate,
  googleConsentDefault,
} from "../runtime/google-consent";
import type { AnalyticsPage } from "../schemas/analytics.schema";

export type GoogleParameters = Record<string, string | boolean>;
type GoogleCommand =
  | ["consent", "default", typeof googleConsentDefault]
  | ["consent", "update", GoogleConsentUpdate]
  | ["js", Date]
  | ["config", string, GoogleParameters]
  | ["set", GoogleParameters]
  | ["event", string, GoogleParameters];
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...command: GoogleCommand) => void;
  }
}

export function googleTagUrl(measurementId: string) {
  return `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
}
// Google 문서의 대기열 형식(IArguments)을 그대로 쓴다. gtag.js가 로드되면 쌓인 순서대로 처리한다.
export function getGoogleTag() {
  window.dataLayer ??= [];
  window.gtag ??= function () {
    // biome-ignore lint/complexity/noArguments: Google's documented queue requires IArguments.
    window.dataLayer?.push(arguments);
  };
  return window.gtag;
}
export function googlePageParameters(page: AnalyticsPage): GoogleParameters {
  return {
    page_location: page.location,
    page_path: page.path,
    page_type: page.type,
    site_locale: page.locale,
    ...(page.featureSlug ? { feature_slug: page.featureSlug } : {}),
  };
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
