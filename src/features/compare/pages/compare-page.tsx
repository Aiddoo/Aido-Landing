import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { PageHeader } from "@/components/layout/page-header";
import { DownloadCard } from "@/components/marketing/download-card";
import { FaqList } from "@/components/marketing/faq-list";
import { BreadcrumbData } from "@/components/seo/breadcrumb-data";
import {
  Grid,
  HStack,
  ListRow,
  ReadableContent,
  VStack,
} from "@/components/ui/layout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  COMPARE_CHECKED_AT,
  compareApps,
} from "@/features/compare/data/compare";
import { guideIcons } from "@/features/feature-guides/components/feature-guide-list";
import { getFeatureGuide } from "@/features/feature-guides/data/feature-guides";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { formatContentDate } from "@/lib/format-content-date";
import { localizedPath } from "@/lib/public-routes";
import { cn } from "@/lib/utils";

export function ComparePage({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const content = messages.compare;
  return (
    <>
      <BreadcrumbData locale={locale} path="/compare" title={content.title} />
      <MarketingLayout locale={locale} path="/compare">
        <ReadableContent render={<VStack gap={6} />} className="pt-8 md:pt-14">
          <PageHeader
            locale={locale}
            kicker={content.kicker}
            title={content.title}
            description={content.description}
          >
            <p className="text-caption text-gray-8">
              {content.checkedLabel}{" "}
              <time dateTime={COMPARE_CHECKED_AT}>
                {formatContentDate(COMPARE_CHECKED_AT, locale)}
              </time>
            </p>
          </PageHeader>
          <VStack gap={3} className="max-w-reading">
            {content.intro.map((paragraph) => (
              <p key={paragraph} className="text-gray-9">
                {paragraph}
              </p>
            ))}
          </VStack>
        </ReadableContent>

        <ReadableContent
          render={<section aria-labelledby="table-title" />}
          className="mt-section-sm"
        >
          <h2 id="table-title" className="mb-6 text-display-md text-ink">
            {content.tableTitle}
          </h2>
          <div className="rounded-2xl bg-card shadow-card ring-1 ring-border">
            <Table className="min-w-[52rem] table-fixed text-caption">
              <TableCaption className="sr-only">
                {content.tableCaption}
              </TableCaption>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="sticky left-0 z-1 w-40 bg-card px-4 py-4 text-gray-8">
                    {content.featureLabel}
                  </TableHead>
                  {compareApps.map((app) => (
                    <TableHead
                      key={app}
                      scope="col"
                      className={cn(
                        "px-4 py-4 text-title text-ink",
                        app === "aido" &&
                          "bg-brand-soft font-display text-brand-deep",
                      )}
                    >
                      {content.apps[app]}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {content.rows.map((row) => (
                  <TableRow key={row.feature} className="hover:bg-transparent">
                    <TableHead
                      scope="row"
                      className="sticky left-0 z-1 h-auto bg-card px-4 py-3 font-semibold whitespace-normal text-ink"
                    >
                      {row.feature}
                    </TableHead>
                    {compareApps.map((app) => (
                      <TableCell
                        key={app}
                        className={cn(
                          "px-4 py-3 align-top whitespace-normal text-gray-9",
                          app === "aido" &&
                            "bg-brand-soft/60 font-semibold text-ink",
                        )}
                      >
                        {row[app]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-4 text-caption text-gray-8">{content.tableNote}</p>
        </ReadableContent>

        <ReadableContent
          render={<section aria-labelledby="choose-title" />}
          className="mt-section"
        >
          <h2 id="choose-title" className="mb-8 text-display-md text-ink">
            {content.chooseTitle}
          </h2>
          <Grid render={<ul />} columns={2} gap={4}>
            {content.choose.map((item) => (
              <VStack
                key={item.title}
                render={<li />}
                gap={2}
                className="rounded-xl bg-card p-6 shadow-card"
              >
                <ListRow
                  leftAlignment="top"
                  verticalPadding="small"
                  className="items-start gap-3"
                  left={
                    <Check
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-brand-deep"
                    />
                  }
                  contents={
                    <VStack gap={2}>
                      <h3 className="text-title text-ink">{item.title}</h3>
                      <p className="text-gray-9">{item.body}</p>
                    </VStack>
                  }
                />
              </VStack>
            ))}
          </Grid>
        </ReadableContent>

        <ReadableContent
          render={<section aria-labelledby="aido-title" />}
          className="mt-section"
        >
          <VStack gap={8} className="rounded-3xl bg-brand-soft p-6 sm:p-10">
            <h2 id="aido-title" className="text-display-md text-ink">
              {content.aidoTitle}
            </h2>
            <Grid render={<ul />} columns={4} gap={4}>
              {content.aidoPoints.map((point) => {
                const guide = getFeatureGuide(point.slug);
                const Icon = guideIcons[point.slug];
                return (
                  <li key={point.slug} className="flex">
                    <VStack
                      render={<Link href={localizedPath(locale, guide.path)} />}
                      gap={3}
                      className="group w-full rounded-xl bg-card p-5 shadow-card transition-[translate,box-shadow] hover:-translate-y-1 hover:shadow-lift"
                    >
                      <Icon
                        aria-hidden="true"
                        className="size-9 rounded-lg bg-brand-soft p-2 text-brand-deep"
                      />
                      <h3 className="text-title text-ink">{point.title}</h3>
                      <p className="flex-1 text-caption text-gray-8">
                        {point.body}
                      </p>
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 text-brand-deep transition-transform group-hover:translate-x-0.5"
                      />
                    </VStack>
                  </li>
                );
              })}
            </Grid>
          </VStack>
        </ReadableContent>

        <ReadableContent
          render={<section aria-labelledby="faq-title" />}
          size="narrow"
          className="mt-section"
        >
          <h2 id="faq-title" className="mb-8 text-display-md text-ink">
            {messages.featureGuides.faqTitle}
          </h2>
          <FaqList items={content.faq} />
        </ReadableContent>

        <ReadableContent
          render={<section aria-labelledby="sources-title" />}
          size="narrow"
          className="mt-section-sm"
        >
          <VStack gap={4} className="rounded-xl bg-card p-6 shadow-card">
            <h2 id="sources-title" className="text-title text-ink">
              {content.sourcesTitle}
            </h2>
            <VStack render={<ul />} gap={1}>
              {content.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1 text-caption text-gray-9 underline-offset-2 hover:text-brand-deep hover:underline"
                  >
                    {source.label}
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    <span className="sr-only">
                      ({messages.footer.externalLinkLabel})
                    </span>
                  </a>
                </li>
              ))}
            </VStack>
            <HStack className="border-t pt-4">
              <p className="text-micro text-gray-8">
                {content.disclaimer}{" "}
                <a
                  href={`mailto:${messages.footer.inquiryValue}`}
                  className="underline underline-offset-2 hover:text-brand-deep"
                >
                  {messages.footer.inquiryValue}
                </a>
              </p>
            </HStack>
          </VStack>
        </ReadableContent>

        <ReadableContent className="mt-section-sm">
          <DownloadCard locale={locale} />
        </ReadableContent>
      </MarketingLayout>
    </>
  );
}
