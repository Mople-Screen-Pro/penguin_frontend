'use client'

import { useEffect, useRef } from 'react'

export default function Editor() {
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
    <section ref={sectionRef} className="py-32 px-6 bg-[#fafafa] border-y border-gray-100">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        {/* Video — left side this time */}
        <div className="animate-on-scroll order-2 lg:order-1" data-delay="0.1">
          <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-200/60">
            <video className="w-full aspect-video object-cover bg-gray-100" autoPlay loop muted playsInline>
              <source src="/vscode.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <p className="animate-on-scroll text-[120px] md:text-[160px] font-black text-gray-100 leading-none tracking-tighter select-none">Built-in</p>
          <h2 className="animate-on-scroll text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6 -mt-6 md:-mt-10" data-delay="0.05">
            Polish it.<br />Without leaving the app.
          </h2>
          <p className="animate-on-scroll text-lg text-gray-500 leading-relaxed mb-8" data-delay="0.1">
            Auto cursor zoom follows your mouse and adds professional focus effects. Fine-tune zoom points, trim clips, and adjust timing — all on a visual timeline.
          </p>
          <div className="animate-on-scroll flex flex-wrap gap-3" data-delay="0.15">
            {['Auto Cursor Zoom', 'Smart Zoom Editing', 'Timeline Editor', 'Trim & Cut'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-white text-sm text-gray-600 font-medium border border-gray-200">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
