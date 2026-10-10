import type {
  AnalyticsEvent,
  AnalyticsPage,
} from "../schemas/analytics.schema";

export interface AnalyticsAdapter {
  readonly id: string;
  readonly supportedEvents: readonly AnalyticsEvent["name"][];
  initialize(page: AnalyticsPage, signal: AbortSignal): Promise<void>;
  pageView(page: AnalyticsPage): void;
  track(event: AnalyticsEvent, page: AnalyticsPage): void;
  revoke(): { requiresReload: boolean };
  dispose(): void;
}
