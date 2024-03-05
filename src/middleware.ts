import { NextRequest, NextResponse } from "next/server";
import { addLocaleToResponse } from "./helpers/add-locale-to-response";
import { getTenantLocale } from "./helpers/get-tenant-locale";

export async function middleware(request: NextRequest) {
  const locale = await getTenantLocale();

  const response = NextResponse.next();

  return addLocaleToResponse(request, response, locale);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
