import { Metadata } from 'next'

import { locales } from './i18n-config'

type LocalizedMetadataProps = {
  title: string
  description: string
  locale: string
}

/**
 * Creates localized metadata with proper alternates for language variants
 */
export function createIntlMetadata({
  title,
  description,
  locale,
}: LocalizedMetadataProps): Metadata {
  // Base URL for the site (replace with your actual domain in production)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  // Current pathname without the locale
  const pathname = locale === 'en' ? '/' : '/'

  // Create alternate language variants for this page
  const alternateLanguages: Record<string, string> = {}
  locales.forEach((loc) => {
    if (loc === 'en') {
      alternateLanguages[loc] = pathname
    } else {
      alternateLanguages[loc] = `/${loc}${pathname}`
    }
  })

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}${pathname}`,
      languages: alternateLanguages,
    },
    openGraph: {
      title,
      description,
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
    },
  }
}
