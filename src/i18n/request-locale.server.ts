import { cookies, headers } from "next/headers";
import { isLocale, type Locale, localeCookieName } from "./config";
import { getPreferredLocale } from "./request-locale";

export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const localeFromHeader = headerStore.get("x-locale") ?? "";

  if (isLocale(localeFromHeader)) {
    return localeFromHeader;
  }

  return getPreferredLocale({
    cookieLocale: cookieStore.get(localeCookieName)?.value,
    acceptLanguage: headerStore.get("accept-language"),
  });
}
