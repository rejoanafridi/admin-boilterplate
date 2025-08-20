import type { Metadata } from 'next'
import { generateDashboardPageMetadata } from '@/lib/generate-page-metadata'

export const metadata: Metadata = generateDashboardPageMetadata('settings')

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
