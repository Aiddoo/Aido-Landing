import { match } from "ts-pattern";
import { API_URL } from "@/lib/seo";
import type {
  InvitePreview,
  InvitePreviewFailure,
} from "../models/invite-preview";
import {
  type InviteCode,
  type InviteErrorCode,
  parseInviteErrorCode,
  parseInvitePreview,
} from "../schemas/invite.schema";

const REQUEST_TIMEOUT_MS = 8_000;

function failureFromStatus(status: number): InvitePreviewFailure {
  return match(status)
    .with(404, () => "not_found" as const)
    .with(410, () => "changed" as const)
    .with(403, () => "unavailable" as const)
    .otherwise(() => "unknown" as const);
}

function failureFromCode(
  code: InviteErrorCode | null,
): InvitePreviewFailure | null {
  return match(code)
    .with("INVITE_2101", () => "not_found" as const)
    .with("INVITE_2102", () => "changed" as const)
    .with("INVITE_2105", () => "unavailable" as const)
    .with(null, () => null)
    .exhaustive();
}

/** 공개 미리보기 API. 쿠키·인증 없이 닉네임과 프로필 이미지만 읽으며, 절대 reject하지 않는다. */
export async function fetchInvitePreview(
  code: InviteCode,
): Promise<InvitePreview> {
  const request = new AbortController();
  const timeout = setTimeout(() => request.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(
      `${API_URL}/v1/invites/${encodeURIComponent(code)}`,
      {
        method: "GET",
        credentials: "omit",
        headers: { Accept: "application/json" },
        signal: request.signal,
      },
    );
    const body: unknown = await response.json().catch(() => null);
    if (!response.ok) {
      return {
        status: "failed",
        failure:
          failureFromCode(parseInviteErrorCode(body)) ??
          failureFromStatus(response.status),
      };
    }
    const inviter = parseInvitePreview(body);
    return inviter
      ? { status: "ready", inviter }
      : { status: "failed", failure: "unknown" };
  } catch {
    return { status: "failed", failure: "unknown" };
  } finally {
    clearTimeout(timeout);
  }
}
