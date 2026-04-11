import type { Metadata } from 'next'
import ReleaseListClient from './ReleaseListClient'

export const metadata: Metadata = {
  title: 'Releases',
  description: 'See what\'s new in each version of Clipa.',
  alternates: { canonical: '/releases' },
}

export default function ReleasesPage() {
  return <ReleaseListClient />
}
