import { zip } from "es-toolkit";
import { Check } from "lucide-react";
import { getAppScreenshot } from "@/components/media/data/app-screenshots";
import { PhoneScreenshot } from "@/components/media/phone-screenshot";
import { badgeVariants } from "@/components/ui/badge";
import {
  Box,
  Grid,
  HStack,
  ListRow,
  Stack,
  VStack,
  type VStackProps,
} from "@/components/ui/layout";
import { serviceFeatures } from "@/features/services/data/service-features";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { cn } from "@/lib/utils";

export type ServiceFeatureListProps = Omit<
  VStackProps,
  "children" | "render"
> & {
  locale: Locale;
};

/** 서비스 기능마다 설명과 실제 iOS·Android 화면을 번갈아 보여 준다. */
export function ServiceFeatureList({
  locale,
  className,
  ...props
}: ServiceFeatureListProps) {
  const content = getMessages(locale).services;
  return (
    <VStack gap={20} className={cn("md:gap-28", className)} {...props}>
      {serviceFeatures.map((feature, index) => {
        const text = content.features[feature.id];
        return (
          <Stack
            key={feature.id}
            data-motion-section
            render={
              <section
                id={feature.id}
                aria-labelledby={`${feature.id}-title`}
              />
            }
            direction="column-to-row"
            align="center"
            gap={10}
            className={cn(
              "md:gap-16",
              index % 2 === 1 && "md:flex-row-reverse",
            )}
          >
            <VStack gap={4} className="flex-1">
              {("premium" in feature || "sample" in feature) && (
                <HStack gap={2}>
                  {"premium" in feature && (
                    <span className={badgeVariants({ variant: "soft" })}>
                      {content.premiumLabel}
                    </span>
                  )}
                  {"sample" in feature && (
                    <span className={badgeVariants({ variant: "secondary" })}>
                      {content.sampleLabel}
                    </span>
                  )}
                </HStack>
              )}
              <h2
                id={`${feature.id}-title`}
                className="text-display-md text-ink"
              >
                {text.title}
              </h2>
              <p className="text-body-lg text-gray-9">{text.description}</p>
              <VStack render={<ul />} gap={2}>
                {text.details.map((detail) => (
                  <ListRow
                    key={detail}
                    render={<li />}
                    leftAlignment="top"
                    verticalPadding="small"
                    className="items-start"
                    left={
                      <Check
                        aria-hidden="true"
                        className="mt-1 size-4 text-brand-deep"
                      />
                    }
                    contents={<span className="text-gray-9">{detail}</span>}
                  />
                ))}
              </VStack>
            </VStack>
            <Grid
              render={<ul />}
              gap={4}
              className={cn(
                "w-full grid-cols-2 md:w-auto md:flex-1",
                feature.screenshots.length === 3 && "grid-cols-3",
              )}
            >
              {zip([...feature.screenshots], text.captions).map(
                ([screenshot, caption]) => {
                  const image = getAppScreenshot(locale, screenshot);
                  const platformLabel =
                    image.platform === "ios"
                      ? content.iosLabel
                      : content.androidLabel;
                  return (
                    <Box key={screenshot} render={<li />} className="min-w-0">
                      <VStack render={<figure />} gap={3}>
                        <PhoneScreenshot
                          src={image.src}
                          width={image.width}
                          height={image.height}
                          alt={`${platformLabel} · ${caption}`}
                          sizes="(min-width: 1024px) 220px, (min-width: 768px) 30vw, 45vw"
                          className="rounded-[1.75rem] p-1"
                        />
                        <figcaption className="text-center text-micro text-gray-8">
                          <span className="block font-semibold text-gray-9">
                            {platformLabel}
                          </span>
                          {caption}
                        </figcaption>
                      </VStack>
                    </Box>
                  );
                },
              )}
            </Grid>
          </Stack>
        );
      })}
    </VStack>
  );
}
