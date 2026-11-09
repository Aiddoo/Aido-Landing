import {
  ArrowRight,
  AudioLines,
  Check,
  Crown,
  ListChecks,
  type LucideIcon,
  Mic,
  NotebookPen,
  Repeat,
  Sparkles,
  TabletSmartphone,
} from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { PageHeader } from "@/components/layout/page-header";
import { BrandMotif } from "@/components/marketing/brand-motif";
import { DownloadCard } from "@/components/marketing/download-card";
import { DeviceScreen } from "@/components/media/device-screen";
import { BreadcrumbData } from "@/components/seo/breadcrumb-data";
import { badgeVariants } from "@/components/ui/badge";
import {
  Box,
  Centered,
  HStack,
  ListRow,
  ReadableContent,
  VStack,
} from "@/components/ui/layout";
import { getGuideScreen } from "@/features/feature-guides/data/guide-screens";
import { releaseNotes } from "@/features/updates/data/patch-notes";
import type {
  HighlightIcon,
  ReleaseHighlight,
} from "@/features/updates/data/release-highlights";
import { getReleaseScreen } from "@/features/updates/data/release-screens";
import type { Locale } from "@/i18n/config";
import { getMessages, type MessageCatalog } from "@/i18n/messages";
import { formatContentDate } from "@/lib/format-content-date";
import { localizedPath } from "@/lib/public-routes";
import { cn } from "@/lib/utils";

type HighlightLabels = MessageCatalog["releaseHighlights"];
type Section = ReleaseHighlight["sections"][number];

const PLANS_ID = "plans";

/** 큰 앱 업데이트를 실제 화면과 함께 위에서 아래로 소개한다. 전체 변경 목록은 패치노트가 맡는다. */
export function ReleaseHighlightsPage({
  locale,
  highlight,
}: {
  locale: Locale;
  highlight: ReleaseHighlight;
}) {
  const labels = getMessages(locale).releaseHighlights;
  const release = releaseNotes.find(
    (item) => item.version === highlight.version,
  );
  if (!release) throw new Error(`${highlight.version} is not released`);
  const title = highlight.title[locale];
  return (
    <>
      <BreadcrumbData
        locale={locale}
        path={highlight.path}
        title={title}
        parents={[{ name: labels.breadcrumbLabel, path: "/patch-notes" }]}
      />
      <MarketingLayout locale={locale} path={highlight.path}>
        <ReadableContent
          render={<article />}
          size="narrow"
          className="grid grid-cols-[minmax(0,1fr)] gap-12 pt-8 md:pt-14"
        >
          <PageHeader
            locale={locale}
            kicker={highlight.kicker[locale]}
            title={title}
            description={highlight.description[locale]}
            descriptionLayout="sentences"
            breadcrumbs={[
              {
                label: labels.breadcrumbLabel,
                anchorHref: localizedPath(locale, "/patch-notes"),
              },
            ]}
          >
            <p className="text-caption text-gray-8">
              {labels.releasedLabel}{" "}
              <time dateTime={release.date}>
                {formatContentDate(release.date, locale)}
              </time>
              {" · "}v{highlight.version}
            </p>
          </PageHeader>
          <Contents highlight={highlight} locale={locale} labels={labels} />
          {highlight.sections.map((section) => (
            <HighlightSection
              key={section.id}
              section={section}
              locale={locale}
              labels={labels}
            />
          ))}
          <Plans highlight={highlight} locale={locale} labels={labels} />
          <VStack
            render={<section aria-labelledby="all-notes-title" />}
            gap={3}
            className="items-start rounded-xl border border-dashed border-brand/40 p-6"
          >
            <h2 id="all-notes-title" className="text-title-lg text-ink">
              {labels.allNotesTitle}
            </h2>
            <p className="text-gray-9">{labels.allNotesDescription}</p>
            <Link
              href={localizedPath(locale, "/patch-notes")}
              className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand-deep underline-offset-4 hover:underline"
            >
              {labels.allNotesLink}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </VStack>
        </ReadableContent>
        <ReadableContent className="mt-section-sm">
          <DownloadCard locale={locale} />
        </ReadableContent>
      </MarketingLayout>
    </>
  );
}

