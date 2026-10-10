import { expect, type Page, test } from "@playwright/test";
import { z } from "zod";
import {
  CONSENT_KEY,
  CONSENT_MAX_AGE,
} from "../../src/features/analytics/runtime/create-consent-store";

const googleScript = `
window.__gaCommands = [];
const consume = (command) => window.__gaCommands.push(Array.from(command));
(window.dataLayer || []).forEach(consume);
window.dataLayer.push = (...commands) => { commands.forEach(consume); return window.__gaCommands.length; };
`;
const vercelScript = `
window.__vercelPages = [];
let beforeSend;
const queue = window.vaq || [];
window.va = (type, properties) => {
  if (type === "beforeSend") beforeSend = properties;
  if (type === "pageview") {
    const event = { type: "pageview", url: new URL(properties.path || location.href, location.origin).href };
    const result = beforeSend ? beforeSend(event) : null;
    if (result) window.__vercelPages.push(result.url);
  }
};
queue.forEach(([type, properties]) => window.va(type, properties));
// Simulate the SDK's unsolicited initial pageview. The adapter permits only manual views.
window.va("pageview", { path: location.href });
`;
async function mockVendors(page: Page) {
  const requests: string[] = [];
  await page.route("https://www.googletagmanager.com/**", async (route) => {
    requests.push("ga4");
    await route.fulfill({
      contentType: "application/javascript",
      body: googleScript,
    });
  });
  await page.route("**/_vercel/insights/script.js", async (route) => {
    requests.push("vercel");
    await route.fulfill({
      contentType: "application/javascript",
      body: vercelScript,
    });
  });
  return requests;
}
async function gaEvents(page: Page, name: string) {
  const input: unknown = await page.evaluate(
    () => Reflect.get(window, "__gaCommands") ?? [],
  );
  return z
    .array(z.array(z.unknown()))
    .parse(input)
    .filter((command) => command[0] === "event" && command[1] === name);
}
async function vercelPages(page: Page) {
  const input: unknown = await page.evaluate(
    () => Reflect.get(window, "__vercelPages") ?? [],
  );
  return z.array(z.string()).parse(input);
}
async function accept(page: Page) {
  await page.getByRole("button", { name: "분석 허용", exact: true }).click();
  await expect
    .poll(async () => (await gaEvents(page, "page_view")).length)
    .toBe(1);
}

test("no provider requests before consent or after decline, including reload", async ({
  page,
}) => {
  const requests = await mockVendors(page);
  await page.goto("/ko");
  await page.locator("#faq summary").first().click();
  expect(requests).toEqual([]);
  await page.getByRole("button", { name: "허용 안 함", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "웹사이트 분석 설정", exact: true }),
  ).toBeVisible();
  expect(requests).toEqual([]);
  await expect(
    page.locator('script[src*="googletagmanager"], script[data-sdkn]'),
  ).toHaveCount(0);
});

test("one initialization, sanitized views, typed clicks, navigation and withdrawal", async ({
  page,
}) => {
  const requests = await mockVendors(page);
  await page.goto(
    "/ko?utm_source=instagram&email=private%40example.com#guides",
  );
  await accept(page);
  await expect.poll(async () => (await vercelPages(page)).length).toBe(1);
  expect(requests.sort()).toEqual(["ga4", "vercel"]);
  expect((await gaEvents(page, "page_view"))[0]?.[2]).toMatchObject({
    page_location: "https://aido.kr/ko?utm_source=instagram",
    page_path: "/ko",
    site_locale: "ko",
  });
  await page.evaluate(() =>
    document
      .querySelector<HTMLAnchorElement>(
        '[data-analytics-event="download_click"]',
      )
      ?.addEventListener("click", (event) => event.preventDefault()),
  );
  await page
    .locator('[data-analytics-event="download_click"][data-store="app_store"]')
    .first()
    .click();
  await expect
    .poll(async () => (await gaEvents(page, "download_click")).length)
    .toBe(1);
  await page.locator('a[href="/ko/features/ai-todo"]').click();
  await expect(page).toHaveURL(/\/ko\/features\/ai-todo$/);
  await expect
    .poll(async () => (await gaEvents(page, "page_view")).length)
    .toBe(2);
  expect((await gaEvents(page, "select_content"))[0]?.[2]).toMatchObject({
    item_id: "ai-todo",
    content_type: "feature_guide",
  });
  await expect.poll(async () => (await vercelPages(page)).length).toBe(2);
  expect(requests).toHaveLength(2);
  await page
    .getByRole("button", { name: "웹사이트 분석 설정", exact: true })
    .click();
  await page.getByRole("button", { name: "허용 안 함", exact: true }).click();
  await expect
    .poll(async () =>
      page.evaluate(
        (key) => JSON.parse(localStorage.getItem(key) ?? "null")?.choice,
        CONSENT_KEY,
      ),
    )
    .toBe("rejected");
  await expect(
    page.locator('script[src*="googletagmanager"], script[data-sdkn]'),
  ).toHaveCount(0);
  expect(requests).toHaveLength(2);
});

