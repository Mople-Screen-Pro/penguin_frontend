'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
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
      <main className="max-w-4xl mx-auto pt-28 pb-16 px-4">
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
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {releases.map((release) => (
              <Link
                key={release.id}
                href={`/releases/${release.slug}`}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base font-semibold text-slate-900 dark:text-white">
                    v{release.version}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {release.title}
                  </span>
                  {!release.published && (
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                      Draft
                    </span>
                  )}
                </div>
                {release.published_at && (
                  <time className="text-sm text-slate-400 dark:text-slate-500 shrink-0 ml-4">
                    {formatDate(release.published_at)}
                  </time>
                )}
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
