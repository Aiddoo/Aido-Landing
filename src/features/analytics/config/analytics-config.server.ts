import "server-only";
import { z } from "zod";
import {
  type AnalyticsConfig,
  analyticsConfigSchema,
} from "../schemas/analytics.schema";

const providerNames = z.array(z.enum(["ga4", "vercel"]));
// Sole reader of analytics environment variables. Only validated public IDs reach RSC props.
export function getAnalyticsConfig(): AnalyticsConfig {
  if (process.env.VERCEL_ENV !== "production") return { providers: [] };
  const raw = process.env.ANALYTICS_PROVIDERS ?? "ga4,vercel";
  const names = providerNames.parse(
    raw === "none" ? [] : raw.split(",").map((value) => value.trim()),
  );
  const providers: AnalyticsConfig["providers"] = [];
  if (names.includes("ga4") && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)
    providers.push({
      id: "ga4",
      measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    });
  if (names.includes("vercel") && process.env.VERCEL === "1") {
    const configuration =
      process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG;
    if (configuration) {
      const input: unknown = JSON.parse(configuration);
      // Vercel's config belongs to the SDK; validate JSON shape, leave SDK fields intact.
      z.object({ analytics: z.object({}).loose().optional() })
        .loose()
        .parse(input);
    }
    const basePath = process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH;
    if (basePath)
      z.string()
        .regex(/^\/(?!\/)[a-zA-Z0-9/_-]*$/)
        .parse(basePath);
    providers.push({
      id: "vercel",
      ...(configuration ? { configuration } : {}),
      ...(basePath ? { basePath } : {}),
    });
  }
  return analyticsConfigSchema.parse({ providers });
}
