import {
  ArrowRight,
  BellRing,
  CalendarCheck,
  ChartColumn,
  CloudSun,
  Crown,
  Gift,
  HandHeart,
  type LucideIcon,
  MessageCircleHeart,
  NotebookPen,
  Palette,
  Repeat,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { badgeVariants } from "@/components/ui/badge";
import { Grid, type GridProps, HStack, VStack } from "@/components/ui/layout";
import { analyticsAttributes } from "@/features/analytics/utils/analytics-attributes";
import {
  type FeatureGuide,
  type FeatureGuideSlug,
  featureGuides,
  premiumOnlyGuides,
} from "@/features/feature-guides/data/feature-guides";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { localizedPath } from "@/lib/public-routes";

export const guideIcons: Record<FeatureGuideSlug, LucideIcon> = {
  "todo-calendar": CalendarCheck,
  "recurring-todo": Repeat,
  "ai-todo": Sparkles,
  memo: NotebookPen,
  "shared-todo": Users,
  nudge: HandHeart,
  comments: MessageCircleHeart,
  "friend-invite": Gift,
  reminders: BellRing,
  weather: CloudSun,
  "ai-report": ChartColumn,
  customize: Palette,
  premium: Crown,
};

export type FeatureGuideListProps = Omit<GridProps, "children" | "render"> & {
  locale: Locale;
  guides?: readonly FeatureGuide[];
  /** 지금 보고 있는 가이드처럼 목록에서 뺄 가이드 */
  exclude?: FeatureGuideSlug;
  placement: "home_guides" | "related_guides" | "features_hub";
};

export function FeatureGuideList({
  locale,
  guides = featureGuides,
  exclude,
  placement,
  columns = 3,
  gap = 4,
  ...props
}: FeatureGuideListProps) {
  const messages = getMessages(locale);
  const content = messages.featureGuides;
  const visible = guides.filter((guide) => guide.slug !== exclude);
  return (
    <Grid render={<ul />} columns={columns} gap={gap} {...props}>
      {visible.map((guide) => {
        const Icon = guideIcons[guide.slug];
        const text = content.guides[guide.slug];
        return (
          <li key={guide.slug} className="flex">
            <VStack
              render={
                <Link
                  href={localizedPath(locale, guide.path)}
                  {...analyticsAttributes({
                    name: "select_content",
                    content_type: "feature_guide",
                    item_id: guide.slug,
                    cta_placement: placement,
                  })}
                />
              }
              gap={3}
              className="group w-full rounded-xl bg-card p-6 shadow-card transition-[translate,box-shadow] hover:-translate-y-1 hover:shadow-lift"
            >
              <HStack align="center" justify="between" gap={2}>
                <Icon
                  aria-hidden="true"
                  className="size-10 rounded-lg bg-brand-soft p-2 text-brand-deep"
                />
                {premiumOnlyGuides.has(guide.slug) && (
                  <span
                    className={badgeVariants({
                      variant: "soft",
                      className: "h-6 px-2.5 text-micro",
                    })}
                  >
                    {messages.featureHub.premiumBadge}
                  </span>
                )}
              </HStack>
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
