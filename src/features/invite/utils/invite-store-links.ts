import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/seo";
import type { InviteCode } from "../schemas/invite.schema";

const PLAY_CAMPAIGN_PARAM = "pcampaignid=web_share";

/** Play Install Referrer로 앱에 초대 코드를 넘긴다. 코드를 모르면 기본 스토어 링크다. */
export function buildPlayStoreInviteUrl(code: InviteCode | null) {
  const base = `${PLAY_STORE_URL}&${PLAY_CAMPAIGN_PARAM}`;
  if (!code) return base;
  return `${base}&referrer=${encodeURIComponent(`invite_code=${code}`)}`;
}

export const inviteAppStoreUrl = APP_STORE_URL;
