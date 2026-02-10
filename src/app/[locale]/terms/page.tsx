import type { Metadata } from "next";
import Link from "next/link";
import { LegalMarkdown } from "@/components/LegalMarkdown";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { readLegalDocument } from "@/lib/legal-docs";

type LocaleTermsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocaleTermsPageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const messages = getMessages(locale);

  return {
    title: messages.legal.termsTitle,
    description: messages.legal.termsDescription,
    alternates: {
      canonical: `/${locale}/terms`,
      languages: {
        ko: "/ko/terms",
        en: "/en/terms",
        "x-default": "/ko/terms",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleTermsPage({
  params,
}: LocaleTermsPageProps) {
  const locale = resolveLocale((await params).locale);
  const messages = getMessages(locale);
  const markdown = await readLegalDocument("terms-of-service", locale);

  return (
    <main className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20" lang={locale}>
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-6 space-y-4 sm:mb-8">
          <p className="inline-flex items-center rounded-full border-2 border-foreground/20 bg-white px-3 py-1 text-xs font-bold tracking-wide text-foreground/70">
            {messages.legal.badge}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {messages.legal.termsTitle}
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-foreground/70 sm:text-base sm:leading-8">
            {messages.legal.termsDescription}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
            <Link
              href={`/${locale}/privacy`}
              className="rounded-full border border-foreground/20 px-4 py-2 hover:bg-foreground/5"
            >
              {messages.legal.viewPrivacyLabel}
            </Link>
            <Link
              href={`/${locale}`}
              className="text-brand underline underline-offset-4"
            >
              {messages.legal.backHomeLabel}
            </Link>
          </div>
        </header>

        <LegalMarkdown markdown={markdown} />
      </div>
    </main>
  );
}
