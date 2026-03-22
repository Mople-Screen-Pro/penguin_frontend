'use client'

import { useEffect, useRef } from 'react'
import { analytics } from '../lib/analytics'

const DOWNLOAD_URL = 'https://grkyrqhgfgthpghircbu.supabase.co/functions/v1/download'

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = (entry.target as HTMLElement).dataset.delay || '0'
            setTimeout(() => entry.target.classList.add('visible'), parseFloat(delay) * 1000)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    }
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="pt-32 pb-0 px-6 bg-[#2a2d2e] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="absolute top-0 left-1/4 w-[32rem] h-[32rem] bg-primary-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[32rem] h-[32rem] bg-accent/20 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="animate-on-scroll text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          Stop juggling tools.
          <br className="hidden md:block" />
          <span className="gradient-text">Start shipping videos.</span>
        </h2>
        <p className="animate-on-scroll text-xl text-gray-300 mb-10 max-w-2xl mx-auto" data-delay="0.1">
          Record, edit, and export — all in one app.
          No account needed. No watermarks. Just professional results, fast.
        </p>
        <div className="animate-on-scroll flex flex-col sm:flex-row items-center justify-center gap-4 mb-20" data-delay="0.2">
          <a
            href={DOWNLOAD_URL}
            onClick={() => analytics.downloadClick('cta')}
            rel="noopener"
            className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Download for Mac — it's free
          </a>
          <button
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="w-full sm:w-auto bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors border border-gray-800"
          >
            Contact us
          </button>
        </div>
      </div>

      {/* Overlapping Video */}
      <div className="animate-on-scroll scale-in max-w-6xl mx-auto relative z-10 translate-y-16 md:translate-y-24" data-delay="0.3">
        <div className="rounded-t-2xl md:rounded-t-3xl border-t border-l border-r border-white/10 bg-gray-900 shadow-2xl overflow-hidden aspect-[16/9] relative">
          <video
            className="w-full h-full object-cover opacity-90"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/figma.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />

          {/* Caption */}
          <div className="absolute bottom-8 left-8 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
              <img src="/logo.png" alt="Penguin" className="w-6 h-6 rounded" />
            </div>
            <div>
              <p className="font-semibold text-white">Penguin Screen Recorder</p>
              <span className="text-sm text-gray-400">Record, edit, and export in one place</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
