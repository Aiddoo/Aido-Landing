import type { InviteCode, InviteInviter } from "../schemas/invite.schema";

/** 미리보기를 보여 줄 수 없는 이유. invalid_code는 주소의 코드가 형식부터 틀린 경우다. */
export type InvitePreviewFailure =
  | "invalid_code"
  | "not_found"
  | "changed"
  | "unavailable"
  | "unknown";

/** 화면이 보여 주는 실패. render_error는 미리보기와 무관하게 화면을 그리다 난 예상 밖 오류다. */
export type InvitePageFailure = InvitePreviewFailure | "render_error";

export type InvitePreview =
  | { status: "ready"; inviter: InviteInviter }
  | { status: "failed"; failure: InvitePreviewFailure };

/**
 * 화면에 보여 주고 Play referrer로 넘겨도 되는 코드.
 * 없거나 바뀐 링크의 코드는 쓸 수 없다. 네트워크 오류(unknown)는 코드가 여전히
 * 유효할 수 있어 그대로 쓴다.
 */
export function usableInviteCode(code: InviteCode, preview: InvitePreview) {
  if (preview.status === "ready") return code;
  return preview.failure === "unknown" ? code : null;
}
