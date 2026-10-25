import { type InviteCode, inviteCodeSchema } from "../schemas/invite.schema";

const inviteLinkPattern = /^\/i\/([^/]+)\/?$/;

/** 입력의 공백·하이픈을 제거하고 대문자로 맞춘다. 유효성은 검사하지 않는다. */
export function normalizeInviteCode(raw: string) {
  return raw.replace(/[\s-]/g, "").toUpperCase();
}

/** `/i/{코드}` 경로에서 유효한 초대 코드만 꺼낸다. 그 외는 null이다. */
export function parseInviteCodeFromPathname(
  pathname: string,
): InviteCode | null {
  const segment = inviteLinkPattern.exec(pathname)?.[1];
  if (segment === undefined) return null;
  let decoded: string;
  try {
    decoded = decodeURIComponent(segment);
  } catch {
    return null;
  }
  const result = inviteCodeSchema.safeParse(normalizeInviteCode(decoded));
  return result.success ? result.data : null;
}
