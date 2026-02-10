import { redirect } from "next/navigation";
import { getRequestLocale } from "@/i18n/request-locale.server";

export default async function TermsRedirectPage() {
  const locale = await getRequestLocale();
  redirect(`/${locale}/terms`);
}
