import { getGuideScreen } from "@/features/feature-guides/data/guide-screens";
import { releaseNotes } from "@/features/updates/data/patch-notes";
import { getReleaseHighlightByVersion } from "@/features/updates/data/release-highlights";
import { getReleaseScreen } from "@/features/updates/data/release-screens";
import { locales } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "아이두(Aido) 패치노트";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 최신 앱 출시를 보여 주므로 새 버전을 배포하면 이미지와 해시 URL이 함께 바뀐다.
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const { patchNotes } = getMessages(locale);
  const [latest] = releaseNotes;
  const highlightScreen = getReleaseHighlightByVersion(latest.version)
    ?.sections[0]?.screens[0];
  return renderOgImage({
    locale,
    kicker: patchNotes.title,
    title: `${patchNotes.appUpdate} v${latest.version}`,
    description: latest.summary[locale],
    screenSrc: highlightScreen
      ? getReleaseScreen(locale, highlightScreen.key).src
      : getGuideScreen(locale, "todo-home").src,
  });
}
