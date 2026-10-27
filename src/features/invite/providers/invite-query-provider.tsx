"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { getQueryClient } from "./get-query-client";

// 서버 상태가 있는 곳은 초대 코드 페이지뿐이라 Provider도 이 경계에만 둔다.
// 정적 페이지 번들에는 TanStack Query가 들어가지 않는다.
export function InviteQueryProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
