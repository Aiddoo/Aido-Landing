import { Check } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { match } from "ts-pattern";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { PageHeader } from "@/components/layout/page-header";
import { BrandMotif } from "@/components/marketing/brand-motif";
import { DownloadCard } from "@/components/marketing/download-card";
import { FaqList } from "@/components/marketing/faq-list";
import { BreadcrumbData } from "@/components/seo/breadcrumb-data";
import { badgeVariants } from "@/components/ui/badge";
import {
  Box,
  Centered,
  Grid,
  HStack,
  ListRow,
  ReadableContent,
  VStack,
} from "@/components/ui/layout";
import { FeatureGuideList } from "@/features/feature-guides/components/feature-guide-list";
import { GuideScreens } from "@/features/feature-guides/components/guide-screens";
import { PawBoard } from "@/features/feature-guides/components/paw-board";
import type { FeatureGuide } from "@/features/feature-guides/data/feature-guides";
import type { Locale } from "@/i18n/config";
import {
  type FriendInviteGuideContent,
  getMessages,
  type MessageCatalog,
} from "@/i18n/messages";
import { formatContentDate } from "@/lib/format-content-date";
import { localizedPath } from "@/lib/public-routes";

type GuideLabels = MessageCatalog["featureGuides"];
type GuideContent = GuideLabels["guides"][FeatureGuide["slug"]];

export function FeatureGuidePage({
  locale,
  guide,
}: {
  locale: Locale;
  guide: FeatureGuide;
}) {
  const labels = getMessages(locale).featureGuides;
  const content = labels.guides[guide.slug];
  return (
    <>
      <BreadcrumbData locale={locale} path={guide.path} title={content.title} />
      <MarketingLayout locale={locale} path={guide.path}>
        <ReadableContent
          render={<article />}
          className="grid grid-cols-[minmax(0,1fr)] gap-10 pt-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-16 md:pt-14"
        >
          <PageHeader
            locale={locale}
            kicker={content.kicker}
            title={content.title}
            description={content.summary}
            breadcrumbs={[
              {
                label: labels.breadcrumbLabel,
                anchorHref: `/${locale}#guides`,
              },
            ]}
          >
            <p className="text-caption text-gray-8">
              {labels.updatedLabel}{" "}
              <time dateTime={guide.updatedAt}>
                {formatContentDate(guide.updatedAt, locale)}
              </time>
            </p>
          </PageHeader>
          <Box
            render={<aside />}
            className="lg:col-start-2 lg:row-span-2 lg:row-start-1"
          >
            <VStack gap={3}>
              <HStack
                align="center"
                gap={2}
                className="text-brand-deep"
                aria-hidden="true"
              >
                <BrandMotif motif="paw" className="size-4" />
                <span className="font-hand text-hand">{labels.screenNote}</span>
              </HStack>
              <GuideScreens locale={locale} guide={guide} />
            </VStack>
          </Box>
          <VStack gap={16} className="min-w-0 lg:col-start-1 lg:row-start-2">
            <GuideSteps content={content} labels={labels} />
            <GuideExample content={content} labels={labels} />
            {match(guide.slug)
              .with("friend-invite", () => (
                <GuideRewards
                  locale={locale}
                  content={labels.guides["friend-invite"]}
                  labels={labels}
                />
              ))
              .with("shared-todo", "recurring-todo", "ai-todo", (slug) => (
                <GuidePlans plans={labels.guides[slug].plans} labels={labels} />
              ))
              .exhaustive()}
            <GuideDetails content={content}>
              {guide.slug === "friend-invite" && (
                <PawBoard
                  stamped={5}
                  label={labels.pawBoardLabel}
                  className="w-full max-w-72 justify-self-center rounded-2xl bg-card p-5 shadow-card sm:max-w-none sm:justify-self-stretch"
                />
              )}
            </GuideDetails>
            <VStack render={<section aria-labelledby="faq-title" />} gap={6}>
              <h2 id="faq-title" className="text-display-md text-ink">
                {labels.faqTitle}
              </h2>
              <FaqList items={content.faq} />
            </VStack>
          </VStack>
        </ReadableContent>
        <ReadableContent
          render={<section aria-labelledby="related-guides-title" />}
          className="mt-section"
        >
          <VStack gap={3} className="mb-8">
            <h2 id="related-guides-title" className="text-display-md text-ink">
              {labels.relatedTitle}
            </h2>
            <p className="text-gray-9">{labels.relatedDescription}</p>
          </VStack>
          <FeatureGuideList
            locale={locale}
            exclude={guide.slug}
            placement="related_guides"
          />
        </ReadableContent>
        <ReadableContent className="mt-section-sm">
          <DownloadCard locale={locale} />
        </ReadableContent>
      </MarketingLayout>
    </>
  );
}

interface GuideBlockProps {
  content: GuideContent;
  labels: GuideLabels;
}

