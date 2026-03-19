import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Black_Han_Sans, Noto_Sans_KR } from "next/font/google";
import { cookies, headers } from "next/headers";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import "./globals.css";

const SITE_URL = "https://aido.kr";
const SITE_NAME = "Aido";

const notoSansKR = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  subsets: ["latin"],
  display: "swap",
});

const blackHanSans = Black_Han_Sans({
  weight: "400",
  variable: "--font-black-han",
  subsets: ["latin"],
  display: "swap",
});

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const localeFromHeader = headerStore.get("x-locale") ?? "";
  const cookieStore = await cookies();
  const localeFromCookie = cookieStore.get(localeCookieName)?.value ?? "";

  const lang = isLocale(localeFromHeader)
    ? localeFromHeader
    : isLocale(localeFromCookie)
      ? localeFromCookie
      : defaultLocale;

  return (
    <html lang={lang}>
      <body
        className={`${notoSansKR.variable} ${blackHanSans.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
