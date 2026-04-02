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
      className="group block rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {post.cover_image_url && (
        <div className="aspect-[2/1] overflow-hidden">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          {post.published_at && (
            <time className="text-sm text-slate-400 dark:text-slate-500">
              {formatDate(post.published_at)}
            </time>
          )}
          {!post.published && (
            <span className="inline-flex items-center rounded-full bg-yellow-50 dark:bg-yellow-500/10 px-2.5 py-0.5 text-xs font-medium text-yellow-700 dark:text-yellow-400 ring-1 ring-inset ring-yellow-600/20 dark:ring-yellow-500/20">
              Draft
            </span>
          )}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors mb-3">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-base text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        )}
        <div className="mt-5">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-sky-500 dark:text-sky-400 group-hover:gap-2 transition-all">
            Read more
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {post.cover_image_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {post.published_at && (
            <time className="text-xs text-slate-400 dark:text-slate-500">
              {formatDate(post.published_at)}
            </time>
          )}
          {!post.published && (
            <span className="inline-flex items-center rounded-full bg-yellow-50 dark:bg-yellow-500/10 px-2 py-0.5 text-xs font-medium text-yellow-700 dark:text-yellow-400 ring-1 ring-inset ring-yellow-600/20 dark:ring-yellow-500/20">
              Draft
            </span>
          )}
        </div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors mb-2">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-5xl mx-auto pt-28 pb-16 px-4 flex-grow w-full">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Blog</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">News, tips, and stories from the Penguin team.</p>
          </div>
          {isAdmin && (
            <Link
              href="/blog/new"
              className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              New Post
            </Link>
          )}
        </div>

        {loading ? (
          <p className="text-slate-400 text-center py-12">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-slate-400 text-center py-12">No posts yet.</p>
        ) : (
          <div className="space-y-10">
            {heroPost && <HeroCard post={heroPost} />}

            {restPosts.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {restPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
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
