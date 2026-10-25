import { PLAY_STORE_URL } from "@/lib/seo";
import type { InviteCode } from "../schemas/invite.schema";

const PLAY_CAMPAIGN_PARAM = "pcampaignid=web_share";
// 앱의 parseInstallReferrerInviteCode(apps/mobile features/invite utils/install-referrer.ts)가
// referrer 쿼리에서 `inviteCode` 값을 읽는다. 키 이름을 바꾸면 앱이 코드를 놓친다.
const REFERRER_INVITE_CODE_KEY = "inviteCode";
const REFERRER_SOURCE = "aido_landing";

/** Play Install Referrer로 앱에 초대 코드를 넘긴다. 코드를 모르면 기본 스토어 링크다. */
export function buildPlayStoreInviteUrl(code: InviteCode | null) {
  const base = `${PLAY_STORE_URL}&${PLAY_CAMPAIGN_PARAM}`;
  if (!code) return base;
  const referrer = new URLSearchParams({
    [REFERRER_INVITE_CODE_KEY]: code,
    utm_source: REFERRER_SOURCE,
  });
  return `${base}&referrer=${encodeURIComponent(referrer.toString())}`;
}
