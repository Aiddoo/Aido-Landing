"use client";
import { StoreButtons } from "@/components/marketing/store-buttons";
import type { MessageCatalog } from "@/i18n/messages";
import { useInviteCode } from "../hooks/use-invite-code";
import { useInvitePreview } from "../hooks/use-invite-preview";
import { usableInviteCode } from "../models/invite-preview";
import {
  APP_STORE_INVITE_URL,
  buildPlayStoreInviteUrl,
} from "../utils/invite-store-links";

type InviteStoreLinksProps = { content: MessageCatalog["storeButtons"] };

// 두 스토어 모두 초대 전용 페이지로 보내고, Google Play 링크에는 Install Referrer로 초대 코드를 싣는다. 쓸 수 없는 코드는 싣지 않는다.
export function InviteStoreLinks({ content }: InviteStoreLinksProps) {
  const { code } = useInviteCode();
  const preview = useInvitePreview();
  return (
    <StoreButtons
      content={content}
      placement="invite"
      className="max-w-none min-[400px]:grid-cols-1"
      appStoreUrl={APP_STORE_INVITE_URL}
      playStoreUrl={buildPlayStoreInviteUrl(usableInviteCode(code, preview))}
    />
  );
}

export function InviteStoreLinksLoading({ content }: InviteStoreLinksProps) {
  const { code } = useInviteCode();
  return (
    <StoreButtons
      content={content}
      placement="invite"
      className="max-w-none min-[400px]:grid-cols-1"
      appStoreUrl={APP_STORE_INVITE_URL}
      playStoreUrl={buildPlayStoreInviteUrl(code)}
    />
  );
}
