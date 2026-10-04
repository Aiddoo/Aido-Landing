import { featureGuides } from "@/data/feature-guides";
import type { Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/seo";

const paths = new Set([
  "",
  "/patch-notes",
  "/terms",
  "/privacy",
  ...featureGuides.map((guide) => guide.path),
]);
const campaignKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

// Only known public pages and campaign slugs can reach analytics. Never forward
// arbitrary query strings, fragments, emails, tokens or unknown route segments.
export function getAnalyticsPage(rawUrl: string, locale: Locale) {
  const url = new URL(rawUrl, SITE_URL);
  const path = url.pathname
    .replace(/^\/(ko|en)(?=\/|$)/, "")
    .replace(/\/$/, "");
  if (!paths.has(path)) return null;
  const pagePath = `/${locale}${path}`;
  const location = new URL(pagePath, SITE_URL);
  for (const key of campaignKeys) {
    const value = url.searchParams.get(key);
    if (value && /^[a-zA-Z0-9_-]{1,100}$/.test(value))
      location.searchParams.set(key, value);
  }
  return {
    page_location: location.href,
    page_path: pagePath,
    page_type: path.startsWith("/features/")
      ? "feature_guide"
      : path === ""
        ? "home"
        : path.slice(1).replaceAll("-", "_"),
    site_locale: locale,
    feature_slug: featureGuides.find((guide) => guide.path === path)?.slug,
  };
}

export function getAnalyticsReferrer(rawUrl: string) {
  if (!rawUrl) return "";
  try {
    const url = new URL(rawUrl);
    if (!/^https?:$/.test(url.protocol)) return "";
    // External referrers may contain private paths. The origin is sufficient
    // for acquisition attribution; internal navigation uses our sanitized URL.
    return url.origin;
  } catch {
    return "";
  }
}

export const CONSENT_KEY = "aido.analytics-consent.v1";
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export type AnalyticsConsent = "accepted" | "rejected" | "pending";

export function readAnalyticsConsent(
  value: string | null,
  now = Date.now(),
): AnalyticsConsent {
  try {
    const saved = JSON.parse(value ?? "null");
    if (
      (saved?.choice === "accepted" || saved?.choice === "rejected") &&
      typeof saved.expiresAt === "number" &&
      saved.expiresAt > now &&
      saved.expiresAt <= now + CONSENT_MAX_AGE
    )
      return saved.choice;
  } catch {
    // Storage can be unavailable or contain older/corrupt values.
  }
  return "pending";
}
