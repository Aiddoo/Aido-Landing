import type { Locale } from "@/i18n/config";

/** 홈 "지원 기기"에서 소개하는 순서. 문구는 messages의 home.devices.items가 같은 키로 가진다. */
export const supportedDeviceIds = [
  "iphone",
  "android",
  "foldable",
  "tablet",
  "mac",
] as const;

export type SupportedDeviceId = (typeof supportedDeviceIds)[number];

// 1.13.0 실제 화면(라이트). 원본은 캡처_원본/아이두_실화면_1.13.0의 iPad 13·iPhone 6.3이다.
// Mac은 iPad용 앱이 창으로 열리므로 iPhone 화면에서 상태 막대·홈 표시줄을 잘라 냈다.
export const deviceShowcaseScreens = {
  "ipad-checklist": { width: 1000, height: 1333 },
  "mac-friend-feed": { width: 720, height: 1426 },
} as const;

export type DeviceShowcaseScreen = keyof typeof deviceShowcaseScreens;

export function getDeviceShowcaseScreen(
  locale: Locale,
  screen: DeviceShowcaseScreen,
) {
  return {
    src: `/app-assets/devices/${locale}/${screen}.webp`,
    ...deviceShowcaseScreens[screen],
  } as const;
}
