"use client";
import type { MessageCatalog } from "@/i18n/messages";
import { useInvitePreview } from "../hooks/use-invite-preview";
import { inviteErrorCopy } from "../utils/invite-error-copy";

// 평소에는 안내 문장이고, 링크를 쓸 수 없을 때만 그 이유와 다음 행동으로 바뀐다.
// Loading은 페이지가 같은 문장으로 직접 그린다.
export function InviteLead({ labels }: { labels: MessageCatalog["invite"] }) {
  const preview = useInvitePreview();
  const text =
    preview.status === "failed"
      ? inviteErrorCopy(labels, preview.failure).description
      : labels.lead;
  return <p className="invite-lead">{text}</p>;
}
