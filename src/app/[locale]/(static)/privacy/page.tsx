import type { Metadata } from "next";
import { LegalPage } from "@/features/legal/pages/legal-page";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = PageProps<"/[locale]/privacy">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const messages = getMessages(locale);

  return buildPageMetadata({
    locale,
    title: messages.legal.privacyTitle,
    description: messages.legal.privacyDescription,
    path: "/privacy",
  });
}

export default async function Page({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  return <LegalPage locale={locale} document="privacy" />;
}
