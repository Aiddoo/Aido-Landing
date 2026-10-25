"use client";
import { match } from "ts-pattern";
import type { MessageCatalog } from "@/i18n/messages";
import { useCopyInviteCode } from "../hooks/use-copy-invite-code";
import { useInviteCode } from "../hooks/use-invite-code";
import { useInvitePreview } from "../hooks/use-invite-preview";
import { usableInviteCode } from "../models/invite-preview";
import type { InviteCode } from "../schemas/invite.schema";

const EMPTY_CODE = "······";

type InviteCodeCopyProps = { labels: MessageCatalog["invite"] };

// 쓸 수 있는 초대 코드와 복사 버튼. 없거나 바뀐 링크의 코드는 숨기고 복사를 막는다.
export function InviteCodeCopy({ labels }: InviteCodeCopyProps) {
  const { code } = useInviteCode();
  const preview = useInvitePreview();
  return <CodeField labels={labels} code={usableInviteCode(code, preview)} />;
}

// 미리보기를 기다리는 동안에도 주소의 코드를 바로 복사할 수 있다.
export function InviteCodeCopyLoading({ labels }: InviteCodeCopyProps) {
  const { code } = useInviteCode();
  return <CodeField labels={labels} code={code} />;
}

function CodeField({
  labels,
  code,
}: InviteCodeCopyProps & { code: InviteCode | null }) {
  const copy = useCopyInviteCode(code);
  const hint = match(copy.status)
    .with("manual", () => labels.codeManualStatus)
    .with("copied", () => labels.codeCopiedStatus)
    .with("idle", () => labels.codeHint)
    .exhaustive();
  return (
    <>
      <p className="invite-code-label">{labels.codeLabel}</p>
      <div className="invite-code-row">
        <span className="invite-code" data-empty={code ? undefined : ""}>
          {code ?? EMPTY_CODE}
        </span>
        <button
          type="button"
          className="invite-copy"
          onClick={copy.copy}
          disabled={!code}
          aria-label={labels.codeCopyAria}
        >
          {copy.status === "copied" ? labels.codeCopied : labels.codeCopy}
        </button>
      </div>
      <p className="invite-hint" role="status">
        {hint}
      </p>
    </>
  );
}
