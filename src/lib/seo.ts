import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";

export const SITE_URL = "https://aido.kr";
export const SITE_NAME = "Aido";

export const APP_STORE_URL =
  "https://apps.apple.com/kr/app/%EC%95%84%EC%9D%B4%EB%91%90-ai-%ED%88%AC%EB%91%90-%ED%94%8C%EB%9E%98%EB%84%88/id6757722325";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.aido.mobile";
export const INSTAGRAM_URL = "https://www.instagram.com/aiddoo_official/";

const OG_IMAGE_PATH = "/og-image.png";

type SocialMetadataInput = {
  locale: Locale;
  title: string;
  description: string;
  /** 로케일 세그먼트를 제외한 경로. 홈은 "", 그 외 "/patch-notes" 형태 */
  path: string;
};

// Next.js 메타데이터는 openGraph/twitter를 부모와 딥 머지하지 않고 통째로
// 교체한다. 하위 페이지가 og:url/og:title만 바꾸려 해도 완전한 객체가
// 필요하므로, 여기서 페이지별 완성본을 만들어 공유한다.
export function buildSocialMetadata({
  locale,
  title,
  description,
  path,
}: SocialMetadataInput): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}${path}`,
      siteName: SITE_NAME,
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
      alternateLocale: locale === "ko" ? "en_US" : "ko_KR",
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: OG_IMAGE_PATH, alt: title }],
    },
  };
}

export const APP_STORE_ID = "6757722325";
export const ANDROID_APP_ID = "com.aido.mobile";
export const IS_PREVIEW = process.env.VERCEL_ENV === "preview";
export const SEARCH_ROBOTS: Metadata["robots"] = {
  index: !IS_PREVIEW,
  follow: true,
  googleBot: {
    index: !IS_PREVIEW,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export function buildPageMetadata({
  locale,
  title,
  description,
  path,
  socialTitle = title,
  socialDescription = description,
}: SocialMetadataInput & {
  socialTitle?: string;
  socialDescription?: string;
}): Metadata {
  return {
    title: { absolute: path ? `${title} | ${SITE_NAME}` : title },
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}${path}`,
      languages: {
        ko: `${SITE_URL}/ko${path}`,
        en: `${SITE_URL}/en${path}`,
        "x-default": `${SITE_URL}/ko${path}`,
      },
    },
    robots: SEARCH_ROBOTS,
    ...buildSocialMetadata({
      locale,
      title: socialTitle,
      description: socialDescription,
      path,
    }),
  };
}
