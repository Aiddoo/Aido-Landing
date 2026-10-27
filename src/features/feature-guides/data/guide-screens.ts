import type { Locale } from "@/i18n/config";

// 1.13.0 iPhone(6.3인치) 라이트 모드 실제 화면. 원본은 ko/en 캡처를 640px WebP로 줄였다.
export const guideScreenFiles = [
  "friend-feed",
  "todo-nudge",
  "repeat-edit",
  "home-widgets",
  "voice-add",
  "memo-ai",
  "invite-home",
  "paw-board",
  "invite-card",
] as const;

export type GuideScreenKey = (typeof guideScreenFiles)[number];

export const GUIDE_SCREEN_SIZE = { width: 640, height: 1391 } as const;

export function getGuideScreen(locale: Locale, key: GuideScreenKey) {
  return {
    src: `/app-assets/guides/${locale}/${key}.webp`,
    ...GUIDE_SCREEN_SIZE,
  };
}
