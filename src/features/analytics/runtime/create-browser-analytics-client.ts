import { match } from "ts-pattern";
import { createGa4Adapter } from "../adapters/ga4-adapter";
import { createVercelAdapter } from "../adapters/vercel-adapter";
import {
  browserGooglePlatform,
  createBrowserVercelPlatform,
} from "../browser/browser-analytics-platform";
import type {
  AnalyticsConfig,
  AnalyticsConsent,
} from "../schemas/analytics.schema";
import { createAnalyticsClient } from "./create-analytics-client";

export function createBrowserAnalyticsClient(
  config: AnalyticsConfig,
  getConsent: () => AnalyticsConsent,
) {
  return createAnalyticsClient({
    getConsent,
    adapters: config.providers.map((provider) =>
      match(provider)
        .with({ id: "ga4" }, (value) =>
          createGa4Adapter(value.measurementId, browserGooglePlatform),
        )
        .with({ id: "vercel" }, (value) =>
          createVercelAdapter(value, createBrowserVercelPlatform(getConsent)),
        )
        .exhaustive(),
    ),
  });
}
