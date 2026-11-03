import { zip } from "es-toolkit";
import {
  Bell,
  CalendarDays,
  Check,
  CloudRain,
  Gauge,
  Globe,
  type LucideProps,
  MoonStar,
  Sun,
  Thermometer,
  ThermometerSun,
  Umbrella,
  WifiOff,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { match } from "ts-pattern";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { PageHeader } from "@/components/layout/page-header";
import { BrandMotif } from "@/components/marketing/brand-motif";
import { DownloadCard } from "@/components/marketing/download-card";
import { FaqList } from "@/components/marketing/faq-list";
import { AutoplayVideo } from "@/components/media/autoplay-video";
import { appVideos } from "@/components/media/data/app-videos";
import { DeviceScreen } from "@/components/media/device-screen";
import { DeviceVideo } from "@/components/media/device-video";
import { BreadcrumbData } from "@/components/seo/breadcrumb-data";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge, badgeVariants } from "@/components/ui/badge";
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
import {
  getGuideScreen,
  weatherCaseScreens,
  weatherDeviceScreens,
} from "@/features/feature-guides/data/guide-screens";
import {
  commentStoryVideos,
  weatherSceneVideos,
} from "@/features/feature-guides/data/guide-videos";
import type { Locale } from "@/i18n/config";
import {
  type CommentsGuideContent,
  type FriendInviteGuideContent,
  getMessages,
  type MessageCatalog,
  type WeatherGuideContent,
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
              .with("weather", () => (
                <>
                  <WeatherLayout
                    content={labels.guides.weather}
                    labels={labels}
                  />
                  <WeatherScenes
                    locale={locale}
                    content={labels.guides.weather}
                    labels={labels}
                  />
                  <WeatherCases
                    locale={locale}
                    content={labels.guides.weather}
                    labels={labels}
                  />
                  <WeatherBriefing
                    content={labels.guides.weather}
                    labels={labels}
                  />
                  <WeatherDevices
                    locale={locale}
                    content={labels.guides.weather}
                    labels={labels}
                  />
                </>
              ))
              .with("comments", () => (
                <CommentStory
                  locale={locale}
                  content={labels.guides.comments}
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

interface WeatherBlockProps {
  content: WeatherGuideContent;
  labels: GuideLabels;
}

function WeatherLayout({ content, labels }: WeatherBlockProps) {
  return (
    <VStack render={<section aria-labelledby="layout-title" />} gap={6}>
      <h2 id="layout-title" className="text-display-md text-ink">
        {labels.layoutTitle}
      </h2>
      <VStack render={<ol />} gap={3}>
        {content.layout.map((item, index) => (
          <ListRow
            key={item.title}
            render={<li />}
            leftAlignment="top"
            verticalPadding="small"
            className="items-start gap-4 rounded-xl bg-card px-5 py-4 shadow-card"
            left={
              <Centered className="size-8 rounded-full bg-brand-soft font-display text-brand-deep">
                {index + 1}
              </Centered>
            }
            contents={
              <VStack gap={1}>
                <h3 className="text-title text-ink">{item.title}</h3>
                <p className="text-gray-9">{item.body}</p>
              </VStack>
            }
          />
        ))}
      </VStack>
    </VStack>
  );
}

/** 상황별 실제 화면. 좁은 화면은 화면과 설명을 나란히, 넓은 화면은 두 열 카드로 보여주고 홀수로 남은 마지막 카드는 한 줄을 채운다. */
function WeatherCases({
  locale,
  content,
  labels,
}: WeatherBlockProps & { locale: Locale }) {
  return (
    <VStack render={<section aria-labelledby="cases-title" />} gap={6}>
      <VStack gap={3}>
        <h2 id="cases-title" className="text-display-md text-ink">
          {labels.casesTitle}
        </h2>
        <p className="text-gray-9">{labels.casesDescription}</p>
      </VStack>
      <Grid render={<ol />} columns={2} gap={4}>
        {zip(weatherCaseScreens, content.cases).map(([screen, item]) => (
          <Box
            key={screen}
            render={<li />}
            className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-start gap-4 rounded-xl bg-card p-4 shadow-card sm:grid-cols-1 sm:gap-5 sm:p-6 sm:last:odd:col-span-2 sm:last:odd:grid-cols-[12rem_minmax(0,1fr)] sm:last:odd:items-center"
          >
            <DeviceScreen
              {...getGuideScreen(locale, screen)}
              alt={item.alt}
              sizes="(min-width: 640px) 192px, 120px"
              className="w-full sm:mx-auto sm:max-w-48"
            />
            <VStack gap={2}>
              <HStack align="center" gap={2}>
                <CaseIcon
                  screen={screen}
                  aria-hidden="true"
                  className="size-5 shrink-0 text-brand-deep"
                />
                <h3 className="text-title text-ink">{item.title}</h3>
              </HStack>
              <p className="text-gray-9">{item.body}</p>
              <VStack render={<ul />} gap={1} className="pt-1">
                {item.points.map((point) => (
                  <ListRow
                    key={point}
                    render={<li />}
                    leftAlignment="top"
                    verticalPadding="small"
                    className="items-start gap-2 py-0"
                    left={
                      <Check
                        aria-hidden="true"
                        className="mt-1 size-3.5 shrink-0 text-brand-deep"
                      />
                    }
                    contents={
                      <span className="text-caption text-gray-9">{point}</span>
                    }
                  />
                ))}
              </VStack>
            </VStack>
          </Box>
        ))}
      </Grid>
    </VStack>
  );
}

const caseIcons = {
  "weather-rain-briefing": CloudRain,
  "weather-rain-reschedule": Umbrella,
  "weather-heat-briefing": ThermometerSun,
  "weather-heat-reschedule": Thermometer,
  "weather-clear-day": Sun,
  "weather-abroad": Globe,
  "weather-daily-detail": CalendarDays,
  "weather-detail-tiles": Gauge,
  "weather-sun-air": MoonStar,
  "weather-offline": WifiOff,
  "weather-alerts": Bell,
} as const satisfies Record<(typeof weatherCaseScreens)[number], unknown>;

function CaseIcon({
  screen,
  ...props
}: LucideProps & { screen: (typeof weatherCaseScreens)[number] }) {
  const Icon = caseIcons[screen];
  return <Icon {...props} />;
}

/** 앱에서 녹화한 18가지 날씨 장면. 하늘 부분만 잘라 같은 크기의 타일로 반복 재생한다. */
function WeatherScenes({
  locale,
  content,
  labels,
}: WeatherBlockProps & { locale: Locale }) {
  const mediaLabels = getMessages(locale).media;
  return (
    <VStack render={<section aria-labelledby="scenes-title" />} gap={6}>
      <Box className="grid items-center gap-6 sm:grid-cols-[minmax(0,1fr)_11rem]">
        <VStack gap={3}>
          <h2 id="scenes-title" className="text-display-md text-ink">
            {labels.scenesTitle}
          </h2>
          <p className="text-gray-9">{labels.scenesDescription}</p>
        </VStack>
        <VStack render={<figure />} gap={2} className="mx-auto w-40 sm:w-44">
          <DeviceVideo
            locale={locale}
            video="weather-phone-thunderstorms"
            device="android"
            label={content.scenePhone.alt}
          />
          <figcaption className="text-center text-caption text-gray-8">
            {content.scenePhone.caption}
          </figcaption>
        </VStack>
      </Box>
      <Grid render={<ul />} columns={3} gap={3} className="grid-cols-2">
        {zip(weatherSceneVideos, content.scenes).map(([scene, text]) => {
          const video = appVideos[scene.video];
          return (
            <li key={scene.video} className="min-w-0">
              <VStack render={<figure />} gap={2}>
                <AspectRatio
                  ratio={video.width / video.height}
                  className="overflow-hidden rounded-xl bg-ink shadow-card"
                >
                  <AutoplayVideo
                    webm={video.webm}
                    mp4={video.mp4}
                    poster={video.poster}
                    aria-label={text.alt}
                    labels={mediaLabels}
                  />
                </AspectRatio>
                <HStack
                  render={<figcaption />}
                  align="center"
                  justify="between"
                  wrap="wrap"
                  gap={1}
                  className="px-1"
                >
                  <span className="min-w-0 text-caption font-semibold break-words text-ink">
                    {text.name}
                  </span>
                  <Badge
                    variant={scene.time === "night" ? "fish" : "soft"}
                    className="gap-1"
                  >
                    {scene.time === "night" ? (
                      <MoonStar aria-hidden="true" />
                    ) : (
                      <Sun aria-hidden="true" />
                    )}
                    {scene.time === "night"
                      ? labels.nightLabel
                      : labels.dayLabel}
                  </Badge>
                </HStack>
              </VStack>
            </li>
          );
        })}
      </Grid>
    </VStack>
  );
}

/** iPhone Duo·iPad처럼 넓은 화면의 날씨. 좁은 Duo와 넓은 iPad를 한 줄에 나란히 둔다. */
function WeatherDevices({
  locale,
  content,
  labels,
}: WeatherBlockProps & { locale: Locale }) {
  return (
    <VStack render={<section aria-labelledby="devices-title" />} gap={6}>
      <VStack gap={3}>
        <h2 id="devices-title" className="text-display-md text-ink">
          {labels.devicesTitle}
        </h2>
        <p className="text-gray-9">{labels.devicesDescription}</p>
      </VStack>
      <Box
        render={<ul />}
        className="grid items-end gap-8 rounded-3xl bg-brand-soft p-6 sm:grid-cols-[12rem_minmax(0,1fr)] sm:p-8"
      >
        {zip(weatherDeviceScreens, content.devices).map(([screen, item]) => (
          <VStack key={screen} render={<li />} gap={4}>
            <DeviceScreen
              {...getGuideScreen(locale, screen)}
              alt={item.alt}
              sizes={
                screen === "weather-ipad"
                  ? "(min-width: 1024px) 520px, 88vw"
                  : "(min-width: 640px) 192px, 60vw"
              }
              className={
                screen === "weather-ipad"
                  ? "w-full"
                  : "mx-auto w-[min(60vw,12rem)]"
              }
            />
            <VStack gap={1}>
              <h3 className="text-title text-ink">{item.name}</h3>
              <p className="text-caption text-gray-9">{item.body}</p>
            </VStack>
          </VStack>
        ))}
      </Box>
    </VStack>
  );
}

function WeatherBriefing({ content, labels }: WeatherBlockProps) {
  const { briefing } = content;
  return (
    <VStack render={<section aria-labelledby="briefing-title" />} gap={6}>
      <VStack gap={3}>
        <h2 id="briefing-title" className="text-display-md text-ink">
          {labels.briefingTitle}
        </h2>
        <p className="text-gray-9">{briefing.introduction}</p>
      </VStack>
      <Box className="overflow-x-auto rounded-xl bg-card shadow-card">
        <table className="w-full border-collapse text-left">
          <thead className="bg-brand-soft text-caption text-ink">
            <tr>
              <th scope="col" className="px-4 py-3 font-bold">
                {labels.briefingWhenLabel}
              </th>
              <th scope="col" className="px-4 py-3 font-bold">
                {labels.briefingShowsLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {briefing.rows.map((row, index) => (
              <tr key={row.when} className="border-b last:border-b-0">
                <th
                  scope="row"
                  className="w-2/5 px-4 py-4 align-top font-semibold text-ink"
                >
                  <span className="mr-2 font-display text-brand-deep">
                    {index + 1}
                  </span>
                  {row.when}
                </th>
                <td className="px-4 py-4 align-top text-gray-9">{row.shows}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
      <p className="text-caption text-gray-8">{briefing.note}</p>
    </VStack>
  );
}

/** 댓글 가이드의 실제 녹화. 좁은 화면은 영상과 설명을 나란히, 넓은 화면은 두 열 카드로 보여 준다. */
function CommentStory({
  locale,
  content,
  labels,
}: {
  locale: Locale;
  content: CommentsGuideContent;
  labels: GuideLabels;
}) {
  return (
    <VStack render={<section aria-labelledby="story-title" />} gap={6}>
      <VStack gap={3}>
        <h2 id="story-title" className="text-display-md text-ink">
          {labels.storyTitle}
        </h2>
        <p className="text-gray-9">{labels.storyDescription}</p>
      </VStack>
      <Grid render={<ol />} columns={2} gap={4}>
        {zip(commentStoryVideos, content.story).map(([video, item], index) => (
          <Box
            key={video}
            render={<li />}
            className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-start gap-4 rounded-xl bg-card p-4 shadow-card sm:grid-cols-1 sm:gap-5 sm:p-6"
          >
            <DeviceVideo
              locale={locale}
              video={video}
              device="iphone"
              label={item.alt}
              className="w-full sm:mx-auto sm:max-w-48"
            />
            <VStack gap={2}>
              <HStack align="center" gap={2}>
                <Centered className="size-7 shrink-0 rounded-full bg-brand-soft font-display text-brand-deep">
                  {index + 1}
                </Centered>
                <h3 className="text-title text-ink">{item.title}</h3>
              </HStack>
              <p className="text-gray-9">{item.body}</p>
            </VStack>
          </Box>
        ))}
      </Grid>
      <HStack align="center" gap={2} className="text-caption text-gray-8">
        <BrandMotif motif="paw" className="size-3.5 text-brand-deep" />
        {labels.videoNote}
      </HStack>
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
