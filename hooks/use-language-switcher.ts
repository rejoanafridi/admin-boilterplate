'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

import { locales, Locale } from '@/lib/i18n-config'

export function useLanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale() as Locale

  const switchLanguage = (locale: string) => {
    console.log('Switching to locale:', locale, 'from:', currentLocale)

    // Check if the locale is valid
    if (!locales.includes(locale as any)) return

    // Don't switch if already on this locale
    if (locale === currentLocale) return

    // Get the path without any locale prefix
    let pathWithoutLocale = pathname

    // Check if the current path has a locale prefix
    for (const loc of locales) {
      // Handle both /fr/ and /fr (exact match)
      if (pathname.startsWith(`/${loc}/`)) {
        pathWithoutLocale = pathname.replace(`/${loc}`, '')
        break
      } else if (pathname === `/${loc}`) {
        pathWithoutLocale = '/'
        break
      }
    }

    // Make sure path starts with / for consistency
    if (!pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = '/' + pathWithoutLocale
    }

    // Construct the new path with or without locale prefix
    let newPath
    if (locale === 'en') {
      newPath = pathWithoutLocale
    } else {
      newPath = `/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
    }

    console.log('Navigating to:', newPath)
    router.push(newPath)
    router.refresh()
  }

  const getLocalizedPath = (path: string) => {
    // Handle exact locale matches (like "/fr")
    for (const loc of locales) {
      if (path === `/${loc}`) {
        return currentLocale === 'en' ? '/' : `/${currentLocale}`
      }
    }

    // Handle paths with locale prefixes (like "/fr/dashboard")
    for (const loc of locales) {
      if (path.startsWith(`/${loc}/`)) {
        // Replace the locale prefix with current locale (or none for English)
        const pathWithoutLocale = path.replace(`/${loc}`, '')
        return currentLocale === 'en'
          ? pathWithoutLocale
          : `/${currentLocale}${pathWithoutLocale}`
      }
    }

    // If no locale in path, add the current locale prefix (except for English)
    // Make sure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    return currentLocale === 'en'
      ? normalizedPath
      : `/${currentLocale}${normalizedPath}`
  }

  return {
    currentLocale,
    locales,
    switchLanguage,
    getLocalizedPath,
  }
}
