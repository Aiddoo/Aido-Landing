import "../styles/updates.css";
import { groupBy } from "es-toolkit";
import { ChevronDown } from "lucide-react";
import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import { BreadcrumbData } from "@/components/seo/breadcrumb-data";
import {
  CopyUpdateSummary,
  type UpdateCopyLabels,
} from "@/features/updates/components/copy-update-summary";
import {
  formatStoreNotes,
  type ReleaseCategory,
  type UpdateNote,
  updateNotes,
} from "@/features/updates/data/patch-notes";
import type { Locale } from "@/i18n/config";
import { getMessages, type MessageCatalog } from "@/i18n/messages";
import { formatContentDate } from "@/lib/format-content-date";

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
export function PatchNotesPage({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const labels = messages.patchNotes;
  // Only these four UI strings cross the client boundary, shared by all buttons.
  const copyLabels: UpdateCopyLabels = {
    copySummary: labels.copySummary,
    summaryCopied: labels.summaryCopied,
    copySummaryFallback: labels.copySummaryFallback,
    updateSummary: labels.updateSummary,
  };
  const [latest, ...older] = updateNotes;
  if (!latest) throw new Error("At least one update is required");
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
              path="/patch-notes"
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
        <UpdateCard
          release={latest}
          locale={locale}
          labels={labels}
          copyLabels={copyLabels}
          latest
        />
        <UpdateArchive
          releases={older}
          locale={locale}
          labels={labels}
          copyLabels={copyLabels}
        />
        <p className="mt-12 text-center text-sm font-medium text-foreground/75">
          {labels.closingNote}
        </p>
      </div>
    </main>
  );
}

function UpdateArchive({
  releases,
  locale,
  labels,
  copyLabels,
}: {
  releases: UpdateNote[];
  locale: Locale;
  labels: MessageCatalog["patchNotes"];
  copyLabels: UpdateCopyLabels;
}) {
  if (!releases.length) return null;
  const months = groupBy(releases, (release) => release.date.slice(0, 7));
  return (
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
        {Object.entries(months).map(([month, releases]) => (
          <details
            key={month}
            className="archive-month disclosure"
            data-release-month={month}
          >
            <summary className="disclosure-summary">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <h3 className="text-xl">
                  {formatContentDate(`${month}-01`, locale, true)}
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
                <UpdateCard
                  key={release.id}
                  release={release}
                  locale={locale}
                  labels={labels}
                  copyLabels={copyLabels}
                />
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
function UpdateCard({
  release,
  locale,
  labels,
  copyLabels,
  latest = false,
}: {
  release: UpdateNote;
  locale: Locale;
  labels: MessageCatalog["patchNotes"];
  copyLabels: UpdateCopyLabels;
  latest?: boolean;
}) {
  const VersionHeading = latest ? "h2" : "h4";
  const CategoryHeading = latest ? "h3" : "h5";
  return (
    <details
      open={latest}
      className={`release-note disclosure ${latest ? "release-latest" : ""}`}
      id={release.id}
      data-update-kind={release.kind}
      data-update-id={release.id}
      data-release-version={
        release.kind === "app" ? release.version : undefined
      }
    >
      <summary className="release-summary">
        <div className="release-topline">
          <div className="flex flex-wrap items-center gap-3">
            <VersionHeading className="text-xl sm:text-2xl">
              {release.kind === "app"
                ? `${labels.appUpdate} · v${release.version}`
                : labels.serviceUpdate}
            </VersionHeading>
            {latest && <span className="release-badge">{labels.latest}</span>}
            {release.kind === "app" && !release.categories.length && (
              <span className="premium-tag mb-0">{labels.newRelease}</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <time
              dateTime={release.date}
              className="text-sm font-medium text-foreground/75"
            >
              {formatContentDate(release.date, locale)}
            </time>
            <ChevronDown
              className="disclosure-chevron"
              size={20}
              aria-hidden="true"
            />
          </div>
        </div>
        <p className="release-summary-text">{release.summary[locale]}</p>
        {release.kind === "service" && (
          <p className="mb-3 text-sm leading-6 text-foreground/75">
            {labels.noAppUpdateNeeded}
          </p>
        )}
        <span
          className="release-toggle text-xs font-bold text-foreground/75"
          aria-hidden="true"
        >
          <span className="release-toggle-open">{labels.expand}</span>
          <span className="release-toggle-close">{labels.collapse}</span>
        </span>
      </summary>
      <div className="release-content">
        {release.kind === "app" && (
          <section className="release-brief">
            <CategoryHeading className="text-base font-bold">
              {labels.updateSummary}
            </CategoryHeading>
            <p className="mt-3 leading-7 text-foreground/80">
              {release.summary[locale]}
            </p>
            <ul className="release-items">
              {release.storeNotes[locale].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <CopyUpdateSummary
              text={formatStoreNotes(release, locale)}
              labels={copyLabels}
            />
          </section>
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
