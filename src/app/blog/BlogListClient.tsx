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

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto pt-28 pb-16 px-4">
        <div className="flex items-center justify-between mb-10">
          <h1 className="heading-lg">Blog</h1>
          {isAdmin && (
            <Link
              href="/blog/new"
              className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-xl px-5 py-2.5 font-semibold hover:opacity-90 transition-opacity"
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
          <div className="grid gap-8 sm:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {post.cover_image_url && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                      {post.title}
                    </h2>
                    {!post.published && (
                      <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                        Draft
                      </span>
                    )}
                  </div>
                  {post.excerpt && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                  )}
                  {post.published_at && (
                    <time className="text-xs text-slate-400 dark:text-slate-500">
                      {formatDate(post.published_at)}
                    </time>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
