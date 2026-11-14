import { withCn } from "cn/next";
import type { NextConfig } from "next";
import { API_URL } from "./src/lib/seo";

const isDev = process.env.NODE_ENV === "development";

// 공개 페이지는 SSG라 요청마다 nonce를 넣을 수 없다(Next 공식 CSP 가이드 "Without Nonces").
// Next 부트스트랩·next-themes 인라인 스크립트 때문에 'unsafe-inline'은 남기고,
// 외부 출처는 GA4(Consent Mode 동의 뒤 로드)와 초대 API만 허용한다.
// Vercel Analytics는 같은 출처(/_vercel/insights)라 'self'로 충분하다.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://*.googletagmanager.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com",
  "font-src 'self'",
  "media-src 'self'",
  `connect-src 'self' ${API_URL} https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com${isDev ? " ws:" : ""}`,
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // iOS Universal Links 검증 파일은 확장자가 없어 형식을 직접 지정한다.
      {
        source: "/.well-known/apple-app-site-association",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
      {
        source: "/.well-known/assetlinks.json",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
      // 코드가 담긴 초대 주소는 색인하지 않는다(페이지 metadata와 함께 적용).
      {
        source: "/i/:inviteCode",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      // proxy가 rewrite하는 실제 경로도 직접 열면 같은 정책을 쓴다.
      {
        source: "/:locale(ko|en)/invite/:inviteCode",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/responsive/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // 내용 해시를 붙인 앱 녹화 영상·포스터(pnpm videos:generate)
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    loader: "custom",
    loaderFile: "./src/components/media/static-image-loader.ts",
    deviceSizes: [320, 480, 640, 960, 1280],
    imageSizes: [48, 96, 160, 240],
  },
};

// cn의 병합 표를 실제로 쓰는 클래스만으로 빌드 때 만들어 브라우저 JavaScript를 줄인다.
export default withCn(nextConfig, {
  content: ["src/**/*.{ts,tsx}"],
  css: "src/app/globals.css",
  out: "src/lib/cn-tables.ts",
});
