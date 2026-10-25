import { expect, test } from "@playwright/test";

// These tests deliberately keep analytics rejected and never contact marketing services.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "aido.analytics-consent.v1",
      JSON.stringify({ choice: "rejected", expiresAt: Date.now() + 60_000 }),
    ),
  );
});

for (const locale of ["ko", "en"]) {
  for (const path of [
    "",
    "/services",
    "/features/shared-todo",
    "/features/recurring-todo",
    "/features/ai-todo",
    "/privacy",
    "/terms",
    "/account-deletion",
    "/patch-notes",
  ]) {
    test(`${locale}${path || "/"} fits mobile, tablet and desktop widths`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`/${locale}${path}`);
      await page.evaluate(() => document.fonts.ready);
      for (const width of [
        320, 360, 390, 430, 640, 767, 768, 820, 1023, 1024, 1280, 1440,
      ]) {
        await page.setViewportSize({ width, height: 900 });
        const geometry = await page.evaluate(() => {
          const brand = document
            .querySelector(".site-brand")
            ?.getBoundingClientRect();
          const controls = document
            .querySelector(".site-header-actions")
            ?.getBoundingClientRect();
          return {
            width: document.documentElement.clientWidth,
            scrollWidth: document.documentElement.scrollWidth,
            brandRight: brand?.right ?? 0,
            controlsLeft: controls?.left ?? 0,
            controlsRight: controls?.right ?? 0,
          };
        });
        expect(
          geometry.scrollWidth,
          `${width}px page overflow`,
        ).toBeLessThanOrEqual(geometry.width);
        expect(
          geometry.brandRight,
          `${width}px header overlap`,
        ).toBeLessThanOrEqual(geometry.controlsLeft);
        expect(geometry.controlsRight).toBeLessThanOrEqual(geometry.width);
      }
    });
  }

  test(`${locale} hero copy and downloads share an alignment axis`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${locale}`);
    await page.evaluate(() => document.fonts.ready);
    for (const width of [320, 390, 640, 768, 820, 1023, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const title = await page.locator(".hero-title").boundingBox();
      const description = await page.locator(".hero-description").boundingBox();
      const buttons = await page
        .locator(".hero-copy .store-buttons")
        .boundingBox();
      expect(title).not.toBeNull();
      expect(description).not.toBeNull();
      expect(buttons).not.toBeNull();
      if (!title || !description || !buttons)
        throw new Error("Missing hero content");
      const axis = (box: { x: number; width: number }) =>
        width < 1024 ? box.x + box.width / 2 : box.x;
      expect(Math.abs(axis(title) - axis(description))).toBeLessThanOrEqual(1);
      expect(Math.abs(axis(title) - axis(buttons))).toBeLessThanOrEqual(1);
      const links = await page.locator(".hero-copy .store-button").all();
      const first = await links[0]?.boundingBox();
      const second = await links[1]?.boundingBox();
      expect(first).not.toBeNull();
      expect(second).not.toBeNull();
      if (!first || !second) throw new Error("Missing store links");
      expect(Math.abs(first.width - second.width)).toBeLessThanOrEqual(1);
      if (width < 400) expect(first.y + first.height).toBeLessThan(second.y);
      else expect(first.y).toBe(second.y);
    }
  });
}

test("mobile popover supports keyboard dismissal and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ko");
  const trigger = page.getByRole("button", { name: "메뉴 열기" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.locator('.mobile-menu-panel a[href="/ko#faq"]').click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("a failed menu chunk retains usable native navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ko");
  const trigger = page.getByRole("button", { name: "메뉴 열기" });
  await expect(trigger).toBeEnabled();
  await page.waitForLoadState("networkidle");
  await page.route("**/_next/static/chunks/**", (route) => route.abort());
  await trigger.click();
  const fallback = page.locator(".mobile-menu-enhanced details");
  await expect(fallback).toHaveAttribute("open", "");
  await expect(fallback.getByRole("navigation")).toBeVisible();
  await fallback.locator("summary").click();
  await expect(fallback).not.toHaveAttribute("open", "");
});

test("decorative motion clears its transforms when reduced motion is enabled", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/ko");
  const ornament = page.locator("[data-motion-ornament]").first();
  await expect(ornament).not.toHaveAttribute("style", /transform/);
  await expect(page.locator("h1")).toBeVisible();
  await page.mouse.wheel(0, 300);
  await expect(ornament).toHaveAttribute("style", /transform/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(ornament).not.toHaveAttribute("style", /transform/);
});

test("language links retain the current guide and safe campaign/anchor only", async ({
  page,
}) => {
  await page.goto(
    "/ko/features/ai-todo?utm_source=instagram&email=private%40example.com#steps-title",
  );
  const english = page.getByRole("link", { name: "EN", exact: true });
  await expect(english).toHaveAttribute(
    "href",
    "/en/features/ai-todo?utm_source=instagram#steps-title",
  );
  await english.click();
  await expect(page).toHaveURL(
    /\/en\/features\/ai-todo\?utm_source=instagram#steps-title$/,
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("copy failure provides an accessible selected manual textarea", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("denied")) },
    }),
  );
  await page.goto("/ko/patch-notes");
  const latest = page.locator('details[data-update-kind="app"]').first();
  if (!(await latest.evaluate((element: HTMLDetailsElement) => element.open))) {
    await page.locator(".archive-month > summary").first().click();
    await latest.locator(":scope > summary").click();
  }
  await latest.locator(".release-copy-button").click();
  const textarea = latest.getByRole("textbox");
  await expect(textarea).toBeVisible();
  await expect(textarea).toBeFocused();
  await expect(textarea).toHaveAttribute("readonly", "");
});

test("blocked fonts keep content visible and the landing geometry stable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    let value = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (Reflect.get(entry, "hadRecentInput") === false)
          value += Number(Reflect.get(entry, "value"));
      }
      Reflect.set(window, "__cls", value);
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.route("**/*.woff2", (route) => route.abort());
  await page.goto("/ko");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".hero-phone img")).toBeVisible();
  await expect(
    page.locator("[data-motion-section]").first(),
  ).not.toHaveAttribute("style", /transform/);
  expect(
    await page.evaluate(() => Number(Reflect.get(window, "__cls") ?? 0)),
  ).toBeLessThanOrEqual(0.1);
});

test("no JavaScript retains legal content, FAQ, archives, language links and mobile navigation", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3217/ko");
  await expect(page.locator("h1")).toBeVisible();
  await page.locator("#faq summary").first().click();
  await expect(page.locator("#faq details").first()).toHaveAttribute(
    "open",
    "",
  );
  await page.locator("noscript summary").click();
  await expect(page.locator(".mobile-menu-static")).toBeVisible();
  await page.goto("http://127.0.0.1:3217/ko/patch-notes");
  await page.locator(".archive-month summary").first().click();
  await expect(page.locator(".archive-month").first()).toHaveAttribute(
    "open",
    "",
  );
  await page.goto("http://127.0.0.1:3217/ko/privacy");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("article table").first()).toBeVisible();
  await expect(
    page.getByRole("link", { name: "EN", exact: true }),
  ).toHaveAttribute("href", "/en/privacy");
  await context.close();
});

test("delayed fonts do not cause a late layout shift, on cold and warm visits", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    let value = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (Reflect.get(entry, "hadRecentInput") === false)
          value += Number(Reflect.get(entry, "value"));
      }
      Reflect.set(window, "__cls", value);
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.route("**/*.woff2", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 2_500));
    await route.continue();
  });
  await page.goto("/ko", { waitUntil: "domcontentloaded" });
  await expect(page.locator("h1")).toBeVisible();
  const heading = await page.locator("h1").boundingBox();
  await page.evaluate(() => document.fonts.ready);
  expect(await page.locator("h1").boundingBox()).toEqual(heading);
  expect(
    await page.evaluate(() => Number(Reflect.get(window, "__cls") ?? 0)),
  ).toBeLessThanOrEqual(0.1);
  await page.unroute("**/*.woff2");
  await page.reload();
  await expect(page.locator("h1")).toBeVisible();
  expect(
    await page.evaluate(() => Number(Reflect.get(window, "__cls") ?? 0)),
  ).toBeLessThanOrEqual(0.1);
});