function GuideSteps({ content, labels }: GuideBlockProps) {
  return (
    <VStack render={<section aria-labelledby="steps-title" />} gap={8}>
      <h2 id="steps-title" className="text-display-md text-ink">
        {labels.stepsTitle}
      </h2>
      <VStack render={<ol />}>
        {content.steps.map((step, index) => (
          <ListRow
            key={step.title}
            render={<li />}
            leftAlignment="top"
            verticalPadding="small"
            className="group relative items-start gap-5 pb-8 last:pb-0"
            left={
              <>
                <Centered className="relative z-1 size-12 rounded-full bg-brand font-display text-title-lg text-primary-foreground shadow-press-brand">
                  {index + 1}
                </Centered>
                <Box
                  aria-hidden="true"
                  className="absolute top-14 bottom-2 left-6 border-l-2 border-dashed border-brand/35 group-last:hidden"
                />
              </>
            }
            contents={
              <VStack gap={2} className="pt-2">
                <h3 className="text-title text-ink">{step.title}</h3>
                <p className="text-gray-9">{step.body}</p>
              </VStack>
            }
          />
        ))}
      </VStack>
    </VStack>
  );
}

function GuideExample({ content, labels }: GuideBlockProps) {
  return (
    <VStack
      render={<section aria-labelledby="example-title" />}
      gap={5}
      className="rounded-3xl bg-brand-soft p-6 sm:p-8"
    >
      <h2 id="example-title" className="text-display-md text-ink">
        {labels.exampleTitle}
      </h2>
      <p className="text-body-lg text-gray-10">
        {content.example.introduction}
      </p>
      <VStack render={<ul />} gap={3}>
        {content.example.items.map((item) => (
          <ListRow
            key={item}
            render={<li />}
            leftAlignment="top"
            verticalPadding="small"
            className="items-start rounded-xl bg-card px-4 py-3"
            left={
              <Check
                aria-hidden="true"
                className="mt-1 size-4 text-brand-deep"
              />
            }
            contents={<span className="text-ink">{item}</span>}
          />
        ))}
      </VStack>
      <p className="text-caption text-gray-8">{content.example.note}</p>
    </VStack>
  );
}

function GuidePlans({
  plans,
  labels,
}: {
  plans: { free: string; premium: string };
  labels: GuideLabels;
}) {
  return (
    <VStack render={<section aria-labelledby="plans-title" />} gap={6}>
      <h2 id="plans-title" className="text-display-md text-ink">
        {labels.plansTitle}
      </h2>
      <Grid render={<dl />} columns={2} gap={4}>
        <VStack gap={3} className="rounded-xl bg-card p-6 shadow-card">
          <dt className="text-title text-ink">{labels.freeLabel}</dt>
          <dd className="text-gray-9">{plans.free}</dd>
        </VStack>
        <VStack
          gap={3}
          className="rounded-xl bg-card p-6 shadow-card ring-2 ring-brand/40"
        >
          <dt>
            <span
              className={badgeVariants({
                variant: "soft",
                className: "h-7 px-3 text-caption",
              })}
            >
              {labels.premiumLabel}
            </span>
          </dt>
          <dd className="text-gray-9">{plans.premium}</dd>
        </VStack>
      </Grid>
      <p className="text-caption text-gray-8">{labels.plansNote}</p>
    </VStack>
  );
}

function GuideRewards({
  locale,
  content,
  labels,
}: {
  locale: Locale;
  content: FriendInviteGuideContent;
  labels: GuideLabels;
}) {
  const { rewards } = content;
  return (
    <VStack render={<section aria-labelledby="rewards-title" />} gap={6}>
      <h2 id="rewards-title" className="text-display-md text-ink">
        {labels.rewardsTitle}
      </h2>
      <Grid render={<ul />} columns={2} gap={4}>
        {rewards.items.map((item, index) => (
          <VStack
            key={item.who}
            render={<li />}
            gap={3}
            className="rounded-xl bg-card p-6 shadow-card"
          >
            <span
              className={badgeVariants({
                variant: index === 0 ? "fish" : "soft",
                className: "h-7 px-3 text-caption",
              })}
            >
              {item.who}
            </span>
            <p className="font-semibold text-gray-9">{item.when}</p>
            <p className="font-display text-display-md text-brand-deep">
              {item.reward}
            </p>
            <p className="text-caption text-gray-8">{item.condition}</p>
          </VStack>
        ))}
      </Grid>
      <VStack
        gap={4}
        className="rounded-xl border border-dashed border-brand/40 p-6"
      >
        <h3 className="text-title text-ink">{labels.rewardsLimitsTitle}</h3>
        <VStack render={<ul />} gap={2}>
          {rewards.limits.map((limit) => (
            <ListRow
              key={limit}
              render={<li />}
              leftAlignment="top"
              verticalPadding="small"
              className="items-start"
              left={
                <BrandMotif motif="paw" className="mt-1 size-3.5 text-bone" />
              }
              contents={<span className="text-gray-9">{limit}</span>}
            />
          ))}
        </VStack>
        <p className="text-caption text-gray-8">
          {rewards.termsNote}{" "}
          <Link
            href={localizedPath(locale, "/terms")}
            className="font-semibold text-brand-deep underline underline-offset-4"
          >
            {rewards.termsLink}
          </Link>
        </p>
      </VStack>
    </VStack>
  );
}

function GuideDetails({
  content,
  children,
}: {
  content: GuideContent;
  children?: ReactNode;
}) {
  return (
    <Grid columns={2} gap={4} align="start">
      {content.details.map((detail) => (
        <VStack
          key={detail.title}
          render={<section />}
          gap={3}
          className="rounded-xl bg-card p-6 shadow-card"
        >
          <h2 className="text-title-lg text-ink">{detail.title}</h2>
          <p className="text-gray-9">{detail.body}</p>
        </VStack>
      ))}
      {children}
    </Grid>
  );
}
