import * as z from "zod/mini";
import { featureGuides } from "@/features/feature-guides/data/feature-guides";
import { locales } from "@/i18n/config";
import { localizedPath, publicPaths } from "@/lib/public-routes";

export const localeSchema = z.enum(["ko", "en"]);
export const featureSlugSchema = z.enum(
  featureGuides.map((guide) => guide.slug),
);
export const analyticsEventSchema = z.discriminatedUnion("name", [
  z.strictObject({
    name: z.literal("download_click"),
    store: z.enum(["app_store", "google_play"]),
    placement: z.enum(["hero", "download"]),
  }),
  z.strictObject({
    name: z.literal("feature_guide_click"),
    slug: featureSlugSchema,
    placement: z.enum(["home_guides", "related_guides"]),
  }),
  z.strictObject({
    name: z.literal("language_switch"),
    targetLocale: localeSchema,
  }),
]);
export const analyticsPageSchema = z.strictObject({
  location: z.url(),
  path: z.enum(
    locales.flatMap((locale) =>
      publicPaths.map((path) => localizedPath(locale, path)),
    ),
  ),
  type: z.enum([
    "home",
    "services",
    "feature_guide",
    "patch_notes",
    "terms",
    "privacy",
  ]),
  locale: localeSchema,
  featureSlug: z.optional(featureSlugSchema),
});
export const consentRecordSchema = z.strictObject({
  choice: z.enum(["accepted", "rejected"]),
  expiresAt: z.number(),
});
export const analyticsConfigSchema = z.strictObject({
  providers: z
    .array(
      z.discriminatedUnion("id", [
        z.strictObject({
          id: z.literal("ga4"),
          measurementId: z.string().check(z.regex(/^G-[A-Z0-9]+$/)),
        }),
        z.strictObject({
          id: z.literal("vercel"),
          configuration: z.optional(z.string()),
          basePath: z.optional(z.string()),
        }),
      ]),
    )
    .check(
      z.refine(
        (providers) =>
          new Set(providers.map((provider) => provider.id)).size ===
          providers.length,
        "Duplicate analytics providers",
      ),
    ),
});
export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;
export type AnalyticsPage = z.infer<typeof analyticsPageSchema>;
export type AnalyticsConfig = z.infer<typeof analyticsConfigSchema>;
export type ConsentChoice = z.infer<typeof consentRecordSchema>["choice"];
export type AnalyticsConsent = ConsentChoice | "pending";
