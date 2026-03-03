import type { Metadata } from 'next'
import { Suspense } from 'react'
import MyPageClient from './MyPageClient'

export const metadata: Metadata = {
  title: 'My Account',
  robots: { index: false, follow: false },
}

export default function MyPage() {
  return (
    <Suspense>
      <MyPageClient />
    </Suspense>
  )
}
