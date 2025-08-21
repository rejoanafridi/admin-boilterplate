import type { Metadata } from 'next'

import { generateAuthPageMetadata } from '@/lib/generate-page-metadata'

export const metadata: Metadata = generateAuthPageMetadata('login')

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
