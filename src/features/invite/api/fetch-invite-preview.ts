import { API_URL } from "@/lib/seo";
import {
  type InviteCode,
  type InviteInviter,
  parseInviteErrorCode,
  parseInvitePreview,
} from "../schemas/invite.schema";

export type InviteFailure = "not_found" | "changed" | "unavailable" | "unknown";
export type InvitePreviewResult =
  | { status: "ready"; inviter: InviteInviter }
  | { status: "failed"; failure: InviteFailure };

const REQUEST_TIMEOUT_MS = 8_000;

function failureFromStatus(status: number): InviteFailure {
  if (status === 404) return "not_found";
  if (status === 410) return "changed";
  if (status === 403) return "unavailable";
  return "unknown";
}

function failureFromCode(
  code: ReturnType<typeof parseInviteErrorCode>,
): InviteFailure | null {
  if (code === "INVITE_2101") return "not_found";
  if (code === "INVITE_2102") return "changed";
  if (code === "INVITE_2105") return "unavailable";
  return null;
}

/** 공개 미리보기 API. 쿠키·인증 없이 닉네임과 태그만 읽는다. */
export async function fetchInvitePreview(
  code: InviteCode,
  signal: AbortSignal,
): Promise<InvitePreviewResult> {
  const request = new AbortController();
  const abort = () => request.abort();
  signal.addEventListener("abort", abort, { once: true });
  const timeout = setTimeout(abort, REQUEST_TIMEOUT_MS);
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
    signal.removeEventListener("abort", abort);
  }
}
