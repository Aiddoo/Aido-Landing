import type { Metadata } from "next";
import { InvitePage } from "@/features/invite/pages/invite-page";
import { buildInviteMetadata } from "@/features/invite/utils/invite-metadata";
import { resolveLocale } from "@/i18n/resolve-locale";

type Props = PageProps<"/[locale]/invite">;

// 코드 없는 초대 주소. proxy는 형식이 틀린 /i/{코드}도 이 정적 페이지로 rewrite한다.
// 조회할 코드가 없으므로 서버 HTML이 바로 "잘못된 링크" 상태다.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildInviteMetadata(resolveLocale((await params).locale));
}

export default async function Page({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  return <InvitePage locale={locale} code={null} />;
}
