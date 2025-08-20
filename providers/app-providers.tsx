'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from '@/contexts/theme-context'
import { AuthProvider } from '@/contexts/auth-context'
import { RouteMetadataProvider } from '@/components/route-metadata-provider'

interface AppProvidersProps {
  children: ReactNode
}

/**
 * Main providers component that wraps all global contexts
 * The order is important: QueryProviders should be the outermost provider
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    // <QueryProviders>
    <ThemeProvider>
      <AuthProvider>
        <RouteMetadataProvider>{children}</RouteMetadataProvider>
      </AuthProvider>
    </ThemeProvider>
    // </QueryProviders>
  )
}
