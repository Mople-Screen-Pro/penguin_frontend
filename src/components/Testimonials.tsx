'use client'

import { useEffect, useRef } from 'react'

const testimonials = [
  {
    quote: "I used to juggle three different tools to make a tutorial — one to record, one to edit, one to export. With Penguin, I do it all in one place. My workflow is twice as fast now.",
    author: "Sarah Chen",
    role: "YouTube Creator, 120K subs",
    stat: "2x",
    statLabel: "faster video production",
    gradient: "from-primary-600 to-primary-800",
  },
  {
    quote: "As a developer, I need to ship documentation videos fast. Penguin lets me record, trim, and export in minutes — not hours. It's the simplest screen recorder I've ever used.",
    author: "Michael Roberts",
    role: "Senior Software Engineer",
    stat: "90%",
    statLabel: "less time on video workflows",
    gradient: "from-blue-600 to-indigo-800",
  },
  {
    quote: "I've tried Screen Studio, Loom, and OBS. Penguin gives me the same pro-quality output at half the price — and the record-to-export workflow is genuinely faster.",
    author: "Emily Park",
    role: "UX Designer & Educator",
    stat: "50%",
    statLabel: "cost savings vs competitors",
    gradient: "from-cyan-600 to-teal-800",
  },
]

export default function Testimonials() {
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
    <section ref={sectionRef} className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 px-4 lg:px-8">
          <h2 className="animate-on-scroll text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight max-w-2xl leading-tight">
            Creators who switched never went back
          </h2>
          <div className="animate-on-scroll inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white shadow-md border border-gray-100">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-700 font-medium text-sm">4.9 out of 5</span>
            <span className="text-gray-400 text-sm">from 500+ reviews</span>
          </div>
        </div>

        {/* Testimonial Cards - Horizontal Scroll */}
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar px-4 lg:px-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="animate-on-scroll min-w-[85vw] md:min-w-[400px] lg:min-w-[450px] aspect-[3/4] rounded-2xl relative overflow-hidden snap-center group cursor-pointer flex-shrink-0"
              data-delay={String(index * 0.15)}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

              {/* Decorative Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-8 right-8 w-32 h-32 border border-white/30 rounded-full" />
                <div className="absolute top-16 right-16 w-48 h-48 border border-white/20 rounded-full" />
              </div>

              {/* Logo Badge */}
              <div className="absolute top-6 left-6 text-white/80 font-bold tracking-widest uppercase text-sm flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
                  <img src="/logo.png" alt="Penguin" className="w-4 h-4 rounded" />
                </div>
                Penguin
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end h-full">
                <h3 className="text-5xl md:text-6xl font-bold text-white mb-2">{testimonial.stat}</h3>
                <p className="text-lg text-white/90 font-medium mb-6">{testimonial.statLabel}</p>
                <p className="text-white/80 text-sm leading-relaxed mb-8 line-clamp-4">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <p className="text-white font-semibold">{testimonial.author}</p>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-gray-600 hover:text-gray-900 border-b border-gray-600 hover:border-gray-900 pb-0.5 transition-colors"
          >
            Have questions? Get in touch &rarr;
          </button>
        </div>
      </div>
    </section>
  )
}
