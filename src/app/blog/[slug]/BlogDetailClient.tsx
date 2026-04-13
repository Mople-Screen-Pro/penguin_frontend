'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { useAdmin } from '../../../hooks/useAdmin'
import { getPostBySlug, deletePost } from '../../../lib/blog'
import type { BlogPost } from '../../../lib/blog'

export default function BlogDetailClient() {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()
  const { isAdmin } = useAdmin()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return

    async function fetchPost() {
      try {
        const data = await getPostBySlug(slug as string)
        if (!data) {
          setNotFound(true)
        } else {
          setPost(data)
        }
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  const handleDelete = async () => {
    if (!post) return
    const confirmed = window.confirm('Are you sure you want to delete this post?')
    if (!confirmed) return

    try {
      await deletePost(post.id)
      router.push('/blog')
    } catch (error) {
      console.error('Failed to delete post:', error)
      alert('Failed to delete the post.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0A0A0F]">
        <Header />
        <main className="max-w-3xl mx-auto pt-28 pb-16 px-4 flex-grow w-full">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0A0A0F]">
        <Header />
        <main className="max-w-3xl mx-auto pt-28 pb-16 px-4 flex-grow w-full">
          <h1 className="text-2xl font-bold text-white mb-4">404 - Post Not Found</h1>
          <p className="text-gray-400 mb-6">The post you are looking for does not exist.</p>
          <Link
            href="/blog"
            className="text-primary-400 hover:text-primary-300 font-medium"
          >
            &larr; Back to Blog
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0F]">
      <Header />
      <main className="max-w-3xl mx-auto pt-28 pb-20 px-4 flex-grow w-full">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-gray-400 hover:text-primary-400 font-medium mb-10 transition-colors"
        >
          &larr; Back to Blog
        </Link>

        <div className="flex items-center gap-3 mb-6">
          {post.published_at && (
            <time className="text-sm text-gray-500">
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          {!post.published && (
            <span className="inline-block bg-yellow-500/10 text-yellow-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-yellow-500/20">
              Draft
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-gray-400 mb-10 leading-relaxed">{post.excerpt}</p>
        )}

        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full rounded-2xl max-h-[480px] object-cover mb-12 border border-gray-800"
          />
        )}

        <article className="blog-prose">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
        </article>

        {isAdmin && (
          <div className="flex items-center gap-4 mt-16 pt-8 border-t border-gray-800">
            <Link
              href={`/blog/${post.slug}/edit`}
              className="btn-block-ghost btn-block-sm"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="btn-block-ghost btn-block-sm !text-red-400 !border-red-500/20 hover:!bg-red-500/10"
            >
              Delete
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
