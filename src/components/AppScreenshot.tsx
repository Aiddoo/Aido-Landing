import Image from "next/image";
import type { ComponentProps } from "react";
import {
  type AppScreenshotKey,
  getAppScreenshot,
} from "@/data/app-screenshots";
import type { Locale } from "@/i18n/config";

type AppScreenshotProps = Omit<
  ComponentProps<typeof Image>,
  "src" | "width" | "height" | "fill" | "overrideSrc"
> & {
  locale: Locale;
  screenshot: AppScreenshotKey;
};

export function AppScreenshot({
  locale,
  screenshot,
  ...props
}: AppScreenshotProps) {
  const { src, width, height } = getAppScreenshot(locale, screenshot);
  return <Image src={src} width={width} height={height} {...props} />;
}
