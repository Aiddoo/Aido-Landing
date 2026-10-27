import { zip } from "es-toolkit";
import { DeviceScreen } from "@/components/media/device-screen";
import { Box, Stack, type StackProps, VStack } from "@/components/ui/layout";
import type { FeatureGuide } from "@/features/feature-guides/data/feature-guides";
import { getGuideScreen } from "@/features/feature-guides/data/guide-screens";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { cn } from "@/lib/utils";

export type GuideScreensProps = Omit<StackProps, "children" | "render"> & {
  locale: Locale;
  guide: FeatureGuide;
};

/** 가이드의 실제 앱 화면. 좁은 화면은 옆으로 넘기고, 넓은 화면은 세로로 쌓는다. */
export function GuideScreens({
  locale,
  guide,
  className,
  ...props
}: GuideScreensProps) {
  const messages = getMessages(locale).featureGuides;
  const copy = messages.guides[guide.slug].screens;
  return (
    <Stack
      render={<ul aria-label={messages.screenNote} />}
      gap={6}
      className={cn(
        "-mx-gutter snap-x snap-mandatory flex-row overflow-x-auto px-gutter pb-4 scrollbar-hide lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0",
        className,
      )}
      {...props}
    >
      {zip(guide.screens, copy).map(([screen, text], index) => (
        <Box
          key={screen}
          render={<li />}
          className="w-[62%] shrink-0 snap-center sm:w-60 lg:w-full"
        >
          <VStack render={<figure />} gap={3}>
            <DeviceScreen
              {...getGuideScreen(locale, screen)}
              alt={text.alt}
              sizes="(min-width: 640px) 288px, 62vw"
              preload={index === 0}
            />
            <figcaption className="text-center text-caption text-gray-8">
              {text.caption}
            </figcaption>
          </VStack>
        </Box>
      ))}
    </Stack>
  );
}
