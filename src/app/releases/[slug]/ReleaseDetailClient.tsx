'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Header from '../../../components/Header'
import { useAdmin } from '../../../hooks/useAdmin'
import { getReleaseBySlug, deleteRelease } from '../../../lib/releases'
import type { Release } from '../../../lib/releases'

export default function ReleaseDetailClient() {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()
  const { isAdmin } = useAdmin()
  const [release, setRelease] = useState<Release | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return

    async function fetchRelease() {
      try {
        const data = await getReleaseBySlug(slug as string)
        if (!data) {
          setNotFound(true)
        } else {
          setRelease(data)
        }
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    fetchRelease()
  }, [slug])

  const handleDelete = async () => {
    if (!release) return
    const confirmed = window.confirm('Are you sure you want to delete this release?')
    if (!confirmed) return

    try {
      await deleteRelease(release.id)
      router.push('/releases')
    } catch (error) {
      console.error('Failed to delete release:', error)
      alert('Failed to delete the release.')
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

  if (notFound || !release) {
    return (
      <>
        <Header />
        <main className="max-w-3xl mx-auto pt-28 pb-16 px-4">
          <h1 className="text-2xl font-bold text-white mb-4">404 - Release Not Found</h1>
          <p className="text-gray-400 mb-6">The release you are looking for does not exist.</p>
          <Link
            href="/releases"
            className="text-primary-400 hover:text-primary-300 font-medium"
          >
            &larr; Back to Releases
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
          href="/releases"
          className="inline-flex items-center gap-1 text-gray-400 hover:text-primary-400 font-medium mb-10 transition-colors"
        >
          &larr; Back to Releases
        </Link>

        <div className="flex items-center gap-3 mb-3">
          {release.published_at && (
            <time className="text-sm text-gray-500">
              {new Date(release.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          {!release.published && (
            <span className="inline-block bg-yellow-500/10 text-yellow-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-yellow-500/20">
              Draft
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight tracking-tight">
          v{release.version}
        </h1>

        <p className="text-lg text-gray-400 mb-10 leading-relaxed">{release.title}</p>

        <article className="blog-prose">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{release.content}</ReactMarkdown>
        </article>

        {isAdmin && (
          <div className="flex items-center gap-4 mt-16 pt-8 border-t border-gray-800">
            <Link
              href={`/releases/${release.slug}/edit`}
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
