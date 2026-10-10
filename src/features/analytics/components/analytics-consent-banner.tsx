"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import type { MessageCatalog } from "@/i18n/messages";
import type {
  AnalyticsConsent,
  ConsentChoice,
} from "../schemas/analytics.schema";

interface AnalyticsConsentBannerProps {
  locale: Locale;
  labels: MessageCatalog["analyticsConsent"];
  consent: AnalyticsConsent;
  settingsOpen: boolean;
  storageError: boolean;
  privacyOptOut: boolean;
  onChoose: (choice: ConsentChoice) => void;
  onSettingsOpenChange: (open: boolean) => void;
}
export function AnalyticsConsentBanner({
  locale,
  labels,
  consent,
  settingsOpen,
  storageError,
  privacyOptOut,
  onChoose,
  onSettingsOpenChange,
}: AnalyticsConsentBannerProps) {
  return (
    <>
      <div className="analytics-settings page-width">
        <Button
          variant="link"
          size="sm"
          onClick={() => onSettingsOpenChange(!settingsOpen)}
          aria-expanded={settingsOpen}
        >
          {labels.settings}
        </Button>
      </div>
      {(consent === "pending" || settingsOpen) && (
        <section className="analytics-consent" aria-label={labels.title}>
          <div>
            <strong>{labels.title}</strong>
            <p>
              {labels.description}{" "}
              <Link href={`/${locale}/privacy`}>{labels.privacy}</Link>
            </p>
            {storageError && <p role="status">{labels.storageError}</p>}
          </div>
          <div className="analytics-consent-actions">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChoose("rejected")}
            >
              {labels.reject}
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={privacyOptOut}
              onClick={() => onChoose("accepted")}
            >
              {labels.accept}
            </Button>
            {settingsOpen && consent !== "pending" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSettingsOpenChange(false)}
              >
                {labels.close}
              </Button>
            )}
          </div>
        </section>
      )}
    </>
  );
}
