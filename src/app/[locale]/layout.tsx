import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Black_Han_Sans, Noto_Sans_KR } from "next/font/google";
import { locales } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";

const SITE_URL = "https://aido.kr";
const SITE_NAME = "Aido";

const notoSansKR = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  subsets: ["latin"],
  display: "swap",
});

const blackHanSans = Black_Han_Sans({
  weight: "400",
  variable: "--font-black-han",
  subsets: ["latin"],
  display: "swap",
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
    openGraph: {
      title: messages.meta.openGraphTitle,
      description: messages.meta.openGraphDescription,
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: messages.meta.openGraphTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.meta.openGraphTitle,
      description: messages.meta.openGraphDescription,
      images: ["/og-image.png"],
    },
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
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
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
    url: `${SITE_URL}/${locale}`,
    description: messages.meta.description,
    inLanguage: locale === "ko" ? "ko-KR" : "en-US",
  };

  const mobileAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: SITE_NAME,
    operatingSystem: "iOS, Android",
    applicationCategory: "ProductivityApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    installUrl: [
      "https://apps.apple.com/kr/app/%EC%95%84%EC%9D%B4%EB%91%90-ai-%ED%88%AC%EB%91%90-%ED%94%8C%EB%9E%98%EB%84%88/id6757722325",
      "https://play.google.com/store/apps/details?id=com.aido.mobile",
    ],
    description: messages.meta.description,
    inLanguage: locale === "ko" ? "ko-KR" : "en-US",
  };

  return (
    <html lang={locale}>
      <body
        className={`${notoSansKR.variable} ${blackHanSans.variable} antialiased`}
      >
        <script type="application/ld+json">
          {JSON.stringify(organizationJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(mobileAppJsonLd)}
        </script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
