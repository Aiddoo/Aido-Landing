import type { InvitePreview } from "../models/invite-preview";
import type { InviteCode } from "../schemas/invite.schema";
import { fetchInvitePreview } from "./fetch-invite-preview";

// 같은 코드를 읽는 컴포넌트가 요청 하나를 나눠 쓰도록 Promise를 코드별로 보관한다.
// React의 use()는 렌더마다 같은 Promise를 받아야 하므로 렌더 밖에서 만든다.
const previews = new Map<InviteCode, Promise<InvitePreview>>();

export function getInvitePreview(code: InviteCode) {
  const cached = previews.get(code);
  if (cached) return cached;
  const request = fetchInvitePreview(code);
  previews.set(code, request);
  return request;
}
