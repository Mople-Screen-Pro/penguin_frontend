'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useAdmin } from '../../hooks/useAdmin'
import { getPublishedReleases, getAllReleases } from '../../lib/releases'
import type { Release } from '../../lib/releases'

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ReleaseListClient() {
  const { isAdmin } = useAdmin()
  const [releases, setReleases] = useState<Release[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReleases() {
      setLoading(true)
      try {
        const data = isAdmin ? await getAllReleases() : await getPublishedReleases()
        setReleases(data)
      } catch (err) {
        console.error('Failed to fetch releases:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchReleases()
  }, [isAdmin])

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto pt-28 pb-16 px-4">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Releases</h1>
          {isAdmin && (
            <Link
              href="/releases/new"
              className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-lg px-3.5 py-1.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              New Release
            </Link>
          )}
        </div>

        {loading ? (
          <p className="text-slate-400 text-center py-12">Loading...</p>
        ) : releases.length === 0 ? (
          <p className="text-slate-400 text-center py-12">No releases yet.</p>
        ) : (
          <div className="space-y-0">
            {releases.map((release, index) => (
              <div
                key={release.id}
                className="relative pl-8 pb-10"
              >
                {/* Timeline line */}
                {index < releases.length - 1 && (
                  <div className="absolute left-[7px] top-3 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
                )}
                {/* Timeline dot */}
                <div className="absolute left-0 top-[6px] w-[15px] h-[15px] rounded-full border-2 border-sky-500 bg-white dark:bg-slate-900" />

                <div className="flex items-center gap-3 mb-2">
                  <Link
                    href={`/releases/${release.slug}`}
                    className="text-lg font-semibold text-slate-900 dark:text-white hover:text-sky-500 transition-colors"
                  >
                    v{release.version}
                  </Link>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 px-2 py-0.5 rounded-full">
                    {release.title}
                  </span>
                  {!release.published && (
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                      Draft
                    </span>
                  )}
                </div>

                {release.published_at && (
                  <time className="block text-xs text-slate-400 dark:text-slate-500 mb-3">
                    {formatDate(release.published_at)}
                  </time>
                )}

                <div className="prose prose-sm prose-slate dark:prose-invert max-w-none line-clamp-4">
                  <ReactMarkdown>{release.content}</ReactMarkdown>
                </div>

                <Link
                  href={`/releases/${release.slug}`}
                  className="inline-block mt-2 text-sm text-sky-500 hover:text-sky-600 font-medium"
                >
                  Read more
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
