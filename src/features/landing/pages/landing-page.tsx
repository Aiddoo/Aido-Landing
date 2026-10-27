import Image from "next/image";
import Link from "next/link";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { BrandMotif } from "@/components/marketing/brand-motif";
import { DownloadCard } from "@/components/marketing/download-card";
import { FaqList } from "@/components/marketing/faq-list";
import { StoreButtons } from "@/components/marketing/store-buttons";
import {
  HOME_CAT_SIZE,
  homeCatImages,
} from "@/components/media/data/home-screens";
import { DeviceScreen } from "@/components/media/device-screen";
import { Badge } from "@/components/ui/badge";
import {
  Box,
  Centered,
  Grid,
  HStack,
  ReadableContent,
  VStack,
} from "@/components/ui/layout";
import { FeatureGuideList } from "@/features/feature-guides/components/feature-guide-list";
import { AiTodoExample } from "@/features/landing/components/ai-todo-example";
import { DeviceShowcase } from "@/features/landing/components/device-showcase";
import { DoneSticker } from "@/features/landing/components/done-sticker";
import { DuoUnfold } from "@/features/landing/components/duo-unfold";
import { GuideLink } from "@/features/landing/components/guide-link";
import {
  FaqPageData,
  MobileApplicationData,
} from "@/features/landing/components/home-structured-data";
import { InviteRewardReceipt } from "@/features/landing/components/invite-reward-receipt";
import { NudgeBubble } from "@/features/landing/components/nudge-bubble";
import { PawBoardCard } from "@/features/landing/components/paw-board-card";
import { PawTrail } from "@/features/landing/components/paw-trail";
import { PhoneFan } from "@/features/landing/components/phone-fan";
import { PremiumBenefitList } from "@/features/landing/components/premium-benefit-list";
import { SectionKicker } from "@/features/landing/components/section-kicker";
import { SupportedDeviceList } from "@/features/landing/components/supported-device-list";
import { nudgeCats } from "@/features/landing/data/home-cats";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { localizedPath } from "@/lib/public-routes";

const PHONE_SIZES = "(min-width: 1024px) 288px, min(72vw, 288px)";
const SIDE_PHONE_SIZES = "(min-width: 1024px) 220px, 0px";

