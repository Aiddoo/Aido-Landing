import type { AnalyticsConsent } from "../schemas/analytics.schema";

export type GoogleConsentValue = "denied" | "granted";
export type GoogleConsentUpdate = { analytics_storage: GoogleConsentValue };

// gtag가 로드되기 전에 넣는 Consent Mode v2 기본값. 광고 관련 3종은 이후에도 바꾸지 않는다.
export const googleConsentDefault = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  wait_for_update: 500,
} as const;

export function getGoogleConsentUpdate(
  consent: AnalyticsConsent,
): GoogleConsentUpdate {
  return {
    analytics_storage: consent === "accepted" ? "granted" : "denied",
  };
}
