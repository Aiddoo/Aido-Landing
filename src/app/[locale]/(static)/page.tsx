import type { Metadata } from "next";
import { LandingPage } from "@/features/landing/pages/landing-page";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { buildPageMetadata } from "@/lib/seo";

type LocaleHomePageProps = PageProps<"/[locale]">;
export async function generateMetadata({
  params,
}: LocaleHomePageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const { meta } = getMessages(locale);
  return buildPageMetadata({
    locale,
    title: meta.title,
    description: meta.description,
    path: "",
    socialTitle: meta.openGraphTitle,
    socialDescription: meta.openGraphDescription,
  });
}

export default async function Page({ params }: LocaleHomePageProps) {
  const locale = resolveLocale((await params).locale);
  return <LandingPage locale={locale} />;
}
