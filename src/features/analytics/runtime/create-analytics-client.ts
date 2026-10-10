import type { AnalyticsAdapter } from "../models/analytics-adapter";
import {
  type AnalyticsConsent,
  type AnalyticsEvent,
  type AnalyticsPage,
  analyticsEventSchema,
} from "../schemas/analytics.schema";
import { getAnalyticsPage } from "../utils/sanitize-analytics-page";

// Vendor-independent runtime. Unconsented events are discarded, never queued.
export function createAnalyticsClient({
  adapters,
  getConsent,
}: {
  adapters: readonly AnalyticsAdapter[];
  getConsent: () => AnalyticsConsent;
}) {
  const slots = adapters.map((adapter) => ({
    adapter,
    ready: false,
    failed: false,
    previous: "",
  }));
  let controller: AbortController | undefined;
  let currentPage: AnalyticsPage | undefined;
  function sendPage(slot: (typeof slots)[number]) {
    if (
      !currentPage ||
      !slot.ready ||
      slot.failed ||
      getConsent() !== "accepted" ||
      slot.previous === currentPage.location
    )
      return;
    try {
      slot.adapter.pageView(currentPage);
      slot.previous = currentPage.location;
    } catch {
      slot.failed = true;
    }
  }
  return {
    async start(page: AnalyticsPage) {
      const safePage = getAnalyticsPage(page.location, page.locale);
      if (!safePage) return;
      currentPage = safePage;
      if (controller || getConsent() !== "accepted") return;
      const active = new AbortController();
      controller = active;
      await Promise.allSettled(
        slots.map(async (slot) => {
          try {
            await slot.adapter.initialize(safePage, active.signal);
            if (active.signal.aborted || getConsent() !== "accepted") return;
            slot.ready = true;
            sendPage(slot);
          } catch {
            slot.failed = true;
          }
        }),
      );
    },
    pageView(page: AnalyticsPage) {
      const safePage = getAnalyticsPage(page.location, page.locale);
      if (!safePage) return;
      currentPage = safePage;
      for (const slot of slots) sendPage(slot);
    },
    track(event: AnalyticsEvent) {
      if (!currentPage || getConsent() !== "accepted") return;
      const parsed = analyticsEventSchema.safeParse(event);
      if (
        !parsed.success ||
        (parsed.data.name === "language_switch" &&
          parsed.data.targetLocale === currentPage.locale)
      )
        return;
      for (const slot of slots) {
        if (
          !slot.ready ||
          slot.failed ||
          !slot.adapter.supportedEvents.includes(parsed.data.name)
        )
          continue;
        try {
          slot.adapter.track(parsed.data, currentPage);
        } catch {
          slot.failed = true;
        }
      }
    },
    revoke() {
      controller?.abort();
      let requiresReload = false;
      for (const slot of slots) {
        slot.ready = false;
        try {
          requiresReload =
            slot.adapter.revoke().requiresReload || requiresReload;
        } catch {
          requiresReload = true;
        }
      }
      return { requiresReload };
    },
    dispose() {
      controller?.abort();
      for (const slot of slots) {
        slot.ready = false;
        try {
          slot.adapter.dispose();
        } catch {
          /* Every provider still gets disposed. */
        }
      }
    },
  };
}
export type AnalyticsClient = ReturnType<typeof createAnalyticsClient>;
