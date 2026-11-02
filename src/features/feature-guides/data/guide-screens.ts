import type { Locale } from "@/i18n/config";

// 1.13.0 iPhone(6.3인치) 라이트 모드 실제 화면과 1.14.0 Android 날씨 화면.
// 원본은 ko/en 캡처를 640px WebP로 줄였다.
export const guideScreenFiles = {
  "friend-feed": "iphone",
  "todo-nudge": "iphone",
  "repeat-edit": "iphone",
  "home-widgets": "iphone",
  "voice-add": "iphone",
  "memo-ai": "iphone",
  "invite-home": "iphone",
  "paw-board": "iphone",
  "invite-card": "iphone",
  "weather-briefing": "android",
  "weather-next-hour": "android",
  "weather-forecast": "android",
} as const satisfies Record<string, "iphone" | "android">;

export type GuideScreenKey = keyof typeof guideScreenFiles;

const guideScreenSizes = {
  iphone: { width: 640, height: 1391 },
  android: { width: 640, height: 1422 },
} as const;

export function getGuideScreen(locale: Locale, key: GuideScreenKey) {
  const device = guideScreenFiles[key];
  return {
    device,
    src: `/app-assets/guides/${locale}/${key}.webp`,
    ...guideScreenSizes[device],
  };
}
