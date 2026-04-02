'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import Header from '../../../../components/Header'
import { useAuth } from '../../../../contexts/AuthContext'
import { useAdmin } from '../../../../hooks/useAdmin'
import { updatePost, getPostBySlug } from '../../../../lib/blog'
import type { BlogPost } from '../../../../lib/blog'
import { uploadBlogImage, uploadBlogVideo } from '../../../../lib/storage'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function BlogEditClient() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string
  const { user } = useAuth()
  const { isAdmin, loading: adminLoading } = useAdmin()

  const [post, setPost] = useState<BlogPost | null>(null)
  const [loadingPost, setLoadingPost] = useState(true)
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const [coverPreview, setCoverPreview] = useState('')
  const [published, setPublished] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setCoverPreview(URL.createObjectURL(file))
    setUploading(true)
    setError(null)
    try {
      const url = await uploadBlogImage(file)
      setCoverImageUrl(url)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingVideo(true)
    setError(null)
    try {
      const url = await uploadBlogVideo(file)
      const videoTag = `\n<video src="${url}" controls playsinline></video>\n`
      setContent((prev) => prev + videoTag)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to upload video')
    } finally {
      setUploadingVideo(false)
    }
  }

  useEffect(() => {
    if (!slug) return

    async function fetchPost() {
      try {
        const data = await getPostBySlug(slug)
        if (!data) {
          setError('Post not found')
          setLoadingPost(false)
          return
        }
        setPost(data)
        setTitle(data.title)
        setExcerpt(data.excerpt || '')
        setContent(data.content)
        setCoverImageUrl(data.cover_image_url || '')
        setPublished(data.published)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load post')
      } finally {
        setLoadingPost(false)
      }
    }

    fetchPost()
  }, [slug])

  if (adminLoading || loadingPost) {
    return (
      <>
        <Header />
        <div className="max-w-3xl mx-auto pt-28 pb-16 px-4">
          <p className="text-gray-500">Loading...</p>
        </div>
      </>
    )
  }

  if (!isAdmin) {
    return (
      <>
        <Header />
        <div className="max-w-3xl mx-auto pt-28 pb-16 px-4">
          <h1 className="text-2xl font-bold text-white mb-4">Access denied</h1>
          <p className="text-gray-400 mb-6">You do not have permission to edit blog posts.</p>
          <Link href="/blog" className="text-primary-400 hover:text-primary-300 font-medium">
            Back to Blog
          </Link>
        </div>
      </>
    )
  }

  if (!post) {
    return (
      <>
        <Header />
        <div className="max-w-3xl mx-auto pt-28 pb-16 px-4">
          <h1 className="text-2xl font-bold text-white mb-4">Post not found</h1>
          <Link href="/blog" className="text-primary-400 hover:text-primary-300 font-medium">
            Back to Blog
          </Link>
        </div>
      </>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !post) return

    setSubmitting(true)
    setError(null)

    try {
      const wasPublished = post.published
      let publishedAt = post.published_at

      // If switching from unpublished to published, set published_at
      if (published && !wasPublished && !publishedAt) {
        publishedAt = new Date().toISOString()
      }

      await updatePost(post.id, {
        title,
        excerpt: excerpt || null,
        content,
        cover_image_url: coverImageUrl || null,
        published,
        published_at: publishedAt,
      })
      router.push(`/blog/${slug}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update post')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-gray-800 bg-[#111] px-4 py-3 text-gray-100 placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors'

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto pt-28 pb-16 px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Edit Blog Post</h1>

        {error && (
          <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
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
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-400 mb-1">
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

          <div data-color-mode="dark">
            <label htmlFor="content" className="block text-sm font-medium text-gray-400 mb-1">
              Content
            </label>
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || '')}
              height={400}
              preview="live"
            />
            <label
              className={`inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg border border-gray-700 text-sm text-gray-400 hover:border-primary-500 hover:text-primary-400 transition-colors cursor-pointer ${uploadingVideo ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {uploadingVideo ? 'Uploading video...' : 'Insert video'}
              <input
                type="file"
                accept="video/mp4,video/quicktime,video/webm"
                onChange={handleVideoUpload}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Cover Image
            </label>
            {(coverPreview || coverImageUrl) && (
              <div className="mb-3 relative">
                <img
                  src={coverPreview || coverImageUrl}
                  alt="Cover preview"
                  className="w-full max-h-48 object-cover rounded-xl border border-gray-800"
                />
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
                    <span className="text-white text-sm font-medium">Uploading...</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => { setCoverPreview(''); setCoverImageUrl('') }}
                  className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-black/80 transition-colors text-sm"
                >
                  &times;
                </button>
              </div>
            )}
            <label
              className={`flex items-center justify-center gap-2 w-full rounded-xl border-2 border-dashed border-gray-700 px-4 py-6 text-gray-500 hover:border-primary-500 hover:text-primary-400 transition-colors cursor-pointer ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {uploading ? 'Uploading...' : coverImageUrl ? 'Change cover image' : 'Click to upload cover image'}
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="published"
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 rounded border-gray-700 bg-[#111] text-primary-500 focus:ring-primary-500"
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-400">
              Published
            </label>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl px-6 py-3 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
            <Link href={`/blog/${slug}`} className="text-gray-400 hover:text-white font-medium transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}
