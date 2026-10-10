import { match } from "ts-pattern";
import type { AnalyticsEvent } from "../schemas/analytics.schema";

export function analyticsAttributes(event: AnalyticsEvent) {
  return match(event)
    .with({ name: "download_click" }, (value) => ({
      "data-analytics-event": value.name,
      "data-store": value.store,
      "data-placement": value.placement,
    }))
    .with({ name: "feature_guide_click" }, (value) => ({
      "data-analytics-event": value.name,
      "data-feature-slug": value.slug,
      "data-placement": value.placement,
    }))
    .with({ name: "language_switch" }, (value) => ({
      "data-analytics-event": value.name,
      "data-target-locale": value.targetLocale,
    }))
    .exhaustive();
}
