'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
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
          <p className="text-gray-500">Loading...</p>
        </main>
      </>
    )
  }

  if (notFound || !post) {
    return (
      <>
        <Header />
        <main className="max-w-3xl mx-auto pt-28 pb-16 px-4">
          <h1 className="text-2xl font-bold text-white mb-4">404 - Post Not Found</h1>
          <p className="text-gray-400 mb-6">The post you are looking for does not exist.</p>
          <Link
            href="/blog"
            className="text-primary-400 hover:text-primary-300 font-medium"
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
      <main className="max-w-3xl mx-auto pt-28 pb-20 px-4">
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

        <article className="prose prose-invert prose-slate max-w-none prose-headings:text-white prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-primary-400 prose-a:no-underline hover:prose-a:text-primary-300 prose-strong:text-white prose-code:text-primary-300 prose-code:bg-gray-800/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[#111] prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-xl prose-blockquote:border-primary-500/50 prose-blockquote:text-gray-400 prose-li:text-gray-300 prose-img:rounded-xl prose-hr:border-gray-800">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        {isAdmin && (
          <div className="flex items-center gap-4 mt-16 pt-8 border-t border-gray-800">
            <Link
              href={`/blog/${post.slug}/edit`}
              className="inline-flex items-center px-5 py-2.5 bg-gray-800 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors border border-gray-700"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-5 py-2.5 bg-red-500/10 text-red-400 text-sm font-medium rounded-xl hover:bg-red-500/20 transition-colors border border-red-500/20"
            >
              Delete
            </button>
          </div>
        )}
      </main>
    </>
  )
}
