import { redirect } from 'next/navigation'

export default function LocaleIndexPage() {
  // Redirect to dashboard as the main entry point
  redirect('/dashboard')
}
