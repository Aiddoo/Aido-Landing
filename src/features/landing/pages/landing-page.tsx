import { MarketingLayout } from "@/components/layout/marketing-layout";
import "../styles/landing.css";
import { DownloadCTA } from "@/components/marketing/download-cta";
import { FAQ } from "@/components/marketing/faq";
import { StructuredData } from "@/components/seo/structured-data";
import { FeatureGuides } from "@/features/feature-guides/components/feature-guides";
import { AppPreview } from "@/features/landing/components/app-preview";
import { Friends } from "@/features/landing/components/friends";
import { Hero } from "@/features/landing/components/hero";
import { Values } from "@/features/landing/components/values";
import { releaseNotes } from "@/features/updates/data/patch-notes";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { APP_STORE_URL, PLAY_STORE_URL, SITE_NAME, SITE_URL } from "@/lib/seo";
export function LandingPage({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  return (
    <>
      <MobileApplicationData locale={locale} />
      <MarketingLayout
        locale={locale}
        path=""
        className="min-h-screen selection:bg-brand/20"
      >
        <Hero
          locale={locale}
          content={messages.hero}
          storeButtons={messages.storeButtons}
        />
        <Values content={messages.values} />
        <AppPreview locale={locale} content={messages.appPreview} />
        <FeatureGuides locale={locale} />
        <Friends content={messages.friends} />
        <FAQ content={messages.faq} />
        <DownloadCTA
          content={messages.cta}
          storeButtons={messages.storeButtons}
        />
      </MarketingLayout>
    </>
  );
}

function MobileApplicationData({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const prefix = `/${locale}` as const;
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "MobileApplication",
        "@id": `${SITE_URL}/#app`,
        name: SITE_NAME,
        alternateName: "아이두",
        url: `${SITE_URL}${prefix}`,
        operatingSystem: "iOS, Android",
        applicationCategory: "BusinessApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
        installUrl: [APP_STORE_URL, PLAY_STORE_URL],
        description: messages.meta.description,
        inLanguage: ["ko-KR", "en-US"],
        softwareVersion: releaseNotes[0].version,
        publisher: { "@id": `${SITE_URL}/#organization` },
        featureList: messages.appPreview.screens.map(
          (screen) => screen.subtitle,
        ),
      }}
    />
  );
}
