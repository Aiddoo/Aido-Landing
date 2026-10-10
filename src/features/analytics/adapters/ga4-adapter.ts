import { match } from "ts-pattern";
import type { AnalyticsAdapter } from "../models/analytics-adapter";
import type {
  AnalyticsEvent,
  AnalyticsPage,
} from "../schemas/analytics.schema";

export type GoogleParameters = Record<string, string | boolean>;
export interface GoogleTransport {
  pageView(params: GoogleParameters): void;
  event(
    name: "download_click" | "select_content" | "language_switch",
    params: GoogleParameters,
  ): void;
  revoke(): void;
}
export interface GooglePlatform {
  initialize(
    measurementId: string,
    page: AnalyticsPage,
    signal: AbortSignal,
  ): Promise<GoogleTransport>;
}
function pageParameters(page: AnalyticsPage): GoogleParameters {
  return {
    page_location: page.location,
    page_path: page.path,
    page_type: page.type,
    site_locale: page.locale,
    ...(page.featureSlug ? { feature_slug: page.featureSlug } : {}),
  };
}
export function createGa4Adapter(
  measurementId: string,
  platform: GooglePlatform,
): AnalyticsAdapter {
  let transport: GoogleTransport | undefined;
  return {
    id: "ga4",
    supportedEvents: [
      "download_click",
      "feature_guide_click",
      "language_switch",
    ],
    async initialize(page, signal) {
      transport = await platform.initialize(measurementId, page, signal);
    },
    pageView(page) {
      transport?.pageView(pageParameters(page));
    },
    track(event: AnalyticsEvent, page) {
      const action = match(event)
        .with({ name: "download_click" }, (value) => ({
          name: "download_click" as const,
          params: { store: value.store, cta_placement: value.placement },
        }))
        .with({ name: "feature_guide_click" }, (value) => ({
          name: "select_content" as const,
          params: {
            content_type: "feature_guide",
            item_id: value.slug,
            cta_placement: value.placement,
          },
        }))
        .with({ name: "language_switch" }, (value) => ({
          name: "language_switch" as const,
          params: { target_locale: value.targetLocale },
        }))
        .exhaustive();
      transport?.event(action.name, {
        ...pageParameters(page),
        ...action.params,
        transport_type: "beacon",
      });
    },
    revoke() {
      transport?.revoke();
      return { requiresReload: true };
    },
    dispose() {
      transport = undefined;
    },
  };
}
