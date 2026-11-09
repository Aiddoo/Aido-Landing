import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getReleaseHighlight,
  releaseHighlights,
} from "@/features/updates/data/release-highlights";
import { ReleaseHighlightsPage } from "@/features/updates/pages/release-highlights-page";
import { resolveLocale } from "@/i18n/resolve-locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = PageProps<"/[locale]/patch-notes/[slug]">;

export const dynamicParams = false;

export function generateStaticParams() {
  return releaseHighlights.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const highlight = getReleaseHighlight(slug);
  if (!highlight) notFound();
  return buildPageMetadata({
    locale,
    path: highlight.path,
    title: highlight.metaTitle[locale],
    description: highlight.description[locale],
  });
}

export default async function Page({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const highlight = getReleaseHighlight(slug);
  if (!highlight) notFound();
  return <ReleaseHighlightsPage locale={locale} highlight={highlight} />;
}
