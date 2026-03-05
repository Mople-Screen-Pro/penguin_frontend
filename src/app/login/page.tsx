import type { Metadata } from 'next'
import { Suspense } from 'react'
import LoginClient from './LoginClient'

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Sign in to your Penguin account. Access your screen recording settings, manage your subscription, and more.',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginClient />
    </Suspense>
  )
}
