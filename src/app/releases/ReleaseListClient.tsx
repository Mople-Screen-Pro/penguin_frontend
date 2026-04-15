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
      <div className="absolute left-[7px] md:left-[11px] top-3 bottom-0 w-px bg-white/10 group-last:hidden" />

      {/* Timeline dot */}
      <div
        className={`absolute left-0 md:left-1 top-[6px] w-[15px] h-[15px] rounded-full border-2 ${
          isLatest
            ? 'border-primary-500 bg-primary-500 shadow-md shadow-primary-500/30'
            : 'border-white/20 bg-white/10'
        }`}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <h2 className="text-xl md:text-2xl font-bold text-white">
          v{release.version}
        </h2>
        <span className="text-sm text-white/50">
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
            className="text-xs text-white/40 hover:text-primary-400 transition-colors"
          >
            Edit
          </Link>
        )}
      </div>

      {release.published_at && (
        <time className="block text-sm text-white/50 mb-4">
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
    <div className="min-h-screen flex flex-col bg-[#0C0C14]">
      <Header />
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[25%] left-[5%] w-56 h-36 rounded-3xl bg-gradient-to-br from-green-500/[0.05] to-emerald-600/[0.02] rotate-[-6deg] blur-sm" />
        <div className="absolute bottom-[25%] right-[12%] w-44 h-44 rounded-2xl bg-gradient-to-br from-purple-500/[0.04] to-violet-600/[0.02] rotate-[12deg] blur-sm" />
      </div>
      <main className="relative z-10 section-glow max-w-3xl mx-auto pt-28 pb-16 px-4 flex-grow w-full">
        <div className="text-center mb-14">
          <h1 className="heading-lg font-bold text-white mb-4 animate-on-load delay-1">
            What's <span className="gradient-text">new</span> in Clipa
          </h1>
          <p className="text-base sm:text-lg text-white/50 max-w-lg mx-auto animate-on-load delay-2">
            All the latest updates and improvements.
          </p>
          {isAdmin && (
            <Link
              href="/releases/new"
              className="btn-block btn-block-sm mt-6 animate-on-load delay-3"
            >
              New Release
            </Link>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-on-load">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400 mx-auto mb-4" />
            <p className="text-white/50 text-sm">Loading releases...</p>
          </div>
        ) : releases.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 animate-on-load">
            <svg className="w-12 h-12 text-gray-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
            </svg>
            <p className="text-white/50 text-sm">No releases yet.</p>
          </div>
        ) : (
          <div>
            {releases.map((release, index) => (
              <div key={release.id} className="animate-on-load" style={{ animationDelay: `${0.1 + Math.min(index * 0.06, 0.3)}s` }}>
                <ReleaseEntry
                  release={release}
                  isLatest={index === 0}
                  isAdmin={isAdmin}
                />
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
