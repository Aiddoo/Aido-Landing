import { ArrowRight, CalendarDays, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { type FeatureGuideSlug, featureGuides } from "@/data/feature-guides";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

const icons = {
  "ai-todo": Sparkles,
  "recurring-todo": CalendarDays,
  "shared-todo": Users,
};

export function FeatureGuides({
  locale,
  currentSlug,
}: {
  locale: Locale;
  currentSlug?: FeatureGuideSlug;
}) {
  const content = getMessages(locale).featureGuides;
  const id = currentSlug ? "related-guides" : "guides";
  return (
    <section id={id} className="section-space" aria-labelledby={`${id}-title`}>
      <div className="page-width">
        <div className="section-heading">
          <h2 id={`${id}-title`} className="section-title">
            {currentSlug ? content.relatedTitle : content.title}
          </h2>
          <p>
            {currentSlug ? content.relatedDescription : content.description}
          </p>
        </div>
        <div
          className={`guide-card-grid ${currentSlug ? "guide-card-grid-related" : ""}`}
        >
          {featureGuides
            .filter((guide) => guide.slug !== currentSlug)
            .map((guide, index) => {
              const text = content.guides[guide.slug];
              const Icon = icons[guide.slug];
              return (
                <Link
                  key={guide.slug}
                  data-analytics-event="select_content"
                  data-feature-slug={guide.slug}
                  data-placement={
                    currentSlug ? "related_guides" : "home_guides"
                  }
                  href={`/${locale}${guide.path}`}
                  className={`guide-card value-card-${index}`}
                >
                  <Icon size={28} aria-hidden="true" />
                  <h3>{text.title}</h3>
                  <p>{text.summary}</p>
                  <span className="guide-card-link">
                    {content.readGuide}
                    <ArrowRight size={18} aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}
