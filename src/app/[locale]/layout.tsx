import type { Metadata } from "next";
import localFont from "next/font/local";
import type { Organization, WebSite, WithContext } from "schema-dts";
import {
  koreanFontStylesheet,
  koreanHeadingFont,
} from "@/components/fonts/font-assets";
import { FontPreload } from "@/components/fonts/font-preload";
import { StructuredData } from "@/components/seo/structured-data";
import { AnalyticsProvider } from "@/features/analytics/components/analytics-provider";
import { getAnalyticsConfig } from "@/features/analytics/config/analytics-config.server";
import { locales } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import {
  APP_STORE_URL,
  buildSocialMetadata,
  INSTAGRAM_URL,
  PLAY_STORE_URL,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

const englishHeading = localFont({
  src: "../../../public/fonts/black-han-sans-f4cb9b35097d.woff2",
  weight: "400",
  display: "optional",
  // Shared locale layout: unconditional preloads also download Latin fonts on ko.
  preload: false,
  variable: "--font-heading-en",
});

const englishBody = localFont({
  src: "../../../public/fonts/noto-sans-kr-6ecf7205a09a.woff2",
  weight: "400 700",
  display: "optional",
  preload: false,
  variable: "--font-body-en",
});

type LocaleLayoutProps = LayoutProps<"/[locale]">;

// ko/en만 정적 생성 — 그 외 로케일 세그먼트는 404 (요청시점 생성 금지 → 완전 정적)
export const dynamicParams = false;
// Public content changes with deployments. Fail the build on request-time reads.
export const dynamic = "error";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const messages = getMessages(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: messages.meta.title,
      template: `%s | ${SITE_NAME}`,
    },
    description: messages.meta.description,
    keywords: messages.meta.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ko: "/ko",
        en: "/en",
        "x-default": "/ko",
      },
    },
    ...buildSocialMetadata({
      locale,
      title: messages.meta.openGraphTitle,
      description: messages.meta.openGraphDescription,
      path: "",
    }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const locale = resolveLocale((await params).locale);
  const messages = getMessages(locale);

  const analyticsConfig = getAnalyticsConfig();
  const organizationJsonLd: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: messages.footer.companyValue,
    alternateName: locale === "ko" ? "RedBand" : "레드밴드",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [INSTAGRAM_URL, APP_STORE_URL, PLAY_STORE_URL],
    founder: {
      "@type": "Person",
      name: messages.footer.representativeValue,
    },
    email: messages.footer.inquiryValue,
  };

  const websiteJsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    alternateName: ["아이두", "Aido"],
    publisher: { "@id": `${SITE_URL}/#organization` },
    description: messages.meta.description,
    inLanguage: locale === "ko" ? "ko-KR" : "en-US",
  };

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={
        locale === "en"
          ? `${englishHeading.variable} ${englishBody.variable}`
          : undefined
      }
    >
      <body className="antialiased">
        {locale === "ko" && (
          <>
            <link
              rel="stylesheet"
              href={koreanFontStylesheet}
              precedence="fonts"
            />
            <FontPreload href={koreanHeadingFont} />
          </>
        )}
        <StructuredData data={organizationJsonLd} />
        <StructuredData data={websiteJsonLd} />
        {children}
        {analyticsConfig.providers.length > 0 && (
          <AnalyticsProvider
            locale={locale}
            labels={messages.analyticsConsent}
            config={analyticsConfig}
          />
        )}
      </body>
    </html>
  );
}
