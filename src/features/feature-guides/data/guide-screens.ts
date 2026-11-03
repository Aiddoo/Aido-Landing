import type { DeviceFrame } from "@/components/media/device-screen";
import type { Locale } from "@/i18n/config";

type GuideScreenDevice = Extract<
  DeviceFrame,
  "iphone" | "android" | "duo-open" | "ipad"
>;

// 1.13.0 iPhone(6.3인치) 라이트 모드 실제 화면, 1.14.0 Android 날씨 화면, 1.14.1 댓글·기기별 날씨 화면.
// 원본은 ko/en 캡처를 640px(iPad는 1280px) WebP로 줄였다. 영어 캡처가 없는 하트·iPhone Duo·iPad는 한국어 화면을 함께 쓴다.
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
  "weather-duo": "duo-open",
  "weather-ipad": "ipad",
  "comments-thread": "iphone",
  "comments-reply": "iphone",
  "comments-heart": "iphone",
} as const satisfies Record<string, GuideScreenDevice>;

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

/** 날씨 가이드의 기기별 화면. 문구의 weather.devices와 같은 순서다. */
export const weatherDeviceScreens = [
  "weather-duo",
  "weather-ipad",
] as const satisfies readonly GuideScreenKey[];

const guideScreenSizes = {
  iphone: { width: 640, height: 1391 },
  android: { width: 640, height: 1422 },
  "duo-open": { width: 640, height: 931 },
  ipad: { width: 1280, height: 1707 },
} as const satisfies Record<GuideScreenDevice, unknown>;

/** 화면 위쪽만 잘라 쓴 캡처의 실제 높이 */
const croppedScreenHeights: Partial<Record<GuideScreenKey, number>> = {
  "weather-offline": 1126,
  "weather-alerts": 711,
  // 아래쪽 개발용 오류 알림을 뺀 iPhone Duo 화면, 위쪽 상태 막대·개발 버튼을 뺀 iPad 화면
  "weather-duo": 806,
  "weather-ipad": 552,
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
