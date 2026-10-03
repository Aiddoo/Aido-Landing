// Keep routes, screenshots and real editorial dates shared by SSG and the sitemap.
// Update updatedAt only when the corresponding guide's content changes.
export const featureGuides = [
  {
    slug: "ai-todo",
    path: "/features/ai-todo",
    updatedAt: "2026-10-04",
    image: "/app-assets/home.webp",
    width: 360,
    height: 760,
  },
  {
    slug: "recurring-todo",
    path: "/features/recurring-todo",
    updatedAt: "2026-10-04",
    image: "/app-assets/week-calendar-new.webp",
    width: 480,
    height: 1013,
  },
  {
    slug: "shared-todo",
    path: "/features/shared-todo",
    updatedAt: "2026-10-04",
    image: "/app-assets/nudge-new.webp",
    width: 480,
    height: 1013,
  },
] as const;

export type FeatureGuideSlug = (typeof featureGuides)[number]["slug"];

export function getFeatureGuide(slug: string) {
  return featureGuides.find((guide) => guide.slug === slug);
}
