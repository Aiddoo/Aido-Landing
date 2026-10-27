import { queryOptions } from "@tanstack/react-query";
import { fetchInvitePreview } from "../api/fetch-invite-preview";
import type { InviteCode } from "../schemas/invite.schema";

export const inviteQueryKeys = {
  all: ["invite"] as const,
  preview: (code: InviteCode) =>
    [...inviteQueryKeys.all, "preview", code] as const,
};

/**
 * 초대한 친구 미리보기. 서버 페이지의 prefetch와 클라이언트의 useSuspenseQuery가 같은 옵션을 쓴다.
 * 없는 코드·바뀐 링크·네트워크 오류는 예외가 아니라 화면 상태이므로 queryFn은 reject하지 않고
 * `failed` 결과로 끝난다. 그래서 오류 상태도 성공 데이터로 dehydrate되어 브라우저가 다시 요청하지 않는다.
 */
export function getInvitePreviewQueryOptions(code: InviteCode) {
  return queryOptions({
    queryKey: inviteQueryKeys.preview(code),
    queryFn: () => fetchInvitePreview(code),
  });
}
