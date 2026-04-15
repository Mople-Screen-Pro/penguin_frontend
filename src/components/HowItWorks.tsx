'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'

gsap.registerPlugin(ScrollTrigger, Observer)

const steps = [
  {
    title: 'Record',
    image: '/screenshots/record.png',
    cardWidth: '80%',
    cardHeight: '75%',
    features: [
      'Full screen, window, or custom area',
      'System audio + mic + camera overlay',
      'Pause & resume anytime',
    ],
  },
  {
    title: 'Edit',
    image: '/screenshots/editor.png',
    cardWidth: '95%',
    features: [
      'Auto Cursor Zoom — tracks your mouse in real time',
      'Trim, cut, and adjust speed per clip',
      'Add subtitles, backgrounds, and cursor effects',
    ],
  },
  {
    title: 'Export',
    image: '/screenshots/export.png',
    cardWidth: '65%',
    features: [
      'MP4, MOV, WebM — 720p to 4K',
      'AI Upscale with 3 models, powered by Apple Neural Engine',
      'YouTube, TikTok, Instagram presets in one click',
    ],
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const animating = useRef(false)

  const goToSlide = (i: number) => {
    activeRef.current = i
    setActive(i)
    // Sync scroll position to match slide
    const st = stRef.current
    if (st) {
      const targetProgress = (i + 0.5) / steps.length
      const targetScroll = st.start + targetProgress * (st.end - st.start)
      animating.current = true
      window.scrollTo({ top: targetScroll, behavior: 'instant' as ScrollBehavior })
      setTimeout(() => { animating.current = false }, 100)
    }
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Force animate-on-scroll visible
    section.querySelectorAll('.animate-on-scroll').forEach((el) => {
      el.classList.add('visible')
    })

    // Pin the section
    const st = stRef.current = ScrollTrigger.create({
      trigger: section,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      start: () => {
        const carousel = carouselRef.current
        if (!carousel) return 'center center'
        const sectionTop = section.getBoundingClientRect().top + window.scrollY
        const carouselRect = carousel.getBoundingClientRect()
        const carouselCenter = carouselRect.top + window.scrollY + carouselRect.height / 2
        const offset = carouselCenter - sectionTop
        return `top+=${offset} 60%`
      },
      end: `+=${steps.length * 100}%`,
      onUpdate: (self) => {
        if (animating.current) return
        const progress = self.progress
        const newIndex = Math.min(steps.length - 1, Math.floor(progress * steps.length))
        if (newIndex !== activeRef.current) {
          activeRef.current = newIndex
          setActive(newIndex)
        }
      },
    })

    // Small delay to let layout settle, then refresh
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100)

    return () => {
      clearTimeout(timer)
      st.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="section-glow ambient-purple relative pt-[80px] pb-[80px] md:pt-[120px] md:pb-[120px] px-5 bg-[#0C0C14]">

      <div className="relative max-w-5xl mx-auto">
        <h2 className="text-center text-[28px] md:text-[48px] lg:text-[56px] font-[650] text-white leading-[1.1] tracking-tight mb-4">
          Three steps. That&apos;s it.
        </h2>
        <p className="text-center text-sm sm:text-base text-white/50 mb-10 md:mb-14 max-w-lg mx-auto">
          From screen to polished video in minutes — no tool-switching, no learning curve.
        </p>

        {/* 3D Carousel */}
        <div ref={carouselRef} className="relative w-full max-w-[900px] mx-auto mb-8" style={{ perspective: '1200px' }}>
          <div className="relative w-full aspect-[4/3]">
            {steps.map((step, i) => {
              const offset = ((i - active + steps.length) % steps.length)
              const config = [
                { x: 0, z: 0, rotateY: 0, opacity: 1, scale: 1, zIndex: 3 },
                { x: 55, z: -180, rotateY: -35, opacity: 0.5, scale: 0.85, zIndex: 1 },
                { x: -55, z: -180, rotateY: 35, opacity: 0.5, scale: 0.85, zIndex: 1 },
              ][offset]

              return (
                <div
                  key={step.title}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  style={{
                    transform: `translateX(${config.x}%) translateZ(${config.z}px) rotateY(${config.rotateY}deg) scale(${config.scale})`,
                    opacity: config.opacity,
                    zIndex: config.zIndex,
                    transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                    transformStyle: 'preserve-3d',
                  }}
                  onClick={() => goToSlide(i)}
                >
                  <div
                    className="rounded-3xl bg-[#14141E] border border-white/10 overflow-hidden shadow-2xl shadow-black/50 flex flex-col mx-auto"
                    style={{ width: step.cardWidth || '100%', height: step.cardHeight || '100%' }}
                  >
                    <div className="flex-1 flex items-center justify-center p-6 min-h-0">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="max-w-full max-h-full object-contain"
                        draggable={false}
                      />
                    </div>
                    <div className="px-8 pb-8 pt-3">
                      <span className="text-[13px] font-bold text-primary-400 tracking-widest uppercase block mb-2">
                        0{i + 1}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                      <ul className="space-y-2">
                        {step.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5 text-[14px] text-white/50 leading-relaxed">
                            <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Step dots */}
        <div ref={dotsRef} className="flex items-center justify-center gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                active === i ? 'w-8 bg-primary-500' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
