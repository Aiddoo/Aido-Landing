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
    "/features/ai-todo",
    "/features/recurring-todo",
    "/features/shared-todo",
    "/patch-notes",
    "/terms",
    "/privacy",
  ]) {
    const page = getAnalyticsPage(
      `https://aido.kr/${locale}${route}?email=private%40example.com&token=secret#private`,
      locale,
    );
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
  "Analytics checks passed: 14 public routes, canonical paths, campaign allowlist, referrer redaction, consent validation and expiry.",
);