interface BlockProps {
  locale: Locale;
  labels: HighlightLabels;
}

/** 페이지 안 섹션으로 가는 목차. 해시 링크라 JavaScript 없이 동작한다. */
function Contents({
  highlight,
  locale,
  labels,
}: BlockProps & { highlight: ReleaseHighlight }) {
  return (
    <VStack render={<nav aria-labelledby="contents-title" />} gap={3}>
      <HStack align="center" gap={2} className="text-brand-deep">
        <BrandMotif motif="paw" className="size-4" />
        <h2 id="contents-title" className="font-hand text-hand">
          {labels.contentsLabel}
        </h2>
      </HStack>
      <HStack render={<ol />} wrap="wrap" gap={2}>
        {[
          ...highlight.sections.map((section) => ({
            id: section.id,
            label: section.navLabel[locale],
            icon: section.icon,
          })),
          {
            id: PLANS_ID,
            label: highlight.plans.navLabel[locale],
            icon: "crown" as const,
          },
        ].map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-card px-4 text-caption font-semibold text-gray-10 shadow-card transition-colors hover:bg-brand-soft hover:text-brand-deep"
            >
              <SectionIcon
                icon={item.icon}
                aria-hidden="true"
                className="size-4 text-brand-deep"
              />
              {item.label}
            </a>
          </li>
        ))}
      </HStack>
    </VStack>
  );
}

const sectionIcons = {
  mic: Mic,
  "list-checks": ListChecks,
  "audio-lines": AudioLines,
  "notebook-pen": NotebookPen,
  repeat: Repeat,
  crown: Crown,
  tablet: TabletSmartphone,
  sparkles: Sparkles,
} as const satisfies Record<HighlightIcon, LucideIcon>;

function SectionIcon({
  icon,
  ...props
}: { icon: HighlightIcon } & ComponentProps<LucideIcon>) {
  const Icon = sectionIcons[icon];
  return <Icon {...props} />;
}

function HighlightSection({
  section,
  locale,
  labels,
}: BlockProps & { section: Section }) {
  const titleId = `${section.id}-title`;
  const wide = section.screens.some(
    (screen) => getReleaseScreen(locale, screen.key).device === "duo-open",
  );
  const hasVisual = section.screens.length > 0 || "comparison" in section;
  return (
    <Box
      render={<section id={section.id} aria-labelledby={titleId} />}
      className={cn(
        "grid scroll-mt-24 grid-cols-[minmax(0,1fr)] gap-8 rounded-3xl bg-card p-6 shadow-card sm:p-10",
        hasVisual &&
          !wide &&
          "md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center",
      )}
    >
      <VStack gap={4}>
        <Centered className="size-11 rounded-full bg-brand-soft text-brand-deep">
          <SectionIcon
            icon={section.icon}
            aria-hidden="true"
            className="size-5"
          />
        </Centered>
        <h2 id={titleId} className="text-display-md text-ink">
          {section.title[locale]}
        </h2>
        <p className="text-body-lg text-gray-9">{section.body[locale]}</p>
        {section.points[locale].length > 0 && (
          <VStack render={<ul />} gap={2}>
            {section.points[locale].map((point) => (
              <ListRow
                key={point}
                render={<li />}
                leftAlignment="top"
                verticalPadding="small"
                className="items-start gap-2.5 py-0"
                left={
                  <Check
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-brand-deep"
                  />
                }
                contents={<span className="text-gray-10">{point}</span>}
              />
            ))}
          </VStack>
        )}
      </VStack>
      {"comparison" in section ? (
        <Comparison section={section} locale={locale} />
      ) : (
        section.screens.length > 0 && (
          <Screens
            screens={section.screens}
            locale={locale}
            labels={labels}
            wide={wide}
          />
        )
      )}
    </Box>
  );
}

