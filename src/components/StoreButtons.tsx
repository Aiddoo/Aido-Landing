import type { MessageCatalog } from "@/i18n/messages";
import {
  APP_STORE_URL,
  INSTAGRAM_URL,
  PLAY_STORE_URL as PLAY_STORE_BASE_URL,
} from "@/lib/seo";

type StoreButtonsProps = {
  content: MessageCatalog["storeButtons"];
};

const PLAY_STORE_URL = `${PLAY_STORE_BASE_URL}&pcampaignid=web_share`;
const storeButtonClass =
  "group inline-flex items-center gap-4 wobbly border-[3px] border-foreground bg-white px-8 py-4 text-foreground transition-all hand-shadow hover:bg-muted hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]";

export function StoreButtons({ content }: StoreButtonsProps) {
  return (
    <nav
      aria-label="Download links"
      className="flex flex-col items-center gap-6"
    >
      <div className="flex flex-wrap items-center justify-center gap-6">
        <a
          href={APP_STORE_URL}
          aria-label={`${content.appStorePrefix} ${content.appStoreLabel}`}
          className={storeButtonClass}
        >
          <svg
            viewBox="0 0 384 512"
            width="28"
            height="28"
            className="fill-current rotate-[-4deg]"
            aria-hidden="true"
            role="img"
          >
            <title>App Store Logo</title>
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
          </svg>
          <div className="flex flex-col items-start leading-none group-hover:rotate-1">
            <span className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">
              {content.appStorePrefix}
            </span>
            <span className="text-2xl font-bold text-nowrap">
              {content.appStoreLabel}
            </span>
          </div>
        </a>

        <a
          href={PLAY_STORE_URL}
          aria-label={`${content.playStorePrefix} ${content.playStoreLabel}`}
          className={storeButtonClass}
        >
          <svg
            viewBox="0 0 512 512"
            width="28"
            height="28"
            className="fill-current rotate-3"
            aria-hidden="true"
            role="img"
          >
            <title>Google Play Store Logo</title>
            <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
          </svg>
          <div className="flex flex-col items-start leading-none group-hover:-rotate-1">
            <span className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">
              {content.playStorePrefix}
            </span>
            <span className="text-2xl font-bold text-nowrap">
              {content.playStoreLabel}
            </span>
          </div>
        </a>
      </div>

      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${content.instagramPrefix} ${content.instagramLabel}`}
        className={storeButtonClass}
      >
        <svg
          viewBox="0 0 448 512"
          width="28"
          height="28"
          className="fill-current rotate-[-2deg]"
          aria-hidden="true"
          role="img"
        >
          <title>Instagram Logo</title>
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
        </svg>
        <div className="flex flex-col items-start leading-none group-hover:rotate-1">
          <span className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">
            {content.instagramPrefix}
          </span>
          <span className="text-2xl font-bold text-nowrap">
            {content.instagramLabel}
          </span>
        </div>
      </a>
    </nav>
  );
}
