import { getHomeScreen } from "@/components/media/data/home-screens";
import { locales } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

// 이미지 Route Handler는 레이아웃의 generateStaticParams를 물려받지 않아 언어를 직접 정한다.
export const alt = "아이두(Aido), 친구와 함께 끝내는 AI 투두 플래너";
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
  const { meta, home } = getMessages(locale);
  return renderOgImage({
    locale,
    kicker: meta.ogKicker,
    title: `${home.hero.titleLead}\n${home.hero.titleTail}`,
    description: meta.openGraphDescription,
    screenSrc: getHomeScreen(locale, "today").src,
  });
}
