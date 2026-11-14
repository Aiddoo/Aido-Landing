import { getFeatureGroups } from "@/features/feature-guides/data/feature-guides";
import { releaseNotes } from "@/features/updates/data/patch-notes";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import {
  APP_STORE_URL,
  INSTAGRAM_URL,
  LINK_HUB_URL,
  PLAY_STORE_URL,
  SITE_URL,
  YOUTUBE_URL,
} from "@/lib/seo";

export const dynamic = "force-static";

const plain = (text: string) => text.replaceAll(" ", " ");

function section(locale: Locale) {
  const messages = getMessages(locale);
  const hub = messages.featureHub;
  const groups = getFeatureGroups().map(({ id, guides }) => {
    const lines = guides.map((guide) => {
      const text = messages.featureGuides.guides[guide.slug];
      return `- [${plain(text.title)}](${SITE_URL}/${locale}${guide.path}): ${plain(text.cardDescription)}`;
    });
    return `### ${plain(hub.groups[id].title)}\n\n${lines.join("\n")}`;
  });
  return [
    `## ${locale === "ko" ? "한국어" : "English"}`,
    `- [${plain(messages.meta.title)}](${SITE_URL}/${locale}): ${plain(messages.meta.description)}`,
    `- [${plain(hub.title)}](${SITE_URL}/${locale}/features): ${plain(hub.description)}`,
    `- [${plain(messages.compare.title)}](${SITE_URL}/${locale}/compare): ${plain(messages.compare.description)}`,
    `- [${plain(messages.patchNotes.title)}](${SITE_URL}/${locale}/patch-notes): ${plain(messages.patchNotes.description)}`,
    `- [${plain(messages.legal.termsTitle)}](${SITE_URL}/${locale}/terms), [${plain(messages.legal.privacyTitle)}](${SITE_URL}/${locale}/privacy)`,
    "",
    groups.join("\n\n"),
  ].join("\n");
}

export function GET() {
  const ko = getMessages("ko");
  const latest = releaseNotes[0];
  const body = `# 아이두 (Aido)

> ${plain(ko.meta.description)} ${plain(getMessages("en").meta.description)}

- 지원 기기 / Platforms: ${plain(ko.cta.devices)}
- 최신 앱 버전 / Latest app version: ${latest.version} (${latest.date})
- App Store: ${APP_STORE_URL}
- Google Play: ${PLAY_STORE_URL}
- YouTube: ${YOUTUBE_URL}
- Instagram: ${INSTAGRAM_URL}
- ${plain(ko.footer.linkHubLabel)} / All official links: ${LINK_HUB_URL}
- 문의 / Contact: ${ko.footer.inquiryValue}

${section("ko")}

${section("en")}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
