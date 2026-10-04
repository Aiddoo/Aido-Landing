import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { StructuredData } from "@/components/StructuredData";
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
  variable: "--font-heading-en",
});

const englishBody = localFont({
  src: "../../../public/fonts/noto-sans-kr-6ecf7205a09a.woff2",
  weight: "400 700",
  display: "optional",
  variable: "--font-body-en",
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// ko/en만 정적 생성 — 그 외 로케일 세그먼트는 404 (요청시점 생성 금지 → 완전 정적)
export const dynamicParams = false;

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

  const organizationJsonLd = {
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

  const websiteJsonLd = {
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
      className={
        locale === "en"
          ? `${englishHeading.variable} ${englishBody.variable}`
          : undefined
      }
    >
      <body className="antialiased">
        <StructuredData data={organizationJsonLd} />
        <StructuredData data={websiteJsonLd} />
        {children}
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  );
}
