import type { Metadata } from "next";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LegalMarkdown } from "@/components/LegalMarkdown";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { readLegalDocument } from "@/lib/legal-docs";

type LocalePrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalePrivacyPageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const messages = getMessages(locale);

  return {
    title: messages.legal.privacyTitle,
    description: messages.legal.privacyDescription,
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {
        ko: "/ko/privacy",
        en: "/en/privacy",
        "x-default": "/ko/privacy",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocalePrivacyPage({
  params,
}: LocalePrivacyPageProps) {
  const locale = resolveLocale((await params).locale);
  const messages = getMessages(locale);
  const markdown = await readLegalDocument("privacy-policy", locale);

  return (
    <main className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20" lang={locale}>
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-6 space-y-4 sm:mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="inline-flex items-center rounded-full border-2 border-foreground/20 bg-white px-3 py-1 text-xs font-bold tracking-wide text-foreground/70">
              {messages.legal.badge}
            </p>
            <LanguageSwitcher
              locale={locale}
              labels={messages.languageSwitcher}
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {messages.legal.privacyTitle}
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-foreground/70 sm:text-base sm:leading-8">
            {messages.legal.privacyDescription}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
            <Link
              href={`/${locale}/terms`}
              className="rounded-full border border-foreground/20 px-4 py-2 hover:bg-foreground/5"
            >
              {messages.legal.viewTermsLabel}
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
