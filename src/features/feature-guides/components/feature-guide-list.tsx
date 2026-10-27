import {
  ArrowRight,
  CalendarDays,
  Gift,
  type LucideIcon,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Grid, type GridProps, VStack } from "@/components/ui/layout";
import { analyticsAttributes } from "@/features/analytics/utils/analytics-attributes";
import {
  type FeatureGuideSlug,
  featureGuides,
} from "@/features/feature-guides/data/feature-guides";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { localizedPath } from "@/lib/public-routes";

const guideIcons: Record<FeatureGuideSlug, LucideIcon> = {
  "shared-todo": Users,
  "recurring-todo": CalendarDays,
  "ai-todo": Sparkles,
  "friend-invite": Gift,
};

export type FeatureGuideListProps = Omit<GridProps, "children" | "render"> & {
  locale: Locale;
  /** 지금 보고 있는 가이드처럼 목록에서 뺄 가이드 */
  exclude?: FeatureGuideSlug;
  placement: "home_guides" | "related_guides";
};

export function FeatureGuideList({
  locale,
  exclude,
  placement,
  columns = 3,
  gap = 4,
  ...props
}: FeatureGuideListProps) {
  const content = getMessages(locale).featureGuides;
  const guides = featureGuides.filter((guide) => guide.slug !== exclude);
  return (
    <Grid render={<ul />} columns={columns} gap={gap} {...props}>
      {guides.map((guide) => {
        const Icon = guideIcons[guide.slug];
        const text = content.guides[guide.slug];
        return (
          <li key={guide.slug} className="flex">
            <VStack
              render={
                <Link
                  href={localizedPath(locale, guide.path)}
                  {...analyticsAttributes({
                    name: "feature_guide_click",
                    slug: guide.slug,
                    placement,
                  })}
                />
              }
              gap={3}
              className="group w-full rounded-xl bg-card p-6 shadow-card transition-[translate,box-shadow] hover:-translate-y-1 hover:shadow-lift"
            >
              <Icon
                aria-hidden="true"
                className="size-10 rounded-lg bg-brand-soft p-2 text-brand-deep"
              />
              <h3 className="text-title text-ink">{text.title}</h3>
              <p className="flex-1 text-caption text-gray-8">
                {text.cardDescription}
              </p>
              <span className="inline-flex items-center gap-1 text-caption font-semibold text-brand-deep">
                {content.readGuide}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </VStack>
          </li>
        );
      })}
    </Grid>
  );
}
