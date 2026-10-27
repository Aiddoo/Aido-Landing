"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { match } from "ts-pattern";
import type { Locale } from "@/i18n/config";
import { bindAnalyticsClicks } from "../browser/browser-analytics-bindings";
import { privacyOptOut } from "../browser/browser-consent-platform";
import {
  startGoogleAnalytics,
  startVercelAnalytics,
  trackPageView,
  updateGoogleConsent,
} from "../runtime/analytics-tracker";
import type { ConsentStore } from "../runtime/create-consent-store";
import type { AnalyticsConfig } from "../schemas/analytics.schema";
import { getAnalyticsPage } from "../utils/sanitize-analytics-page";

// 라우트가 바뀔 때마다 정리된 공개 경로로 페이지뷰를 한 번 보낸다. gtag.js는 동의 기본값을 넣은 뒤에만 그리고, DNT/GPC면 그리지 않는다.
export function useAnalyticsRuntime(
  config: AnalyticsConfig,
  locale: Locale,
  store: ConsentStore,
) {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const [googleTagRequested, setGoogleTagRequested] = useState(false);
  useEffect(() => {
    const page = getAnalyticsPage(
      search === "" ? pathname : `${pathname}?${search}`,
      locale,
    );
    if (page == null) return;
    for (const provider of config.providers)
      match(provider)
        .with({ id: "ga4" }, ({ measurementId }) => {
          if (privacyOptOut()) return;
          startGoogleAnalytics(measurementId, store.getSnapshot(), page);
          setGoogleTagRequested(true);
        })
        .with({ id: "vercel" }, (vercel) =>
          startVercelAnalytics(vercel, locale),
        )
        .exhaustive();
    trackPageView(page);
  }, [config, locale, store, pathname, search]);
  useEffect(
    () => store.subscribe(() => updateGoogleConsent(store.getSnapshot())),
    [store],
  );
  useEffect(() => bindAnalyticsClicks(), []);
  return googleTagRequested;
}
