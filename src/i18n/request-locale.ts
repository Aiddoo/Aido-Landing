import { defaultLocale, isLocale, type Locale } from "./config";

function normalizeTag(tag: string): string {
  return tag.toLowerCase().split("-")[0]?.trim() ?? "";
}

function localeFromAcceptLanguage(
  acceptLanguage: string | null | undefined,
): Locale | null {
  if (!acceptLanguage) {
    return null;
  }

  const parts = acceptLanguage.split(",").map((item) => item.trim());

  for (const part of parts) {
    const [languageTag] = part.split(";");
    const normalized = normalizeTag(languageTag);

    if (isLocale(normalized)) {
      return normalized;
    }
  }

  return null;
}

export function getPreferredLocale(input: {
  cookieLocale?: string | null;
  acceptLanguage?: string | null;
}): Locale {
  const cookieLocale = input.cookieLocale?.toLowerCase() ?? "";
  if (isLocale(cookieLocale)) {
    return cookieLocale;
  }

  return localeFromAcceptLanguage(input.acceptLanguage) ?? defaultLocale;
}
