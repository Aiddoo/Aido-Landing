import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { getAnalyticsConfig } from "../config/analytics-config.server";

afterEach(() => vi.unstubAllEnvs());
function production() {
  vi.stubEnv("VERCEL_ENV", "production");
  vi.stubEnv("VERCEL", "1");
  vi.stubEnv("ANALYTICS_PROVIDERS", "ga4,vercel");
  vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST123");
}
describe("server analytics configuration", () => {
  it("excludes preview and local traffic", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("ANALYTICS_PROVIDERS", "invalid");
    expect(getAnalyticsConfig()).toEqual({ providers: [] });
  });
  it("supports explicitly disabling every provider", () => {
    production();
    vi.stubEnv("ANALYTICS_PROVIDERS", "none");
    expect(getAnalyticsConfig()).toEqual({ providers: [] });
  });
  it("disables only GA when its ID is missing", () => {
    production();
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");
    expect(getAnalyticsConfig()).toEqual({ providers: [{ id: "vercel" }] });
  });
  it("fails on an invalid production measurement ID", () => {
    production();
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "not-a-measurement-id");
    expect(() => getAnalyticsConfig()).toThrow();
  });
  it("fails on unregistered providers", () => {
    production();
    vi.stubEnv("ANALYTICS_PROVIDERS", "marketing-tool");
    expect(() => getAnalyticsConfig()).toThrow();
  });
  it("preserves validated public Vercel configuration", () => {
    production();
    vi.stubEnv(
      "NEXT_PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG",
      '{"analytics":{"dsn":"public-dsn"}}',
    );
    vi.stubEnv("NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH", "/custom");
    expect(getAnalyticsConfig().providers).toContainEqual({
      id: "vercel",
      configuration: '{"analytics":{"dsn":"public-dsn"}}',
      basePath: "/custom",
    });
  });
  it("rejects malformed SDK configuration and foreign basepaths", () => {
    production();
    vi.stubEnv("NEXT_PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG", "bad-json");
    expect(() => getAnalyticsConfig()).toThrow();
    vi.stubEnv("NEXT_PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG", "");
    vi.stubEnv(
      "NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH",
      "//foreign.example",
    );
    expect(() => getAnalyticsConfig()).toThrow();
  });
});
