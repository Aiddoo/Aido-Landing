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
window.__vercelEvents = [];
let beforeSend;
const queue = window.vaq || [];
window.va = (type, properties) => {
  if (type === "beforeSend") beforeSend = properties;
  if (type === "pageview" || type === "event") {
    const event = { type: type === "pageview" ? "pageview" : "event", url: location.href };
    const result = beforeSend ? beforeSend(event) : null;
    if (result) window.__vercelEvents.push({ ...result, name: properties.name ?? null });
  }
};
queue.forEach(([type, properties]) => window.va(type, properties));
`;
const commandSchema = z.array(z.array(z.unknown()));
const vercelEventSchema = z.array(
  z.object({ type: z.string(), url: z.string(), name: z.string().nullable() }),
);

async function mockVendors(page: Page) {
  await page.route("https://www.googletagmanager.com/**", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: googleScript,
    }),
  );
  await page.route("**/_vercel/insights/script.js", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: vercelScript,
    }),
  );
}
async function gaCommands(page: Page) {
  return commandSchema.parse(
    await page.evaluate(() => Reflect.get(window, "__gaCommands") ?? []),
  );
}
async function gaEvents(page: Page, name: string) {
  return (await gaCommands(page)).filter(
    (command) => command[0] === "event" && command[1] === name,
  );
}
async function consentCommands(page: Page) {
  return (await gaCommands(page)).filter((command) => command[0] === "consent");
}
async function vercelEvents(page: Page) {
  return vercelEventSchema.parse(
    await page.evaluate(() => Reflect.get(window, "__vercelEvents") ?? []),
  );
}
function storeConsent(page: Page, choice: "accepted" | "rejected") {
  return page.addInitScript(
    ({ key, maxAge, choice }) =>
      localStorage.setItem(
        key,
        JSON.stringify({ choice, expiresAt: Date.now() + maxAge }),
      ),
    { key: CONSENT_KEY, maxAge: CONSENT_MAX_AGE, choice },
  );
}

test("measures cookieless before consent and grants analytics storage on accept", async ({
  page,
}) => {
  await mockVendors(page);
  await page.goto("/ko?utm_source=instagram&email=private%40example.com");
  await expect
    .poll(async () => (await gaEvents(page, "page_view")).length)
    .toBe(1);
  const commands = await gaCommands(page);
  expect(commands[0]).toEqual([
    "consent",
    "default",
    {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      wait_for_update: 500,
    },
  ]);
  expect(await consentCommands(page)).toHaveLength(1);
  expect((await gaEvents(page, "page_view"))[0]?.[2]).toMatchObject({
    page_location: "https://aido.kr/ko?utm_source=instagram",
    page_path: "/ko",
  });
  await expect.poll(async () => (await vercelEvents(page)).length).toBe(1);

  await page.getByRole("button", { name: "허용", exact: true }).click();
  await expect(
    page.getByRole("region", { name: "방문 통계 쿠키" }),
  ).toBeHidden();
  expect((await consentCommands(page)).at(-1)).toEqual([
    "consent",
    "update",
    { analytics_storage: "granted" },
  ]);
});

test("restores a saved acceptance before config and hides the card", async ({
  page,
}) => {
  await mockVendors(page);
  await storeConsent(page, "accepted");
  await page.goto("/ko");
  await expect
    .poll(async () => (await gaEvents(page, "page_view")).length)
    .toBe(1);
  const commands = await gaCommands(page);
  const update = commands.findIndex((command) => command[1] === "update");
  const config = commands.findIndex((command) => command[0] === "config");
  expect(update).toBeGreaterThan(0);
  expect(update).toBeLessThan(config);
  await expect(
    page.getByRole("region", { name: "방문 통계 쿠키" }),
  ).toHaveCount(0);
});

test("keeps storage denied after decline and lets the footer reopen the choice", async ({
  page,
}) => {
  await mockVendors(page);
  await page.goto("/ko");
  await page.getByRole("button", { name: "거부", exact: true }).click();
  await page.reload();
  await expect
    .poll(async () => (await gaEvents(page, "page_view")).length)
    .toBe(1);
  expect(await consentCommands(page)).toHaveLength(1);
  await page.getByRole("button", { name: "쿠키 설정", exact: true }).click();
  await expect(
    page.getByRole("region", { name: "방문 통계 쿠키" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("region", { name: "방문 통계 쿠키" }),
  ).toHaveCount(0);
});

for (const preference of ["dnt", "gpc"] as const) {
  test(`${preference} keeps storage denied and hides the card`, async ({
    page,
  }) => {
    await mockVendors(page);
    await storeConsent(page, "accepted");
    await page.addInitScript((preference) => {
      Object.defineProperty(
        navigator,
        preference === "dnt" ? "doNotTrack" : "globalPrivacyControl",
        { get: () => (preference === "dnt" ? "1" : true) },
      );
    }, preference);
    await page.goto("/ko");
    await expect
      .poll(async () => (await gaEvents(page, "page_view")).length)
      .toBe(1);
    expect(await consentCommands(page)).toHaveLength(1);
    await expect(
      page.getByRole("region", { name: "방문 통계 쿠키" }),
    ).toHaveCount(0);
    await page.getByRole("button", { name: "쿠키 설정", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "허용", exact: true }),
    ).toBeDisabled();
  });
}

test("drops invite codes from every provider", async ({ page }) => {
  await mockVendors(page);
  await storeConsent(page, "rejected");
  await page.goto("/i/BCD234");
  await expect
    .poll(async () => (await gaEvents(page, "page_view")).length)
    .toBe(1);
  await expect.poll(async () => (await vercelEvents(page)).length).toBe(1);
  expect(JSON.stringify(await gaCommands(page))).not.toContain("BCD234");
  expect(JSON.stringify(await vercelEvents(page))).not.toContain("BCD234");
  expect((await vercelEvents(page))[0]?.url).toBe("https://aido.kr/ko/invite");
});

test("sends one page view per navigation and typed clicks to both providers", async ({
  page,
}) => {
  await mockVendors(page);
  await storeConsent(page, "accepted");
  await page.goto("/ko");
  await expect
    .poll(async () => (await gaEvents(page, "page_view")).length)
    .toBe(1);
  await page.evaluate(() =>
    document
      .querySelector<HTMLAnchorElement>("[data-analytics*=download_click]")
      ?.addEventListener("click", (event) => event.preventDefault()),
  );
  await page.locator("[data-analytics*=download_click]").first().click();
  await expect
    .poll(async () => (await gaEvents(page, "download_click")).length)
    .toBe(1);
  await page.locator('a[href="/ko/features/ai-todo"]').first().click();
  await expect(page).toHaveURL(/\/ko\/features\/ai-todo$/);
  await expect
    .poll(async () => (await gaEvents(page, "page_view")).length)
    .toBe(2);
  expect((await gaEvents(page, "select_content"))[0]?.[2]).toMatchObject({
    item_id: "ai-todo",
    content_type: "feature_guide",
  });
  await expect
    .poll(async () =>
      (await vercelEvents(page)).map((event) => event.name ?? event.type),
    )
    .toEqual(["pageview", "download_click", "select_content", "pageview"]);
});

test("storage failure reports the problem and keeps storage denied", async ({
  page,
}) => {
  await mockVendors(page);
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new Error("blocked storage");
    };
  });
  await page.goto("/ko");
  await page.getByRole("button", { name: "허용", exact: true }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "선택을 저장하지 못했어요" }),
  ).toBeVisible();
  expect(await consentCommands(page)).toHaveLength(1);
});
