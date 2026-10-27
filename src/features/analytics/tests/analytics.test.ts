import { afterEach, describe, expect, it, vi } from "vitest";
import { privacyOptOut } from "../browser/browser-consent-platform";
import {
  CONSENT_MAX_AGE,
  type ConsentPlatform,
  createConsentStore,
  readAnalyticsConsent,
} from "../runtime/create-consent-store";
import {
  getGoogleConsentUpdate,
  googleConsentDefault,
} from "../runtime/google-consent";
import {
  analyticsConfigSchema,
  analyticsEventSchema,
} from "../schemas/analytics.schema";
import { analyticsAttributes } from "../utils/analytics-attributes";
import { parseAnalyticsAttributes } from "../utils/parse-analytics-attributes";
import {
  createVercelBeforeSend,
  getAnalyticsPage,
  getAnalyticsReferrer,
} from "../utils/sanitize-analytics-page";

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

describe("event schema", () => {
  it.each([
    { name: "download_click", store: "app_store", cta_placement: "invite" },
    {
      name: "select_content",
      content_type: "feature_guide",
      item_id: "ai-todo",
      cta_placement: "related_guides",
    },
    { name: "language_switch", target_locale: "en" },
    { name: "invite_code_copy", copy_result: "manual" },
  ])("accepts $name", (event) => {
    expect(analyticsEventSchema.safeParse(event).success).toBe(true);
  });
  it.each([
    { name: "download_click", store: "app_store", placement: "hero" },
    {
      name: "select_content",
      content_type: "feature_guide",
      item_id: "private-id",
      cta_placement: "home_guides",
    },
    { name: "language_switch", target_locale: "ko", email: "private" },
    { name: "invite_code_copy", copy_result: "copied", code: "BCD234" },
    { name: "feature_guide_click", slug: "ai-todo" },
  ])(
    "rejects unknown names, legacy keys and extra parameters (%#)",
    (event) => {
      expect(analyticsEventSchema.safeParse(event).success).toBe(false);
    },
  );
  it("round-trips the data attribute through the schema", () => {
    const event = {
      name: "download_click",
      store: "google_play",
      cta_placement: "download",
    } as const;
    expect(
      parseAnalyticsAttributes({
        analytics: analyticsAttributes(event)["data-analytics"],
      }),
    ).toEqual(event);
    expect(parseAnalyticsAttributes({ analytics: "{bad json" })).toBeNull();
    expect(parseAnalyticsAttributes({})).toBeNull();
  });
  it("requires a valid public GA measurement ID", () => {
    expect(
      analyticsConfigSchema.safeParse({
        providers: [{ id: "ga4", measurementId: "secret" }],
      }).success,
    ).toBe(false);
  });
});

