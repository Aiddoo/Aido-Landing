import { track } from "../runtime/analytics-tracker";
import { parseAnalyticsAttributes } from "../utils/parse-analytics-attributes";

export function bindAnalyticsClicks() {
  function onClick(event: MouseEvent) {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLElement>("[data-analytics]");
    if (link == null) return;
    const action = parseAnalyticsAttributes(link.dataset);
    if (action != null) track(action);
  }
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
