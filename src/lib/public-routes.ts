import { featureGuides } from "@/features/feature-guides/data/feature-guides";
import type { Locale } from "@/i18n/config";
export const publicPaths = [
  "",
  "/services",
  "/patch-notes",
  "/terms",
  "/privacy",
  ...featureGuides.map((guide) => guide.path),
] as const;
export type PublicPath = (typeof publicPaths)[number];
export function getPublicPath(pathname: string): PublicPath | null {
  const path = pathname.replace(/^\/(ko|en)(?=\/|$)/, "").replace(/\/$/, "");
  return publicPaths.find((item) => item === path) ?? null;
}
export function localizedPath(
  locale: Locale,
  path: PublicPath,
): `/${Locale}${PublicPath}` {
  return `/${locale}${path}`;
}
export function sanitizeAnchor(hash: string) {
  return /^#[a-zA-Z][a-zA-Z0-9_-]{0,100}$/.test(hash) ? hash : "";
}
