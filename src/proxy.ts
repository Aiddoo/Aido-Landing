import { type NextRequest, NextResponse } from "next/server";
import { isLocale, type Locale, localeCookieName } from "@/i18n/config";
import { getPreferredLocale } from "@/i18n/request-locale";

// 친구 초대 링크 /i/{코드}. 코드 검증은 브라우저에서 하므로 형태만 확인한다.
const INVITE_LINK_PATTERN = /^\/i\/[^/]+\/?$/;
const INVITE_PAGE_PATH = "/invite";

function isPublicFile(pathname: string): boolean {
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

function localeFromPathname(pathname: string): Locale | null {
  const segment = pathname.split("/")[1] ?? "";
  return isLocale(segment) ? segment : null;
}

function applyLocaleCookie(response: NextResponse, locale: Locale) {
  response.cookies.set(localeCookieName, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/.well-known") ||
    isPublicFile(pathname)
  ) {
    return NextResponse.next();
  }

  const localeInPath = localeFromPathname(pathname);

  if (localeInPath) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", localeInPath);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    applyLocaleCookie(response, localeInPath);
    return response;
  }

  const preferredLocale = getPreferredLocale({
    cookieLocale: request.cookies.get(localeCookieName)?.value,
    acceptLanguage: request.headers.get("accept-language"),
  });

  const targetLocale = preferredLocale;
  const targetUrl = request.nextUrl.clone();
  if (INVITE_LINK_PATTERN.test(pathname)) {
    // 주소창은 /i/{코드}로 두고 정적 /{locale}/invite를 보여 준다. 코드는 rewrite 대상에 싣지 않는다.
    targetUrl.pathname = `/${targetLocale}${INVITE_PAGE_PATH}`;
    targetUrl.search = "";
  } else {
    targetUrl.pathname =
      pathname === "/" ? `/${targetLocale}` : `/${targetLocale}${pathname}`;
  }

  const response = NextResponse.rewrite(targetUrl);
  applyLocaleCookie(response, targetLocale);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|\\.well-known|.*\\..*).*)"],
};
