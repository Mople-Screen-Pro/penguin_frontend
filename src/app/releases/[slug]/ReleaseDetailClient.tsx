'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
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
          <p className="text-slate-500">Loading...</p>
        </main>
      </>
    )
  }

  if (notFound || !release) {
    return (
      <>
        <Header />
        <main className="max-w-3xl mx-auto pt-28 pb-16 px-4">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">404 - Release Not Found</h1>
          <p className="text-slate-600 mb-6">The release you are looking for does not exist.</p>
          <Link href="/releases" className="text-blue-600 hover:text-blue-800 font-medium">
            &larr; Back to Releases
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
          href="/releases"
          className="inline-block text-blue-600 hover:text-blue-800 font-medium mb-8"
        >
          &larr; Back to Releases
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">v{release.version}</h1>
          {!release.published && (
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Draft
            </span>
          )}
        </div>

        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">{release.title}</p>

        {release.published_at && (
          <time className="block text-sm text-slate-500 mb-8">
            {new Date(release.published_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        )}

        <article className="prose prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown>{release.content}</ReactMarkdown>
        </article>

        {isAdmin && (
          <div className="flex items-center gap-4 mt-12 pt-8 border-t border-slate-200">
            <Link
              href={`/releases/${release.slug}/edit`}
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
