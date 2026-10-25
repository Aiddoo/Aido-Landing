"use client";
import { useEffect, useState } from "react";
import {
  fetchInvitePreview,
  type InviteFailure,
  type InvitePreviewResult,
} from "../api/fetch-invite-preview";
import type { InviteCode } from "../schemas/invite.schema";

type Settled = { code: InviteCode; result: InvitePreviewResult };

export type InviteViewFailure = InviteFailure | "invalid_code";
export type InvitePreviewState =
  | { status: "loading" }
  | Extract<InvitePreviewResult, { status: "ready" }>
  | { status: "failed"; failure: InviteViewFailure };

/** 코드가 바뀌면 이전 결과는 버리고 다시 불러온다. 결과는 코드에 묶어 저장한다. */
export function useInvitePreview(
  code: InviteCode | null,
  resolved: boolean,
): InvitePreviewState {
  const [settled, setSettled] = useState<Settled | null>(null);
  useEffect(() => {
    if (!code) return;
    const controller = new AbortController();
    void fetchInvitePreview(code, controller.signal).then((result) => {
      if (!controller.signal.aborted) setSettled({ code, result });
    });
    return () => controller.abort();
  }, [code]);
  if (!resolved) return { status: "loading" };
  if (!code) return { status: "failed", failure: "invalid_code" };
  return settled?.code === code ? settled.result : { status: "loading" };
}
