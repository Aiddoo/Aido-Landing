import { notFound } from "next/navigation";
import { releaseNotes } from "@/features/updates/data/patch-notes";
import {
  getReleaseHighlight,
  releaseHighlights,
} from "@/features/updates/data/release-highlights";
import { getReleaseScreen } from "@/features/updates/data/release-screens";
import { locales } from "@/i18n/config";
import { resolveLocale } from "@/i18n/resolve-locale";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "아이두(Aido) 업데이트 소개";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    releaseHighlights.map(({ slug }) => ({ locale, slug })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const highlight = getReleaseHighlight(slug);
  const release = releaseNotes.find(
    (item) => item.version === highlight?.version,
  );
  if (!highlight || !release) notFound();
  const [firstSection] = highlight.sections;
  if (!firstSection?.screens[0]) notFound();
  return renderOgImage({
    locale,
    kicker: highlight.kicker[locale],
    title: highlight.title[locale],
    description: release.summary[locale],
    screenSrc: getReleaseScreen(locale, firstSection.screens[0].key).src,
  });
}
