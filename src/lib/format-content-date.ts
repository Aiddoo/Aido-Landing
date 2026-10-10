import type { Locale } from "@/i18n/config";
export function formatContentDate(
  date: string,
  locale: Locale,
  monthOnly = false,
) {
  return new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", {
    year: "numeric",
    month: "long",
    ...(monthOnly ? {} : { day: "numeric" }),
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
