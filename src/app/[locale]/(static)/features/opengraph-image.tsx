import { getGuideScreen } from "@/features/feature-guides/data/guide-screens";
import { locales } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "아이두(Aido) 기능 소개";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const { featureHub } = getMessages(locale);
  return renderOgImage({
    locale,
    kicker: featureHub.kicker,
    title: featureHub.title,
    description: featureHub.description,
    screenSrc: getGuideScreen(locale, "todo-home").src,
  });
}
