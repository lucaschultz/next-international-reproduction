import { NextRequest, NextResponse } from "next/server";
import "server-only";

export const LOCALE_HEADER = "X-Next-Locale";
export const LOCALE_COOKIE = "Next-Locale";

export function addLocaleToResponse(
  request: NextRequest,
  response: NextResponse,
  locale: "en" | "fr"
) {
  response.headers.set(LOCALE_HEADER, locale);

  if (request.cookies.get(LOCALE_COOKIE)?.value !== locale) {
    response.cookies.set(LOCALE_COOKIE, locale, { sameSite: "strict" });
  }

  return response;
}
