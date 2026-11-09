import type { DeviceFrame } from "@/components/media/device-screen";
import type { Locale } from "@/i18n/config";

type ReleaseScreenDevice = Extract<DeviceFrame, "iphone" | "duo-open">;

// 1.15.0 출시 화면. iPhone 라이트 모드 데모 계정 캡처를 640px(펼친 iPhone Duo는 1280px) WebP로 줄였다.
// 영어 캡처는 말로 할 일 만들기 결과 시트뿐이라 나머지는 한국어 화면을 함께 쓴다(가이드 화면과 같은 방식).
export const releaseScreenFiles = {
  "speak-listening": "iphone",
  "speak-ai-info": "iphone",
  "speak-review": "iphone",
  "voice-note-start": "iphone",
  "voice-note-record": "iphone",
  "memo-ai-menu": "iphone",
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

/** 일부만 쓴 캡처의 실제 높이. 말로 메모 녹음은 아래쪽, 메모 메뉴는 위쪽, 결제 화면은 가격 카드·구매 버튼 위까지다. */
const croppedScreenHeights: Partial<Record<ReleaseScreenKey, number>> = {
  "voice-note-record": 853,
  "memo-ai-menu": 501,
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
