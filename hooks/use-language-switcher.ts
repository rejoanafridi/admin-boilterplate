'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

import { locales, Locale } from '@/lib/i18n-config'

export function useLanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale() as Locale

  const switchLanguage = (locale: string) => {
    // Check if the locale is valid
    if (!locales.includes(locale as any)) return

    // Don't switch if already on this locale
    if (locale === currentLocale) return

    // Extract the path without any locale prefix
    let pathWithoutLocale = pathname

    // Remove locale prefix if present
    const currentPathSegments = pathname.split('/').filter(Boolean)
    if (
      currentPathSegments.length > 0 &&
      locales.includes(currentPathSegments[0] as Locale)
    ) {
      // Remove the first segment (locale) and reconstruct path
      pathWithoutLocale = '/' + currentPathSegments.slice(1).join('/')
    }

    // Ensure path starts with /
    if (!pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = '/' + pathWithoutLocale
    }

    // If path is just "/", keep it as is
    if (pathWithoutLocale === '/') {
      pathWithoutLocale = '/'
    }

    // Construct the new path
    const newPath =
      pathWithoutLocale === '/'
        ? `/${locale}`
        : `/${locale}${pathWithoutLocale}`

    // Navigate to the new path
    router.push(newPath)
  }

  const getLocalizedPath = (path: string) => {
    // Extract the path without any locale prefix
    let pathWithoutLocale = path

    // Remove locale prefix if present
    const pathSegments = path.split('/').filter(Boolean)
    if (
      pathSegments.length > 0 &&
      locales.includes(pathSegments[0] as Locale)
    ) {
      // Remove the first segment (locale) and reconstruct path
      pathWithoutLocale = '/' + pathSegments.slice(1).join('/')
    }

    // Ensure path starts with /
    if (!pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = '/' + pathWithoutLocale
    }

    // Construct the localized path
    if (currentLocale === 'en') {
      // For English, use the path without locale prefix
      return pathWithoutLocale === '/' ? '/' : pathWithoutLocale
    } else {
      // For other languages, add the locale prefix
      return pathWithoutLocale === '/'
        ? `/${currentLocale}`
        : `/${currentLocale}${pathWithoutLocale}`
    }
  }

  return {
    currentLocale,
    locales,
    switchLanguage,
    getLocalizedPath,
  }
}
