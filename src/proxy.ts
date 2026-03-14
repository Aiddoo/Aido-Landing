import { type NextRequest, NextResponse } from "next/server";
import { isLocale, type Locale, localeCookieName } from "@/i18n/config";
import { getPreferredLocale } from "@/i18n/request-locale";

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
  targetUrl.pathname =
    pathname === "/" ? `/${targetLocale}` : `/${targetLocale}${pathname}`;

  const response = NextResponse.rewrite(targetUrl);
  applyLocaleCookie(response, targetLocale);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
