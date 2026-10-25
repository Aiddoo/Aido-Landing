"use client";
import { StoreButtons } from "@/components/marketing/store-buttons";
import type { MessageCatalog } from "@/i18n/messages";
import { useInviteCode } from "../hooks/use-invite-code";
import { useInvitePreview } from "../hooks/use-invite-preview";
import { usableInviteCode } from "../models/invite-preview";
import { buildPlayStoreInviteUrl } from "../utils/invite-store-links";

type InviteStoreLinksProps = { content: MessageCatalog["storeButtons"] };

// Google Play 링크에 Install Referrer로 초대 코드를 싣는다. 쓸 수 없는 코드는 싣지 않는다.
export function InviteStoreLinks({ content }: InviteStoreLinksProps) {
  const { code } = useInviteCode();
  const preview = useInvitePreview();
  return (
    <StoreButtons
      content={content}
      placement="invite"
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
      playStoreUrl={buildPlayStoreInviteUrl(code)}
    />
  );
}
