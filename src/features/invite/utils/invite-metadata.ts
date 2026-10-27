import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { buildSocialMetadata, SITE_NAME } from "@/lib/seo";

const INVITE_SHARE_IMAGE = {
  url: "/images/invite-share.png",
  width: 1600,
  height: 800,
  type: "image/png",
};

/**
 * 초대 페이지 metadata. 코드가 담긴 주소는 색인·사이트맵 대상이 아니며 정규 주소가 없다.
 * 코드 유무와 관계없이 같은 제목·OG를 쓴다(링크 미리보기는 초대한 친구를 드러내지 않는다).
 */
export function buildInviteMetadata(locale: Locale): Metadata {
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
    // 레이아웃의 홈 canonical/hreflang을 물려받지 않는다.
    alternates: {},
    robots: { index: false, follow: false },
    openGraph: { ...social.openGraph, url: undefined, images },
    twitter: { ...social.twitter, images },
  };
}
