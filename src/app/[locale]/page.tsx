import Image from "next/image";
import Link from "next/link";
import { AppPreview } from "@/components/AppPreview";
import { CTA } from "@/components/CTA";
import { Friends } from "@/components/Friends";
import { Hero } from "@/components/Hero";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileMenu } from "@/components/MobileMenu";
import { Roadmap } from "@/components/Roadmap";
import { Values } from "@/components/Values";
import { Vision } from "@/components/Vision";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { INSTAGRAM_URL } from "@/lib/seo";

type LocaleHomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const locale = resolveLocale((await params).locale);
  const messages = getMessages(locale);
  const prefix = `/${locale}`;

  return (
    <main
      className="min-h-screen bg-transparent selection:bg-brand/20 selection:text-brand relative"
      lang={locale}
    >
      <div className="paper-grain" />

      <nav className="fixed top-4 sm:top-6 z-50 w-full px-4 sm:px-6 pointer-events-none">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 bg-white/80 backdrop-blur wobbly-md border-[3px] border-foreground px-4 sm:px-8 py-3 sm:py-4 hand-shadow-lg pointer-events-auto">
          <Link href={prefix} className="flex items-center gap-3 sm:gap-4">
            <div className="relative h-9 w-9 sm:h-10 sm:w-10 wobbly-md border-2 border-foreground bg-brand group transition-transform hover:-rotate-12">
              <Image
                src="/logo.png"
                alt="Aido"
                fill
                sizes="40px"
                priority
                className="object-contain p-1.5"
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight">
              Aido
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-6">
            <a
              href={`${prefix}#friends`}
              className="hidden text-sm sm:text-base lg:text-lg font-bold text-foreground/60 sm:block hover:text-brand transition-colors"
            >
              {messages.nav.friends}
            </a>
            <Link
              href={`${prefix}/patch-notes`}
              className="hidden text-sm sm:text-base lg:text-lg font-bold text-foreground/60 sm:block hover:text-brand transition-colors"
            >
              {messages.nav.patchNotes}
            </Link>
            <a
              href={`${prefix}#download`}
              className="hidden sm:block text-sm sm:text-base lg:text-lg font-bold text-brand hover:scale-110 active:scale-95 transition-all"
            >
              {messages.nav.download}
            </a>
            <LanguageSwitcher
              locale={locale}
              labels={messages.languageSwitcher}
            />
            <MobileMenu prefix={prefix} labels={messages.nav} />
          </div>
        </div>
      </nav>

      <Hero content={messages.hero} storeButtons={messages.storeButtons} />
      <Friends content={messages.friends} />
      <Vision content={messages.vision} />
      <Values content={messages.values} />
      <Roadmap content={messages.roadmap} />
      <AppPreview content={messages.appPreview} />
      <CTA content={messages.cta} storeButtons={messages.storeButtons} />

      <footer className="px-6 py-20 relative overflow-hidden" lang={locale}>
        <div className="w-full h-1 border-t-2 border-dashed border-foreground opacity-20 mb-20" />

        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-12 sm:flex-row mb-12">
            <Link href={prefix} className="flex items-center gap-4 group">
              <div className="relative h-8 w-8 wobbly-md border-2 border-foreground bg-foreground p-1 grayscale group-hover:grayscale-0 transition-all group-hover:bg-brand">
                <Image
                  src="/logo.png"
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
              <p className="text-sm font-medium opacity-50">
                {messages.footer.tagline}
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-end gap-1 text-xs font-bold tracking-wider relative">
              <span className="bg-brand text-white px-2 py-0.5 wobbly-sm -rotate-2 mb-2 inline-block">
                {messages.footer.contactBadge}
              </span>
              <a
                href={`mailto:${messages.footer.inquiryValue}`}
                className="hover:text-brand transition-colors decoration-dashed underline underline-offset-4"
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
                  className="underline decoration-dashed underline-offset-4 hover:text-brand"
                >
                  {messages.footer.inquiryValue}
                </a>
              </p>
            </address>

            <nav
              aria-label="Footer links"
              className="flex items-center gap-8 text-sm font-bold"
            >
              <Link
                href={`${prefix}/terms`}
                className="hover:text-brand transition-colors"
              >
                {messages.footer.termsLabel}
              </Link>
              <Link
                href={`${prefix}/privacy`}
                className="hover:text-brand transition-colors"
              >
                {messages.footer.privacyLabel}
              </Link>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={messages.footer.instagramLabel}
                className="inline-flex items-center justify-center w-9 h-9 wobbly-sm border-2 border-foreground rotate-1 hover:bg-brand hover:text-white hover:scale-110 active:scale-95 transition-all"
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

        <div className="absolute right-10 bottom-10 opacity-10 -rotate-12 pointer-events-none">
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
            role="img"
          >
            <title>Decorative background scribble</title>
            <path d="M10,90 Q30,10 90,50 T10,10" />
          </svg>
        </div>
      </footer>
    </main>
  );
}
