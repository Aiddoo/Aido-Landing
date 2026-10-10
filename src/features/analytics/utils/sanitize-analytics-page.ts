import { featureGuides } from "@/features/feature-guides/data/feature-guides";
import type { Locale } from "@/i18n/config";
import { getPublicPath } from "@/lib/public-routes";
import { sanitizeCampaign } from "@/lib/sanitize-campaign";
import { SITE_URL } from "@/lib/seo";
import { analyticsPageSchema } from "../schemas/analytics.schema";

export function getAnalyticsPage(rawUrl: string, locale: Locale) {
  try {
    const url = new URL(rawUrl, SITE_URL);
    if (!/^https?:$/.test(url.protocol)) return null;
    const path = getPublicPath(url.pathname);
    if (path === null) return null;
    const guide = featureGuides.find((item) => item.path === path);
    const type = guide
      ? "feature_guide"
      : path === ""
        ? "home"
        : path.slice(1).replaceAll("-", "_");
    const location = new URL(`/${locale}${path}`, SITE_URL);
    location.search = sanitizeCampaign(url.searchParams).toString();
    const result = analyticsPageSchema.safeParse({
      location: location.href,
      path: location.pathname,
      type,
      locale,
      ...(guide ? { featureSlug: guide.slug } : {}),
    });
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
export function getAnalyticsReferrer(rawUrl: string) {
  try {
    const url = new URL(rawUrl);
    return /^https?:$/.test(url.protocol) ? url.origin : "";
  } catch {
    return "";
  }
}
