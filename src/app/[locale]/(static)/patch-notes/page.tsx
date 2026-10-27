import type { Metadata } from "next";
import { PatchNotesPage } from "@/features/updates/pages/patch-notes-page";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = PageProps<"/[locale]/patch-notes">;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const { patchNotes } = getMessages(locale);
  return buildPageMetadata({
    locale,
    title: patchNotes.title,
    description: patchNotes.description,
    path: "/patch-notes",
  });
}

export default async function Page({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  return <PatchNotesPage locale={locale} />;
}
