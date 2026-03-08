import type { Metadata } from 'next'
import { supabase } from '../../../lib/supabase'
import BlogDetailClient from './BlogDetailClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, cover_image_url')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      url: `/blog/${slug}`,
      type: 'article',
      ...(post.cover_image_url && {
        images: [{ url: post.cover_image_url }],
      }),
    },
  }
}

export default function BlogDetailPage() {
  return <BlogDetailClient />
}
