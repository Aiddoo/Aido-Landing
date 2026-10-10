import type { AnalyticsAdapter } from "../models/analytics-adapter";
import type {
  AnalyticsConfig,
  AnalyticsPage,
} from "../schemas/analytics.schema";
export type VercelConfig = Extract<
  AnalyticsConfig["providers"][number],
  { id: "vercel" }
>;
export interface VercelTransport {
  pageView(page: AnalyticsPage): void;
  dispose(): void;
}
export interface VercelPlatform {
  initialize(
    config: VercelConfig,
    signal: AbortSignal,
  ): Promise<VercelTransport>;
}
export function createVercelAdapter(
  config: VercelConfig,
  platform: VercelPlatform,
): AnalyticsAdapter {
  let transport: VercelTransport | undefined;
  return {
    id: "vercel",
    supportedEvents: [],
    async initialize(_page, signal) {
      transport = await platform.initialize(config, signal);
    },
    pageView(page) {
      transport?.pageView(page);
    },
    track() {
      /* Basic Vercel Analytics collects page views only. */
    },
    revoke() {
      transport?.dispose();
      return { requiresReload: true };
    },
    dispose() {
      transport?.dispose();
      transport = undefined;
    },
  };
}
