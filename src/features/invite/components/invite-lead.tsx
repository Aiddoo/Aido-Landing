"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { MessageCatalog } from "@/i18n/messages";
import type { InvitePageFailure } from "../models/invite-preview";
import {
  getInvitePreviewQueryOptions,
  inviteQueryKeys,
} from "../queries/invite-queries";
import type { InviteCode } from "../schemas/invite.schema";
import { inviteErrorCopy } from "../utils/invite-error-copy";
import { InviteQueryBoundary } from "./invite-query-boundary";

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
    <InviteQueryBoundary
      queryKey={inviteQueryKeys.preview(code)}
      pendingFallback={<InviteLead.Loading labels={labels} />}
      rejectedFallback={({ resetErrorBoundary }) => (
        <InviteLead.Error
          labels={labels}
          failure="render_error"
          onRetry={resetErrorBoundary}
        />
      )}
    >
      <InviteLead.Contents labels={labels} code={code} />
    </InviteQueryBoundary>
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

// 예상 밖 오류일 때만 onRetry를 받아 같은 높이 안에 다시 시도 버튼을 둔다.
function InviteLeadError({
  labels,
  failure,
  onRetry,
}: {
  labels: Labels;
  failure: InvitePageFailure;
  onRetry?: () => void;
}) {
  return (
    <p className={leadClass}>
      {inviteErrorCopy(labels, failure).description}
      {onRetry == null ? null : (
        <>
          {" "}
          <button
            type="button"
            onClick={onRetry}
            className="font-semibold text-brand-deep underline underline-offset-3"
          >
            {labels.retry}
          </button>
        </>
      )}
    </p>
  );
}

InviteLead.Contents = InviteLeadContents;
InviteLead.Loading = InviteLeadLoading;
InviteLead.Error = InviteLeadError;
