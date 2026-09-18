import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n';

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage?.toLowerCase().includes('en')) return 'en';
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Never touch static files (anything with a file extension) or Next internals.
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || /\.[a-zA-Z0-9]+$/.test(pathname)) {
    return;
  }

  const hasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (hasLocale) return;

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Excludes _next, api, and any request path that has a file extension
  // (images, videos, favicon, robots.txt, etc.) — those are always static
  // files and must never be prefixed with a locale.
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
