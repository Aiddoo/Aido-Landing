import { groupBy } from "es-toolkit";
import {
  Bug,
  ChevronDown,
  type LucideIcon,
  Sparkles,
  Wand2,
} from "lucide-react";
import { match } from "ts-pattern";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { PageHeader } from "@/components/layout/page-header";
import { DownloadCard } from "@/components/marketing/download-card";
import { BreadcrumbData } from "@/components/seo/breadcrumb-data";
import { badgeVariants } from "@/components/ui/badge";
import { Box, HStack, ReadableContent, VStack } from "@/components/ui/layout";
import {
  CopyUpdateSummary,
  type UpdateCopyLabels,
} from "@/features/updates/components/copy-update-summary";
import {
  formatStoreNotes,
  type ReleaseCategory,
  type UpdateNote,
  updateNotes,
} from "@/features/updates/data/patch-notes";
import type { Locale } from "@/i18n/config";
import { getMessages, type MessageCatalog } from "@/i18n/messages";
import { formatContentDate } from "@/lib/format-content-date";
import { cn } from "@/lib/utils";

type PatchNotesLabels = MessageCatalog["patchNotes"];

export function PatchNotesPage({ locale }: { locale: Locale }) {
  const labels = getMessages(locale).patchNotes;
  // 모든 복사 버튼이 같은 네 문구만 클라이언트로 넘긴다.
  const copyLabels: UpdateCopyLabels = {
    copySummary: labels.copySummary,
    summaryCopied: labels.summaryCopied,
    copySummaryFallback: labels.copySummaryFallback,
    updateSummary: labels.updateSummary,
  };
  const [latest, ...older] = updateNotes;
  if (!latest) throw new Error("At least one update is required");
  return (
    <>
      <BreadcrumbData
        locale={locale}
        path="/patch-notes"
        title={labels.title}
      />
      <MarketingLayout locale={locale} path="/patch-notes">
        <ReadableContent
          size="narrow"
          render={<VStack gap={12} />}
          className="pt-8 md:pt-14"
        >
          <PageHeader
            locale={locale}
            kicker={labels.kicker}
            title={labels.title}
            description={labels.description}
          />
          <UpdateCard
            release={latest}
            locale={locale}
            labels={labels}
            copyLabels={copyLabels}
            latest
          />
          <UpdateArchive
            releases={older}
            locale={locale}
            labels={labels}
            copyLabels={copyLabels}
          />
          <p className="text-center font-hand text-hand text-gray-8">
            {labels.closingNote}
          </p>
        </ReadableContent>
        <ReadableContent className="mt-section-sm">
          <DownloadCard locale={locale} />
        </ReadableContent>
      </MarketingLayout>
    </>
  );
}

interface UpdateBlockProps {
  locale: Locale;
  labels: PatchNotesLabels;
  copyLabels: UpdateCopyLabels;
}

function UpdateArchive({
  releases,
  ...props
}: UpdateBlockProps & { releases: UpdateNote[] }) {
  if (!releases.length) return null;
  const { locale, labels } = props;
  const months = groupBy(releases, (release) => release.date.slice(0, 7));
  return (
    <VStack render={<section aria-labelledby="archive-title" />} gap={6}>
      <VStack gap={2}>
        <h2 id="archive-title" className="text-display-md text-ink">
          {labels.archiveTitle}
        </h2>
        <p className="text-gray-9">{labels.archiveDescription}</p>
      </VStack>
      <VStack gap={3}>
        {Object.entries(months).map(([month, monthReleases]) => (
          <details
            key={month}
            data-slot="archive-month"
            data-release-month={month}
            className="group/month rounded-xl bg-card shadow-card"
          >
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 [&::-webkit-details-marker]:hidden">
              <HStack align="baseline" wrap="wrap" className="gap-x-3 gap-y-1">
                <h3 className="text-title text-ink">
                  {formatContentDate(`${month}-01`, locale, true)}
                </h3>
                <span className="text-caption text-gray-8">
                  {monthReleases.length === 1
                    ? labels.releaseCountOne
                    : labels.releaseCount.replace(
                        "{count}",
                        String(monthReleases.length),
                      )}
                </span>
              </HStack>
              <ChevronDown
                aria-hidden="true"
                className="size-5 shrink-0 text-gray-8 transition-transform group-open/month:rotate-180"
              />
            </summary>
            <VStack gap={3} className="px-3 pb-3 sm:px-4 sm:pb-4">
              {monthReleases.map((release) => (
                <UpdateCard key={release.id} release={release} {...props} />
              ))}
            </VStack>
          </details>
        ))}
      </VStack>
    </VStack>
  );
}

