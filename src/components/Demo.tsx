'use client'

import { useEffect, useRef } from 'react'

export default function Demo() {
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
    <section id="demo" ref={sectionRef} className="py-32 px-6 bg-[#0f0f0f] border-y border-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <p className="animate-on-scroll text-3xl md:text-4xl lg:text-[42px] font-medium text-white leading-[1.3] tracking-tight mb-10">
          Other screen recorders stop at capturing. Penguin gives you the full workflow — record, edit,{' '}
          <span className="italic font-serif text-gray-400">and</span>{' '}
          export polished videos without ever leaving the app. The screen recorder built for people who ship fast.
        </p>
        <button
          onClick={() => {
            const el = document.getElementById('features')
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }}
          className="animate-on-scroll bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-primary-600/20 inline-flex items-center gap-2 mx-auto"
          data-delay="0.15"
        >
          Explore features
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </section>
  )
}
