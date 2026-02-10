import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";

export function resolveLocale(localeParam: string): Locale {
  if (!isLocale(localeParam)) {
    notFound();
  }

  return localeParam;
}
