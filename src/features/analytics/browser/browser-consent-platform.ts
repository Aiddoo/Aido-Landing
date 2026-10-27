import {
  CONSENT_KEY,
  type ConsentPlatform,
} from "../runtime/create-consent-store";

declare global {
  interface Navigator {
    readonly globalPrivacyControl?: boolean;
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
