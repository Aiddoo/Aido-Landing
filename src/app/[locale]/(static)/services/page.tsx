import type { Metadata } from "next";
import { ServicesPage } from "@/features/services/pages/services-page";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { buildPageMetadata } from "@/lib/seo";

type ServicesPageProps = PageProps<"/[locale]/services">;

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const content = getMessages(locale).services;
  return buildPageMetadata({
    locale,
    path: "/services",
    title: content.title,
    description: content.description,
  });
}

export default async function Page({ params }: ServicesPageProps) {
  const locale = resolveLocale((await params).locale);
  return <ServicesPage locale={locale} />;
}
