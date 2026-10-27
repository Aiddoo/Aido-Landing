import type { Metadata } from "next";
import type { Organization, WebSite, WithContext } from "schema-dts";
import {
  englishDisplayFont,
  koreanDisplayFont,
} from "@/components/fonts/font-assets";
import { FontPreload } from "@/components/fonts/font-preload";
import { StructuredData } from "@/components/seo/structured-data";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AnalyticsProvider } from "@/features/analytics/components/analytics-provider";
import { getAnalyticsConfig } from "@/features/analytics/config/analytics-config.server";
import { locales } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import {
  APP_STORE_URL,
  buildSocialMetadata,
  INSTAGRAM_URL,
  LINK_HUB_URL,
  PLAY_STORE_URL,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

type LocaleLayoutProps = LayoutProps<"/[locale]">;

// ko/en만 생성한다. 정적 페이지의 렌더링 제약(dynamic·dynamicParams)은 (static)/layout.tsx가,
// 요청마다 그리는 초대 코드 페이지는 (dynamic) 그룹이 각자 정한다.
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
    sameAs: [INSTAGRAM_URL, LINK_HUB_URL, APP_STORE_URL, PLAY_STORE_URL],
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
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="antialiased">
        <FontPreload
          href={locale === "ko" ? koreanDisplayFont : englishDisplayFont}
        />
        <StructuredData data={organizationJsonLd} />
        <StructuredData data={websiteJsonLd} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
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
