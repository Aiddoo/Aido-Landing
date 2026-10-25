"use client";
import type { MessageCatalog } from "@/i18n/messages";
import { useInvitePreview } from "../hooks/use-invite-preview";
import { fillInviterName } from "../utils/format-invite-text";
import { inviteErrorCopy } from "../utils/invite-error-copy";
import { InviterProfile } from "./inviter-profile";

type InviterCardProps = { labels: MessageCatalog["invite"] };

// 초대한 친구의 프로필과 제목. 미리보기를 기다리는 동안 Suspense가 Loading을 보여 준다.
export function InviterCard({ labels }: InviterCardProps) {
  const preview = useInvitePreview();
  if (preview.status === "pending")
    return <InviterCardLoading labels={labels} />;
  if (preview.status === "failed") {
    return (
      <>
        <InviterProfile labels={labels} inviter={null} isLoading={false} />
        <h1 id="invite-title" className="invite-title">
          {inviteErrorCopy(labels, preview.failure).title}
        </h1>
      </>
    );
  }
  return (
    <>
      <InviterProfile
        labels={labels}
        inviter={preview.inviter}
        isLoading={false}
      />
      <h1 id="invite-title" className="invite-title">
        {fillInviterName(
          labels.titleTemplate,
          preview.inviter.name,
          labels.titleFallback,
        )}
      </h1>
    </>
  );
}

// 로딩·오류·완료가 같은 박스 크기를 써서 교체해도 아무것도 움직이지 않는다.
export function InviterCardLoading({ labels }: InviterCardProps) {
  return (
    <>
      <InviterProfile labels={labels} inviter={null} isLoading />
      <h1 id="invite-title" className="invite-title" data-loading>
        <span className="sr-only">{labels.loadingLabel}</span>
        <span className="invite-skeleton invite-bar-title" aria-hidden="true" />
        <span
          className="invite-skeleton invite-bar-title invite-bar-short"
          aria-hidden="true"
        />
      </h1>
    </>
  );
}
