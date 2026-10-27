import type { BeforeSend } from "@vercel/analytics";
import { featureGuides } from "@/features/feature-guides/data/feature-guides";
import { type Locale, locales } from "@/i18n/config";
import { getPublicPath } from "@/lib/public-routes";
import { sanitizeCampaign } from "@/lib/sanitize-campaign";
import { SITE_URL } from "@/lib/seo";
import { analyticsPageSchema } from "../schemas/analytics.schema";

// 주소에 언어가 있으면 그 언어로, /와 /i/{코드}처럼 없으면 화면 언어로 집계한다.
export function getAnalyticsPage(rawUrl: string, fallbackLocale: Locale) {
  try {
    const url = new URL(rawUrl, SITE_URL);
    if (!/^https?:$/.test(url.protocol)) return null;
    const path = getPublicPath(url.pathname);
    if (path === null) return null;
    const prefix = url.pathname.split("/")[1];
    const locale = locales.find((item) => item === prefix) ?? fallbackLocale;
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
// Vercel은 실제 주소를 보내므로 초대 코드·임의 쿼리를 지운 공개 경로로 바꾸고, 알 수 없는 경로와 연속된 같은 페이지뷰는 버린다.
export function createVercelBeforeSend(fallbackLocale: Locale): BeforeSend {
  let previousPageView = "";
  return (event) => {
    const page = getAnalyticsPage(event.url, fallbackLocale);
    if (page == null) return null;
    if (event.type === "pageview") {
      if (page.location === previousPageView) return null;
      previousPageView = page.location;
    }
    return { ...event, url: page.location };
  };
}
