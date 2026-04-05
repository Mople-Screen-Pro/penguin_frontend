'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
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

function ReleaseEntry({ release, isLatest, isAdmin }: { release: Release; isLatest: boolean; isAdmin: boolean }) {
  return (
    <div className="relative pl-8 md:pl-12 pb-12 last:pb-0 group">
      {/* Timeline line */}
      <div className="absolute left-[7px] md:left-[11px] top-3 bottom-0 w-px bg-gray-800 group-last:hidden" />

      {/* Timeline dot */}
      <div
        className={`absolute left-0 md:left-1 top-[6px] w-[15px] h-[15px] rounded-full border-2 ${
          isLatest
            ? 'border-primary-500 bg-primary-500 shadow-md shadow-primary-500/30'
            : 'border-gray-700 bg-gray-900'
        }`}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <h2 className="text-xl md:text-2xl font-bold text-white">
          v{release.version}
        </h2>
        <span className="text-sm text-gray-500">
          {release.title}
        </span>
        {isLatest && (
          <span className="inline-flex items-center rounded-full bg-primary-500/10 px-2.5 py-0.5 text-xs font-medium text-primary-400 ring-1 ring-inset ring-primary-500/20">
            Latest
          </span>
        )}
        {!release.published && (
          <span className="inline-flex items-center rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-xs font-medium text-yellow-400 ring-1 ring-inset ring-yellow-500/20">
            Draft
          </span>
        )}
        {isAdmin && (
          <Link
            href={`/releases/${release.slug}/edit`}
            className="text-xs text-gray-600 hover:text-primary-400 transition-colors"
          >
            Edit
          </Link>
        )}
      </div>

      {release.published_at && (
        <time className="block text-sm text-gray-500 mb-4">
          {formatDate(release.published_at)}
        </time>
      )}

      {/* Content */}
      <article className="blog-prose">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{release.content}</ReactMarkdown>
      </article>
    </div>
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

  return (
    <div className="min-h-screen flex flex-col bg-[#000]">
      <Header />
      <main className="max-w-3xl mx-auto pt-28 pb-16 px-4 flex-grow w-full">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white">Changelog</h1>
            <p className="text-gray-400 mt-1">All the latest updates and improvements to Penguin.</p>
          </div>
          {isAdmin && (
            <Link
              href="/releases/new"
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all"
            >
              New Release
            </Link>
          )}
        </div>

        {loading ? (
          <p className="text-gray-400 text-center py-12">Loading...</p>
        ) : releases.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No releases yet.</p>
        ) : (
          <div>
            {releases.map((release, index) => (
              <ReleaseEntry
                key={release.id}
                release={release}
                isLatest={index === 0}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
