import type { Metadata } from 'next'

import { generateAuthPageMetadata } from '@/lib/generate-page-metadata'

export const metadata: Metadata = generateAuthPageMetadata('register')

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
