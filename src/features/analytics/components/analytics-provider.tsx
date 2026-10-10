"use client";
import "../styles/analytics.css";

import { Suspense, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { MessageCatalog } from "@/i18n/messages";
import {
  browserConsentPlatform,
  privacyOptOut,
} from "../browser/browser-analytics-platform";
import { useAnalyticsConsent } from "../hooks/use-analytics-consent";
import { useAnalyticsRuntime } from "../hooks/use-analytics-runtime";
import {
  type ConsentStore,
  createConsentStore,
} from "../runtime/create-consent-store";
import type {
  AnalyticsConfig,
  AnalyticsConsent,
  ConsentChoice,
} from "../schemas/analytics.schema";
import { AnalyticsConsentBanner } from "./analytics-consent-banner";

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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [storageError, setStorageError] = useState(false);
  function choose(choice: ConsentChoice) {
    const saved = store.choose(choice);
    setStorageError(!saved);
    if (saved) setSettingsOpen(false);
  }
  if (!config.providers.length) return null;
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsRuntime
          config={config}
          locale={locale}
          consent={consent}
          store={store}
        />
      </Suspense>
      <AnalyticsConsentBanner
        locale={locale}
        labels={labels}
        consent={consent}
        settingsOpen={settingsOpen}
        storageError={storageError}
        privacyOptOut={privacyOptOut()}
        onChoose={choose}
        onSettingsOpenChange={setSettingsOpen}
      />
    </>
  );
}
function AnalyticsRuntime({
  config,
  locale,
  consent,
  store,
}: {
  config: AnalyticsConfig;
  locale: Locale;
  consent: AnalyticsConsent;
  store: ConsentStore;
}) {
  useAnalyticsRuntime(config, locale, consent, store);
  return null;
}
