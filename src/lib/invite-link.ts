/** 친구 초대 링크 `/i/{코드}`. 첫 캡처 그룹이 코드 자리이며 유효성은 따로 검사한다. */
export const INVITE_LINK_PATTERN = /^\/i\/([^/]+)\/?$/;

/** proxy가 `/i/{코드}`를 rewrite하는 실제 경로 `/{locale}/invite/{코드}`. 직접 열 수도 있다. */
export const LOCALIZED_INVITE_CODE_PATTERN = /^\/(?:ko|en)\/invite\/[^/]+\/?$/;
