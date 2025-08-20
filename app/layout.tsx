import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ErrorBoundary } from '@/components/error-boundary'
import { Toaster } from '@/components/ui/sonner'
import { AppProviders } from '@/providers/app-providers'
import QueryProvider from '@/providers/QueryProvider'

const inter = Inter({ subsets: ['latin'] })

// Default metadata for the root layout
export const metadata: Metadata = {
  title: {
    default: 'Admin Dashboard',
    template: '%s | Admin Dashboard',
  },
  description: 'Professional admin dashboard and management system',
  keywords: ['admin', 'dashboard', 'management', 'system'],
  authors: [{ name: 'Admin Team' }],
  creator: 'Admin Dashboard',
  publisher: 'Admin Dashboard',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'http://localhost:3000',
    title: 'Admin Dashboard',
    description: 'Professional admin dashboard and management system',
    siteName: 'Admin Dashboard',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Admin Dashboard',
    description: 'Professional admin dashboard and management system',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <QueryProvider>
            <AppProviders>
              {children}
              <Toaster richColors />
            </AppProviders>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
