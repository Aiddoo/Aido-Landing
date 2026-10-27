import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "aido.analytics-consent.v1",
      JSON.stringify({ choice: "rejected", expiresAt: Date.now() + 60_000 }),
    ),
  );
});

test("theme follows the device first, then the visitor's choice without hydration errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.emulateMedia({ colorScheme: "dark" });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/ko");
  const html = page.locator("html");
  await expect(html).toHaveClass(/\bdark\b/);
  const darkBackground = await page.evaluate(
    () => getComputedStyle(document.body).backgroundColor,
  );

  await page.getByRole("button", { name: "화면 모드 바꾸기" }).click();
  await page.getByRole("menuitemradio", { name: "밝게" }).click();
  await expect(html).not.toHaveClass(/\bdark\b/);
  expect(
    await page.evaluate(() => getComputedStyle(document.body).backgroundColor),
  ).not.toBe(darkBackground);

  await page.reload();
  await expect(html).not.toHaveClass(/\bdark\b/);
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(
    "light",
  );

  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "메뉴 열기" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "화면 모드 바꾸기" })
    .click();
  await page.getByRole("menuitemradio", { name: "기기 설정대로" }).click();
  await expect(html).toHaveClass(/\bdark\b/);
  expect(errors.filter((text) => /hydrat/i.test(text))).toEqual([]);
});
