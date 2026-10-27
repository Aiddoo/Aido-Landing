import { expect, type Page, test } from "@playwright/test";
import { blockAnalyticsVendors } from "./block-analytics-vendors";

test.beforeEach(async ({ page }) => {
  await blockAnalyticsVendors(page);
  await page.addInitScript(() =>
    localStorage.setItem(
      "aido.analytics-consent.v1",
      JSON.stringify({ choice: "rejected", expiresAt: Date.now() + 60_000 }),
    ),
  );
});

async function scrollInstantly(page: Page, top: number) {
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    top,
  );
  await expect
    .poll(() => page.evaluate(() => scrollY))
    .toBeGreaterThan(top - 2);
}

async function markClientNavigation(page: Page) {
  await page.evaluate(() => {
    Object.assign(window, { clientNavigationMarker: true });
  });
}

async function expectClientNavigation(page: Page) {
  expect(
    await page.evaluate(() => "clientNavigationMarker" in window),
    "full page reload",
  ).toBe(true);
}

async function expectBelowHeader(page: Page, selector: string) {
  const { top, header } = await page.evaluate((target) => {
    const element = document.querySelector(target);
    const bar = document.querySelector("header");
    return {
      top: element?.getBoundingClientRect().top ?? -1,
      header: bar?.getBoundingClientRect().bottom ?? 0,
    };
  }, selector);
  expect(top).toBeGreaterThanOrEqual(header);
  expect(top).toBeLessThan(400);
}

test("가이드 카드는 가이드 페이지 맨 위에서 열리고 뒤로 가면 홈 위치로 돌아와요", async ({
  page,
}) => {
  await page.goto("/ko");
  await page.locator("#guides").scrollIntoViewIfNeeded();
  await markClientNavigation(page);
  const homeScroll = await page.evaluate(() => scrollY);
  await page.locator("#guides a").first().click();
  await expect(page).toHaveURL(/\/ko\/features\//);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await expectClientNavigation(page);
  await page.goBack();
  await expect(page).toHaveURL(/\/ko$/);
  await expect
    .poll(() => page.evaluate(() => scrollY))
    .toBeGreaterThan(homeScroll - 200);
});

test("홈의 기능 안내 링크도 가이드 페이지 맨 위에서 열려요", async ({
  page,
}) => {
  await page.goto("/en");
  const link = page.getByRole("link", { name: "How AI to-dos work" });
  await link.scrollIntoViewIfNeeded();
  await link.click();
  await expect(page).toHaveURL(/\/en\/features\/ai-todo$/);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});

test("푸터 링크는 새 페이지 맨 위에서 시작해요", async ({ page }) => {
  await page.goto("/ko/privacy");
  const link = page.locator("footer").getByRole("link", { name: "이용약관" });
  await link.scrollIntoViewIfNeeded();
  await link.click();
  await expect(page).toHaveURL(/\/ko\/terms$/);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});

test("다른 페이지에서 기능 가이드 앵커로 오면 새로고침 없이 제목이 헤더 아래에 보이고 포커스를 받아요", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/ko/services");
  await markClientNavigation(page);
  await page
    .getByRole("navigation", { name: "주요 메뉴" })
    .getByRole("link", { name: "기능 가이드" })
    .click();
  await expect(page).toHaveURL(/\/ko#guides$/);
  await expectClientNavigation(page);
  const title = page.locator("#guides-title");
  await expect(title).toBeFocused();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(1000);
  await expectBelowHeader(page, "#guides");
});

test("같은 페이지 앵커는 reduced-motion이면 즉시 이동하고 제목에 포커스를 줘요", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/en");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Guides" })
    .click();
  await expect(page).toHaveURL(/\/en#guides$/);
  await expect(page.locator("#guides-title")).toBeFocused();
  await expectBelowHeader(page, "#guides");
});

test("건너뛰기 링크는 본문으로 포커스를 옮겨요", async ({ page }) => {
  await page.goto("/ko/services");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#content$/);
  await expect(page.locator("main h1")).toBeFocused();
});

test("모바일 메뉴 링크는 메뉴를 닫고 이동해요", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ko/services");
  await markClientNavigation(page);
  await page.getByRole("button", { name: "메뉴 열기" }).click();
  const dialog = page.getByRole("dialog", { name: "메뉴" });
  await expect(
    dialog.getByRole("link", { name: "서비스 둘러보기" }),
  ).toHaveAttribute("aria-current", "page");
  await dialog.getByRole("link", { name: "앱 다운로드" }).click();
  await expect(page).toHaveURL(/\/ko#download$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expectClientNavigation(page);
  await expect(page.locator("#download h2")).toBeFocused();
  await expectBelowHeader(page, "#download");
});

test("모바일 메뉴로 가이드 페이지에 가면 맨 위에서 시작해요", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ko");
  await scrollInstantly(page, 2400);
  await page.getByRole("button", { name: "메뉴 열기" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "친구와 할 일을 나누고 응원하기" })
    .click();
  await expect(page).toHaveURL(/\/ko\/features\/shared-todo$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});

test("현재 위치를 aria-current로 알려요", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/ko/patch-notes");
  await expect(
    page
      .getByRole("navigation", { name: "주요 메뉴" })
      .getByRole("link", { name: "패치노트" }),
  ).toHaveAttribute("aria-current", "page");
});

test("외부 링크는 새 탭으로 열리고 안내를 읽어 줘요", async ({ page }) => {
  await page.goto("/ko");
  const external = page.locator(
    "footer a[target=_blank], [data-slot=store-button]",
  );
  expect(await external.count()).toBeGreaterThanOrEqual(4);
  for (const link of await external.all()) {
    await expect(link).toHaveAttribute("rel", /noopener/);
    await expect(link).toContainText("새 창에서 열려요");
  }
});

test("언어 전환은 같은 가이드를 열고 맨 위로 되돌리지 않아요", async ({
  page,
}) => {
  await page.goto("/ko/features/ai-todo");
  await scrollInstantly(page, 500);
  await page
    .locator("[data-slot=language-switcher] a:not([aria-current])")
    .click();
  await expect(page).toHaveURL(/\/en\/features\/ai-todo$/);
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(0);
});
