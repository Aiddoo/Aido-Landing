import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  featureGuides,
  getFeatureGuide,
} from "@/features/feature-guides/data/feature-guides";
import { FeatureGuidePage } from "@/features/feature-guides/pages/feature-guide-page";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = PageProps<"/[locale]/features/[slug]">;

export const dynamicParams = false;

export function generateStaticParams() {
  return featureGuides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const guide = getFeatureGuide(slug);
  if (!guide) notFound();
  const content = getMessages(locale).featureGuides.guides[guide.slug];
  return buildPageMetadata({
    locale,
    path: guide.path,
    title: content.title,
    description: content.summary,
  });
}

export default async function Page({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const guide = getFeatureGuide(slug);
  if (!guide) notFound();
  return <FeatureGuidePage locale={locale} guide={guide} />;
}
