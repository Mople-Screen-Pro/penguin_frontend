'use client'

import { useEffect, useRef } from 'react'

export default function Recording() {
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
    <section ref={sectionRef} className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        {/* Text */}
        <div>
          <p className="animate-on-scroll text-[120px] md:text-[160px] font-black text-gray-800 leading-none tracking-tighter select-none">1 click</p>
          <h2 className="animate-on-scroll text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6 -mt-6 md:-mt-10" data-delay="0.05">
            Hit record.<br />That's it.
          </h2>
          <p className="animate-on-scroll text-lg text-gray-400 leading-relaxed mb-8" data-delay="0.1">
            One click to start. Choose full screen or a custom area. System audio and microphone — both captured automatically.
          </p>
          <div className="animate-on-scroll flex flex-wrap gap-3" data-delay="0.15">
            {['One-click start', 'Custom area', 'System audio', 'Mic recording'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-gray-800 text-sm text-gray-400 font-medium">{tag}</span>
            ))}
          </div>
        </div>

        {/* Video */}
        <div className="animate-on-scroll" data-delay="0.1">
          <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-700/60">
            <video className="w-full aspect-video object-cover bg-gray-800" autoPlay loop muted playsInline>
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}
