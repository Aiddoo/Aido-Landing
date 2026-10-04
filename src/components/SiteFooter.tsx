import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { INSTAGRAM_URL } from "@/lib/seo";

export function SiteFooter({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const prefix = `/${locale}`;
  return (
    <footer
      className="px-6 py-12 sm:py-16 relative overflow-hidden"
      lang={locale}
    >
      <div className="w-full h-1 border-t-2 border-dashed border-foreground opacity-20 mb-12" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-12 sm:flex-row mb-12">
          <a href={`${prefix}#top`} className="flex items-center gap-4 group">
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
          </a>

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
              <span className="sr-only">{messages.footer.instagramLabel}</span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
