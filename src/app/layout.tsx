import type { Metadata, Viewport } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

export const viewport = {
  themeColor: "#FF6843",
  width: "device-width",
  initialScale: 1,
} satisfies Viewport;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  category: "productivity",
  creator: "레드밴드",
  publisher: "레드밴드",
  manifest: "/site.webmanifest",
  itunes: {
    appId: "6757722325",
  },
  // 검색엔진 소유 확인 태그 — 값이 없으면 렌더링되지 않는다.
  // Vercel 환경변수(GOOGLE_SITE_VERIFICATION, NAVER_SITE_VERIFICATION)에
  // 코드를 넣고 재배포하면 빌드 시점에 주입된다.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.NAVER_SITE_VERIFICATION
      ? { "naver-site-verification": process.env.NAVER_SITE_VERIFICATION }
      : undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

// 루트 레이아웃은 요청시점 API(headers/cookies)를 쓰지 않는다.
// <html lang>은 로케일을 빌드시점에 아는 [locale]/layout.tsx가 소유한다 —
// 그래야 하위 라우트가 정적(SSG)으로 프리렌더된다.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
