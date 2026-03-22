'use client'

import { useEffect, useRef } from 'react'

export default function Export() {
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
    <section ref={sectionRef} className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        {/* Text */}
        <div>
          <p className="animate-on-scroll text-[120px] md:text-[160px] font-black text-gray-100 leading-none tracking-tighter select-none">4K</p>
          <h2 className="animate-on-scroll text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6 -mt-6 md:-mt-10" data-delay="0.05">
            Export.<br />Share. Done.
          </h2>
          <p className="animate-on-scroll text-lg text-gray-500 leading-relaxed mb-8" data-delay="0.1">
            One click to export as MP4. Up to 4K resolution with AI upscale. Everything renders locally — fast, private, no cloud upload needed.
          </p>
          <div className="animate-on-scroll flex flex-wrap gap-3" data-delay="0.15">
            {['MP4 Export', '4K Resolution', 'AI Upscale', 'Local Rendering'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-gray-100 text-sm text-gray-600 font-medium">{tag}</span>
            ))}
          </div>
        </div>

        {/* Video */}
        <div className="animate-on-scroll" data-delay="0.1">
          <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-200/60">
            <video className="w-full aspect-video object-cover bg-gray-100" autoPlay loop muted playsInline>
              <source src="/figma2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}
