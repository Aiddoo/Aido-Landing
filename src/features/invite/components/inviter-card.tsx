"use client";
import type { MessageCatalog } from "@/i18n/messages";
import { cn } from "@/lib/utils";
import { useInvitePreview } from "../hooks/use-invite-preview";
import { fillInviterName } from "../utils/format-invite-text";
import { inviteErrorCopy } from "../utils/invite-error-copy";
import { InviterProfile } from "./inviter-profile";

type InviterCardProps = { labels: MessageCatalog["invite"] };

// 두 줄 높이를 고정해 로딩·오류·완료가 바뀌어도 아래가 움직이지 않는다.
const titleBoxClass =
  "relative mt-5 h-[2.8em] overflow-hidden text-[1.625rem] leading-[1.4] wrap-anywhere text-ink md:text-[2.125rem]";
const titleClass = cn(titleBoxClass, "line-clamp-2");
// h1·p 안에 들어가므로 div인 Skeleton 대신 같은 모양의 span을 쓴다.
const skeletonClass = "block animate-pulse rounded-full bg-muted";

// 초대한 친구의 프로필과 제목. 미리보기를 기다리는 동안 Suspense가 Loading을 보여 준다.
export function InviterCard({ labels }: InviterCardProps) {
  const preview = useInvitePreview();
  if (preview.status === "pending")
    return <InviterCardLoading labels={labels} />;
  if (preview.status === "failed") {
    return (
      <>
        <InviterProfile labels={labels} inviter={null} isLoading={false} />
        <h1 id="invite-title" className={titleClass}>
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
      <h1 id="invite-title" className={titleClass}>
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
      <h1
        id="invite-title"
        className={cn(titleBoxClass, "flex flex-col justify-around")}
      >
        <span className="sr-only">{labels.loadingLabel}</span>
        <span
          aria-hidden="true"
          className={cn(skeletonClass, "h-[0.9em] w-full")}
        />
        <span
          aria-hidden="true"
          className={cn(skeletonClass, "h-[0.9em] w-[62%]")}
        />
      </h1>
    </>
  );
}
