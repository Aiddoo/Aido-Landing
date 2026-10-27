import { Grid, type GridProps, VStack } from "@/components/ui/layout";
import { analyticsAttributes } from "@/features/analytics/utils/analytics-attributes";
import type { MessageCatalog } from "@/i18n/messages";
import {
  APP_STORE_URL,
  PLAY_STORE_URL as PLAY_STORE_BASE_URL,
} from "@/lib/seo";
import { cn } from "@/lib/utils";

type StoreButtonsProps = Omit<GridProps, "children" | "render" | "content"> & {
  content: MessageCatalog["storeButtons"];
  placement: "hero" | "download" | "invite";
  /** 초대 링크의 맞춤형 제품 페이지처럼 App Store 링크를 바꿔야 할 때만 지정한다. */
  appStoreUrl?: string;
  /** 초대 링크의 Install Referrer처럼 Google Play 링크를 바꿔야 할 때만 지정한다. */
  playStoreUrl?: string;
};

const DEFAULT_PLAY_STORE_URL = `${PLAY_STORE_BASE_URL}&pcampaignid=web_share`;
const storeButtonClass =
  "inline-flex min-h-14 min-w-0 items-center justify-center gap-3 rounded-xl bg-ink px-4 py-2 text-cream shadow-press-ink transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none";

export function StoreButtons({
  content,
  placement,
  appStoreUrl = APP_STORE_URL,
  playStoreUrl = DEFAULT_PLAY_STORE_URL,
  className,
  ...props
}: StoreButtonsProps) {
  return (
    <Grid
      render={<nav aria-label={content.ariaLabel} />}
      data-slot="store-buttons"
      gap={3}
      className={cn(
        "w-full max-w-100 grid-cols-1 min-[400px]:grid-cols-2",
        className,
      )}
      {...props}
    >
      <a
        href={appStoreUrl}
        data-slot="store-button"
        className={storeButtonClass}
        {...analyticsAttributes({
          name: "download_click",
          store: "app_store",
          placement,
        })}
      >
        <svg
          viewBox="0 0 384 512"
          className="size-6 shrink-0 fill-current"
          aria-hidden="true"
        >
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </svg>
        <StoreLabel
          prefix={content.appStorePrefix}
          label={content.appStoreLabel}
        />
      </a>
      <a
        href={playStoreUrl}
        data-slot="store-button"
        className={storeButtonClass}
        {...analyticsAttributes({
          name: "download_click",
          store: "google_play",
          placement,
        })}
      >
        <svg
          viewBox="0 0 512 512"
          className="size-6 shrink-0 fill-current"
          aria-hidden="true"
        >
          <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
        </svg>
        <StoreLabel
          prefix={content.playStorePrefix}
          label={content.playStoreLabel}
        />
      </a>
    </Grid>
  );
}

function StoreLabel({ prefix, label }: { prefix: string; label: string }) {
  return (
    <VStack align="start" className="leading-none">
      <span className="text-[0.6875rem] opacity-75">{prefix}</span>
      <span className="text-title font-bold whitespace-nowrap">{label}</span>
    </VStack>
  );
}
