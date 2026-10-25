import type { Metadata } from "next";
import { InvitePage } from "@/features/invite/pages/invite-page";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { buildSocialMetadata, SITE_NAME } from "@/lib/seo";

type Props = PageProps<"/[locale]/invite">;

const INVITE_SHARE_IMAGE = {
  url: "/images/invite-share.png",
  width: 1600,
  height: 800,
  type: "image/png",
};

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

  // 한국어 초대는 앱이 카카오톡 공유에 쓰는 초대 썸네일(2:1)을 링크 미리보기에도 쓴다.
  // 썸네일 문구가 한국어라 영어 페이지는 기본 OG 이미지를 유지한다.
  const images =
    locale === "ko"
      ? [{ ...INVITE_SHARE_IMAGE, alt: title }]
      : social.openGraph?.images;

  return {
    title: { absolute: title },
    description: invite.metaDescription,
    // 레이아웃의 홈 canonical/hreflang을 물려받지 않는다. 코드별 주소는 정규 주소가 없다.
    alternates: {},
    robots: { index: false, follow: false },
    openGraph: { ...social.openGraph, url: undefined, images },
    twitter: { ...social.twitter, images },
  };
}

export default async function Page({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  return <InvitePage locale={locale} />;
}
