import { describe, expect, it, vi } from "vitest";
import {
  createGa4Adapter,
  type GoogleTransport,
} from "../adapters/ga4-adapter";
import type { AnalyticsAdapter } from "../models/analytics-adapter";
import { createAnalyticsClient } from "../runtime/create-analytics-client";
import {
  CONSENT_MAX_AGE,
  type ConsentPlatform,
  createConsentStore,
  readAnalyticsConsent,
} from "../runtime/create-consent-store";
import {
  type AnalyticsConsent,
  type AnalyticsPage,
  analyticsConfigSchema,
  analyticsEventSchema,
} from "../schemas/analytics.schema";
import { analyticsAttributes } from "../utils/analytics-attributes";
import { parseAnalyticsAttributes } from "../utils/parse-analytics-attributes";
import {
  getAnalyticsPage,
  getAnalyticsReferrer,
} from "../utils/sanitize-analytics-page";

const home: AnalyticsPage = {
  location: "https://aido.kr/ko",
  path: "/ko",
  type: "home",
  locale: "ko",
};
const services: AnalyticsPage = {
  location: "https://aido.kr/ko/services",
  path: "/ko/services",
  type: "services",
  locale: "ko",
};
function fakeAdapter(id = "replacement"): AnalyticsAdapter {
  return {
    id,
    supportedEvents: [
      "download_click",
      "feature_guide_click",
      "language_switch",
    ],
    initialize: vi.fn(async () => {}),
    pageView: vi.fn(),
    track: vi.fn(),
    revoke: vi.fn(() => ({ requiresReload: false })),
    dispose: vi.fn(),
  };
}
function consentPlatform(): ConsentPlatform {
  let value: string | null = null;
  return {
    read: () => value,
    write: (next) => {
      value = next;
    },
    now: () => 1_000,
    privacyOptOut: () => false,
    subscribe: vi.fn(() => vi.fn()),
  };
}

describe("public analytics boundary", () => {
  for (const locale of ["ko", "en"] as const) {
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
      it(`sanitizes ${locale}${route}`, () => {
        expect(
          getAnalyticsPage(
            `https://aido.kr/${locale}${route}?email=private%40example.com&token=secret#private`,
            locale,
          ),
        ).toMatchObject({
          path: `/${locale}${route}`,
          location: `https://aido.kr/${locale}${route}`,
          locale,
        });
      });
    }
  }
  it("keeps valid campaign slugs only", () => {
    expect(
      getAnalyticsPage(
        "/?utm_source=instagram&utm_campaign=hello%20world&utm_term=private%40example.com&analytics_debug=1",
        "ko",
      )?.location,
    ).toBe("https://aido.kr/ko?utm_source=instagram");
    expect(
      getAnalyticsPage(`/ko?utm_content=${"a".repeat(101)}`, "ko")?.location,
    ).toBe(home.location);
  });
  it.each([
    "/ko/unknown-private-id",
    "/en/features/private",
    "javascript:secret",
    "http://[",
  ])("rejects %s", (url) => {
    expect(getAnalyticsPage(url, "ko")).toBeNull();
  });
  it("reduces external referrers to origin", () => {
    expect(
      getAnalyticsReferrer("https://google.com/search?q=private#personal"),
    ).toBe("https://google.com");
    expect(getAnalyticsReferrer("javascript:secret")).toBe("");
  });
  it("validates delegated event attributes and rejects arbitrary payloads", () => {
    expect(
      parseAnalyticsAttributes({
        analyticsEvent: "download_click",
        store: "app_store",
        placement: "hero",
      }),
    ).toEqual({
      name: "download_click",
      store: "app_store",
      placement: "hero",
    });
    expect(
      parseAnalyticsAttributes({
        analyticsEvent: "feature_guide_click",
        featureSlug: "private-id",
        placement: "home_guides",
      }),
    ).toBeNull();
    expect(
      analyticsEventSchema.safeParse({
        name: "language_switch",
        targetLocale: "ko",
        email: "private",
      }).success,
    ).toBe(false);
    expect(
      analyticsAttributes({
        name: "feature_guide_click",
        slug: "ai-todo",
        placement: "related_guides",
      })["data-analytics-event"],
    ).toBe("feature_guide_click");
  });
  it("requires a valid public GA measurement ID", () => {
    expect(
      analyticsConfigSchema.safeParse({
        providers: [{ id: "ga4", measurementId: "secret" }],
      }).success,
    ).toBe(false);
  });
});

