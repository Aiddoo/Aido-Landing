import type { Metadata } from "next";
import { AppPreview } from "@/components/AppPreview";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { FeatureGuides } from "@/components/FeatureGuides";
import { Friends } from "@/components/Friends";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StructuredData } from "@/components/StructuredData";
import { Values } from "@/components/Values";
import { releaseNotes } from "@/data/patch-notes";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import {
  APP_STORE_URL,
  buildPageMetadata,
  PLAY_STORE_URL,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

type LocaleHomePageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({
  params,
}: LocaleHomePageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const { meta } = getMessages(locale);
  return buildPageMetadata({
    locale,
    title: meta.title,
    description: meta.description,
    path: "",
    socialTitle: meta.openGraphTitle,
    socialDescription: meta.openGraphDescription,
  });
}
export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const locale = resolveLocale((await params).locale);
  const messages = getMessages(locale);
  const prefix = `/${locale}`;
  return (
    <>
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
      <SiteHeader locale={locale} />
      <main id="content" className="min-h-screen selection:bg-brand/20">
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
        <CTA content={messages.cta} storeButtons={messages.storeButtons} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
