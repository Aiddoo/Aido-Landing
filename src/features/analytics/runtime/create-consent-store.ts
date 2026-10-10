import {
  type AnalyticsConsent,
  type ConsentChoice,
  consentRecordSchema,
} from "../schemas/analytics.schema";

export const CONSENT_KEY = "aido.analytics-consent.v1";
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export function readAnalyticsConsent(
  value: string | null,
  now = Date.now(),
): AnalyticsConsent {
  try {
    const input: unknown = JSON.parse(value ?? "null");
    const result = consentRecordSchema.safeParse(input);
    if (
      result.success &&
      result.data.expiresAt > now &&
      result.data.expiresAt <= now + CONSENT_MAX_AGE
    )
      return result.data.choice;
  } catch {
    /* Corrupt and unavailable storage is blocked by default. */
  }
  return "pending";
}
export interface ConsentPlatform {
  read(): string | null;
  write(value: string): void;
  now(): number;
  privacyOptOut(): boolean;
  subscribe(callback: () => void): () => void;
}
export function createConsentStore(platform: ConsentPlatform) {
  const listeners = new Set<() => void>();
  let storageFailed = false;
  let unsubscribe: (() => void) | undefined;
  const getSnapshot = (): AnalyticsConsent => {
    if (platform.privacyOptOut()) return "rejected";
    if (storageFailed) return "pending";
    try {
      return readAnalyticsConsent(platform.read(), platform.now());
    } catch {
      return "pending";
    }
  };
  return {
    getSnapshot,
    getServerSnapshot: (): AnalyticsConsent => "pending",
    subscribe(callback: () => void) {
      listeners.add(callback);
      unsubscribe ??= platform.subscribe(() => {
        for (const listener of listeners) listener();
      });
      return () => {
        listeners.delete(callback);
        if (listeners.size === 0) {
          unsubscribe?.();
          unsubscribe = undefined;
        }
      };
    },
    choose(choice: ConsentChoice) {
      if (choice === "accepted" && platform.privacyOptOut()) return false;
      try {
        platform.write(
          JSON.stringify({
            choice,
            expiresAt: platform.now() + CONSENT_MAX_AGE,
          }),
        );
      } catch {
        storageFailed = true;
        for (const listener of listeners) listener();
        return false;
      }
      storageFailed = false;
      for (const listener of listeners) listener();
      return true;
    },
  };
}
export type ConsentStore = ReturnType<typeof createConsentStore>;