describe("consent persistence", () => {
  it.each([
    null,
    "bad json",
    "true",
    '{"choice":"granted"}',
    '{"choice":"accepted","expiresAt":"forever"}',
  ])("blocks malformed storage: %s", (value) => {
    expect(readAnalyticsConsent(value, 1_000)).toBe("pending");
  });
  it("enforces expiry and rejects timestamps beyond 180 days", () => {
    for (const choice of ["accepted", "rejected"]) {
      expect(
        readAnalyticsConsent(
          JSON.stringify({ choice, expiresAt: 1_000 + CONSENT_MAX_AGE }),
          1_000,
        ),
      ).toBe(choice);
      expect(
        readAnalyticsConsent(
          JSON.stringify({ choice, expiresAt: 1_000 }),
          1_000,
        ),
      ).toBe("pending");
      expect(
        readAnalyticsConsent(
          JSON.stringify({ choice, expiresAt: 1_001 + CONSENT_MAX_AGE }),
          1_000,
        ),
      ).toBe("pending");
    }
  });
  it("shares one external subscription and cleans it up", () => {
    const platform = consentPlatform();
    const store = createConsentStore(platform);
    const callback = vi.fn();
    const first = store.subscribe(callback);
    const second = store.subscribe(vi.fn());
    expect(platform.subscribe).toHaveBeenCalledTimes(1);
    expect(store.choose("accepted")).toBe(true);
    expect(callback).toHaveBeenCalledTimes(1);
    first();
    second();
    expect(
      vi.mocked(platform.subscribe).mock.results[0]?.value,
    ).toHaveBeenCalledTimes(1);
  });
  it("blocks storage write failures even after previous acceptance", () => {
    const platform = consentPlatform();
    const store = createConsentStore(platform);
    const callback = vi.fn();
    store.subscribe(callback);
    store.choose("accepted");
    platform.write = () => {
      throw new Error("blocked");
    };
    expect(store.choose("rejected")).toBe(false);
    expect(store.getSnapshot()).toBe("pending");
    expect(callback).toHaveBeenCalledTimes(2);
  });
  it("respects privacy opt-outs regardless of saved preference", () => {
    const platform = consentPlatform();
    const store = createConsentStore(platform);
    store.choose("accepted");
    platform.privacyOptOut = () => true;
    expect(store.getSnapshot()).toBe("rejected");
    expect(store.choose("accepted")).toBe(false);
  });
  it("blocks storage read failures", () => {
    const platform = consentPlatform();
    platform.read = () => {
      throw new Error("blocked");
    };
    expect(createConsentStore(platform).getSnapshot()).toBe("pending");
  });
});

