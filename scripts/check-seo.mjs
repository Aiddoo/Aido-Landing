import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { glob, readdir, readFile, stat } from "node:fs/promises";
import { SERVICE_CONTENT_UPDATED_AT } from "../src/components/media/data/app-screenshots.ts";
import { responsiveImages } from "../src/components/media/data/responsive-images.ts";
import { featureGuides } from "../src/features/feature-guides/data/feature-guides.ts";
import { serviceFeatures } from "../src/features/services/data/service-features.ts";
import {
  formatStoreNotes,
  patchNotesUpdatedAt,
  releaseNotes,
  updateNotes,
} from "../src/features/updates/data/patch-notes.ts";
import { getMessages } from "../src/i18n/messages.ts";
import {
  APP_STORE_URL,
  HOME_CONTENT_UPDATED_AT,
  IS_PREVIEW,
  PLAY_STORE_URL,
  SITE_URL,
} from "../src/lib/seo.ts";

const originalSource = (src) =>
  Object.entries(responsiveImages).find(([, image]) =>
    image.variants.some((variant) => variant.src === src),
  )?.[0] ?? src;
const read = (path) => readFile(path, "utf8");
const app = ".next/server/app";
const { koreanFontStylesheet, koreanDisplayFont } = await import(
  "../src/components/fonts/font-assets.ts"
);
const fontCss = await read(`public${koreanFontStylesheet}`);
assert.ok(
  fontCss.includes(koreanDisplayFont),
  "Korean display font asset is declared",
);
const fontInputs = JSON.parse(
  await read("src/components/fonts/data/font-subset-inputs.json"),
);
const fontManifest = JSON.parse(
  await read("src/components/fonts/data/font-subset-manifest.json"),
);
const characters = new Set(
  Array.from({ length: 224 }, (_, index) => index + 32),
);
for await (const path of glob(fontInputs.patterns)) {
  for (const character of await read(path))
    characters.add(character.codePointAt(0));
}
assert.deepEqual(
  [...characters].sort((a, b) => a - b),
  fontManifest.codepoints,
  "Public text glyphs changed. Run scripts/generate-fonts.py before building.",
);
const paths = [
  "",
  "/services",
  "/patch-notes",
  "/terms",
  "/privacy",
  "/account-deletion",
  ...featureGuides.map((guide) => guide.path),
];
assert.equal(
  paths.length * 2,
  20,
  "ko/en canonical pages: home, services, patch notes, 3 legal and 4 guides",
);
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
        (link) => link.rel === "preload" && link.href === koreanDisplayFont,
      ).length,
      locale === "ko" ? 1 : 0,
      `${route}: only Korean pages preload the Korean display font`,
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
      assert.ok(visibleHtml.includes(messages.home.hero.titleLead));
      assert.ok(visibleHtml.includes(messages.home.hero.titleTail));
      assert.ok(visibleHtml.includes(messages.home.hero.description));
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
      // 기본 details라 닫힌 답도 HTML에 남아 자바스크립트 없이 열리고 색인된다.
      assert.equal(
        [...html.matchAll(/data-slot="faq-item"/g)].length,
        messages.faq.items.length,
        `${route}: every FAQ answer stays in HTML`,
      );
      const faqPage = jsonLd.find((data) => data["@type"] === "FAQPage");
      assert.deepEqual(
        faqPage.mainEntity.map((item) => [item.name, item.acceptedAnswer.text]),
        messages.faq.items.map((item) => [item.question, item.answer]),
        `${route}: FAQPage matches the visible FAQ`,
      );
      assert.deepEqual(application.featureList, messages.home.appFeatures);
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
        originalSource(image.src)?.includes("/screenshots/"),
      )) {
        assert.ok(
          originalSource(image.src).includes(`/screenshots/${locale}/`),
        );
        // 치수가 있거나, 비율 상자(AspectRatio) 안을 채우는 fill 이미지여야 CLS가 없다.
        assert.ok(
          (Number(image.width) > 0 && Number(image.height) > 0) ||
            /position:absolute/.test(image.style ?? ""),
        );
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
        ...("plans" in content
          ? [content.plans.free, content.plans.premium]
          : [
              ...content.rewards.items.flatMap((item) => [
                item.who,
                item.when,
                item.reward,
                item.condition,
              ]),
              ...content.rewards.limits,
            ]),
        ...content.screens.flatMap((screen) => [screen.caption]),
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
      const screenAlts = tags(html, "img").map((image) => image.alt);
      for (const screen of content.screens)
        assert.ok(
          screenAlts.includes(screen.alt),
          `${route}: guide screen alt`,
        );
      for (const image of tags(html, "img").filter((image) =>
        originalSource(image.src)?.includes("/guides/"),
      ))
        assert.ok(originalSource(image.src).includes(`/guides/${locale}/`));
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
          (button) => button["data-slot"] === "copy-update-summary",
        ).length,
        releaseNotes.length,
        "Only app releases have a summary copy button",
      );
    }
    assert.equal(tags(html, "h1").length, 1, `${route}: a single page title`);
    assert.equal(
      links.filter(
        (link) =>
          link.href === koreanFontStylesheet && link.rel === "stylesheet",
      ).length,
      locale === "ko" ? 1 : 0,
      `${route}: Korean font CSS only on Korean pages`,
    );
    for (const { src, srcset } of tags(html, "img")) {
      assert.ok(srcset, `${route}: responsive images have a srcset`);
      assert.ok(src?.startsWith("/"), `${route}: local image`);
      assert.ok(
        (await stat(`public${src}`)).size <= 300 * 1024,
        `${src}: maximum 300KB`,
      );
    }
  }
}
const robotsText = await read(`${app}/robots.txt.body`);
assert.match(robotsText, /User-Agent: \*/);
assert.match(robotsText, IS_PREVIEW ? /Disallow: \// : /Allow: \//);
if (!IS_PREVIEW) assert.doesNotMatch(robotsText, /Disallow:/);
const stylesheetBytes = await readFile(`public${koreanFontStylesheet}`);
assert.ok(
  koreanFontStylesheet.endsWith(
    `-${createHash("sha256").update(stylesheetBytes).digest("hex").slice(0, 12)}.css`,
  ),
);
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
        : path === "/terms" || path === "/account-deletion"
          ? "2026-10-26"
          : path === "/patch-notes"
            ? patchNotesUpdatedAt
            : path === "/privacy"
              ? "2026-10-26"
              : (featureGuides.find((guide) => guide.path === path)
                  ?.updatedAt ??
                [HOME_CONTENT_UPDATED_AT, releaseNotes[0].date].sort().at(-1));
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
// 본문·제목은 swap(제목만 preload), 장식 손글씨는 optional. 폴백은 로컬 글꼴 + 메트릭 보정.
const fontDisplay = {
  Jua: "swap",
  "Nanum Pen Script": "optional",
  "Wanted Sans": "swap",
};
const declaredFamilies = new Set();
for (const [, face] of fontCss.matchAll(/@font-face\s*\{([^}]+)\}/g)) {
  const family = face.match(/font-family:\s*"([^"]+)"/)?.[1];
  assert.ok(family, "Every @font-face names its family");
  declaredFamilies.add(family);
  if (family in fontDisplay) {
    assert.match(face, new RegExp(`font-display:\\s*${fontDisplay[family]}`));
    assert.match(face, /url\(\/fonts\//, `${family}: same-origin WOFF2`);
  } else {
    assert.match(face, / Fallback /, `${family}: only metric fallbacks`);
    assert.match(face, /src:\s*local\(/, `${family}: local system font`);
    for (const descriptor of [
      "size-adjust",
      "ascent-override",
      "descent-override",
      "line-gap-override",
    ])
      assert.match(
        face,
        new RegExp(`${descriptor}:`),
        `${family}: ${descriptor}`,
      );
  }
}
for (const family of Object.keys(fontDisplay))
  assert.ok(declaredFamilies.has(family), `${family} is declared`);
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
for (const license of [
  "jua-OFL.txt",
  "nanum-pen-script-OFL.txt",
  "wanted-sans-OFL.txt",
])
  assert.match(await read(`public/fonts/${license}`), /SIL OPEN FONT LICENSE/);
// 친구 초대: /i/{코드}는 proxy가 정적 /{locale}/invite로 rewrite한다. 색인·사이트맵 제외.
const sitemapXml = await read(`${app}/sitemap.xml.body`);
for (const locale of ["ko", "en"]) {
  const route = `/${locale}/invite`;
  assert.ok(prerender.routes[route], `${route} must be statically generated`);
  assert.equal(prerender.routes[route].initialRevalidateSeconds, false);
  assert.equal(prerender.routes[route].compute, "static", `${route}: no SSR`);
  const html = await read(`${app}${route}.html`);
  assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`));
  // React가 큰 정적 셸의 Suspense 경계를 바깥으로 빼면 같은 내용이 숨은 <div hidden id="S:n">에
  // 한 번 더 들어간다. 사용자에게 보이는 본문은 그 앞부분이다.
  const visibleBody = html.split('<div hidden id="S:')[0] ?? html;
  assert.equal(
    [...visibleBody.matchAll(/<h1\b/g)].length,
    1,
    `${route}: single H1`,
  );
  assert.match(
    tags(html, "meta").find((item) => item.name === "robots")?.content ?? "",
    /noindex/,
    `${route}: invite pages are not indexed`,
  );
  assert.ok(!sitemapXml.includes(route), `${route} must stay out of sitemap`);
  assert.doesNotMatch(html, /rel="canonical"/, `${route}: no canonical`);
  // 한국어는 카카오톡 공유와 같은 초대 썸네일, 영어는 기본 OG 이미지를 쓴다.
  const inviteOgImage =
    locale === "ko" ? "/images/invite-share.png" : "/og-image.png";
  for (const [attribute, key] of [
    ["property", "og:image"],
    ["name", "twitter:image"],
  ])
    assert.equal(
      tags(html, "meta").find((item) => item[attribute] === key)?.content,
      `${SITE_URL}${inviteOgImage}`,
      `${route}: ${key}`,
    );
  assert.ok(
    tags(html, "link").some(
      (link) =>
        link.rel === "preconnect" && link.href === "https://api.aido.kr",
    ),
    `${route}: preconnects to the invite preview API`,
  );
  assert.equal(
    tags(html, "link").filter((link) => link.as === "font").length,
    locale === "ko" ? 1 : 0,
    `${route}: keeps the single Korean display preload`,
  );
}
const appleAssociation = JSON.parse(
  await read("public/.well-known/apple-app-site-association"),
);
assert.deepEqual(
  appleAssociation.applinks.details[0].components.map((item) => item["/"]),
  ["/i/*"],
  "Universal Links only claim friend invite paths",
);
assert.match(
  appleAssociation.applinks.details[0].appIDs[0],
  /\.com\.aido\.mobile$/,
);
const assetLinks = JSON.parse(await read("public/.well-known/assetlinks.json"));
assert.equal(assetLinks[0].target.package_name, "com.aido.mobile");
assert.deepEqual(assetLinks[0].relation, [
  "delegate_permission/common.handle_all_urls",
]);
// Play 앱 서명 키 SHA-256(콜론으로 구분한 32바이트 대문자 16진수). 자리표시자로 돌아가면 실패한다.
assert.ok(assetLinks[0].target.sha256_cert_fingerprints.length > 0);
for (const fingerprint of assetLinks[0].target.sha256_cert_fingerprints)
  assert.match(
    fingerprint,
    /^[0-9A-F]{2}(?::[0-9A-F]{2}){31}$/,
    "assetlinks.json needs the Play app signing SHA-256 fingerprint",
  );
console.log(
  `SEO checks passed: ${paths.length * 2} canonical SSG pages and 2 noindex invite pages without ISR, crawlable update archives, canonical/hreflang/social metadata, JSON-LD, sitemap dates, locale font preloads, hashed WOFF2 assets and licenses.`,
);
