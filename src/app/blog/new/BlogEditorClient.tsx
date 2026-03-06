'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Header from '../../../components/Header'
import { useAuth } from '../../../contexts/AuthContext'
import { useAdmin } from '../../../hooks/useAdmin'
import { createPost, generateSlug } from '../../../lib/blog'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function BlogEditorClient() {
  const router = useRouter()
  const { user } = useAuth()
  const { isAdmin, loading: adminLoading } = useAdmin()

  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const [published, setPublished] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (adminLoading) {
    return (
      <>
        <Header />
        <div className="max-w-3xl mx-auto pt-28 pb-16 px-4">
          <p className="text-slate-500">Loading...</p>
        </div>
      </>
    )
  }

  if (!isAdmin) {
    return (
      <>
        <Header />
        <div className="max-w-3xl mx-auto pt-28 pb-16 px-4">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Access denied</h1>
          <p className="text-slate-600 mb-6">You do not have permission to create blog posts.</p>
          <Link href="/blog" className="text-sky-600 hover:text-sky-700 font-medium">
            Back to Blog
          </Link>
        </div>
      </>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSubmitting(true)
    setError(null)

    try {
      const slug = generateSlug(title)
      const post = await createPost({
        title,
        slug,
        excerpt: excerpt || null,
        content,
        cover_image_url: coverImageUrl || null,
        published,
        published_at: published ? new Date().toISOString() : null,
        author_id: user.id,
      })
      router.push(`/blog/${post.slug}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create post')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none'

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto pt-28 pb-16 px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">New Blog Post</h1>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              placeholder="Post title"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700 mb-1">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className={inputClass}
              placeholder="Brief summary of the post"
            />
          </div>

          <div data-color-mode="light">
            <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">
              Content
            </label>
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || '')}
              height={400}
              preview="live"
            />
          </div>

          <div>
            <label htmlFor="cover_image_url" className="block text-sm font-medium text-slate-700 mb-1">
              Cover Image URL
            </label>
            <input
              id="cover_image_url"
              type="text"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              className={inputClass}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="published"
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <label htmlFor="published" className="text-sm font-medium text-slate-700">
              Publish immediately
            </label>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-br from-sky-500 to-blue-600 text-white font-semibold rounded-xl px-6 py-3 hover:from-sky-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Creating...' : 'Create Post'}
            </button>
            <Link href="/blog" className="text-slate-600 hover:text-slate-900 font-medium">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}
