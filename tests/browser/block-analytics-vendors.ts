import type { Page } from "@playwright/test";

// 분석 공급자 스크립트는 빈 응답으로 대체해 로컬 404와 실제 수집 요청을 모두 막는다.
export async function blockAnalyticsVendors(page: Page) {
  await page.route("https://www.googletagmanager.com/**", (route) =>
    route.fulfill({ contentType: "application/javascript", body: "" }),
  );
  await page.route("**/_vercel/insights/script.js", (route) =>
    route.fulfill({ contentType: "application/javascript", body: "" }),
  );
}
