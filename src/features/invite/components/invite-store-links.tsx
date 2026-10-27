"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { StoreButtons } from "@/components/marketing/store-buttons";
import type { MessageCatalog } from "@/i18n/messages";
import { usableInviteCode } from "../models/invite-preview";
import { getInvitePreviewQueryOptions } from "../queries/invite-queries";
import type { InviteCode } from "../schemas/invite.schema";
import {
  APP_STORE_INVITE_URL,
  buildPlayStoreInviteUrl,
} from "../utils/invite-store-links";

type Content = MessageCatalog["storeButtons"];

// 두 스토어 모두 초대 전용 페이지로 보내고, Google Play 링크에는 Install Referrer로 초대 코드를 싣는다. 쓸 수 없는 코드는 싣지 않는다.
export function InviteStoreLinks({
  content,
  code,
}: {
  content: Content;
  code: InviteCode | null;
}) {
  if (code == null) return <InviteStoreButtons content={content} code={null} />;
  return (
    <Suspense
      fallback={<InviteStoreLinks.Loading content={content} code={code} />}
    >
      <InviteStoreLinks.Contents content={content} code={code} />
    </Suspense>
  );
}

function InviteStoreLinksContents({
  content,
  code,
}: {
  content: Content;
  code: InviteCode;
}) {
  const { data: preview } = useSuspenseQuery(
    getInvitePreviewQueryOptions(code),
  );
  return (
    <InviteStoreButtons
      content={content}
      code={usableInviteCode(code, preview)}
    />
  );
}

// 미리보기를 기다리는 동안에도 주소의 코드를 referrer로 싣는다.
function InviteStoreLinksLoading({
  content,
  code,
}: {
  content: Content;
  code: InviteCode;
}) {
  return <InviteStoreButtons content={content} code={code} />;
}

InviteStoreLinks.Contents = InviteStoreLinksContents;
InviteStoreLinks.Loading = InviteStoreLinksLoading;

function InviteStoreButtons({
  content,
  code,
}: {
  content: Content;
  code: InviteCode | null;
}) {
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
