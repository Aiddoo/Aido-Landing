import Link from "next/link";
import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import { BreadcrumbData } from "@/components/seo/breadcrumb-data";
import { LegalMarkdown } from "@/features/legal/components/legal-markdown";
import { readLegalDocument } from "@/features/legal/data/legal-docs.server";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
export async function LegalPage({
  locale,
  document,
}: {
  locale: Locale;
  document: "privacy" | "terms";
}) {
  const messages = getMessages(locale);
  const content =
    document === "privacy"
      ? {
          title: messages.legal.privacyTitle,
          description: messages.legal.privacyDescription,
          key: "privacy-policy" as const,
          relatedPath: "/terms" as const,
          relatedLabel: messages.legal.viewTermsLabel,
        }
      : {
          title: messages.legal.termsTitle,
          description: messages.legal.termsDescription,
          key: "terms-of-service" as const,
          relatedPath: "/privacy" as const,
          relatedLabel: messages.legal.viewPrivacyLabel,
        };
  const markdown = await readLegalDocument(content.key, locale);

  return (
    <main className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20" lang={locale}>
      <BreadcrumbData
        locale={locale}
        path={`/${document}`}
        title={content.title}
      />
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-6 space-y-4 sm:mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="inline-flex items-center rounded-full border-2 border-foreground/20 bg-white px-3 py-1 text-xs font-bold tracking-wide text-foreground/70">
              {messages.legal.badge}
            </p>
            <LanguageSwitcher
              locale={locale}
              labels={messages.languageSwitcher}
              path={`/${document}`}
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {content.title}
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-foreground/70 sm:text-base sm:leading-8">
            {content.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
            <Link
              href={`/${locale}${content.relatedPath}`}
              className="rounded-full border border-foreground/20 px-4 py-2 hover:bg-foreground/5"
            >
              {content.relatedLabel}
            </Link>
            <a
              href={`/${locale}#top`}
              className="text-brand-ink underline underline-offset-4"
            >
              {messages.legal.backHomeLabel}
            </a>
          </div>
        </header>

        <LegalMarkdown markdown={markdown} />
      </div>
    </main>
  );
}
