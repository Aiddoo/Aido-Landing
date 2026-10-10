// Keep routes, screenshots and real editorial dates shared by SSG and the sitemap.
// Update updatedAt only when the corresponding guide's content changes.
export const featureGuides = [
  {
    slug: "ai-todo",
    path: "/features/ai-todo",
    updatedAt: "2026-10-04",
    screenshot: "add",
  },
  {
    slug: "recurring-todo",
    path: "/features/recurring-todo",
    updatedAt: "2026-10-04",
    screenshot: "week",
  },
  {
    slug: "shared-todo",
    path: "/features/shared-todo",
    updatedAt: "2026-10-04",
    screenshot: "friend",
  },
] as const;

export type FeatureGuide = (typeof featureGuides)[number];
export type FeatureGuideSlug = (typeof featureGuides)[number]["slug"];

export function getFeatureGuide(slug: string) {
  return featureGuides.find((guide) => guide.slug === slug);
}
