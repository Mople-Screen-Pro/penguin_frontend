import type { Metadata } from 'next'
import BlogListClient from './BlogListClient'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest news, tips, and tutorials about Clipa screen recording.',
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  return <BlogListClient />
}
