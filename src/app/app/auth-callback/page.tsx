import type { Metadata } from 'next'
import AppRedirectClient from './AppRedirectClient'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AppRedirectPage() {
  return <AppRedirectClient />
}
