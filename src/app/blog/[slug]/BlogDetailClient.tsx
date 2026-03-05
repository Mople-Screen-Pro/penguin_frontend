'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import Header from '../../../components/Header'
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
      <>
        <Header />
        <main className="max-w-3xl mx-auto pt-28 pb-16 px-4">
          <p className="text-slate-500">Loading...</p>
        </main>
      </>
    )
  }

  if (notFound || !post) {
    return (
      <>
        <Header />
        <main className="max-w-3xl mx-auto pt-28 pb-16 px-4">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">404 - Post Not Found</h1>
          <p className="text-slate-600 mb-6">The post you are looking for does not exist.</p>
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            &larr; Back to Blog
          </Link>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto pt-28 pb-16 px-4">
        <Link
          href="/blog"
          className="inline-block text-blue-600 hover:text-blue-800 font-medium mb-8"
        >
          &larr; Back to Blog
        </Link>

        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full rounded-xl max-h-96 object-cover mb-8"
          />
        )}

        <h1 className="text-4xl font-bold text-slate-900 mb-4">{post.title}</h1>

        <div className="flex items-center gap-3 mb-8">
          {post.published_at && (
            <time className="text-sm text-slate-500">
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          {!post.published && (
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Draft
            </span>
          )}
        </div>

        <article
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {isAdmin && (
          <div className="flex items-center gap-4 mt-12 pt-8 border-t border-slate-200">
            <Link
              href={`/blog/${post.slug}/edit`}
              className="inline-flex items-center px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-xl hover:bg-slate-700 transition-colors"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </main>
    </>
  )
}