const categoryIcons: Record<ReleaseCategory, LucideIcon> = {
  features: Sparkles,
  improvements: Wand2,
  bugFixes: Bug,
};

function UpdateCard({
  release,
  locale,
  labels,
  copyLabels,
  latest = false,
}: UpdateBlockProps & { release: UpdateNote; latest?: boolean }) {
  const VersionHeading = latest ? "h2" : "h4";
  const CategoryHeading = latest ? "h3" : "h5";
  return (
    <details
      open={latest}
      id={release.id}
      data-update-kind={release.kind}
      data-update-id={release.id}
      data-release-version={
        release.kind === "app" ? release.version : undefined
      }
      className={cn(
        "group/update scroll-mt-24 rounded-xl bg-card",
        latest
          ? "rounded-3xl shadow-lift ring-2 ring-brand/30"
          : "ring-1 ring-border",
      )}
    >
      <summary
        className={cn(
          "block cursor-pointer list-none rounded-xl [&::-webkit-details-marker]:hidden",
          latest ? "p-6 sm:p-8" : "p-5",
        )}
      >
        <HStack align="center" justify="between" wrap="wrap" gap={3}>
          <HStack align="center" wrap="wrap" gap={2}>
            <VersionHeading
              className={cn(
                "font-display font-normal text-ink",
                latest ? "text-display-md" : "text-title-lg",
              )}
            >
              {release.kind === "app"
                ? `${labels.appUpdate} · v${release.version}`
                : labels.serviceUpdate}
            </VersionHeading>
            {latest && (
              <span className={badgeVariants({ variant: "default" })}>
                {labels.latest}
              </span>
            )}
            {release.kind === "app" && !release.categories.length && (
              <span className={badgeVariants({ variant: "soft" })}>
                {labels.newRelease}
              </span>
            )}
          </HStack>
          <HStack align="center" gap={2}>
            <time dateTime={release.date} className="text-caption text-gray-8">
              {formatContentDate(release.date, locale)}
            </time>
            <ChevronDown
              aria-hidden="true"
              className="size-5 text-gray-8 transition-transform group-open/update:rotate-180"
            />
          </HStack>
        </HStack>
        <p className="mt-3 text-gray-9">{release.summary[locale]}</p>
        {release.kind === "service" && (
          <p className="mt-2 text-caption text-gray-8">
            {labels.noAppUpdateNeeded}
          </p>
        )}
        <span
          aria-hidden="true"
          className="mt-3 inline-block text-caption font-semibold text-brand-deep"
        >
          <span className="group-open/update:hidden">{labels.expand}</span>
          <span className="hidden group-open/update:inline">
            {labels.collapse}
          </span>
        </span>
      </summary>
      <VStack gap={6} className={latest ? "px-6 pb-8 sm:px-8" : "px-5 pb-6"}>
        {release.kind === "app" && (
          <VStack
            render={<section />}
            gap={3}
            className="rounded-xl bg-cream p-5"
          >
            <CategoryHeading className="font-bold text-ink">
              {labels.updateSummary}
            </CategoryHeading>
            <VStack render={<ul />} gap={2}>
              {release.storeNotes[locale].map((item) => (
                <ReleaseItem key={item}>{item}</ReleaseItem>
              ))}
            </VStack>
            <CopyUpdateSummary
              text={formatStoreNotes(release, locale)}
              labels={copyLabels}
            />
          </VStack>
        )}
        {release.categories.length ? (
          release.categories.map((category) => {
            const Icon = categoryIcons[category.type];
            return (
              <VStack key={category.type} render={<section />} gap={3}>
                <CategoryHeading
                  className={cn(
                    "inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-caption font-bold",
                    match(category.type)
                      .with("features", () => "bg-brand-soft text-brand-deep")
                      .with("improvements", () => "bg-fish/12 text-fish-deep")
                      .with("bugFixes", () => "bg-secondary text-gray-9")
                      .exhaustive(),
                  )}
                >
                  <Icon aria-hidden="true" className="size-3.5" />
                  {labels[category.type]}
                </CategoryHeading>
                <VStack render={<ul />} gap={2}>
                  {category.items.map((item) => (
                    <ReleaseItem key={item.ko}>{item[locale]}</ReleaseItem>
                  ))}
                </VStack>
              </VStack>
            );
          })
        ) : (
          <p className="text-gray-9">{labels.initialNote}</p>
        )}
      </VStack>
    </details>
  );
}

function ReleaseItem({ children }: { children: string }) {
  return (
    <HStack render={<li />} align="start" gap={3} className="text-gray-10">
      <Box
        aria-hidden="true"
        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand"
      />
      <span>{children}</span>
    </HStack>
  );
}
