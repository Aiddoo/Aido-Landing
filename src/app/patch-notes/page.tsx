import { redirect } from "next/navigation";
import { getRequestLocale } from "@/i18n/request-locale.server";

export default async function PatchNotesRedirectPage() {
  const locale = await getRequestLocale();
  redirect(`/${locale}/patch-notes`);
}
