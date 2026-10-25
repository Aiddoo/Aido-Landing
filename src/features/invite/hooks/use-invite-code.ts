"use client";
import { noop } from "es-toolkit";
import { useSyncExternalStore } from "react";
import { parseInviteCodeFromPathname } from "../utils/invite-code";

const subscribe = () => noop;
const getPathname = () => window.location.pathname;
const getServerPathname = () => "";

/**
 * 브라우저 주소의 /i/{코드}에서 코드를 읽는다. 정적 HTML은 코드를 모르므로 서버 스냅샷은
 * 빈 경로이고, 하이드레이션 뒤에 실제 경로로 바뀐다.
 * 반환: `resolved`가 false면 아직 주소를 읽기 전이다.
 */
export function useInviteCode() {
  const pathname = useSyncExternalStore(
    subscribe,
    getPathname,
    getServerPathname,
  );
  return {
    resolved: pathname !== "",
    code: parseInviteCodeFromPathname(pathname),
  };
}
