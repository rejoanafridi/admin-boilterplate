import type { Metadata } from 'next'

import { routeMetadataMap } from './metadata'

/**
 * Generate metadata for a specific page
 * @param route - The route path (e.g., '/auth/login')
 * @param customMetadata - Optional custom metadata to override defaults
 * @returns Metadata object for Next.js
 */
export function generatePageMetadata(
  route: string,
  customMetadata?: Partial<Metadata>
): Metadata {
  const baseMetadata = routeMetadataMap[route] || routeMetadataMap.default

  // Merge base metadata with custom metadata
  const mergedMetadata: Metadata = {
    title: customMetadata?.title || baseMetadata.title,
    description: customMetadata?.description || baseMetadata.description,
    keywords: customMetadata?.keywords || baseMetadata.keywords?.join(', '),
    openGraph: {
      ...baseMetadata.openGraph,
      ...customMetadata?.openGraph,
    },
    robots: customMetadata?.robots || {
      index: true,
      follow: true,
    },
    ...customMetadata, // Allow other custom metadata to override
  }

  return mergedMetadata
}

/**
 * Generate metadata for auth pages (login, register)
 * @param page - The auth page type
 * @returns Metadata object for auth pages
 */
export function generateAuthPageMetadata(page: 'login' | 'register'): Metadata {
  const route = `/auth/${page}`
  return generatePageMetadata(route, {
    robots: {
      index: false, // Don't index auth pages
      follow: false,
    },
  })
}

/**
 * Generate metadata for dashboard pages
 * @param page - The dashboard page type
 * @returns Metadata object for dashboard pages
 */
export function generateDashboardPageMetadata(page: string): Metadata {
  const route = `/dashboard/${page}`
  return generatePageMetadata(route, {
    robots: {
      index: false, // Don't index dashboard pages (private)
      follow: false,
    },
  })
}

/**
 * Generate metadata for public pages
 * @param page - The page name
 * @returns Metadata object for public pages
 */
export function generatePublicPageMetadata(page: string): Metadata {
  return generatePageMetadata(`/${page}`, {
    robots: {
      index: true,
      follow: true,
    },
  })
}
