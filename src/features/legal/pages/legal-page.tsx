import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { match } from "ts-pattern";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { PageHeader } from "@/components/layout/page-header";
import { BreadcrumbData } from "@/components/seo/breadcrumb-data";
import { ReadableContent, VStack } from "@/components/ui/layout";
import { LegalMarkdown } from "@/features/legal/components/legal-markdown";
import {
  type LegalDocumentKey,
  readLegalDocument,
} from "@/features/legal/data/legal-docs.server";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { localizedPath, type PublicPath } from "@/lib/public-routes";

export async function LegalPage({
  locale,
  document,
}: {
  locale: Locale;
  document: "privacy" | "terms" | "account-deletion";
}) {
  const { legal } = getMessages(locale);
  const content = match(document)
    .returnType<{
      title: string;
      description: string;
      key: LegalDocumentKey;
      relatedPath: PublicPath;
      relatedLabel: string;
    }>()
    .with("privacy", () => ({
      title: legal.privacyTitle,
      description: legal.privacyDescription,
      key: "privacy-policy",
      relatedPath: "/terms",
      relatedLabel: legal.viewTermsLabel,
    }))
    .with("terms", () => ({
      title: legal.termsTitle,
      description: legal.termsDescription,
      key: "terms-of-service",
      relatedPath: "/privacy",
      relatedLabel: legal.viewPrivacyLabel,
    }))
    .with("account-deletion", () => ({
      title: legal.accountDeletionTitle,
      description: legal.accountDeletionDescription,
      key: "account-deletion",
      relatedPath: "/privacy",
      relatedLabel: legal.viewPrivacyLabel,
    }))
    .exhaustive();
  const markdown = await readLegalDocument(content.key, locale);
  return (
    <>
      <BreadcrumbData
        locale={locale}
        path={`/${document}`}
        title={content.title}
      />
      <MarketingLayout locale={locale} path={`/${document}`}>
        <ReadableContent
          size="narrow"
          render={<VStack gap={10} />}
          className="pt-8 md:pt-14"
        >
          <PageHeader
            locale={locale}
            title={content.title}
            description={content.description}
            breadcrumbs={[{ label: legal.badge }]}
          >
            <Link
              href={localizedPath(locale, content.relatedPath)}
              className="inline-flex h-11 items-center gap-1.5 rounded-full bg-card px-4 text-caption font-semibold text-ink shadow-press-soft transition-colors hover:text-brand-deep"
            >
              {content.relatedLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </PageHeader>
          <LegalMarkdown markdown={markdown} />
        </ReadableContent>
      </MarketingLayout>
    </>
  );
}
