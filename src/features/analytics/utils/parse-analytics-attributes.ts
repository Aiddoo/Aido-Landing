import { match } from "ts-pattern";
import { analyticsEventSchema } from "../schemas/analytics.schema";

export function parseAnalyticsAttributes(dataset: DOMStringMap) {
  const result = analyticsEventSchema.safeParse(
    match(dataset.analyticsEvent)
      .with("download_click", () => ({
        name: "download_click",
        store: dataset.store,
        placement: dataset.placement,
      }))
      .with("feature_guide_click", () => ({
        name: "feature_guide_click",
        slug: dataset.featureSlug,
        placement: dataset.placement,
      }))
      .with("language_switch", () => ({
        name: "language_switch",
        targetLocale: dataset.targetLocale,
      }))
      .otherwise(() => null),
  );
  return result.success ? result.data : null;
}
