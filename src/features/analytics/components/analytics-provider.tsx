"use client";
import Script from "next/script";
import { Suspense, useEffect, useRef, useState } from "react";
import { useHydrated } from "@/hooks/use-hydrated";
import type { Locale } from "@/i18n/config";
import type { MessageCatalog } from "@/i18n/messages";
import { onAnalyticsSettingsOpen } from "../browser/analytics-settings-event";
import {
  browserConsentPlatform,
  privacyOptOut,
} from "../browser/browser-consent-platform";
import { googleTagUrl } from "../browser/google-tag";
import { useAnalyticsConsent } from "../hooks/use-analytics-consent";
import { useAnalyticsRuntime } from "../hooks/use-analytics-runtime";
import {
  type ConsentStore,
  createConsentStore,
} from "../runtime/create-consent-store";
import type {
  AnalyticsConfig,
  ConsentChoice,
} from "../schemas/analytics.schema";
import { AnalyticsConsentCard } from "./analytics-consent-card";

interface AnalyticsProviderProps {
  locale: Locale;
  labels: MessageCatalog["analyticsConsent"];
  config: AnalyticsConfig;
}
export function AnalyticsProvider({
  locale,
  labels,
  config,
}: AnalyticsProviderProps) {
  const [store] = useState(() => createConsentStore(browserConsentPlatform));
  const consent = useAnalyticsConsent(store);
  const hydrated = useHydrated();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const card = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const googleAnalytics = config.providers.find(
    (provider) => provider.id === "ga4",
  );
  useEffect(
    () =>
      onAnalyticsSettingsOpen(() => {
        returnFocus.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
        setSettingsOpen(true);
      }),
    [],
  );
  useEffect(() => {
    if (settingsOpen) card.current?.focus();
  }, [settingsOpen]);
  function closeSettings() {
    setSettingsOpen(false);
    returnFocus.current?.focus();
    returnFocus.current = null;
  }
  function choose(choice: ConsentChoice) {
    const saved = store.choose(choice);
    setStorageError(!saved);
    if (saved) closeSettings();
  }
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsRuntime config={config} locale={locale} store={store} />
      </Suspense>
      {googleAnalytics != null &&
        hydrated &&
        (settingsOpen || consent === "pending") && (
          <AnalyticsConsentCard
            ref={card}
            labels={labels}
            locale={locale}
            privacyOptOut={privacyOptOut()}
            storageError={storageError}
            onChoose={choose}
            {...(settingsOpen ? { onClose: closeSettings } : {})}
            onKeyDown={(event) => {
              if (event.key === "Escape" && settingsOpen) closeSettings();
            }}
            className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-50 outline-none sm:right-auto sm:bottom-4 sm:left-4 sm:w-sm"
          />
        )}
    </>
  );
}
function AnalyticsRuntime({
  config,
  locale,
  store,
}: {
  config: AnalyticsConfig;
  locale: Locale;
  store: ConsentStore;
}) {
  const googleTagRequested = useAnalyticsRuntime(config, locale, store);
  const googleAnalytics = config.providers.find(
    (provider) => provider.id === "ga4",
  );
  if (!googleTagRequested || googleAnalytics == null) return null;
  return (
    <Script
      src={googleTagUrl(googleAnalytics.measurementId)}
      strategy="lazyOnload"
    />
  );
}
