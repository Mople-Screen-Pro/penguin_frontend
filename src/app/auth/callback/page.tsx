import type { Metadata } from 'next'
import { Suspense } from 'react'
import AuthCallbackClient from './AuthCallbackClient'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AuthCallbackPage() {
  return (
    <Suspense>
      <AuthCallbackClient />
    </Suspense>
  )
}
