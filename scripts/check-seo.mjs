import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import { SERVICE_CONTENT_UPDATED_AT } from "../src/data/app-screenshots.ts";
import { featureGuides } from "../src/data/feature-guides.ts";
import {
  formatStoreNotes,
  patchNotesUpdatedAt,
  releaseNotes,
  updateNotes,
} from "../src/data/patch-notes.ts";
import { serviceFeatures } from "../src/data/service-features.ts";
import { getMessages } from "../src/i18n/messages.ts";
import {
  APP_STORE_URL,
  IS_PREVIEW,
  PLAY_STORE_URL,
  SITE_URL,
} from "../src/lib/seo.ts";

const read = (path) => readFile(path, "utf8");
const app = ".next/server/app";
const fontCss = await read("src/app/fonts.css");
const koreanHeadingFont = fontCss.match(
  /\/fonts\/black-han-sans-full-[a-f0-9]{12}\.woff2/,
)?.[0];
assert.ok(koreanHeadingFont, "Korean heading font asset is declared");
const paths = [
  "",
  "/services",
  "/patch-notes",
  "/terms",
  "/privacy",
  ...featureGuides.map((guide) => guide.path),
];
const decode = (text) =>
  text
    .replaceAll("&amp;", "&")
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<");
function tags(html, tag) {
  return [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "g"))].map(([raw]) =>
    Object.fromEntries(
      [...raw.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [
        key.toLowerCase(),
        decode(value),
      ]),
    ),
  );
}
const prerender = JSON.parse(await read(".next/prerender-manifest.json"));
assert.equal(
  prerender.dynamicRoutes["/[locale]"].fallback,
  false,
  "Unknown locales must not use a dynamic fallback",
);
assert.equal(
  prerender.dynamicRoutes["/[locale]/features/[slug]"].fallback,
  false,
  "Unknown guide slugs must not use a dynamic fallback",
);
for (const locale of ["ko", "en"]) {
  const messages = getMessages(locale);
  for (const path of paths) {
    const route = `/${locale}${path}`;
    assert.ok(prerender.routes[route], `${route} must be statically generated`);
    assert.equal(
      prerender.routes[route].initialRevalidateSeconds,
      false,
      `${route}: public content is built on deployment, without timed ISR`,
    );
    assert.equal(prerender.routes[route].compute, "static", `${route}: no SSR`);
    const html = await read(`${app}${route}.html`);
    const visibleHtml = decode(
      html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ""),
    );
    const links = tags(html, "link");
    assert.equal(
      links.filter(
        (link) => link.rel === "preload" && link.href === koreanHeadingFont,
      ).length,
      locale === "ko" ? 1 : 0,
      `${route}: only Korean pages preload the Korean heading font`,
    );
    assert.equal(
      links.filter((link) => link.rel === "preload" && link.as === "font")
        .length,
      locale === "ko" ? 1 : 0,
      `${route}: no unused Latin preloads or bulk Korean subset preloads`,
    );
    for (const link of links.filter((link) => link.as === "font")) {
      assert.equal(link.type, "font/woff2");
      assert.ok("crossorigin" in link);
    }
    const meta = tags(html, "meta");
    const value = (key) =>
      meta.find((item) => item.name === key || item.property === key)?.content;
    assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`), route);
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${route}: single H1`);
    assert.ok(html.match(/<title>(.+?)<\/title>/)?.[1]);
    assert.ok(value("description")?.length > 20);
    assert.equal(
      links.find((link) => link.rel === "canonical")?.href,
      `${SITE_URL}${route}`,
    );
    for (const language of ["ko", "en", "x-default"]) {
      assert.equal(
        links.find((link) => link.hreflang === language)?.href,
        `${SITE_URL}/${language === "x-default" ? "ko" : language}${path}`,
      );
    }
    assert.equal(value("og:url"), `${SITE_URL}${route}`);
    assert.equal(value("og:image"), `${SITE_URL}/og-image.png`);
    for (const key of [
      "og:title",
      "og:description",
      "og:locale:alternate",
      "twitter:card",
      "twitter:title",
      "twitter:description",
      "twitter:image:alt",
    ])
      assert.ok(value(key), `${route}: ${key}`);
    assert.match(
      value("robots"),
      new RegExp(IS_PREVIEW ? "noindex" : "(?<!no)index"),
    );
    assert.match(value("googlebot"), /max-image-preview:large/);
    assert.doesNotMatch(html, /disquiet|ai-recommend\.png/i);
    const jsonLd = [
      ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g),
    ].map(([, json]) => JSON.parse(json));
    assert.ok(
      jsonLd.find(
        (data) =>
          data["@type"] === "Organization" &&
          data["@id"] === `${SITE_URL}/#organization` &&
          data.name === messages.footer.companyValue,
      ),
    );
    assert.ok(
      jsonLd.find(
        (data) => data["@type"] === "WebSite" && data.url === SITE_URL,
      ),
    );
    if (!path) {
      assert.equal(
        decode(html.match(/<title>(.+?)<\/title>/)?.[1]),
        messages.meta.title,
      );
      assert.ok(visibleHtml.includes(messages.hero.functionalTitle));
      for (const guide of featureGuides)
        assert.ok(
          tags(html, "a").some(
            (link) => link.href === `/${locale}${guide.path}`,
          ),
          `${route}: link to ${guide.path}`,
        );
      const application = jsonLd.find(
        (data) => data["@type"] === "MobileApplication",
      );
      assert.equal(application.softwareVersion, releaseNotes[0].version);
      assert.deepEqual(application.installUrl, [APP_STORE_URL, PLAY_STORE_URL]);
      assert.doesNotMatch(html, /opacity:\s*0(?:[;"}])/);
      for (const question of messages.faq.items) {
        assert.ok(
          html.includes(question.question),
          `${route}: FAQ question in HTML`,
        );
        assert.ok(
          visibleHtml.includes(question.answer),
          `${route}: FAQ answer in HTML`,
        );
      }
      assert.equal(
        [...html.matchAll(/<details class="disclosure"/g)].length,
        messages.faq.items.length,
      );
    } else {
      const breadcrumb = jsonLd.find(
        (data) => data["@type"] === "BreadcrumbList",
      );
      assert.equal(breadcrumb.itemListElement[1].item, `${SITE_URL}${route}`);
    }
    if (path === "/services") {
      assert.ok(visibleHtml.includes(messages.services.screenshotNote));
      for (const { id, screenshots } of serviceFeatures) {
        const feature = messages.services.features[id];
        assert.ok(visibleHtml.includes(feature.title));
        assert.equal(feature.captions.length, screenshots.length);
        for (const detail of feature.details)
          assert.ok(visibleHtml.includes(detail));
      }
      for (const image of tags(html, "img").filter((image) =>
        image.src?.includes("/screenshots/"),
      )) {
        assert.ok(image.src.includes(`/screenshots/${locale}/`));
        assert.ok(Number(image.width) > 0 && Number(image.height) > 0);
      }
    }
    const guide = featureGuides.find((item) => item.path === path);
    if (guide) {
      const content = messages.featureGuides.guides[guide.slug];
      assert.equal(
        decode(html.match(/<title>(.+?)<\/title>/)?.[1]),
        `${content.title} | Aido`,
      );
      assert.equal(value("description"), content.summary);
      assert.equal(value("og:title"), content.title);
      for (const text of [
        content.title,
        content.summary,
        content.plans.free,
        content.plans.premium,
        ...content.steps.flatMap((step) => [step.title, step.body]),
        ...content.example.items,
        ...content.details.flatMap((detail) => [detail.title, detail.body]),
        ...content.faq.flatMap((question) => [
          question.question,
          question.answer,
        ]),
      ])
        assert.ok(
          visibleHtml.includes(text),
          `${route}: guide content in SSR HTML: ${text.slice(0, 40)}`,
        );
      assert.ok(
        tags(html, "time").some((time) => time.datetime === guide.updatedAt),
      );
      for (const related of featureGuides.filter(
        (item) => item.slug !== guide.slug,
      ))
        assert.ok(
          tags(html, "a").some(
            (link) => link.href === `/${locale}${related.path}`,
          ),
          `${route}: related guide link`,
        );
      assert.ok(tags(html, "a").some((link) => link.href === APP_STORE_URL));
      assert.ok(
        tags(html, "a").some((link) => link.href?.startsWith(PLAY_STORE_URL)),
      );
    }
    if (path === "/patch-notes") {
      const details = tags(html, "details");
      const updates = details.filter((item) => item["data-update-id"]);
      assert.deepEqual(
        updates.map((item) => item["data-update-id"]),
        updateNotes.map((update) => update.id),
        "All app and service records are rendered in timeline order",
      );
      const releases = details.filter((item) => item["data-release-version"]);
      assert.deepEqual(
        releases.map((item) => item["data-release-version"]),
        releaseNotes.map((release) => release.version),
      );
      assert.ok("open" in updates[0], "Latest record is open by default");
      assert.ok(
        updates.slice(1).every((item) => !("open" in item)),
        "Older app and service records are collapsed",
      );
      const months = details.filter((item) => item["data-release-month"]);
      assert.equal(
        months.length,
        new Set(updateNotes.slice(1).map((release) => release.date.slice(0, 7)))
          .size,
      );
      assert.ok(
        months.every((item) => !("open" in item)),
        "Archive months are collapsed",
      );
      for (const release of updateNotes) {
        assert.ok(
          updates.some((item) => item.id === release.id),
          `${route}: ${release.id} anchor`,
        );
        assert.ok(
          visibleHtml.includes(release.summary[locale]),
          `${route}: ${release.id} summary`,
        );
        for (const category of release.categories)
          for (const item of category.items)
            assert.ok(
              visibleHtml.includes(item[locale]),
              `${route}: ${release.id} content in SSR HTML`,
            );
        if (release.kind === "app") {
          for (const text of formatStoreNotes(release, locale).split("\n"))
            if (text)
              assert.ok(
                visibleHtml.includes(text.replace(/^- /, "")),
                `${route}: ${release.version} store summary in SSR HTML`,
              );
        } else {
          assert.ok(
            visibleHtml.includes(messages.patchNotes.noAppUpdateNeeded),
          );
        }
      }
      assert.equal(
        tags(html, "button").filter(
          (button) => button.class === "release-copy-button",
        ).length,
        releaseNotes.length,
        "Only app releases have a summary copy button",
      );
    }
    for (const { src } of tags(html, "img")) {
      assert.ok(src?.startsWith("/"), `${route}: local image`);
      assert.ok(
        (await stat(`public${src}`)).size <= 300 * 1024,
        `${src}: maximum 300KB`,
      );
    }
  }
}
const xml = await read(`${app}/sitemap.xml.body`);
const entries = [...xml.matchAll(/<url>(.*?)<\/url>/gs)].map(
  ([, entry]) => entry,
);
assert.equal(entries.length, paths.length * 2);
for (const locale of ["ko", "en"])
  for (const path of paths) {
    const entry = entries.find((text) =>
      text.includes(`<loc>${SITE_URL}/${locale}${path}</loc>`),
    );
    assert.ok(entry);
    const date =
      path === "/services"
        ? SERVICE_CONTENT_UPDATED_AT
        : path === "/terms"
          ? "2026-04-19"
          : path === "/patch-notes"
            ? patchNotesUpdatedAt
            : path === "/privacy"
              ? "2026-10-04"
              : (featureGuides.find((guide) => guide.path === path)
                  ?.updatedAt ?? releaseNotes[0].date);
    assert.ok(entry.includes(`<lastmod>${date}T00:00:00.000Z</lastmod>`));
    for (const language of ["ko", "en", "x-default"])
      assert.ok(
        entry.includes(
          `hreflang="${language}" href="${SITE_URL}/${language === "x-default" ? "ko" : language}${path}"`,
        ),
      );
  }
assert.ok(
  (await read(`${app}/robots.txt.body`)).includes(
    `Sitemap: ${SITE_URL}/sitemap.xml`,
  ),
);
const manifest = JSON.parse(await read(`${app}/site.webmanifest.body`));
assert.equal(manifest.start_url, "/ko");
assert.equal(manifest.related_applications[0].url, PLAY_STORE_URL);
const verificationFiles = (await readdir("public")).filter((file) =>
  /^(google|naver).*\.html$/.test(file),
);
assert.equal(verificationFiles.length, 2);
for (const file of verificationFiles)
  assert.ok((await read(`public/${file}`)).includes("verification"));
assert.doesNotMatch(fontCss, /https?:\/\/|fonts\.googleapis|fonts\.gstatic/);
for (const face of fontCss.matchAll(/@font-face\s*\{([^}]+)\}/g)) {
  assert.match(face[1], /font-display:\s*optional/);
  if (face[1].includes('"Noto Sans KR"')) {
    assert.match(face[1], /font-weight:\s*400 700/);
    assert.match(face[1], /unicode-range:/);
  }
}
for (const [, font] of fontCss.matchAll(
  /url\(["']?(\/fonts\/[^"') ]+)["']?\)/g,
)) {
  const bytes = await readFile(`public${font}`);
  assert.equal(bytes.toString("ascii", 0, 4), "wOF2", `${font}: WOFF2 asset`);
  assert.ok(bytes.length > 0 && bytes.length <= 300 * 1024);
  assert.ok(
    font.endsWith(
      `-${createHash("sha256").update(bytes).digest("hex").slice(0, 12)}.woff2`,
    ),
    `${font}: content hash must change when cached font bytes change`,
  );
}
for (const license of ["blackhansans-OFL.txt", "notosanskr-OFL.txt"])
  assert.match(await read(`public/fonts/${license}`), /SIL OPEN FONT LICENSE/);
console.log(
  "SEO checks passed: 16 SSG pages without ISR, crawlable update archives, canonical/hreflang/social metadata, JSON-LD, sitemap dates, locale font preloads, hashed WOFF2 assets and licenses.",
);
