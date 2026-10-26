import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/seo";
import type { InviteCode } from "../schemas/invite.schema";

const PLAY_CAMPAIGN_PARAM = "pcampaignid=web_share";
// Play Console 맞춤 스토어 등록정보(URL 대상 `invite`). 게시 전에는 기본 등록정보로 열린다.
const PLAY_INVITE_LISTING_PARAM = "listing=invite";
// App Store Connect 맞춤형 제품 페이지(초대 링크 유입). 승인 전에는 기본 제품 페이지로 열린다.
const APP_STORE_INVITE_PAGE_ID = "b02e9aa2-0e10-4fce-ba70-3bcf38b1a27d";

/** 초대받은 사람이 초대 혜택을 앞세운 App Store 제품 페이지를 보게 한다. */
export const APP_STORE_INVITE_URL = `${APP_STORE_URL}?ppid=${APP_STORE_INVITE_PAGE_ID}`;
// 앱의 parseInstallReferrerInviteCode(apps/mobile features/invite utils/install-referrer.ts)가
// referrer 쿼리에서 `inviteCode` 값을 읽는다. 키 이름을 바꾸면 앱이 코드를 놓친다.
const REFERRER_INVITE_CODE_KEY = "inviteCode";
const REFERRER_SOURCE = "aido_landing";

/** 초대 등록정보로 보내고 Play Install Referrer로 앱에 초대 코드를 넘긴다. 코드를 모르면 referrer 없이 보낸다. */
export function buildPlayStoreInviteUrl(code: InviteCode | null) {
  const base = `${PLAY_STORE_URL}&${PLAY_INVITE_LISTING_PARAM}&${PLAY_CAMPAIGN_PARAM}`;
  if (!code) return base;
  const referrer = new URLSearchParams({
    [REFERRER_INVITE_CODE_KEY]: code,
    utm_source: REFERRER_SOURCE,
  });
  return `${base}&referrer=${encodeURIComponent(referrer.toString())}`;
}
