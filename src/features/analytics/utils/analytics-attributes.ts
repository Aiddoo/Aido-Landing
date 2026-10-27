import type { AnalyticsEvent } from "../schemas/analytics.schema";

// Server Component 링크도 클라이언트 경계 없이 track()에 이벤트를 넘기도록 data 속성에 싣는다.
export function analyticsAttributes(event: AnalyticsEvent) {
  return { "data-analytics": JSON.stringify(event) };
}
