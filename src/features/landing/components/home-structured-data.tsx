import { StructuredData } from "@/components/seo/structured-data";
import { releaseNotes } from "@/features/updates/data/patch-notes";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { localizedPath } from "@/lib/public-routes";
import { APP_STORE_URL, PLAY_STORE_URL, SITE_NAME, SITE_URL } from "@/lib/seo";

export function MobileApplicationData({ locale }: { locale: Locale }) {
  const { meta, home } = getMessages(locale);
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "MobileApplication",
        "@id": `${SITE_URL}/#app`,
        name: SITE_NAME,
        alternateName: "아이두",
        url: `${SITE_URL}/${locale}`,
        operatingSystem:
          "iOS 16.4+, iPadOS 16.4+, macOS 12+ (Apple silicon), Android 7.0+",
        applicationCategory: "BusinessApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
        installUrl: [APP_STORE_URL, PLAY_STORE_URL],
        description: meta.description,
        inLanguage: ["ko-KR", "en-US"],
        softwareVersion: releaseNotes[0].version,
        releaseNotes: `${SITE_URL}${localizedPath(locale, "/patch-notes")}`,
        publisher: { "@id": `${SITE_URL}/#organization` },
        featureList: home.appFeatures,
      }}
    />
  );
}

/** 홈 FAQ와 같은 질문·답으로 만든 FAQPage */
export function FaqPageData({ locale }: { locale: Locale }) {
  const { faq } = getMessages(locale);
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: locale === "ko" ? "ko-KR" : "en-US",
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }}
    />
  );
}