describe("public path normalization", () => {
  for (const locale of ["ko", "en"] as const) {
    for (const route of [
      "",
      "/services",
      "/features/ai-todo",
      "/patch-notes",
      "/privacy",
      "/account-deletion",
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
  it("takes the locale from the path and falls back for unprefixed paths", () => {
    expect(getAnalyticsPage("/en/services", "ko")?.path).toBe("/en/services");
    expect(getAnalyticsPage("/", "en")?.path).toBe("/en");
  });
  it("keeps valid campaign slugs only", () => {
    expect(
      getAnalyticsPage(
        "/?utm_source=instagram&utm_campaign=hello%20world&utm_term=private%40example.com&analytics_debug=1",
        "ko",
      )?.location,
    ).toBe("https://aido.kr/ko?utm_source=instagram");
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
});

describe("Vercel beforeSend", () => {
  it("drops invite codes from page views and custom events", () => {
    const beforeSend = createVercelBeforeSend("ko");
    expect(
      beforeSend({ type: "pageview", url: "https://aido.kr/i/BCD234?x=1" }),
    ).toEqual({ type: "pageview", url: "https://aido.kr/ko/invite" });
    expect(
      beforeSend({ type: "event", url: "https://aido.kr/en/invite/BCD234" }),
    ).toEqual({ type: "event", url: "https://aido.kr/en/invite" });
  });
  it("drops unknown paths and consecutive duplicate page views", () => {
    const beforeSend = createVercelBeforeSend("ko");
    expect(
      beforeSend({ type: "pageview", url: "https://aido.kr/ko/private-id" }),
    ).toBeNull();
    const home = { type: "pageview", url: "https://aido.kr/ko" } as const;
    expect(beforeSend(home)).toEqual(home);
    expect(beforeSend(home)).toBeNull();
    expect(beforeSend({ type: "event", url: home.url })).toEqual({
      type: "event",
      url: home.url,
    });
  });
});

describe("Google consent mode", () => {
  it("denies every storage by default and waits for a stored choice", () => {
    expect(googleConsentDefault).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      wait_for_update: 500,
    });
  });
  it("grants analytics storage only for an accepted choice", () => {
    expect(getGoogleConsentUpdate("accepted")).toEqual({
      analytics_storage: "granted",
    });
    expect(getGoogleConsentUpdate("rejected")).toEqual({
      analytics_storage: "denied",
    });
    expect(getGoogleConsentUpdate("pending")).toEqual({
      analytics_storage: "denied",
    });
  });
  afterEach(() => vi.unstubAllGlobals());
  it.each([
    [{ doNotTrack: "1" }, true],
    [{ globalPrivacyControl: true }, true],
    [{ doNotTrack: "0", globalPrivacyControl: false }, false],
  ])("treats DNT/GPC %o as an opt-out: %s", (signals, expected) => {
    vi.stubGlobal("navigator", signals);
    expect(privacyOptOut()).toBe(expected);
  });
  it("keeps DNT/GPC visitors denied even with a saved acceptance", () => {
    const platform = consentPlatform();
    const store = createConsentStore(platform);
    store.choose("accepted");
    platform.privacyOptOut = () => true;
    expect(getGoogleConsentUpdate(store.getSnapshot())).toEqual({
      analytics_storage: "denied",
    });
  });
  it("moves from pending to accepted and back to rejected", () => {
    const store = createConsentStore(consentPlatform());
    expect(store.getSnapshot()).toBe("pending");
    store.choose("accepted");
    expect(getGoogleConsentUpdate(store.getSnapshot())).toEqual({
      analytics_storage: "granted",
    });
    store.choose("rejected");
    expect(getGoogleConsentUpdate(store.getSnapshot())).toEqual({
      analytics_storage: "denied",
    });
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

describe("invite page analytics", () => {
  it.each(["ko", "en"] as const)(
    "집계 주소에서 초대 코드를 버린다 (%s)",
    (locale) => {
      const page = getAnalyticsPage(
        "https://aido.kr/i/BCD234?token=secret#private",
        locale,
      );
      expect(page).toMatchObject({
        path: `/${locale}/invite`,
        location: `https://aido.kr/${locale}/invite`,
        type: "invite",
        locale,
      });
      expect(JSON.stringify(page)).not.toContain("BCD234");
    },
  );
  it.each(["ko", "en"] as const)(
    "rewrite된 실제 경로도 같은 /invite로 집계하고 코드를 버린다 (%s)",
    (locale) => {
      const page = getAnalyticsPage(
        `https://aido.kr/${locale}/invite/BCD234?token=secret`,
        locale,
      );
      expect(page).toMatchObject({
        path: `/${locale}/invite`,
        location: `https://aido.kr/${locale}/invite`,
        type: "invite",
        locale,
      });
      expect(JSON.stringify(page)).not.toContain("BCD234");
    },
  );
  it("초대 주소가 아닌 /i 경로는 집계하지 않는다", () => {
    expect(getAnalyticsPage("https://aido.kr/i", "ko")).toBeNull();
    expect(getAnalyticsPage("https://aido.kr/i/a/b", "ko")).toBeNull();
    expect(getAnalyticsPage("https://aido.kr/ko/invite/a/b", "ko")).toBeNull();
  });
});
