import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { locales } from './lib/i18n-config'

// Create the i18n middleware
const i18nMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: true,
})

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle internationalization first
  const i18nResponse = i18nMiddleware(request)
  if (i18nResponse) {
    return i18nResponse
  }

  // Remove locale prefix for auth check (if present)
  const pathnameWithoutLocale = locales.some((locale) =>
    pathname.startsWith(`/${locale}/`)
  )
    ? pathname.replace(/^\/[^/]+/, '')
    : pathname

  // Check if user is authenticated
  const token = request.cookies.get('auth-token')?.value

  // Public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/auth/register']
  const isPublicRoute = publicRoutes.some(
    (route) =>
      pathnameWithoutLocale === route || pathnameWithoutLocale.startsWith(route)
  )

  // If user is not authenticated and trying to access protected route
  if (
    !token &&
    !isPublicRoute &&
    pathnameWithoutLocale.startsWith('/dashboard')
  ) {
    // Redirect to login with locale preservation
    const locale = pathname.split('/')[1]
    const isValidLocale = locales.includes(locale as any)

    const loginUrl = new URL(
      `${isValidLocale ? `/${locale}` : ''}${'/auth/login'}`,
      request.url
    )

    return NextResponse.redirect(loginUrl)
  }

  // If user is authenticated and trying to access auth routes
  if (token && isPublicRoute) {
    // Redirect to dashboard with locale preservation
    const locale = pathname.split('/')[1]
    const isValidLocale = locales.includes(locale as any)

    const dashboardUrl = new URL(
      `${isValidLocale ? `/${locale}` : ''}${'/dashboard'}`,
      request.url
    )

    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip files with extension and api routes
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
