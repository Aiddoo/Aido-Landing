"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import type { MessageCatalog } from "@/i18n/messages";
import { cn } from "@/lib/utils";
import type { InvitePreviewFailure } from "../models/invite-preview";
import { getInvitePreviewQueryOptions } from "../queries/invite-queries";
import type { InviteCode } from "../schemas/invite.schema";
import { fillInviterName } from "../utils/format-invite-text";
import { inviteErrorCopy } from "../utils/invite-error-copy";
import { InviterProfile } from "./inviter-profile";

type Labels = MessageCatalog["invite"];

// 두 줄 높이를 고정해 로딩·오류·완료가 바뀌어도 아래가 움직이지 않는다.
const titleBoxClass =
  "relative mt-5 h-[2.8em] overflow-hidden text-[1.625rem] leading-[1.4] wrap-anywhere text-ink md:text-[2.125rem]";
const titleClass = cn(titleBoxClass, "line-clamp-2");
// h1·p 안에 들어가므로 div인 Skeleton 대신 같은 모양의 span을 쓴다.
const skeletonClass = "block animate-pulse rounded-full bg-muted";

// 초대한 친구의 프로필과 제목. 코드는 라우트가 정하고, 형식이 틀린 코드는 조회하지 않는다.
export function InviterCard({
  labels,
  code,
}: {
  labels: Labels;
  code: InviteCode | null;
}) {
  if (code == null)
    return <InviterCard.Error labels={labels} failure="invalid_code" />;
  return (
    <Suspense fallback={<InviterCard.Loading labels={labels} />}>
      <InviterCard.Contents labels={labels} code={code} />
    </Suspense>
  );
}

function InviterCardContents({
  labels,
  code,
}: {
  labels: Labels;
  code: InviteCode;
}) {
  const { data: preview } = useSuspenseQuery(
    getInvitePreviewQueryOptions(code),
  );
  if (preview.status === "failed")
    return <InviterCard.Error labels={labels} failure={preview.failure} />;
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

function InviterCardLoading({ labels }: { labels: Labels }) {
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

function InviterCardError({
  labels,
  failure,
}: {
  labels: Labels;
  failure: InvitePreviewFailure;
}) {
  return (
    <>
      <InviterProfile labels={labels} inviter={null} isLoading={false} />
      <h1 id="invite-title" className={titleClass}>
        {inviteErrorCopy(labels, failure).title}
      </h1>
    </>
  );
}

InviterCard.Contents = InviterCardContents;
InviterCard.Loading = InviterCardLoading;
InviterCard.Error = InviterCardError;
