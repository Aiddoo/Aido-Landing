"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import type { Locale } from "@/i18n/config";
import { bindAnalyticsClicks } from "../browser/browser-analytics-bindings";
import type { AnalyticsClient } from "../runtime/create-analytics-client";
import type { ConsentStore } from "../runtime/create-consent-store";
import type {
  AnalyticsConfig,
  AnalyticsConsent,
} from "../schemas/analytics.schema";
import { getAnalyticsPage } from "../utils/sanitize-analytics-page";

export function useAnalyticsRuntime(
  config: AnalyticsConfig,
  locale: Locale,
  consent: AnalyticsConsent,
  store: ConsentStore,
) {
  const pathname = usePathname();
  const search = useSearchParams();
  const client = useRef<AnalyticsClient | undefined>(undefined);
  useEffect(() => {
    if (consent !== "accepted") return;
    let cancelled = false;
    let unbind: (() => void) | undefined;
    void import("../runtime/create-browser-analytics-client")
      .then(async ({ createBrowserAnalyticsClient }) => {
        if (cancelled || store.getSnapshot() !== "accepted") return;
        const runtime = createBrowserAnalyticsClient(config, store.getSnapshot);
        client.current = runtime;
        unbind = bindAnalyticsClicks(runtime, locale);
        const page = getAnalyticsPage(window.location.href, locale);
        if (page) await runtime.start(page);
      })
      .catch(() => {
        // A blocked analytics chunk must leave the page usable and collection disabled.
      });
    // Subscribe directly so a stored withdrawal stops sends before the React effect runs.
    const unsubscribe = store.subscribe(() => {
      if (store.getSnapshot() === "accepted") return;
      const result = client.current?.revoke();
      if (result?.requiresReload) window.location.reload();
    });
    return () => {
      cancelled = true;
      unsubscribe();
      unbind?.();
      client.current?.dispose();
      client.current = undefined;
    };
  }, [config, locale, consent, store]);
  useEffect(() => {
    if (!pathname || !search) return;
    const page = getAnalyticsPage(window.location.href, locale);
    if (page) client.current?.pageView(page);
  }, [pathname, search, locale]);
}
