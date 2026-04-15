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
    accent: '#a855f7',
    gradient: 'linear-gradient(135deg, #9333EA, #a855f7)',
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
    accent: '#c084fc',
    gradient: 'linear-gradient(135deg, #a855f7, #c084fc)',
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
    accent: '#ec4899',
    gradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const goToSlide = (i: number) => {
    activeRef.current = i
    setActive(i)
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

    section.querySelectorAll('.animate-on-scroll').forEach((el) => {
      el.classList.add('visible')
    })

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
        return `top+=${offset} 55%`
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
        <p className="text-center text-sm sm:text-base text-white/60 mb-4 md:mb-6 max-w-lg mx-auto">
          From screen to polished video in minutes — no tool-switching, no learning curve.
        </p>

        {/* 3D Carousel */}
        <div ref={carouselRef} className="relative w-full max-w-[900px] mx-auto mb-8" style={{ perspective: isMobile ? '900px' : '1400px' }}>
          <div className={`relative w-full ${isMobile ? 'aspect-[3/4]' : 'aspect-[4/3]'}`} style={{ transformStyle: 'preserve-3d' }}>
            {steps.map((step, i) => {
              const offset = ((i - active + steps.length) % steps.length)
              const isActive = offset === 0
              const config = isMobile
                ? [
                    { x: 0, z: 0, rotateY: 0, rotateX: 0, opacity: 1, scale: 1, zIndex: 3 },
                    { x: 50, z: -120, rotateY: -40, rotateX: 0, opacity: 0.35, scale: 0.88, zIndex: 1 },
                    { x: -50, z: -120, rotateY: 40, rotateX: 0, opacity: 0.35, scale: 0.88, zIndex: 1 },
                  ]
                : [
                    { x: 0, z: 0, rotateY: 0, rotateX: 0, opacity: 1, scale: 1, zIndex: 3 },
                    { x: 60, z: -220, rotateY: -45, rotateX: 0, opacity: 0.45, scale: 0.82, zIndex: 1 },
                    { x: -60, z: -220, rotateY: 45, rotateX: 0, opacity: 0.45, scale: 0.82, zIndex: 1 },
                  ]
              const c = config[offset]
              const d = isMobile ? 10 : 16 // block depth in px

              return (
                <div
                  key={step.title}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  style={{
                    transform: `translateX(${c.x}%) translateZ(${c.z}px) rotateY(${c.rotateY}deg) rotateX(${c.rotateX}deg) scale(${c.scale})`,
                    opacity: c.opacity,
                    zIndex: c.zIndex,
                    transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                    transformStyle: 'preserve-3d',
                  }}
                  onClick={() => goToSlide(i)}
                >
                  <div
                    className="relative mx-auto"
                    style={{
                      width: isMobile ? '92%' : (step.cardWidth || '100%'),
                      height: step.cardHeight || '100%',
                    }}
                  >
                    {/* Main card face */}
                    <div
                      className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden flex flex-col"
                      style={{
                        background: 'linear-gradient(180deg, #18182E 0%, #111122 100%)',
                        border: '1px solid transparent',
                        backgroundClip: 'padding-box',
                        boxShadow: isActive
                          ? `0 ${d + 4}px 0 0 #0a0a18, 0 30px 60px -10px rgba(0,0,0,0.8), 0 0 80px -20px ${step.accent}15`
                          : `0 ${d}px 0 0 #08080f, 0 20px 40px -10px rgba(0,0,0,0.6)`,
                        transition: 'box-shadow 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      {/* Top glow line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[1px]"
                        style={{
                          background: isActive
                            ? step.gradient.replace('135deg', '90deg')
                            : 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.08) 50%, transparent 90%)',
                          opacity: isActive ? 0.6 : 1,
                          transition: 'all 0.8s ease',
                        }}
                      />

                      <div className="flex-1 flex items-center justify-center p-3 md:p-6 min-h-0">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="max-w-full max-h-full object-contain rounded-lg md:rounded-xl"
                          draggable={false}
                        />
                      </div>
                      <div className="px-4 pb-4 pt-2 md:px-8 md:pb-8 md:pt-3">
                        <span
                          className="text-[11px] md:text-[13px] font-bold tracking-widest uppercase block mb-1 md:mb-2"
                          style={{
                            background: step.gradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          0{i + 1}
                        </span>
                        <h3 className="text-base md:text-2xl font-bold text-white mb-1.5 md:mb-3">{step.title}</h3>
                        <ul className="space-y-1 md:space-y-2">
                          {step.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-1.5 md:gap-2.5 text-[11px] md:text-[14px] text-white/60 leading-relaxed">
                              <svg className="w-3 h-3 md:w-4 md:h-4 mt-0.5 flex-shrink-0" style={{ color: step.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom 3D block face */}
                    <div
                      className="absolute left-[1px] right-[1px] rounded-b-2xl md:rounded-b-3xl overflow-hidden"
                      style={{
                        bottom: `-${d}px`,
                        height: `${d + 4}px`,
                        background: isActive
                          ? 'linear-gradient(180deg, #0d0d1a 0%, #060610 100%)'
                          : 'linear-gradient(180deg, #0a0a14 0%, #050510 100%)',
                        borderLeft: '1px solid rgba(255,255,255,0.03)',
                        borderRight: '1px solid rgba(255,255,255,0.03)',
                        borderBottom: `1px solid ${isActive ? step.accent + '15' : 'rgba(255,255,255,0.03)'}`,
                        transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      <div className="absolute top-0 left-[10%] right-[10%] h-[1px]" style={{ background: 'rgba(255,255,255,0.04)' }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Step dots */}
        <div ref={dotsRef} className="flex items-center justify-center gap-2.5">
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className="h-1.5 rounded-full transition-all duration-500 cursor-pointer"
              style={{
                width: active === i ? '2rem' : '0.375rem',
                background: active === i ? step.gradient : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
