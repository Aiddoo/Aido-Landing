import type { Locale } from "@/i18n/config";
import type { AnalyticsClient } from "../runtime/create-analytics-client";
import { parseAnalyticsAttributes } from "../utils/parse-analytics-attributes";
import { getAnalyticsPage } from "../utils/sanitize-analytics-page";

export function bindAnalyticsClicks(client: AnalyticsClient, locale: Locale) {
  function onClick(event: MouseEvent) {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>(
      "a[data-analytics-event]",
    );
    if (!link) return;
    const page = getAnalyticsPage(window.location.href, locale);
    const action = parseAnalyticsAttributes(link.dataset);
    if (page && action) {
      client.pageView(page);
      client.track(action);
    }
  }
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
