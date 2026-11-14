import { ArrowRight, Scale } from "lucide-react";
import Link from "next/link";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { PageHeader } from "@/components/layout/page-header";
import { BrandMotif } from "@/components/marketing/brand-motif";
import { DownloadCard } from "@/components/marketing/download-card";
import { FaqList } from "@/components/marketing/faq-list";
import { DeviceScreen } from "@/components/media/device-screen";
import { BreadcrumbData } from "@/components/seo/breadcrumb-data";
import { StructuredData } from "@/components/seo/structured-data";
import {
  Box,
  Centered,
  Grid,
  HStack,
  ReadableContent,
  VStack,
} from "@/components/ui/layout";
import { FeatureGuideList } from "@/features/feature-guides/components/feature-guide-list";
import {
  type FeatureGroupId,
  featureGuides,
  featuresHubUpdatedAt,
  getFeatureGroups,
} from "@/features/feature-guides/data/feature-guides";
import {
  type GuideScreenKey,
  getGuideScreen,
} from "@/features/feature-guides/data/guide-screens";
import { ServiceFeatureList } from "@/features/services/components/service-feature-list";
import { ServiceJumpNav } from "@/features/services/components/service-jump-nav";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { formatContentDate } from "@/lib/format-content-date";
import { localizedPath } from "@/lib/public-routes";
import { SITE_URL } from "@/lib/seo";

const groupLeadScreens: Record<FeatureGroupId, GuideScreenKey> = {
  plan: "todo-home",
  memo: "memo-list",
  friends: "nudge-banner",
  daily: "reminder-inbox",
  me: "customize-app-icon",
};

const pillClass =
  "inline-flex h-11 items-center rounded-full bg-card px-4 text-caption font-semibold text-gray-9 shadow-press-soft transition-colors hover:bg-brand-soft hover:text-brand-deep";

