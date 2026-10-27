import { analyticsEventSchema } from "../schemas/analytics.schema";

export function parseAnalyticsAttributes(dataset: DOMStringMap) {
  if (dataset.analytics == null) return null;
  try {
    const input: unknown = JSON.parse(dataset.analytics);
    const result = analyticsEventSchema.safeParse(input);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
