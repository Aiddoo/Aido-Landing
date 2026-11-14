import type { GuideScreenKey } from "./guide-screens";

export const featureGroupIds = [
  "plan",
  "memo",
  "friends",
  "daily",
  "me",
] as const;
export type FeatureGroupId = (typeof featureGroupIds)[number];

// Keep routes, screenshots and real editorial dates shared by SSG and the sitemap.
// Update updatedAt only when the corresponding guide's content changes.
// screens는 화면에 보이는 순서이고, 문구의 screens 설명(alt·caption)과 같은 순서다.
export const featureGuides = [
  {
    slug: "todo-calendar",
    path: "/features/todo-calendar",
    group: "plan",
    updatedAt: "2026-11-14",
    screens: ["todo-home", "todo-compose", "todo-month", "todo-checklist"],
  },
  {
    slug: "recurring-todo",
    path: "/features/recurring-todo",
    group: "plan",
    updatedAt: "2026-11-10",
    screens: ["repeat-edit", "home-widgets"],
  },
  {
    slug: "ai-todo",
    path: "/features/ai-todo",
    group: "plan",
    updatedAt: "2026-11-10",
    screens: [
      "ai-speak-review",
      "ai-memo-split",
      "ai-quota-info",
      "ai-consent",
    ],
  },
  {
    slug: "memo",
    path: "/features/memo",
    group: "memo",
    updatedAt: "2026-11-14",
    screens: ["memo-list", "memo-detail", "memo-split"],
  },
  {
    slug: "shared-todo",
    path: "/features/shared-todo",
    group: "friends",
    updatedAt: "2026-10-27",
    screens: ["friend-feed", "todo-nudge"],
  },
  {
    slug: "nudge",
    path: "/features/nudge",
    group: "friends",
    updatedAt: "2026-11-14",
    screens: ["nudge-banner", "nudge-send", "nudge-received"],
  },
  {
    slug: "comments",
    path: "/features/comments",
    group: "friends",
    updatedAt: "2026-11-04",
    screens: ["comments-thread", "comments-reply", "comments-heart"],
  },
  {
    slug: "friend-invite",
    path: "/features/friend-invite",
    group: "friends",
    updatedAt: "2026-10-27",
    screens: ["invite-home", "paw-board", "invite-card"],
  },
  {
    slug: "reminders",
    path: "/features/reminders",
    group: "daily",
    updatedAt: "2026-11-14",
    screens: ["reminder-inbox", "reminder-times", "reminder-weather"],
  },
  {
    slug: "weather",
    path: "/features/weather",
    group: "daily",
    updatedAt: "2026-11-04",
    screens: ["weather-briefing", "weather-next-hour", "weather-forecast"],
  },
  {
    slug: "ai-report",
    path: "/features/ai-report",
    group: "daily",
    updatedAt: "2026-11-14",
    screens: [
      "report-home",
      "report-weekly",
      "report-monthly",
      "report-suggestions",
    ],
  },
  {
    slug: "customize",
    path: "/features/customize",
    group: "me",
    updatedAt: "2026-11-14",
    screens: [
      "customize-app-icon",
      "customize-dark",
      "customize-font",
      "customize-badge",
    ],
  },
  {
    slug: "premium",
    path: "/features/premium",
    group: "me",
    updatedAt: "2026-11-14",
    screens: ["premium-usage", "premium-friend-limit", "premium-mypage"],
  },
] as const satisfies ReadonlyArray<{
  slug: string;
  path: `/features/${string}`;
  group: FeatureGroupId;
  updatedAt: string;
  screens: readonly GuideScreenKey[];
}>;

export type FeatureGuide = (typeof featureGuides)[number];
export type FeatureGuideSlug = FeatureGuide["slug"];

export function getFeatureGuide(slug: FeatureGuideSlug): FeatureGuide;
export function getFeatureGuide(slug: string): FeatureGuide | undefined;
export function getFeatureGuide(slug: string) {
  return featureGuides.find((guide) => guide.slug === slug);
}

export const premiumOnlyGuides: ReadonlySet<FeatureGuideSlug> = new Set([
  "ai-report",
] satisfies FeatureGuideSlug[]);

export function getFeatureGroups() {
  return featureGroupIds.map((id) => ({
    id,
    guides: featureGuides.filter((guide) => guide.group === id),
  }));
}

export const featuresHubUpdatedAt: string =
  featureGuides
    .map((guide) => guide.updatedAt)
    .toSorted()
    .at(-1) ?? "";
