"use client";
import { useSyncExternalStore } from "react";
import type { ConsentStore } from "../runtime/create-consent-store";
export function useAnalyticsConsent(store: ConsentStore) {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
}
