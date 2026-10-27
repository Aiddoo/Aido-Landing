"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { match } from "ts-pattern";
import { HStack } from "@/components/ui/layout";
import type { MessageCatalog } from "@/i18n/messages";
import { useCopyInviteCode } from "../hooks/use-copy-invite-code";
import { usableInviteCode } from "../models/invite-preview";
import { getInvitePreviewQueryOptions } from "../queries/invite-queries";
import type { InviteCode } from "../schemas/invite.schema";

const EMPTY_CODE = "······";

type Labels = MessageCatalog["invite"];

// 쓸 수 있는 초대 코드와 복사 버튼. 없거나 바뀐 링크의 코드는 숨기고 복사를 막는다.
export function InviteCodeCopy({
  labels,
  code,
}: {
  labels: Labels;
  code: InviteCode | null;
}) {
  if (code == null) return <CodeField labels={labels} code={null} />;
  return (
    <Suspense fallback={<InviteCodeCopy.Loading labels={labels} code={code} />}>
      <InviteCodeCopy.Contents labels={labels} code={code} />
    </Suspense>
  );
}

function InviteCodeCopyContents({
  labels,
  code,
}: {
  labels: Labels;
  code: InviteCode;
}) {
  const { data: preview } = useSuspenseQuery(
    getInvitePreviewQueryOptions(code),
  );
  return <CodeField labels={labels} code={usableInviteCode(code, preview)} />;
}

// 미리보기를 기다리는 동안에도 주소의 코드를 바로 복사할 수 있다.
function InviteCodeCopyLoading({
  labels,
  code,
}: {
  labels: Labels;
  code: InviteCode;
}) {
  return <CodeField labels={labels} code={code} />;
}

InviteCodeCopy.Contents = InviteCodeCopyContents;
InviteCodeCopy.Loading = InviteCodeCopyLoading;

function CodeField({
  labels,
  code,
}: {
  labels: Labels;
  code: InviteCode | null;
}) {
  const copy = useCopyInviteCode(code);
  const hint = match(copy.status)
    .with("manual", () => labels.codeManualStatus)
    .with("copied", () => labels.codeCopiedStatus)
    .with("idle", () => labels.codeHint)
    .exhaustive();
  return (
    <>
      <p className="h-5 text-[0.8125rem] leading-5 font-semibold text-gray-8">
        {labels.codeLabel}
      </p>
      <HStack align="center" justify="between" gap={3} className="h-13">
        <span
          data-empty={code ? undefined : ""}
          className="font-mono text-[1.875rem] leading-none font-extrabold tracking-[0.12em] whitespace-nowrap text-ink select-all data-empty:text-muted-foreground data-empty:select-none"
        >
          {code ?? EMPTY_CODE}
        </span>
        <button
          type="button"
          className="h-11 min-w-22 shrink-0 rounded-full bg-primary px-4 text-[0.9375rem] font-bold whitespace-nowrap text-primary-foreground shadow-press-brand transition-transform active:translate-y-0.5 active:shadow-none disabled:opacity-50 disabled:shadow-none"
          onClick={copy.copy}
          disabled={!code}
          aria-label={labels.codeCopyAria}
        >
          {copy.status === "copied" ? labels.codeCopied : labels.codeCopy}
        </button>
      </HStack>
      <p
        role="status"
        className="mt-2 min-h-[calc(3*1.6em)] text-[0.8125rem] leading-[1.6] text-gray-8"
      >
        {hint}
      </p>
    </>
  );
}
