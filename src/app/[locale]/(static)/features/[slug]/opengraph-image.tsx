import { notFound } from "next/navigation";
import {
  featureGuides,
  getFeatureGuide,
} from "@/features/feature-guides/data/feature-guides";
import { getGuideScreen } from "@/features/feature-guides/data/guide-screens";
import { locales } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "아이두(Aido) 기능 가이드";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    featureGuides.map(({ slug }) => ({ locale, slug })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const guide = getFeatureGuide(slug);
  if (!guide) notFound();
  const content = getMessages(locale).featureGuides.guides[guide.slug];
  return renderOgImage({
    locale,
    kicker: content.kicker,
    title: content.title,
    description: content.cardDescription,
    screenSrc: getGuideScreen(locale, guide.screens[0]).src,
  });
}
