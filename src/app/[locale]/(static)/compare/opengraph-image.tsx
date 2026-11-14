import { getGuideScreen } from "@/features/feature-guides/data/guide-screens";
import { locales } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "아이두(Aido) 할 일 앱 비교";
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
  const { compare } = getMessages(locale);
  return renderOgImage({
    locale,
    kicker: compare.kicker,
    title: compare.title,
    description: compare.chooseTitle,
    screenSrc: getGuideScreen(locale, "nudge-banner").src,
  });
}
