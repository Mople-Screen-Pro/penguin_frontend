'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useAdmin } from '../../hooks/useAdmin'
import { getPublishedPosts, getAllPosts } from '../../lib/blog'
import type { BlogPost } from '../../lib/blog'

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function HeroCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block glass-card-static !rounded-2xl overflow-hidden hover:!border-primary-400/30"
    >
      {post.cover_image_url && (
        <div className="aspect-[2/1] overflow-hidden">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          {post.published_at && (
            <time className="text-sm text-gray-500">
              {formatDate(post.published_at)}
            </time>
          )}
          {!post.published && (
            <span className="inline-flex items-center rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-xs font-medium text-yellow-400 ring-1 ring-inset ring-yellow-500/20">
              Draft
            </span>
          )}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary-300 transition-colors mb-3">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-base text-gray-400 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  )
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block glass-card-static !rounded-2xl overflow-hidden hover:!border-primary-400/30 hover:-translate-y-1 transition-all duration-200"
    >
      {post.cover_image_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {post.published_at && (
            <time className="text-xs text-gray-500">
              {formatDate(post.published_at)}
            </time>
          )}
          {!post.published && (
            <span className="inline-flex items-center rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs font-medium text-yellow-400 ring-1 ring-inset ring-yellow-500/20">
              Draft
            </span>
          )}
        </div>
        <h2 className="text-lg font-semibold text-white group-hover:text-primary-300 transition-colors mb-2">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  )
}

export default function BlogListClient() {
  const { isAdmin } = useAdmin()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      try {
        const data = isAdmin ? await getAllPosts() : await getPublishedPosts()
        setPosts(data)
      } catch (err) {
        console.error('Failed to fetch posts:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [isAdmin])

  const heroPost = posts[0]
  const restPosts = posts.slice(1)

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0D14]">
      <Header />
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] right-[10%] w-64 h-40 rounded-3xl bg-gradient-to-br from-blue-500/[0.06] to-indigo-600/[0.03] rotate-[10deg] blur-sm" />
        <div className="absolute bottom-[30%] left-[8%] w-48 h-48 rounded-2xl bg-gradient-to-br from-purple-500/[0.05] to-purple-600/[0.02] rotate-[-8deg] blur-sm" />
      </div>
      <main className="relative z-10 section-glow max-w-5xl mx-auto pt-28 pb-16 px-4 flex-grow w-full">
        <div className="text-center mb-14">
          <span className="badge-block badge-blue mb-6 animate-on-load">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            Blog
          </span>
          <h1 className="heading-lg font-bold text-white mb-4 animate-on-load delay-1">
            News, tips, and <span className="gradient-text">stories</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-lg mx-auto animate-on-load delay-2">
            From the Clipa team.
          </p>
          {isAdmin && (
            <Link
              href="/blog/new"
              className="btn-block btn-block-sm mt-6 animate-on-load delay-3"
            >
              New Post
            </Link>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-on-load">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 animate-on-load">
            <svg className="w-12 h-12 text-gray-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            <p className="text-gray-500 text-sm">No posts yet.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {heroPost && (
              <div className="animate-on-load">
                <HeroCard post={heroPost} />
              </div>
            )}

            {restPosts.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {restPosts.map((post, i) => (
                  <div key={post.id} className="animate-on-load" style={{ animationDelay: `${0.1 + i * 0.06}s` }}>
                    <PostCard post={post} />
                  </div>
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
