import type { Metadata } from 'next'
import { generateDashboardPageMetadata } from '@/lib/generate-page-metadata'

export const metadata: Metadata = generateDashboardPageMetadata('')

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
