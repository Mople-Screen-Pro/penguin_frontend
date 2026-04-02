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

function LatestRelease({ release }: { release: Release }) {
  return (
    <Link
      href={`/releases/${release.slug}`}
      className="group block rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center rounded-full bg-sky-50 dark:bg-sky-500/10 px-3 py-1 text-sm font-semibold text-sky-600 dark:text-sky-400 ring-1 ring-inset ring-sky-500/20">
            Latest
          </span>
          {!release.published && (
            <span className="inline-flex items-center rounded-full bg-yellow-50 dark:bg-yellow-500/10 px-2.5 py-0.5 text-xs font-medium text-yellow-700 dark:text-yellow-400 ring-1 ring-inset ring-yellow-600/20 dark:ring-yellow-500/20">
              Draft
            </span>
          )}
          {release.published_at && (
            <time className="text-sm text-slate-400 dark:text-slate-500">
              {formatDate(release.published_at)}
            </time>
          )}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors mb-2">
          v{release.version}
        </h2>
        <p className="text-base text-slate-500 dark:text-slate-400 mb-5">
          {release.title}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-sky-500 dark:text-sky-400 group-hover:gap-2 transition-all">
          View release notes
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

function ReleaseCard({ release }: { release: Release }) {
  return (
    <Link
      href={`/releases/${release.slug}`}
      className="group block rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5"
    >
      <div className="flex items-center gap-2 mb-2">
        {release.published_at && (
          <time className="text-xs text-slate-400 dark:text-slate-500">
            {formatDate(release.published_at)}
          </time>
        )}
        {!release.published && (
          <span className="inline-flex items-center rounded-full bg-yellow-50 dark:bg-yellow-500/10 px-2 py-0.5 text-xs font-medium text-yellow-700 dark:text-yellow-400 ring-1 ring-inset ring-yellow-600/20 dark:ring-yellow-500/20">
            Draft
          </span>
        )}
      </div>
      <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors mb-1">
        v{release.version}
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {release.title}
      </p>
    </Link>
  )
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

  const latestRelease = releases[0]
  const olderReleases = releases.slice(1)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-5xl mx-auto pt-28 pb-16 px-4 flex-grow w-full">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Releases</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">What&apos;s new in every version of Penguin.</p>
          </div>
          {isAdmin && (
            <Link
              href="/releases/new"
              className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
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
          <div className="space-y-10">
            {latestRelease && <LatestRelease release={latestRelease} />}

            {olderReleases.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {olderReleases.map((release) => (
                  <ReleaseCard key={release.id} release={release} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
