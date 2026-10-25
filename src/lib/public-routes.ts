import { featureGuides } from "@/features/feature-guides/data/feature-guides";
import type { Locale } from "@/i18n/config";
import { INVITE_LINK_PATTERN } from "./invite-link";
export const publicPaths = [
  "",
  "/services",
  "/patch-notes",
  "/terms",
  "/privacy",
  "/account-deletion",
  "/invite",
  ...featureGuides.map((guide) => guide.path),
] as const;
export type PublicPath = (typeof publicPaths)[number];
// 초대 링크 /i/{코드}는 코드를 버리고 /invite 한 경로로만 집계한다.
export function getPublicPath(pathname: string): PublicPath | null {
  if (INVITE_LINK_PATTERN.test(pathname)) return "/invite";
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
