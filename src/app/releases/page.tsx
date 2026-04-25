import type { Metadata } from 'next'
import { getPublishedReleases } from '../../lib/releases'
import ReleaseListClient from './ReleaseListClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Releases',
  description: 'See what\'s new in each version of Clipa.',
  alternates: { canonical: '/releases' },
}

export default async function ReleasesPage() {
  const releases = await getPublishedReleases()

  return <ReleaseListClient initialReleases={releases} />
}
