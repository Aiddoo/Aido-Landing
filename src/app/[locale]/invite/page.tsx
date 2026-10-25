import type { Metadata } from "next";
import { InvitePage } from "@/features/invite/pages/invite-page";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { buildSocialMetadata, SITE_NAME } from "@/lib/seo";

type Props = PageProps<"/[locale]/invite">;

// 브라우저 주소는 /i/{코드}이고 proxy가 이 정적 페이지로 rewrite한다.
// 코드가 담긴 주소는 색인·사이트맵 대상이 아니다.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const { invite } = getMessages(locale);
  const title = `${invite.metaTitle} | ${SITE_NAME}`;
  const social = buildSocialMetadata({
    locale,
    title,
    description: invite.metaDescription,
    path: "/invite",
  });

  return {
    title: { absolute: title },
    description: invite.metaDescription,
    // 레이아웃의 홈 canonical/hreflang을 물려받지 않는다. 코드별 주소는 정규 주소가 없다.
    alternates: {},
    robots: { index: false, follow: false },
    openGraph: { ...social.openGraph, url: undefined },
    twitter: social.twitter,
  };
}

export default async function Page({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  return <InvitePage locale={locale} />;
}
