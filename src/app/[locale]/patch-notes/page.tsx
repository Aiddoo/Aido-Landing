import { ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import { BreadcrumbData } from "@/components/BreadcrumbData";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  type ReleaseCategory,
  type ReleaseNote,
  releaseNotes,
  type UpcomingReleaseNote,
  upcomingReleaseNote,
} from "@/data/patch-notes";
import type { Locale } from "@/i18n/config";
import { getMessages, type MessageCatalog } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const { patchNotes } = getMessages(locale);
  return buildPageMetadata({
    locale,
    title: patchNotes.title,
    description: patchNotes.description,
    path: "/patch-notes",
  });
}
const categoryColors: Record<ReleaseCategory, string> = {
  bugFixes: "#fce4ec",
  features: "#e8f5e9",
  improvements: "#e3f2fd",
};
const categoryIcons: Record<ReleaseCategory, string> = {
  bugFixes: "🐛",
  features: "✨",
  improvements: "🔧",
};
function formatDate(date: string, locale: Locale, monthOnly = false) {
  return new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", {
    year: "numeric",
    month: "long",
    ...(monthOnly ? {} : { day: "numeric" }),
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
function ReleaseCard({
  release,
  locale,
  labels,
  latest = false,
}: {
  release: ReleaseNote | UpcomingReleaseNote;
  locale: Locale;
  labels: MessageCatalog["patchNotes"];
  latest?: boolean;
}) {
  const isUpcoming = !("date" in release);
  const isFeatured = latest || isUpcoming;
  const VersionHeading = isFeatured ? "h2" : "h4";
  const CategoryHeading = isFeatured ? "h3" : "h5";
  return (
    <details
      open={isFeatured}
      className={`release-note disclosure ${isFeatured ? "release-latest" : ""}`}
      id={`release-${release.version.replaceAll(".", "-")}`}
      data-release-version={release.version}
      data-release-status={isUpcoming ? "upcoming" : "published"}
    >
      <summary className="release-summary">
        <div className="release-topline">
          <div className="flex flex-wrap items-center gap-3">
            <VersionHeading className="text-xl sm:text-2xl">
              v{release.version}
            </VersionHeading>
            {isFeatured && (
              <span className="release-badge">
                {isUpcoming ? labels.upcoming : labels.latest}
              </span>
            )}
            {!release.categories.length && (
              <span className="premium-tag mb-0">{labels.newRelease}</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {"date" in release && (
              <time
                dateTime={release.date}
                className="text-sm font-medium text-foreground/75"
              >
                {formatDate(release.date, locale)}
              </time>
            )}
            <ChevronDown
              className="disclosure-chevron"
              size={20}
              aria-hidden="true"
            />
          </div>
        </div>
        <p className="release-summary-text">{release.summary[locale]}</p>
        <span
          className="release-toggle text-xs font-bold text-foreground/75"
          aria-hidden="true"
        >
          <span className="release-toggle-open">{labels.expand}</span>
          <span className="release-toggle-close">{labels.collapse}</span>
        </span>
      </summary>
      <div className="release-content">
        {isUpcoming && (
          <p className="mb-6 text-sm leading-7 text-foreground/75">
            {labels.upcomingNote}
          </p>
        )}
        {release.categories.length ? (
          <div className="space-y-6">
            {release.categories.map((category) => (
              <section key={category.type}>
                <CategoryHeading
                  className="release-category"
                  style={{ backgroundColor: categoryColors[category.type] }}
                >
                  <span aria-hidden="true">{categoryIcons[category.type]}</span>
                  {labels[category.type]}
                </CategoryHeading>
                <ul className="release-items">
                  {category.items.map((item) => (
                    <li key={item.ko}>{item[locale]}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <p className="leading-7 text-foreground/80">{labels.initialNote}</p>
        )}
      </div>
    </details>
  );
}
export default async function PatchNotesPage({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  const messages = getMessages(locale);
  const labels = messages.patchNotes;
  const [latest, ...older] = releaseNotes;
  const months = new Map<string, ReleaseNote[]>();
  for (const release of older) {
    const key = release.date.slice(0, 7);
    const month = months.get(key) ?? [];
    month.push(release);
    months.set(key, month);
  }
  return (
    <main className="min-h-screen px-5 py-10 sm:px-6 sm:py-16" lang={locale}>
      <BreadcrumbData
        locale={locale}
        path="/patch-notes"
        title={labels.title}
      />
      <div className="mx-auto max-w-4xl">
        <header className="mb-9">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <a href={`/${locale}#top`} className="back-home">
              ← {labels.backHome}
            </a>
            <LanguageSwitcher
              locale={locale}
              labels={messages.languageSwitcher}
            />
          </div>
          <div className="patch-intro">
            <p className="section-tag">{labels.badge}</p>
            <h1 className="section-title">{labels.title}</h1>
            <p className="mt-4 leading-7 text-foreground/80">
              {labels.description}
            </p>
          </div>
        </header>
        <div className="space-y-6">
          <ReleaseCard
            release={upcomingReleaseNote}
            locale={locale}
            labels={labels}
          />
          <ReleaseCard
            release={latest}
            locale={locale}
            labels={labels}
            latest
          />
        </div>
        {older.length > 0 && (
          <section className="mt-12" aria-labelledby="archive-title">
            <div className="mb-6">
              <h2 id="archive-title" className="text-2xl">
                {labels.archiveTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-foreground/75">
                {labels.archiveDescription}
              </p>
            </div>
            <div className="space-y-5">
              {[...months].map(([month, releases]) => (
                <details
                  key={month}
                  className="archive-month disclosure"
                  data-release-month={month}
                >
                  <summary className="disclosure-summary">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <h3 className="text-xl">
                        {formatDate(`${month}-01`, locale, true)}
                      </h3>
                      <span className="text-sm font-medium text-foreground/75">
                        {releases.length === 1
                          ? labels.releaseCountOne
                          : labels.releaseCount.replace(
                              "{count}",
                              String(releases.length),
                            )}
                      </span>
                    </div>
                    <ChevronDown
                      size={20}
                      className="disclosure-chevron"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="archive-releases">
                    {releases.map((release) => (
                      <ReleaseCard
                        key={release.version}
                        release={release}
                        locale={locale}
                        labels={labels}
                      />
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}
        <p className="mt-12 text-center text-sm font-medium text-foreground/75">
          {labels.closingNote}
        </p>
      </div>
    </main>
  );
}
