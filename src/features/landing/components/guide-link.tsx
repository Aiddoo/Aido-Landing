import { BookOpen } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { analyticsAttributes } from "@/features/analytics/utils/analytics-attributes";
import type { FeatureGuideSlug } from "@/features/feature-guides/data/feature-guides";

/** 기능 사용법으로 가는 알약 모양 링크 */
type GuideLinkProps<T extends string> = {
  href: Route<T>;
  slug: FeatureGuideSlug;
  children: ReactNode;
};

export function GuideLink<T extends string>({
  href,
  slug,
  children,
}: GuideLinkProps<T>) {
  return (
    <Link
      href={href}
      {...analyticsAttributes({
        name: "select_content",
        content_type: "feature_guide",
        item_id: slug,
        cta_placement: "home_guides",
      })}
      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-4 text-caption font-semibold text-brand-deep shadow-card transition-[background-color,translate] duration-150 hover:-translate-y-0.5 hover:bg-brand-soft active:translate-y-0"
    >
      <BookOpen aria-hidden="true" className="size-4" />
      {children}
    </Link>
  );
}
