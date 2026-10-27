"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import type { MessageCatalog } from "@/i18n/messages";
import type { InvitePreviewFailure } from "../models/invite-preview";
import { getInvitePreviewQueryOptions } from "../queries/invite-queries";
import type { InviteCode } from "../schemas/invite.schema";
import { inviteErrorCopy } from "../utils/invite-error-copy";

type Labels = MessageCatalog["invite"];

// 세 줄 높이를 고정해 안내 문장이 오류 설명으로 바뀌어도 아래가 움직이지 않는다.
const leadClass =
  "relative mt-3.5 h-[calc(3*1.7em)] overflow-hidden text-[0.9375rem] leading-[1.7] text-gray-9 md:text-body-lg";

// 평소에는 안내 문장이고, 링크를 쓸 수 없을 때만 그 이유와 다음 행동으로 바뀐다.
export function InviteLead({
  labels,
  code,
}: {
  labels: Labels;
  code: InviteCode | null;
}) {
  if (code == null)
    return <InviteLead.Error labels={labels} failure="invalid_code" />;
  return (
    <Suspense fallback={<InviteLead.Loading labels={labels} />}>
      <InviteLead.Contents labels={labels} code={code} />
    </Suspense>
  );
}

function InviteLeadContents({
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
    return <InviteLead.Error labels={labels} failure={preview.failure} />;
  return <p className={leadClass}>{labels.lead}</p>;
}

// 기다리는 동안에도 평소 안내 문장을 보여 준다.
function InviteLeadLoading({ labels }: { labels: Labels }) {
  return <p className={leadClass}>{labels.lead}</p>;
}

function InviteLeadError({
  labels,
  failure,
}: {
  labels: Labels;
  failure: InvitePreviewFailure;
}) {
  return (
    <p className={leadClass}>{inviteErrorCopy(labels, failure).description}</p>
  );
}

InviteLead.Contents = InviteLeadContents;
InviteLead.Loading = InviteLeadLoading;
InviteLead.Error = InviteLeadError;