export function LandingPage({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const { home } = messages;
  return (
    <>
      <MobileApplicationData locale={locale} />
      <FaqPageData locale={locale} />
      <MarketingLayout
        locale={locale}
        path=""
        className="overflow-x-clip selection:bg-brand/25"
      >
        <ReadableContent
          render={<section id="top" aria-labelledby="hero-title" />}
          className="grid items-center gap-14 pt-32 pb-section-sm lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-40"
        >
          <VStack
            align="center"
            gap={6}
            className="text-center lg:items-start lg:text-left"
          >
            <Link
              href={localizedPath(locale, "/patch-notes")}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-4 text-caption font-semibold shadow-card transition-colors hover:bg-brand-soft"
            >
              <Box
                render={<span />}
                aria-hidden="true"
                className="size-2 rounded-full bg-brand"
              />
              {home.hero.release}
            </Link>
            <h1
              id="hero-title"
              data-hero="title"
              className="w-full text-display-xl max-md:[&:lang(en)]:min-h-[3.36em]"
            >
              <span className="block">{home.hero.titleLead}</span>
              <span className="block">{home.hero.titleTail}</span>
            </h1>
            <p
              data-hero="description"
              className="max-w-[34rem] text-body-lg text-gray-9"
            >
              {home.hero.description}
            </p>
            <Box data-hero="downloads" className="w-full">
              <StoreButtons
                content={messages.storeButtons}
                placement="hero"
                className="mx-auto lg:mx-0"
              />
            </Box>
            <p className="text-caption text-muted-foreground">
              {home.hero.note}
            </p>
          </VStack>
          <Centered className="relative py-6">
            <Box
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 aspect-square w-[min(110%,34rem)] -translate-1/2 rounded-full bg-brand-soft"
            />
            <PawTrail className="absolute inset-0" />
            <DeviceScreen
              locale={locale}
              screen="today"
              alt={home.hero.screenAlt}
              sizes={PHONE_SIZES}
              preload
              fetchPriority="high"
              className="relative w-[min(72vw,18rem)]"
            />
            <Box className="absolute top-[14%] -left-1 -rotate-3 sm:left-[4%] lg:-left-[4%]">
              <NudgeBubble
                data-motion-ornament
                catSrc={nudgeCats.dubu}
                name={home.hero.nudgeName}
                text={home.hero.nudgeText}
              />
            </Box>
            <Box className="absolute right-0 bottom-[22%] rotate-2 sm:right-[6%] lg:-right-[2%]">
              <DoneSticker data-motion-ornament text={home.hero.doneNote} />
            </Box>
            <Image
              src={homeCatImages.hi}
              alt=""
              {...HOME_CAT_SIZE}
              sizes="(min-width: 1024px) 176px, 32vw"
              className="absolute bottom-0 -left-2 w-[32vw] max-w-44 sm:left-[8%] lg:left-[2%]"
            />
          </Centered>
        </ReadableContent>

        <ReadableContent
          render={<section id="features" aria-labelledby="ai-title" />}
          data-motion-group
          className="grid items-center gap-12 py-section lg:grid-cols-2 lg:gap-16"
        >
          <VStack
            gap={6}
            className="items-center text-center lg:items-start lg:text-left"
          >
            <SectionKicker className="-mb-3">{home.ai.kicker}</SectionKicker>
            <h2 id="ai-title" data-motion="title" className="text-display-lg">
              {home.ai.title}
            </h2>
            <p className="max-w-[34rem] text-body-lg text-gray-9">
              {home.ai.description}
            </p>
            <AiTodoExample locale={locale} className="max-w-md" />
            <HStack
              gap={2}
              wrap="wrap"
              className="justify-center lg:justify-start"
            >
              <GuideLink
                href={localizedPath(locale, "/features/ai-todo")}
                slug="ai-todo"
              >
                {home.ai.guideLink}
              </GuideLink>
              <GuideLink
                href={localizedPath(locale, "/features/recurring-todo")}
                slug="recurring-todo"
              >
                {home.ai.repeatGuideLink}
              </GuideLink>
            </HStack>
          </VStack>
          <PhoneFan
            center={
              <DeviceScreen
                locale={locale}
                screen="ai-voice"
                alt={home.ai.voiceAlt}
                sizes={PHONE_SIZES}
                className="w-[min(72vw,18rem)]"
              />
            }
            start={
              <DeviceScreen
                locale={locale}
                screen="ai-parse"
                alt={home.ai.parseAlt}
                sizes={SIDE_PHONE_SIZES}
              />
            }
            end={
              <DeviceScreen
                locale={locale}
                screen="repeat"
                alt={home.ai.repeatAlt}
                sizes={SIDE_PHONE_SIZES}
              />
            }
          />
        </ReadableContent>

        <ReadableContent
          render={<section id="friends" aria-labelledby="friends-title" />}
          data-motion-group
          className="grid items-center gap-12 py-section lg:grid-cols-2 lg:gap-16"
        >
          <Centered className="relative lg:order-first">
            <Box className="absolute top-[8%] left-[6%] hidden w-[220px] -rotate-6 lg:block">
              <DeviceScreen
                locale={locale}
                screen="nudge-detail"
                alt={home.friends.nudgeAlt}
                sizes={SIDE_PHONE_SIZES}
              />
            </Box>
            <DeviceScreen
              locale={locale}
              screen="friend-feed"
              alt={home.friends.feedAlt}
              sizes={PHONE_SIZES}
              className="relative w-[min(72vw,18rem)] lg:ml-[28%]"
            />
            <Box className="absolute bottom-[12%] left-0 rotate-2 sm:left-[8%] lg:left-[4%]">
              <NudgeBubble
                data-motion="float"
                catSrc={nudgeCats.cheese}
                name={home.friends.nudgeName}
                text={home.friends.nudgeText}
              />
            </Box>
          </Centered>
          <VStack
            gap={6}
            className="order-first items-center text-center lg:order-none lg:items-start lg:text-left"
          >
            <SectionKicker className="-mb-3">
              {home.friends.kicker}
            </SectionKicker>
            <h2
              id="friends-title"
              data-motion="title"
              className="text-display-lg"
            >
              {home.friends.title}
            </h2>
            <p className="max-w-[34rem] text-body-lg text-gray-9">
              {home.friends.description}
            </p>
            <HStack
              gap={2}
              wrap="wrap"
              className="justify-center lg:justify-start"
            >
              <GuideLink
                href={localizedPath(locale, "/features/shared-todo")}
                slug="shared-todo"
              >
                {home.friends.guideLink}
              </GuideLink>
            </HStack>
          </VStack>
        </ReadableContent>

        <ReadableContent
          render={<section id="invite" aria-labelledby="invite-title" />}
          data-motion-group
          className="py-section-sm"
        >
          <VStack
            gap={12}
            className="rounded-[2.5rem] bg-brand-soft px-4 py-section-sm sm:px-10 lg:px-14"
          >
            <VStack align="center" gap={5} className="text-center">
              <Badge className="h-7 px-3 text-caption font-semibold">
                {home.invite.badge}
              </Badge>
              <SectionKicker className="-mb-3">
                {home.invite.kicker}
              </SectionKicker>
              <h2
                id="invite-title"
                data-motion="title"
                className="text-display-lg"
              >
                {home.invite.title}
              </h2>
              <p className="max-w-[38rem] text-body-lg text-gray-9">
                {home.invite.description}
              </p>
            </VStack>
            <Grid
              align="center"
              className="gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8"
            >
              <Box className="relative mx-auto w-full max-w-lg pt-16 lg:max-w-none lg:pt-0">
                <Image
                  src={homeCatImages.hi}
                  alt=""
                  {...HOME_CAT_SIZE}
                  sizes="112px"
                  className="absolute top-0 right-6 w-28 lg:-top-[4.5rem]"
                />
                <InviteRewardReceipt locale={locale} className="relative" />
              </Box>
              <Centered className="relative">
                <Box className="absolute top-[6%] left-[18%] hidden w-[86%] rotate-6 lg:block">
                  <DeviceScreen
                    locale={locale}
                    screen="paw-board-full"
                    alt={home.invite.fullBoardAlt}
                    sizes="(min-width: 1024px) 236px, 0px"
                  />
                </Box>
                <DeviceScreen
                  locale={locale}
                  screen="paw-board"
                  alt={home.invite.boardAlt}
                  sizes={PHONE_SIZES}
                  className="relative w-[min(72vw,17rem)]"
                />
              </Centered>
              <PawBoardCard
                locale={locale}
                className="mx-auto w-full max-w-md lg:max-w-none"
              />
            </Grid>
            <Centered>
              <Link
                href={localizedPath(locale, "/features/friend-invite")}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-cream shadow-press-ink transition-transform hover:-translate-y-0.5"
              >
                <BrandMotif motif="paw" className="size-5 text-brand" />
                {home.invite.guideLink}
              </Link>
            </Centered>
          </VStack>
        </ReadableContent>

        <ReadableContent
          render={
            <section id="large-screen" aria-labelledby="large-screen-title" />
          }
          data-motion-group
          className="py-section-sm"
        >
          <VStack
            gap={16}
            data-surface="inverse"
            className="rounded-[2.5rem] bg-ink px-5 py-section-sm text-cream sm:px-10 lg:px-14"
          >
            <VStack align="center" gap={5} className="text-center">
              <Badge className="h-7 px-3 text-caption font-semibold">
                {home.largeScreen.badge}
              </Badge>
              <SectionKicker className="-mb-3 text-brand">
                {home.largeScreen.kicker}
              </SectionKicker>
              <h2
                id="large-screen-title"
                data-motion="title"
                className="text-display-lg text-cream"
              >
                {home.largeScreen.title}
              </h2>
              <p className="max-w-[36rem] text-body-lg text-cream/75">
                {home.largeScreen.description}
              </p>
            </VStack>
            <DuoUnfold
              locale={locale}
              className="mx-auto w-full max-w-[660px]"
            />
            <Grid columns={2} gap={6}>
              <HStack
                align="center"
                gap={4}
                data-motion="float"
                className="rounded-3xl bg-cream/6 p-5 sm:gap-6 sm:p-6"
              >
                <DeviceScreen
                  locale={locale}
                  screen="ipad-detail"
                  tone="graphite"
                  alt={home.largeScreen.ipadAlt}
                  sizes="(min-width: 640px) 176px, 40vw"
                  className="w-[40%] max-w-44 shrink-0"
                />
                <VStack gap={2}>
                  <h3 className="text-title-lg text-cream">
                    {home.largeScreen.ipadTitle}
                  </h3>
                  <p className="text-body text-cream/75">
                    {home.largeScreen.ipadDescription}
                  </p>
                </VStack>
              </HStack>
              <HStack
                align="center"
                gap={4}
                data-motion="float"
                className="rounded-3xl bg-cream/6 p-5 sm:gap-6 sm:p-6"
              >
                <DeviceScreen
                  locale={locale}
                  screen="widgets"
                  tone="graphite"
                  alt={home.largeScreen.widgetAlt}
                  sizes="(min-width: 640px) 128px, 32vw"
                  className="w-[32%] max-w-32 shrink-0"
                />
                <VStack gap={2}>
                  <h3 className="text-title-lg text-cream">
                    {home.largeScreen.widgetTitle}
                  </h3>
                  <p className="text-body text-cream/75">
                    {home.largeScreen.widgetDescription}
                  </p>
                </VStack>
              </HStack>
            </Grid>
          </VStack>
        </ReadableContent>

        <ReadableContent
          render={<section id="devices" aria-labelledby="devices-title" />}
          data-motion-group
          className="py-section"
        >
          <VStack align="center" gap={5} className="text-center">
            <SectionKicker className="-mb-3">
              {home.devices.kicker}
            </SectionKicker>
            <h2
              id="devices-title"
              data-motion="title"
              className="text-display-lg"
            >
              {home.devices.title}
            </h2>
            <p className="max-w-[34em] text-body-lg text-balance text-gray-9 [&:lang(en)]:max-w-[40ch]">
              {home.devices.description}
            </p>
          </VStack>
          <DeviceShowcase
            locale={locale}
            className="mx-auto mt-14 max-w-[64rem]"
          />
          <SupportedDeviceList locale={locale} className="mt-14" />
          <p className="mt-8 text-center text-caption text-muted-foreground">
            {home.devices.note}
          </p>
        </ReadableContent>

        <ReadableContent
          render={<section id="reports" aria-labelledby="routine-title" />}
          data-motion-group
          className="py-section"
        >
          <SectionKicker className="mb-3 justify-center">
            {home.routine.kicker}
          </SectionKicker>
          <h2
            id="routine-title"
            data-motion="title"
            className="mx-auto max-w-[40rem] text-center text-display-lg"
          >
            {home.routine.title}
          </h2>
          <Grid columns={2} className="mx-auto mt-14 max-w-[56rem] gap-14">
            <VStack align="center" gap={6} className="text-center">
              <DeviceScreen
                locale={locale}
                screen="report"
                alt={home.routine.reportAlt}
                sizes={PHONE_SIZES}
                className="w-[min(64vw,16rem)]"
              />
              <VStack align="center" gap={2}>
                <HStack align="center" justify="center" gap={2} wrap="wrap">
                  <h3 className="text-title-lg">{home.routine.reportTitle}</h3>
                  <Badge>{home.routine.premiumLabel}</Badge>
                </HStack>
                <p className="max-w-[24rem] text-body text-gray-9">
                  {home.routine.reportDescription}
                </p>
              </VStack>
            </VStack>
            <VStack align="center" gap={6} className="text-center">
              <DeviceScreen
                locale={locale}
                screen="reminders"
                alt={home.routine.reminderAlt}
                sizes={PHONE_SIZES}
                className="w-[min(64vw,16rem)]"
              />
              <VStack align="center" gap={2}>
                <h3 className="text-title-lg">{home.routine.reminderTitle}</h3>
                <p className="max-w-[24rem] text-body text-gray-9">
                  {home.routine.reminderDescription}
                </p>
              </VStack>
            </VStack>
          </Grid>
        </ReadableContent>

        <ReadableContent
          render={<section id="premium" aria-labelledby="premium-title" />}
          data-motion-group
          className="grid gap-10 py-section-sm lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
        >
          <VStack
            gap={5}
            className="items-center text-center lg:items-start lg:text-left"
          >
            <SectionKicker className="-mb-2">
              {home.premium.kicker}
            </SectionKicker>
            <h2
              id="premium-title"
              data-motion="title"
              className="text-display-lg"
            >
              {home.premium.title}
            </h2>
            <p className="text-body-lg text-gray-9">
              {home.premium.description}
            </p>
            <p className="text-caption text-muted-foreground">
              {home.premium.note}
            </p>
            <Image
              src={homeCatImages.note}
              alt=""
              {...HOME_CAT_SIZE}
              sizes="160px"
              className="mt-4 hidden w-40 lg:block"
            />
          </VStack>
          <PremiumBenefitList
            locale={locale}
            className="rounded-3xl bg-paper px-6 py-2 shadow-card sm:px-8"
          />
        </ReadableContent>

        <ReadableContent
          render={<section id="faq" aria-labelledby="faq-title" />}
          size="narrow"
          className="py-section"
        >
          <VStack align="center" gap={4} className="text-center">
            <h2 id="faq-title" className="text-display-lg">
              {messages.faq.title}
            </h2>
            <p className="text-body-lg text-gray-9">
              {messages.faq.description}
            </p>
          </VStack>
          <FaqList items={messages.faq.items} className="mt-10" />
        </ReadableContent>

        <ReadableContent
          render={<section id="guides" aria-labelledby="guides-title" />}
          className="pb-section"
        >
          <h2 id="guides-title" className="text-center text-display-md">
            {messages.featureGuides.title}
          </h2>
          <FeatureGuideList
            locale={locale}
            placement="home_guides"
            columns={4}
            className="mt-10"
          />
        </ReadableContent>

        <ReadableContent className="pb-section">
          <DownloadCard id="download" locale={locale} />
        </ReadableContent>
      </MarketingLayout>
    </>
  );
}
