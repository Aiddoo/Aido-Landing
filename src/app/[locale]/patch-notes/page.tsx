import type { Metadata } from "next";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { ReleaseCategory } from "@/data/patch-notes";
import { releaseNotes } from "@/data/patch-notes";
import type { Locale } from "@/i18n/config";
import type { MessageCatalog } from "@/i18n/messages";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { buildSocialMetadata } from "@/lib/seo";

type LocalePatchNotesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalePatchNotesPageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const messages = getMessages(locale);

  return {
    title: messages.patchNotes.title,
    description: messages.patchNotes.description,
    alternates: {
      canonical: `/${locale}/patch-notes`,
      languages: {
        ko: "/ko/patch-notes",
        en: "/en/patch-notes",
        "x-default": "/ko/patch-notes",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    ...buildSocialMetadata({
      locale,
      title: messages.patchNotes.title,
      description: messages.patchNotes.description,
      path: "/patch-notes",
    }),
  };
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

function getCategoryLabel(
  type: ReleaseCategory,
  patchNotes: MessageCatalog["patchNotes"],
): string {
  const map: Record<ReleaseCategory, string> = {
    bugFixes: patchNotes.bugFixes,
    features: patchNotes.features,
    improvements: patchNotes.improvements,
  };
  return map[type];
}

function formatDate(dateStr: string, locale: Locale): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function LocalePatchNotesPage({
  params,
}: LocalePatchNotesPageProps) {
  const locale = resolveLocale((await params).locale);
  const messages = getMessages(locale);
  const prefix = `/${locale}`;

  return (
    <main
      className="min-h-screen bg-transparent selection:bg-brand/20 selection:text-brand relative px-4 py-12 sm:px-6 sm:py-16 lg:py-20"
      lang={locale}
    >
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <header className="mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <Link
              href={prefix}
              className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/20 bg-white px-4 py-2 text-sm font-bold text-foreground/70 hover:border-brand hover:text-brand transition-all hand-shadow-hover hand-shadow-active"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              {messages.patchNotes.backHome}
            </Link>
            <LanguageSwitcher
              locale={locale}
              labels={messages.languageSwitcher}
            />
          </div>

          <div className="wobbly-md border-[3px] border-foreground bg-white p-6 sm:p-8 hand-shadow-lg">
            <p className="inline-block bg-brand text-white text-xs font-bold tracking-wider uppercase px-3 py-1 wobbly-sm -rotate-2 mb-4">
              Changelog
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
              {messages.patchNotes.title}
            </h1>
            <p className="text-base sm:text-lg text-foreground/60 font-medium leading-relaxed">
              {messages.patchNotes.description}
            </p>
          </div>
        </header>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-[19px] top-2 bottom-2 w-[3px] bg-foreground/10 hidden sm:block"
            aria-hidden="true"
          />

          <div className="space-y-8 sm:space-y-10">
            {releaseNotes.map((release, index) => {
              const isLatest = index === 0;
              const isInitialRelease = release.categories.length === 0;

              return (
                <article key={release.version} className="relative sm:pl-14">
                  {/* Timeline dot */}
                  <div
                    className={[
                      "absolute left-[10px] top-6 hidden sm:flex items-center justify-center w-[22px] h-[22px] rounded-full border-[3px] z-10",
                      isLatest
                        ? "border-brand bg-brand"
                        : "border-foreground/30 bg-white",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {isLatest && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>

                  <div
                    className={[
                      "wobbly-md border-[3px] border-foreground bg-white p-5 sm:p-7 transition-all",
                      isLatest ? "hand-shadow-lg" : "hand-shadow",
                    ].join(" ")}
                  >
                    {/* Version header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                          v{release.version}
                        </h2>
                        {isLatest && (
                          <span className="bg-brand text-white text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 wobbly-sm rotate-1">
                            {messages.patchNotes.latest}
                          </span>
                        )}
                        {isInitialRelease && (
                          <span className="bg-foreground text-white text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 wobbly-sm -rotate-1">
                            {messages.patchNotes.newRelease}
                          </span>
                        )}
                      </div>
                      <time
                        dateTime={release.date}
                        className="text-sm font-bold text-foreground/40 tabular-nums"
                      >
                        {formatDate(release.date, locale)}
                      </time>
                    </div>

                    {/* Summary for initial release */}
                    {isInitialRelease && (
                      <p className="text-base font-medium text-foreground/70 leading-relaxed">
                        {release.summary[locale]}
                      </p>
                    )}

                    {/* Categories */}
                    {release.categories.length > 0 && (
                      <div className="space-y-5">
                        {release.categories.map((category) => (
                          <div key={category.type}>
                            <div className="flex items-center gap-2 mb-3">
                              <span
                                className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-bold wobbly-sm border-2 border-foreground/15"
                                style={{
                                  backgroundColor:
                                    categoryColors[category.type],
                                }}
                              >
                                <span aria-hidden="true">
                                  {categoryIcons[category.type]}
                                </span>
                                {getCategoryLabel(
                                  category.type,
                                  messages.patchNotes,
                                )}
                              </span>
                            </div>
                            <ul className="space-y-2 pl-1">
                              {category.items.map((item) => (
                                <li
                                  key={item.ko}
                                  className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/80 leading-relaxed"
                                >
                                  <span
                                    className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                    style={{
                                      backgroundColor:
                                        categoryColors[category.type],
                                      border: "1.5px solid var(--foreground)",
                                      opacity: 0.7,
                                    }}
                                    aria-hidden="true"
                                  />
                                  {item[locale]}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Footer decoration */}
        <div className="mt-16 flex justify-center">
          <div className="wobbly-sm border-2 border-foreground/20 bg-white px-6 py-3 hand-shadow text-sm font-bold text-foreground/40 -rotate-1">
            {locale === "ko"
              ? "더 많은 업데이트가 곧 찾아올 거예요 🐾"
              : "More updates coming soon 🐾"}
          </div>
        </div>
      </div>
    </main>
  );
}
