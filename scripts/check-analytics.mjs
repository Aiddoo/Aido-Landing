import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";

// Execute the actual helper module with Node 24's type stripper. Resolve the
// application aliases to local files without changing the production bundler.
const source = stripTypeScriptTypes(
  readFileSync("src/lib/analytics.ts", "utf8"),
).replace(
  /from "@\/([^"]+)"/g,
  (_, relativePath) =>
    `from "${new URL(`../src/${relativePath}.ts`, import.meta.url).href}"`,
);
const {
  getAnalyticsPage,
  getAnalyticsReferrer,
  readAnalyticsConsent,
  CONSENT_MAX_AGE,
} = await import(`data:text/javascript,${encodeURIComponent(source)}`);

for (const locale of ["ko", "en"]) {
  for (const route of [
    "",
    "/services",
    "/features/ai-todo",
    "/features/recurring-todo",
    "/features/shared-todo",
    "/patch-notes",
    "/terms",
    "/privacy",
  ]) {
    // Given: 한영 공개 페이지 URL에 개인정보 쿼리와 해시가 포함된다.
    const url = `https://aido.kr/${locale}${route}?email=private%40example.com&token=secret#private`;

    // When: 기존 분석 경계에서 공개 페이지 정보로 정규화한다.
    const page = getAnalyticsPage(url, locale);

    // Then: 경로와 언어만 보존하고 개인정보 쿼리와 해시는 제거한다.
    assert.equal(page.page_path, `/${locale}${route}`);
    assert.equal(page.page_location, `https://aido.kr/${locale}${route}`);
    assert.equal(page.site_locale, locale);
  }
}
assert.equal(
  getAnalyticsPage(
    "https://aido.kr/?utm_source=instagram&utm_medium=social&utm_campaign=launch&utm_content=bio",
    "ko",
  ).page_location,
  "https://aido.kr/ko?utm_source=instagram&utm_medium=social&utm_campaign=launch&utm_content=bio",
);
assert.equal(
  getAnalyticsPage(
    "https://aido.kr/en/features/ai-todo?utm_term=private%40example.com&utm_campaign=hello%20world&analytics_debug=1",
    "en",
  ).page_location,
  "https://aido.kr/en/features/ai-todo",
);
assert.equal(
  getAnalyticsPage("https://aido.kr/en/features/unknown-private-id", "en"),
  null,
);
assert.equal(getAnalyticsPage("https://aido.kr/ko/unknown", "ko"), null);
assert.equal(
  getAnalyticsPage("https://aido.kr/features/shared-todo", "ko").feature_slug,
  "shared-todo",
);
assert.equal(
  getAnalyticsReferrer("https://google.com/search?q=private#personal"),
  "https://google.com",
);
assert.equal(getAnalyticsReferrer("javascript:secret"), "");
assert.equal(getAnalyticsReferrer("broken URL"), "");
assert.equal(getAnalyticsReferrer(""), "");
const now = Date.now();
for (const choice of ["accepted", "rejected"]) {
  assert.equal(
    readAnalyticsConsent(
      JSON.stringify({ choice, expiresAt: now + CONSENT_MAX_AGE }),
      now,
    ),
    choice,
  );
  assert.equal(
    readAnalyticsConsent(JSON.stringify({ choice, expiresAt: now }), now),
    "pending",
  );
  assert.equal(
    readAnalyticsConsent(
      JSON.stringify({ choice, expiresAt: now + CONSENT_MAX_AGE + 1 }),
      now,
    ),
    "pending",
  );
}
for (const value of [
  null,
  "bad json",
  "true",
  '{"choice":"granted"}',
  '{"choice":"accepted","expiresAt":"forever"}',
]) {
  assert.equal(readAnalyticsConsent(value, now), "pending");
}

console.log(
  "분석 경계 검증 통과: 한영 공개 경로 16개, 정규 URL, 캠페인 허용 목록, 외부 유입 정보 정리, 동의 유효기간.",
);
