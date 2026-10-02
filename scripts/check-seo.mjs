import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { releaseNotes } from "../src/data/patch-notes.ts";
import { getMessages } from "../src/i18n/messages.ts";
import {
  APP_STORE_URL,
  IS_PREVIEW,
  PLAY_STORE_URL,
  SITE_URL,
} from "../src/lib/seo.ts";

const read = (path) => readFile(path, "utf8");
const app = ".next/server/app";
const paths = ["", "/patch-notes", "/terms", "/privacy"];
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
for (const locale of ["ko", "en"]) {
  const messages = getMessages(locale);
  for (const path of paths) {
    const route = `/${locale}${path}`;
    assert.ok(prerender.routes[route], `${route} must be statically generated`);
    const html = await read(`${app}${route}.html`);
    const links = tags(html, "link");
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
          decode(html).includes(question.answer),
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
    if (path === "/patch-notes") {
      const details = tags(html, "details");
      const releases = details.filter((item) => item["data-release-version"]);
      assert.deepEqual(
        releases.map((item) => item["data-release-version"]),
        releaseNotes.map((release) => release.version),
      );
      assert.ok("open" in releases[0], "Latest release is open by default");
      assert.ok(
        releases.slice(1).every((item) => !("open" in item)),
        "Older releases are collapsed",
      );
      const months = details.filter((item) => item["data-release-month"]);
      assert.equal(
        months.length,
        new Set(
          releaseNotes.slice(1).map((release) => release.date.slice(0, 7)),
        ).size,
      );
      assert.ok(
        months.every((item) => !("open" in item)),
        "Archive months are collapsed",
      );
      for (const release of releaseNotes) {
        assert.ok(
          decode(html).includes(release.summary[locale]),
          `${route}: ${release.version} summary`,
        );
        for (const category of release.categories)
          for (const item of category.items)
            assert.ok(
              decode(html).includes(item[locale]),
              `${route}: ${release.version} content in HTML`,
            );
      }
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
assert.equal(entries.length, 8);
for (const locale of ["ko", "en"])
  for (const path of paths) {
    const entry = entries.find((text) =>
      text.includes(`<loc>${SITE_URL}/${locale}${path}</loc>`),
    );
    assert.ok(entry);
    const date =
      path === "/terms"
        ? "2026-04-19"
        : path === "/privacy"
          ? "2026-03-13"
          : releaseNotes[0].date;
    assert.ok(entry.includes(`<lastmod>${date}T00:00:00.000Z</lastmod>`));
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
for (const [, font] of (await read("src/app/fonts.css")).matchAll(
  /url\(["']?(\/fonts\/[^"') ]+)["']?\)/g,
))
  assert.ok((await stat(`public${font}`)).size > 0);
console.log(
  "SEO checks passed: 8 static localized pages, metadata, JSON-LD, sitemap dates, assets and verification files.",
);
