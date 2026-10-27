import { type NextRequest, NextResponse } from "next/server";
import { parseInviteCodeFromPathname } from "@/features/invite/utils/invite-code";
import { isLocale, type Locale, localeCookieName } from "@/i18n/config";
import { getPreferredLocale } from "@/i18n/request-locale";
import { INVITE_LINK_PATTERN } from "@/lib/invite-link";

// 친구 초대 링크 /i/{코드}. 유효한 코드는 요청마다 그리는 /{locale}/invite/{코드}로,
// 형식이 틀린 코드는 정적 /{locale}/invite("잘못된 링크")로 보낸다.
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
    // 주소창은 /i/{코드}로 둔다. 코드는 정규화(대문자·하이픈 제거)한 값만 rewrite 대상에 싣는다.
    const code = parseInviteCodeFromPathname(pathname);
    targetUrl.pathname =
      code == null
        ? `/${targetLocale}${INVITE_PAGE_PATH}`
        : `/${targetLocale}${INVITE_PAGE_PATH}/${code}`;
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