describe("provider-independent runtime", () => {
  it("discards clicks before consent and sends one initial page view", async () => {
    let consent: AnalyticsConsent = "pending";
    const adapter = fakeAdapter();
    const client = createAnalyticsClient({
      adapters: [adapter],
      getConsent: () => consent,
    });
    await client.start(home);
    client.track({
      name: "download_click",
      store: "app_store",
      placement: "hero",
    });
    expect(adapter.initialize).not.toHaveBeenCalled();
    expect(adapter.track).not.toHaveBeenCalled();
    consent = "accepted";
    await client.start(home);
    client.pageView(home);
    await client.start(home);
    expect(adapter.initialize).toHaveBeenCalledTimes(1);
    expect(adapter.pageView).toHaveBeenCalledTimes(1);
    expect(adapter.track).not.toHaveBeenCalled();
    client.pageView(services);
    client.pageView(home);
    expect(adapter.pageView).toHaveBeenCalledTimes(3);
  });
  it("supports replacement providers without changing the feature event", async () => {
    const replacement = fakeAdapter();
    const client = createAnalyticsClient({
      adapters: [replacement],
      getConsent: () => "accepted",
    });
    await client.start(home);
    const event = {
      name: "download_click",
      store: "google_play",
      placement: "download",
    } as const;
    client.track(event);
    expect(replacement.track).toHaveBeenCalledWith(event, home);
    client.track({ name: "language_switch", targetLocale: "ko" });
    expect(replacement.track).toHaveBeenCalledTimes(1);
  });
  it("uses the current page when initialization finishes after navigation", async () => {
    let finish: () => void = () => {};
    const adapter = fakeAdapter();
    adapter.initialize = () =>
      new Promise<void>((resolve) => {
        finish = resolve;
      });
    const client = createAnalyticsClient({
      adapters: [adapter],
      getConsent: () => "accepted",
    });
    const started = client.start(home);
    client.pageView(services);
    finish();
    await started;
    expect(adapter.pageView).toHaveBeenCalledWith(services);
    expect(adapter.pageView).toHaveBeenCalledTimes(1);
  });
  it("isolates failed providers and unsupported events", async () => {
    const broken = fakeAdapter("broken");
    broken.initialize = async () => {
      throw new Error("script failed");
    };
    const basic: AnalyticsAdapter = {
      ...fakeAdapter("basic"),
      supportedEvents: [],
    };
    const client = createAnalyticsClient({
      adapters: [broken, basic],
      getConsent: () => "accepted",
    });
    await client.start(home);
    client.track({
      name: "download_click",
      store: "app_store",
      placement: "hero",
    });
    expect(basic.pageView).toHaveBeenCalledTimes(1);
    expect(basic.track).not.toHaveBeenCalled();
    expect(broken.pageView).not.toHaveBeenCalled();
  });
  it("aborts initialization and disables every provider on withdrawal", async () => {
    let consent: AnalyticsConsent = "accepted";
    const adapter = fakeAdapter();
    const client = createAnalyticsClient({
      adapters: [adapter],
      getConsent: () => consent,
    });
    await client.start(home);
    consent = "rejected";
    client.revoke();
    client.pageView(services);
    client.track({
      name: "download_click",
      store: "app_store",
      placement: "hero",
    });
    client.dispose();
    expect(adapter.pageView).toHaveBeenCalledTimes(1);
    expect(adapter.track).not.toHaveBeenCalled();
    expect(adapter.revoke).toHaveBeenCalledOnce();
    expect(adapter.dispose).toHaveBeenCalledOnce();
  });
  it("never publishes a late initialization after disposal", async () => {
    let finish: () => void = () => {};
    const adapter = fakeAdapter();
    adapter.initialize = () =>
      new Promise<void>((resolve) => {
        finish = resolve;
      });
    const client = createAnalyticsClient({
      adapters: [adapter],
      getConsent: () => "accepted",
    });
    const started = client.start(home);
    client.dispose();
    finish();
    await started;
    expect(adapter.pageView).not.toHaveBeenCalled();
  });
  it("preserves the GA select_content contract inside its adapter", async () => {
    const transport: GoogleTransport = {
      pageView: vi.fn(),
      event: vi.fn(),
      revoke: vi.fn(),
    };
    const adapter = createGa4Adapter("G-TEST", {
      initialize: async () => transport,
    });
    await adapter.initialize(home, new AbortController().signal);
    adapter.track(
      {
        name: "feature_guide_click",
        slug: "ai-todo",
        placement: "home_guides",
      },
      home,
    );
    expect(transport.event).toHaveBeenCalledWith(
      "select_content",
      expect.objectContaining({
        content_type: "feature_guide",
        item_id: "ai-todo",
        cta_placement: "home_guides",
        page_path: "/ko",
      }),
    );
  });
});
