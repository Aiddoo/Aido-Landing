"use client";
import { createContext, type ReactNode, use } from "react";
import type { Locale } from "@/i18n/config";
import type { MessageCatalog } from "@/i18n/messages";

export type InviteErrorContent = {
  locale: Locale;
  labels: MessageCatalog["invite"];
  storeButtons: MessageCatalog["storeButtons"];
  accessibility: MessageCatalog["accessibility"];
};

const InviteErrorContentContext = createContext<InviteErrorContent | null>(
  null,
);

// error.tsx는 props를 받지 못하는 클라이언트 경계다. 전체 문구 카탈로그를 번들에 넣지 않도록
// 서버 레이아웃이 오류 화면에 필요한 문구만 내려준다.
export function InviteErrorContentProvider({
  value,
  children,
}: {
  value: InviteErrorContent;
  children: ReactNode;
}) {
  return (
    <InviteErrorContentContext value={value}>
      {children}
    </InviteErrorContentContext>
  );
}

export function useInviteErrorContent() {
  const content = use(InviteErrorContentContext);
  if (content == null) throw new Error("InviteErrorContentProvider is missing");
  return content;
}
