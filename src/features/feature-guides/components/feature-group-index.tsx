import Link from "next/link";
import { BrandMotif } from "@/components/marketing/brand-motif";
import { Grid, type GridProps, VStack } from "@/components/ui/layout";
import { analyticsAttributes } from "@/features/analytics/utils/analytics-attributes";
import { guideIcons } from "@/features/feature-guides/components/feature-guide-list";
import { getFeatureGroups } from "@/features/feature-guides/data/feature-guides";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { localizedPath } from "@/lib/public-routes";
import { cn } from "@/lib/utils";

export type FeatureGroupIndexProps = Omit<GridProps, "children" | "render"> & {
  locale: Locale;
};

export function FeatureGroupIndex({
  locale,
  className,
  ...props
}: FeatureGroupIndexProps) {
  const messages = getMessages(locale);
  const hub = messages.featureHub;
  const guides = messages.featureGuides.guides;
  return (
    <Grid
      render={<ul />}
      gap={4}
      className={cn("sm:grid-cols-2 lg:grid-cols-5", className)}
      {...props}
    >
      {getFeatureGroups().map((group) => (
        <VStack
          key={group.id}
          render={<li />}
          gap={3}
          className="rounded-xl bg-card p-5 shadow-card"
        >
          <VStack gap={0}>
            <p className="font-hand text-hand text-brand-deep">
              {hub.groups[group.id].hand}
            </p>
            <h3 className="flex items-center gap-1.5 text-title text-ink">
              <BrandMotif motif="paw" className="size-3.5 text-brand" />
              {hub.groups[group.id].title}
            </h3>
          </VStack>
          <VStack render={<ul />} gap={0}>
            {group.guides.map((guide) => {
              const Icon = guideIcons[guide.slug];
              return (
                <li key={guide.slug}>
                  <Link
                    href={localizedPath(locale, guide.path)}
                    className="flex min-h-11 items-center gap-2.5 rounded-lg px-2 py-1.5 text-caption font-semibold text-gray-9 transition-colors hover:bg-brand-soft hover:text-brand-deep"
                    {...analyticsAttributes({
                      name: "select_content",
                      content_type: "feature_guide",
                      item_id: guide.slug,
                      cta_placement: "home_guides",
                    })}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-brand-deep"
                    />
                    {guides[guide.slug].title}
                  </Link>
                </li>
              );
            })}
          </VStack>
        </VStack>
      ))}
    </Grid>
  );
}
