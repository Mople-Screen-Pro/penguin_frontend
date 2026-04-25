import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabase } from '../../../lib/supabase'
import ReleaseDetailClient from './ReleaseDetailClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const { data: release } = await supabase
    .from('releases')
    .select('version, title')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!release) {
    return {
      title: 'Release Not Found',
    }
  }

  const title = `v${release.version} - ${release.title}`

  return {
    title,
    description: release.title,
    alternates: {
      canonical: `/releases/${slug}`,
    },
    openGraph: {
      title,
      description: release.title,
      url: `/releases/${slug}`,
      type: 'article',
    },
  }
}

export default async function ReleaseDetailPage({ params }: Props) {
  const { slug } = await params

  const { data: release } = await supabase
    .from('releases')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!release) {
    notFound()
  }

  return <ReleaseDetailClient release={release} />
}
