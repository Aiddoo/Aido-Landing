"use client";
import { use } from "react";
import { getInvitePreview } from "../api/get-invite-preview";
import type { InvitePreviewState } from "../models/invite-preview";
import { useInviteCode } from "./use-invite-code";

/**
 * 주소의 코드로 초대한 친구 미리보기를 읽는다. 코드가 있으면 요청이 끝날 때까지
 * 가장 가까운 Suspense가 Loading을 보여 준다. 같은 코드는 요청 하나를 나눠 쓴다.
 */
export function useInvitePreview(): InvitePreviewState {
  const { resolved, code } = useInviteCode();
  if (!resolved) return { status: "pending" };
  if (!code) return { status: "failed", failure: "invalid_code" };
  return use(getInvitePreview(code));
}
