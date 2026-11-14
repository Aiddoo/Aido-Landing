import type { Metadata } from "next";
import { ComparePage } from "@/features/compare/pages/compare-page";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = PageProps<"/[locale]/compare">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const { compare } = getMessages(locale);
  return buildPageMetadata({
    locale,
    title: compare.metaTitle,
    description: compare.description,
    path: "/compare",
    ownImage: true,
  });
}

export default async function Page({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  return <ComparePage locale={locale} />;
}
