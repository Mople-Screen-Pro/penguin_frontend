import type { Metadata } from 'next'
import ReleaseListClient from './ReleaseListClient'

export const metadata: Metadata = {
  title: 'Releases',
  description: 'See what\'s new in each version of Penguin.',
  alternates: { canonical: '/releases' },
}

export default function ReleasesPage() {
  return <ReleaseListClient />
}
