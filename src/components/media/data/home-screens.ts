import type { Locale } from "@/i18n/config";

// 홈에 쓰는 실제 앱 화면(라이트). iPhone 6.3·iPad 13은 캡처_원본/아이두_실화면_1.13.0에서,
// 가로로 펼친 iPhone Duo는 1.12.0 랜딩의 가로 두 칸 캡처(foldable/todo-detail)에서 골라 WebP로 줄였다.
// 기기 테두리는 CSS로 그린다.
export const homeScreenDevices = {
  iphone: { width: 900, height: 1957 },
  "duo-open": { width: 1440, height: 1010 },
  ipad: { width: 1000, height: 1333 },
} as const;

export type HomeScreenDevice = keyof typeof homeScreenDevices;

export const homeScreenFiles = {
  today: "iphone",
  "ai-voice": "iphone",
  "ai-parse": "iphone",
  repeat: "iphone",
  "friend-feed": "iphone",
  "nudge-detail": "iphone",
  "paw-board": "iphone",
  "paw-board-full": "iphone",
  widgets: "iphone",
  report: "iphone",
  reminders: "iphone",
  "duo-open": "duo-open",
  "ipad-detail": "ipad",
} as const satisfies Record<string, HomeScreenDevice>;

export type HomeScreenKey = keyof typeof homeScreenFiles;

export function getHomeScreen(locale: Locale, screen: HomeScreenKey) {
  const device = homeScreenFiles[screen];
  return {
    src: `/app-assets/home/${locale}/${screen}.webp`,
    device,
    ...homeScreenDevices[device],
  } as const;
}

/** 앱의 고양이 일러스트(ido_cat_hi, ido_cat_suggestion). 장식이라 alt를 비운다. */
export const homeCatImages = {
  hi: "/app-assets/cat-hi.webp",
  note: "/app-assets/home/cat-note.webp",
} as const;

export const HOME_CAT_SIZE = { width: 480, height: 480 } as const;
