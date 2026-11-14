import { featureGuides } from "@/features/feature-guides/data/feature-guides";
import { updateNotes } from "@/features/updates/data/patch-notes";
import { locales } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { SITE_URL } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const escapeXml = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll(" ", " ");

// 날짜만 있는 콘텐츠라 한국 시간 자정으로 둔다.
const toRssDate = (date: string) =>
  new Date(`${date}T00:00:00+09:00`).toUTCString();

export async function GET(
  _request: Request,
  { params }: RouteContext<"/[locale]/feed.xml">,
) {
  const locale = resolveLocale((await params).locale);
  const messages = getMessages(locale);
  const items = [
    ...updateNotes.map((note) => ({
      title:
        note.kind === "app"
          ? `${messages.patchNotes.appUpdate} ${note.version}`
          : messages.patchNotes.serviceUpdate,
      description: note.summary[locale],
      link: `${SITE_URL}/${locale}/patch-notes#${note.id}`,
      date: note.date,
    })),
    ...featureGuides.map((guide) => {
      const text = messages.featureGuides.guides[guide.slug];
      return {
        title: text.title,
        description: text.cardDescription,
        link: `${SITE_URL}/${locale}${guide.path}`,
        date: guide.updatedAt,
      };
    }),
  ]
    .toSorted((a, b) => b.date.localeCompare(a.date))
    .slice(0, 40);
  const feedUrl = `${SITE_URL}/${locale}/feed.xml`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${escapeXml(messages.meta.title)}</title>
<link>${SITE_URL}/${locale}</link>
<description>${escapeXml(messages.meta.description)}</description>
<language>${locale === "ko" ? "ko-KR" : "en-US"}</language>
<lastBuildDate>${toRssDate(items[0]?.date ?? "2026-01-01")}</lastBuildDate>
<atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
${items
  .map(
    (item) => `<item>
<title>${escapeXml(item.title)}</title>
<link>${item.link}</link>
<guid isPermaLink="true">${item.link}</guid>
<description>${escapeXml(item.description)}</description>
<pubDate>${toRssDate(item.date)}</pubDate>
</item>`,
  )
  .join("\n")}
</channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
