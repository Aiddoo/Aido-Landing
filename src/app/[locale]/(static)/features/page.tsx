import type { Metadata } from "next";
import { FeaturesHubPage } from "@/features/feature-guides/pages/features-hub-page";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = PageProps<"/[locale]/features">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const { featureHub } = getMessages(locale);
  return buildPageMetadata({
    locale,
    title: featureHub.metaTitle,
    description: featureHub.description,
    path: "/features",
    ownImage: true,
  });
}

export default async function Page({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  return <FeaturesHubPage locale={locale} />;
}