export function FeaturesHubPage({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const hub = messages.featureHub;
  const guides = messages.featureGuides;
  const groups = getFeatureGroups();
  return (
    <>
      <BreadcrumbData locale={locale} path="/features" title={hub.title} />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: hub.title,
          itemListElement: featureGuides.map((guide, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: guides.guides[guide.slug].title,
            url: `${SITE_URL}/${locale}${guide.path}`,
          })),
        }}
      />
      <MarketingLayout locale={locale} path="/features">
        <ReadableContent render={<VStack gap={8} />} className="pt-8 md:pt-14">
          <PageHeader
            locale={locale}
            kicker={hub.kicker}
            title={hub.title}
            description={hub.description}
          >
            <p className="text-caption text-gray-8">
              {guides.updatedLabel}{" "}
              <time dateTime={featuresHubUpdatedAt}>
                {formatContentDate(featuresHubUpdatedAt, locale)}
              </time>
            </p>
          </PageHeader>
          <HStack
            render={<nav aria-label={hub.groupsLabel} />}
            wrap="wrap"
            gap={2}
          >
            {groups.map(({ id }) => (
              <a key={id} href={`#group-${id}`} className={pillClass}>
                {hub.groups[id].title}
              </a>
            ))}
            <a href="#screens" className={pillClass}>
              {hub.screensTitle}
            </a>
          </HStack>
        </ReadableContent>

        <ReadableContent
          render={<section aria-labelledby="summary-title" />}
          className="mt-section-sm"
        >
          <VStack
            gap={6}
            className="relative overflow-hidden rounded-3xl bg-brand-soft p-6 sm:p-10"
          >
            <BrandMotif
              motif="paw"
              className="absolute -top-2 right-4 size-20 rotate-12 text-brand/10 sm:right-10"
            />
            <h2 id="summary-title" className="text-display-md text-ink">
              {hub.summaryTitle}
            </h2>
            <Grid render={<ol />} columns={3} gap={4}>
              {hub.summary.map((item, index) => (
                <VStack
                  key={item.title}
                  render={<li />}
                  gap={3}
                  className="rounded-xl bg-card p-5 shadow-card"
                >
                  <Centered className="size-10 rounded-full bg-brand font-display text-title text-primary-foreground shadow-press-brand">
                    {index + 1}
                  </Centered>
                  <h3 className="text-title text-ink">{item.title}</h3>
                  <p className="text-gray-9">{item.body}</p>
                </VStack>
              ))}
            </Grid>
          </VStack>
        </ReadableContent>

        <ReadableContent render={<VStack gap={20} />} className="mt-section">
          {groups.map((group, index) => {
            const text = hub.groups[group.id];
            const lead = getGuideScreen(locale, groupLeadScreens[group.id]);
            return (
              <Box
                key={group.id}
                render={
                  <section
                    id={`group-${group.id}`}
                    aria-labelledby={`group-${group.id}-title`}
                  />
                }
                className="grid scroll-mt-24 gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12"
              >
                <VStack gap={3} className="lg:sticky lg:top-24 lg:self-start">
                  <HStack align="center" gap={2} className="text-brand-deep">
                    <span className="font-display text-title-lg tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <BrandMotif motif="paw" className="size-4" />
                  </HStack>
                  <p className="font-hand text-hand-lg text-brand-deep">
                    {text.hand}
                  </p>
                  <h2
                    id={`group-${group.id}-title`}
                    className="-mt-1 text-display-md text-ink"
                  >
                    {text.title}
                  </h2>
                  <p className="text-gray-9">{text.body}</p>
                  <Box className="mt-4 hidden w-44 lg:block">
                    <DeviceScreen
                      device={lead.device}
                      src={lead.src}
                      width={lead.width}
                      height={lead.height}
                      alt=""
                      sizes="176px"
                    />
                  </Box>
                </VStack>
                <FeatureGuideList
                  locale={locale}
                  guides={group.guides}
                  placement="features_hub"
                  columns={2}
                  className="content-start"
                />
              </Box>
            );
          })}
        </ReadableContent>

        <ReadableContent
          render={<section id="screens" aria-labelledby="screens-title" />}
          className="mt-section scroll-mt-24"
        >
          <VStack gap={5} className="mb-12">
            <h2 id="screens-title" className="text-display-md text-ink">
              {hub.screensTitle}
            </h2>
            <p className="max-w-reading text-body-lg text-gray-9">
              {hub.screensDescription}
            </p>
            <p className="text-caption text-gray-8">
              {messages.services.screenshotNote}
            </p>
            <ServiceJumpNav locale={locale} />
          </VStack>
          <ServiceFeatureList locale={locale} />
        </ReadableContent>

        <ReadableContent
          render={<section aria-labelledby="compare-title" />}
          className="mt-section"
        >
          <HStack
            data-surface="inverse"
            wrap="wrap"
            align="center"
            justify="between"
            gap={6}
            className="rounded-3xl bg-ink p-6 text-cream sm:p-10"
          >
            <VStack gap={3} className="max-w-reading">
              <HStack align="center" gap={3}>
                <Scale
                  aria-hidden="true"
                  className="size-10 rounded-lg bg-brand p-2 text-ink"
                />
                <h2 id="compare-title" className="text-display-md">
                  {hub.compareTitle}
                </h2>
              </HStack>
              <p className="text-body-lg opacity-85">{hub.compareBody}</p>
            </VStack>
            <Link
              href={localizedPath(locale, "/compare")}
              className="inline-flex h-14 items-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground shadow-press-brand transition-transform hover:-translate-y-px active:translate-y-0.5 active:shadow-none"
            >
              {hub.compareLink}
              <ArrowRight aria-hidden="true" className="size-5" />
            </Link>
          </HStack>
        </ReadableContent>

        <ReadableContent
          render={<section aria-labelledby="faq-title" />}
          size="narrow"
          className="mt-section"
        >
          <h2 id="faq-title" className="mb-8 text-display-md text-ink">
            {guides.faqTitle}
          </h2>
          <FaqList items={hub.faq} />
        </ReadableContent>

        <ReadableContent className="mt-section-sm">
          <DownloadCard locale={locale} />
        </ReadableContent>
      </MarketingLayout>
    </>
  );
}