test("script failure isolates GA while Vercel still sends a page view", async ({
  page,
}) => {
  await mockVendors(page);
  await page.route("https://www.googletagmanager.com/**", (route) =>
    route.abort(),
  );
  await page.goto("/ko");
  await page.getByRole("button", { name: "분석 허용", exact: true }).click();
  await expect.poll(async () => (await vercelPages(page)).length).toBe(1);
  expect(await gaEvents(page, "page_view")).toEqual([]);
});

for (const preference of ["dnt", "gpc"] as const) {
  test(`saved acceptance cannot override ${preference}`, async ({ page }) => {
    const requests = await mockVendors(page);
    await page.addInitScript(
      ({ key, maxAge, preference }) => {
        localStorage.setItem(
          key,
          JSON.stringify({
            choice: "accepted",
            expiresAt: Date.now() + maxAge,
          }),
        );
        Object.defineProperty(
          navigator,
          preference === "dnt" ? "doNotTrack" : "globalPrivacyControl",
          { get: () => (preference === "dnt" ? "1" : true) },
        );
      },
      { key: CONSENT_KEY, maxAge: CONSENT_MAX_AGE, preference },
    );
    await page.goto("/ko");
    await page
      .getByRole("button", { name: "웹사이트 분석 설정", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "분석 허용", exact: true }),
    ).toBeDisabled();
    expect(requests).toEqual([]);
  });
}

test("storage failure reports the problem and keeps providers off", async ({
  page,
}) => {
  const requests = await mockVendors(page);
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new Error("blocked storage");
    };
  });
  await page.goto("/ko");
  await page.getByRole("button", { name: "분석 허용", exact: true }).click();
  await expect(page.getByRole("status")).toContainText(
    "선택을 저장하지 못했어요",
  );
  expect(requests).toEqual([]);
});

test("expired and malformed stored consent do not load providers", async ({
  page,
}) => {
  const requests = await mockVendors(page);
  await page.addInitScript(
    (key) =>
      localStorage.setItem(
        key,
        JSON.stringify({ choice: "accepted", expiresAt: Date.now() - 1 }),
      ),
    CONSENT_KEY,
  );
  await page.goto("/ko");
  await expect(
    page.getByRole("button", { name: "분석 허용", exact: true }),
  ).toBeVisible();
  expect(requests).toEqual([]);
});

test("cross-tab withdrawal stops loaded tags", async ({ context, page }) => {
  await mockVendors(page);
  await page.goto("/ko");
  await accept(page);
  const other = await context.newPage();
  await mockVendors(other);
  await other.goto("/ko/privacy");
  await other.evaluate(
    (key) =>
      localStorage.setItem(
        key,
        JSON.stringify({ choice: "rejected", expiresAt: Date.now() + 60_000 }),
      ),
    CONSENT_KEY,
  );
  await expect(
    page.locator('script[src*="googletagmanager"], script[data-sdkn]'),
  ).toHaveCount(0);
});

test("repeated navigation keeps one script and one click handler per provider", async ({
  page,
}) => {
  const requests = await mockVendors(page);
  await page.goto("/ko");
  await accept(page);
  for (const [index, slug] of [
    "ai-todo",
    "recurring-todo",
    "shared-todo",
  ].entries()) {
    await page.locator(`a[href="/ko/features/${slug}"]`).click();
    await expect
      .poll(async () => (await gaEvents(page, "page_view")).length)
      .toBe(index + 2);
    await expect
      .poll(async () => (await gaEvents(page, "select_content")).length)
      .toBe(index + 1);
  }
  await page.goBack();
  await expect
    .poll(async () => (await gaEvents(page, "page_view")).length)
    .toBe(5);
  await expect.poll(async () => (await vercelPages(page)).length).toBe(5);
  expect(requests.sort()).toEqual(["ga4", "vercel"]);
  await expect(
    page.locator('script[src*="googletagmanager"], script[data-sdkn]'),
  ).toHaveCount(2);
});
