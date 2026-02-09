import type { Metadata } from "next";
import { Kalam, Patrick_Hand } from "next/font/google";
import "./globals.css";

const kalam = Kalam({
  weight: ["400", "700"],
  variable: "--font-kalam",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  weight: "400",
  variable: "--font-patrick-hand",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#FF6843",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Aido | 친구와 함께하는 가장 설레는 Ai Todo 서비스",
  description: "Aido는 고양이 친구들과 함께 할 일을 관리하는 소셜 Todo 앱입니다. 개인 생산성 관리부터 친구와의 공유까지, 당신의 하루를 특별하게 만들어보세요.",
  metadataBase: new URL("https://aido.kr"),
  keywords: ["Aido", "에이도", "Todo 앱", "할 일 관리", "AI 비서", "고양이 Todo", "소셜 Todo", "생산성"],
  authors: [{ name: "Aido Labs" }],
  openGraph: {
    title: "Aido | 친구와 함께하는 Ai Todo",
    description: "고양이 친구들과 함께하는 즐거운 할 일 관리, Aido",
    url: "https://aido.kr",
    siteName: "Aido",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Aido Logo",
      },
    ],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${kalam.variable} ${patrickHand.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
