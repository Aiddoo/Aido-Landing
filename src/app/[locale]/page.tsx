import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppPreview } from "@/components/AppPreview";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { Friends } from "@/components/Friends";
import { Hero } from "@/components/Hero";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileMenu } from "@/components/MobileMenu";
import { StructuredData } from "@/components/StructuredData";
import { Values } from "@/components/Values";
import { releaseNotes } from "@/data/patch-notes";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import {
  APP_STORE_URL,
  buildPageMetadata,
  INSTAGRAM_URL,
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
      <a href="#content" className="skip-link">
        {messages.accessibility.skip}
      </a>
      <header className="site-header">
        <Link
          href={prefix}
          aria-label={`Aido · ${messages.accessibility.home}`}
          className="flex items-center gap-2"
        >
          <div className="relative h-9 w-9 wobbly-md border-2 border-foreground bg-brand">
            <Image
              src="/logo-small.webp"
              alt=""
              fill
              sizes="36px"
              className="object-contain p-1"
            />
          </div>
          <span className="text-xl font-bold">Aido</span>
        </Link>
        <div className="flex items-center gap-3">
          <nav
            aria-label={messages.nav.label}
            className="desktop-nav hidden lg:flex"
          >
            <a href={`${prefix}#features`}>{messages.nav.features}</a>
            <a href={`${prefix}#faq`}>{messages.nav.faq}</a>
            <Link href={`${prefix}/patch-notes`}>
              {messages.nav.patchNotes}
            </Link>
            <a href={`${prefix}#download`} className="nav-download">
              {messages.nav.download}
            </a>
          </nav>
          <LanguageSwitcher
            locale={locale}
            labels={messages.languageSwitcher}
          />
          <MobileMenu prefix={prefix} labels={messages.nav} />
        </div>
      </header>
      <main id="content" className="min-h-screen selection:bg-brand/20">
        <Hero content={messages.hero} storeButtons={messages.storeButtons} />
        <Values content={messages.values} />
        <AppPreview content={messages.appPreview} />
        <Friends content={messages.friends} />
        <FAQ content={messages.faq} />
        <CTA content={messages.cta} storeButtons={messages.storeButtons} />
      </main>
      <footer
        className="px-6 py-12 sm:py-16 relative overflow-hidden"
        lang={locale}
      >
        <div className="w-full h-1 border-t-2 border-dashed border-foreground opacity-20 mb-12" />

        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-12 sm:flex-row mb-12">
            <Link href={prefix} className="flex items-center gap-4 group">
              <div className="relative h-8 w-8 wobbly-md border-2 border-foreground bg-foreground p-1 grayscale group-hover:grayscale-0 transition-all group-hover:bg-brand">
                <Image
                  src="/logo-small.webp"
                  alt="Aido"
                  fill
                  sizes="32px"
                  className="object-contain p-1"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">Aido</span>
            </Link>

            <div className="text-center sm:text-left space-y-2">
              <p className="text-lg font-bold opacity-80">
                {messages.footer.copyright}
              </p>
              <p className="text-sm font-medium text-foreground/70">
                {messages.footer.tagline}
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-end gap-1 text-xs font-bold tracking-wider relative">
              <span className="bg-brand text-foreground px-2 py-0.5 wobbly-sm -rotate-2 mb-2 inline-block">
                {messages.footer.contactBadge}
              </span>
              <a
                href={`mailto:${messages.footer.inquiryValue}`}
                className="hover:text-brand-ink transition-colors decoration-dashed underline underline-offset-4"
              >
                {messages.footer.inquiryValue}
              </a>
            </div>
          </div>

          <div className="pt-12 border-t-2 border-dashed border-foreground/10 flex flex-col items-center sm:items-start gap-8">
            <address className="space-y-2 text-center sm:text-left text-sm font-medium text-foreground/70 not-italic">
              <p>
                <span className="font-bold text-foreground">
                  {messages.footer.companyLabel}
                </span>{" "}
                {messages.footer.companyValue}
              </p>
              <p>
                <span className="font-bold text-foreground">
                  {messages.footer.representativeLabel}
                </span>{" "}
                {messages.footer.representativeValue}
              </p>
              <p>
                <span className="font-bold text-foreground">
                  {messages.footer.businessNumberLabel}
                </span>{" "}
                {messages.footer.businessNumberValue}
              </p>
              <p>
                <span className="font-bold text-foreground">
                  {messages.footer.ecommerceLabel}
                </span>{" "}
                {messages.footer.ecommerceValue}
              </p>
              <p>
                <span className="font-bold text-foreground">
                  {messages.footer.hostingLabel}
                </span>{" "}
                {messages.footer.hostingValue}
              </p>
              <p>
                <span className="font-bold text-foreground">
                  {messages.footer.inquiryLabel}
                </span>{" "}
                <a
                  href={`mailto:${messages.footer.inquiryValue}`}
                  className="underline decoration-dashed underline-offset-4 hover:text-brand-ink"
                >
                  {messages.footer.inquiryValue}
                </a>
              </p>
            </address>

            <nav
              aria-label={messages.accessibility.footer}
              className="flex items-center gap-4 sm:gap-8 text-sm font-bold flex-wrap justify-center"
            >
              <Link
                href={`${prefix}/terms`}
                className="hover:text-brand-ink transition-colors"
              >
                {messages.footer.termsLabel}
              </Link>
              <Link
                href={`${prefix}/privacy`}
                className="hover:text-brand-ink transition-colors"
              >
                {messages.footer.privacyLabel}
              </Link>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={messages.footer.instagramLabel}
                className="inline-flex items-center justify-center w-9 h-9 wobbly-sm border-2 border-foreground rotate-1 hover:bg-brand hover:text-foreground hover:scale-110 active:scale-95 transition-all"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span className="sr-only">
                  {messages.footer.instagramLabel}
                </span>
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
