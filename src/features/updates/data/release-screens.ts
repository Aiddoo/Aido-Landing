import type { DeviceFrame } from "@/components/media/device-screen";
import type { Locale } from "@/i18n/config";

type ReleaseScreenDevice = Extract<DeviceFrame, "iphone" | "duo-open">;

// 1.15.0 출시 화면. iPhone 라이트 모드 데모 계정 캡처를 640px(펼친 iPhone Duo는 1280px) WebP로 줄였다.
// 영어 캡처는 말로 할 일 만들기 결과 시트뿐이라 나머지는 한국어 화면을 함께 쓴다(가이드 화면과 같은 방식).
// 1.16.0 화면(suggestion-rows·report-*)은 iPhone SE 무료 계정의 예시 화면이다. 한영 캡처가 따로 있고,
// 상태 막대·내비 헤더 아래부터 잘라 기기 틀의 섬 자리에 흰 띠를 두었다.
// 1.17.0 캘린더 일정 가져오기 화면(calendar-import-*)은 한영 iPhone 캡처를 640×1391로 넣는다.
export const releaseScreenFiles = {
  "calendar-import-intro": "iphone",
  "calendar-import-select": "iphone",
  "calendar-import-categories": "iphone",
  "calendar-import-options": "iphone",
  "calendar-import-done": "iphone",
  "calendar-import-premium": "iphone",
  "suggestion-rows": "iphone",
  "report-summary": "iphone",
  "report-charts": "iphone",
  "report-coach": "iphone",
  "speak-listening": "iphone",
  "speak-ai-info": "iphone",
  "speak-review": "iphone",
  "voice-note-record": "iphone",
  "voice-note-result": "iphone",
  "memo-ai-review": "iphone",
  "repeat-weekdays": "iphone",
  "paywall-benefits": "iphone",
  "paywall-compare": "iphone",
  "usage-card": "iphone",
  "notification-intro": "iphone",
  "mypage-two-pane": "duo-open",
} as const satisfies Record<string, ReleaseScreenDevice>;

export type ReleaseScreenKey = keyof typeof releaseScreenFiles;

const releaseScreenSizes = {
  iphone: { width: 640, height: 1391 },
  // 개발용 버튼과 떠 있는 탭 바가 보이는 아래쪽을 뺀 펼친 iPhone Duo 화면
  "duo-open": { width: 1280, height: 648 },
} as const satisfies Record<ReleaseScreenDevice, unknown>;

/** 언어마다 다른 캡처를 쓰는 화면의 높이. 영어 결과 시트는 아래쪽만 찍혔다. */
const localeScreenHeights: Partial<
  Record<ReleaseScreenKey, Record<Locale, number>>
> = {
  "speak-review": { ko: 1391, en: 853 },
};

/** 일부만 쓴 캡처의 실제 높이. 결제 화면은 가격 카드·구매 버튼 위까지, 1.16.0 화면은 내비 헤더 아래부터다. */
const croppedScreenHeights: Partial<Record<ReleaseScreenKey, number>> = {
  "suggestion-rows": 1062,
  "report-summary": 1062,
  "report-charts": 1062,
  "report-coach": 1062,
  "paywall-benefits": 835,
  "paywall-compare": 1071,
  "usage-card": 724,
};

export function getReleaseScreen(locale: Locale, key: ReleaseScreenKey) {
  const device = releaseScreenFiles[key];
  const size = releaseScreenSizes[device];
  return {
    device,
    src: `/app-assets/releases/${locale}/${key}.webp`,
    width: size.width,
    height:
      localeScreenHeights[key]?.[locale] ??
      croppedScreenHeights[key] ??
      size.height,
  };
}
