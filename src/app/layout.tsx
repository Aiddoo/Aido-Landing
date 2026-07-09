import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://aido.kr";
const SITE_NAME = "Aido";

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
