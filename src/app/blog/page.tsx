import type { Metadata } from 'next'
import { getPublishedPosts } from '../../lib/blog'
import BlogListClient from './BlogListClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest news, tips, and tutorials about Clipa screen recording.',
  alternates: { canonical: '/blog' },
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return <BlogListClient initialPosts={posts} />
}
