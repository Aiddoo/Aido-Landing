import { defineConfig, devices } from "@playwright/test";

const port = process.env.PLAYWRIGHT_PORT ?? "3217";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: "list",
  use: { baseURL: `http://localhost:${port}`, trace: "retain-on-failure" },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        ...(process.env.PLAYWRIGHT_CHANNEL
          ? { channel: process.env.PLAYWRIGHT_CHANNEL }
          : {}),
      },
    },
  ],
  webServer: {
    command:
      process.env.PLAYWRIGHT_DEV === "1"
        ? `pnpm dev --port ${port}`
        : process.env.PLAYWRIGHT_SKIP_BUILD === "1"
          ? `pnpm start --port ${port}`
          : `pnpm build && pnpm start --port ${port}`,
    url: `http://localhost:${port}/ko`,
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      VERCEL_ENV: "production",
      VERCEL: "1",
      ANALYTICS_PROVIDERS: "ga4,vercel",
      NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-TEST123",
    },
  },
});
