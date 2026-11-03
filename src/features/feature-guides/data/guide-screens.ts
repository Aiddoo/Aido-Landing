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
  "weather-rain-briefing": "android",
  "weather-rain-reschedule": "android",
  "weather-heat-briefing": "android",
  "weather-heat-reschedule": "android",
  "weather-clear-day": "android",
  "weather-abroad": "android",
  "weather-daily-detail": "android",
  "weather-detail-tiles": "android",
  "weather-sun-air": "android",
  "weather-offline": "android",
  "weather-alerts": "android",
} as const satisfies Record<string, "iphone" | "android">;

export type GuideScreenKey = keyof typeof guideScreenFiles;

/** 날씨 가이드의 상황별 화면. 문구의 weather.cases와 같은 순서다. */
export const weatherCaseScreens = [
  "weather-rain-briefing",
  "weather-rain-reschedule",
  "weather-heat-briefing",
  "weather-heat-reschedule",
  "weather-clear-day",
  "weather-abroad",
  "weather-daily-detail",
  "weather-detail-tiles",
  "weather-sun-air",
  "weather-offline",
  "weather-alerts",
] as const satisfies readonly GuideScreenKey[];

const guideScreenSizes = {
  iphone: { width: 640, height: 1391 },
  android: { width: 640, height: 1422 },
} as const;

/** 화면 위쪽만 잘라 쓴 캡처의 실제 높이 */
const croppedScreenHeights: Partial<Record<GuideScreenKey, number>> = {
  "weather-offline": 1126,
  "weather-alerts": 711,
};

export function getGuideScreen(locale: Locale, key: GuideScreenKey) {
  const device = guideScreenFiles[key];
  const size = guideScreenSizes[device];
  return {
    device,
    src: `/app-assets/guides/${locale}/${key}.webp`,
    width: size.width,
    height: croppedScreenHeights[key] ?? size.height,
  };
}