function Screens({
  screens,
  locale,
  labels,
  wide,
}: Omit<BlockProps, "labels"> & {
  labels: HighlightLabels;
  screens: Section["screens"];
  wide: boolean;
}) {
  return (
    <HStack
      render={<ul aria-label={labels.screenNote} />}
      justify="center"
      align="start"
      gap={4}
      className="sm:gap-6"
    >
      {screens.map((screen) => (
        <Box
          key={screen.key}
          render={<li />}
          className={cn(
            wide
              ? "w-full max-w-2xl"
              : screens.length > 1
                ? "w-1/2 max-w-56"
                : "w-3/5 max-w-60",
          )}
        >
          <VStack render={<figure />} gap={3}>
            <DeviceScreen
              {...getReleaseScreen(locale, screen.key)}
              alt={screen.alt[locale]}
              sizes={
                wide
                  ? "(min-width: 768px) 672px, 90vw"
                  : "(min-width: 768px) 224px, 45vw"
              }
            />
            <figcaption className="text-center text-caption text-gray-8">
              {screen.caption[locale]}
            </figcaption>
          </VStack>
        </Box>
      ))}
    </HStack>
  );
}

/** 이전 버전 화면과 새 화면을 나란히 보여 준다. */
function Comparison({
  section,
  locale,
}: {
  section: Extract<Section, { comparison: unknown }>;
  locale: Locale;
}) {
  const { before, after } = section.comparison;
  return (
    <HStack
      render={<ul />}
      justify="center"
      align="start"
      gap={4}
      className="sm:gap-6"
    >
      <Box render={<li />} className="w-1/2 max-w-56">
        <VStack render={<figure />} gap={3}>
          <DeviceScreen
            {...getGuideScreen(locale, before.key)}
            alt={before.alt[locale]}
            sizes="(min-width: 768px) 224px, 45vw"
            tone="graphite"
          />
          <figcaption
            className={badgeVariants({
              variant: "secondary",
              className: "h-7 self-center px-3 text-caption",
            })}
          >
            {before.label[locale]}
          </figcaption>
        </VStack>
      </Box>
      <Box render={<li />} className="w-1/2 max-w-56">
        <VStack render={<figure />} gap={3}>
          <DeviceScreen
            {...getReleaseScreen(locale, after.key)}
            alt={after.alt[locale]}
            sizes="(min-width: 768px) 224px, 45vw"
          />
          <figcaption
            className={badgeVariants({
              variant: "default",
              className: "h-7 self-center px-3 text-caption",
            })}
          >
            {after.label[locale]}
          </figcaption>
        </VStack>
      </Box>
    </HStack>
  );
}

function Plans({
  highlight,
  locale,
  labels,
}: BlockProps & { highlight: ReleaseHighlight }) {
  const { plans } = highlight;
  return (
    <Box
      render={<section id={PLANS_ID} aria-labelledby="plans-title" />}
      className="grid scroll-mt-24 grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-[minmax(0,1fr)_14rem] md:items-start"
    >
      <VStack gap={5}>
        <h2 id="plans-title" className="text-display-md text-ink">
          {plans.title[locale]}
        </h2>
        <Box className="overflow-hidden rounded-xl bg-card shadow-card">
          <table className="w-full text-left text-caption sm:text-body">
            <thead className="bg-cream text-gray-9">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  {labels.featureLabel}
                </th>
                <th scope="col" className="px-3 py-3 font-semibold">
                  {labels.freeLabel}
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 font-semibold text-brand-deep"
                >
                  {labels.premiumLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {plans.rows.map((row) => (
                <tr key={row.label.ko} className="border-t border-border">
                  <th scope="row" className="px-4 py-3 font-semibold text-ink">
                    {row.label[locale]}
                  </th>
                  <td className="px-3 py-3 text-gray-9">{row.free[locale]}</td>
                  <td className="bg-brand-soft/50 px-3 py-3 font-semibold text-ink">
                    {row.premium[locale]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
        <p className="text-caption text-gray-8">{plans.note[locale]}</p>
      </VStack>
      <VStack
        render={<figure />}
        gap={3}
        className="mx-auto w-3/5 max-w-56 md:w-full"
      >
        <DeviceScreen
          {...getReleaseScreen(locale, plans.screen.key)}
          alt={plans.screen.alt[locale]}
          sizes="(min-width: 768px) 224px, 60vw"
        />
        <figcaption className="text-center text-caption text-gray-8">
          {plans.screen.caption[locale]}
        </figcaption>
      </VStack>
    </Box>
  );
}
