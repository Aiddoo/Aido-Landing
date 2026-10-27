import type { GuideScreenKey } from "./guide-screens";

// Keep routes, screenshots and real editorial dates shared by SSG and the sitemap.
// Update updatedAt only when the corresponding guide's content changes.
// screens는 화면에 보이는 순서이고, 문구의 screens 설명(alt·caption)과 같은 순서다.
export const featureGuides = [
  {
    slug: "shared-todo",
    path: "/features/shared-todo",
    updatedAt: "2026-10-27",
    screens: ["friend-feed", "todo-nudge"],
  },
  {
    slug: "recurring-todo",
    path: "/features/recurring-todo",
    updatedAt: "2026-10-27",
    screens: ["repeat-edit", "home-widgets"],
  },
  {
    slug: "ai-todo",
    path: "/features/ai-todo",
    updatedAt: "2026-10-27",
    screens: ["voice-add", "memo-ai"],
  },
  {
    slug: "friend-invite",
    path: "/features/friend-invite",
    updatedAt: "2026-10-27",
    screens: ["invite-home", "paw-board", "invite-card"],
  },
] as const satisfies ReadonlyArray<{
  slug: string;
  path: `/features/${string}`;
  updatedAt: string;
  screens: readonly GuideScreenKey[];
}>;

export type FeatureGuide = (typeof featureGuides)[number];
export type FeatureGuideSlug = FeatureGuide["slug"];

export function getFeatureGuide(slug: string) {
  return featureGuides.find((guide) => guide.slug === slug);
}
