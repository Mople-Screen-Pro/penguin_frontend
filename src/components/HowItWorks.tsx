'use client'

import { useState, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

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
  const sectionRef = useScrollReveal()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section ref={sectionRef} className="relative pt-[100px] pb-[100px] md:pt-[160px] md:pb-[160px] px-5 bg-[#0a0a12] overflow-hidden">
      {/* Divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[800px] h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent z-20" />
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70%] max-w-[800px] h-[60%] rounded-full bg-[radial-gradient(ellipse,rgba(168,85,247,0.08)_0%,transparent_70%)] pointer-events-none" />
      {/* Top transition */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#FAFBFF] to-transparent" />
      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAFBFF] to-transparent z-10" />

      <div className="relative max-w-5xl mx-auto">
        <h2 className="animate-on-scroll text-center text-[28px] md:text-[48px] lg:text-[56px] font-[650] text-white leading-[1.1] tracking-tight mb-4">
          Three steps. That's it.
        </h2>
        <p className="animate-on-scroll text-center text-sm sm:text-base text-white/50 mb-10 md:mb-14 max-w-lg mx-auto">
          From screen to polished video in minutes — no tool-switching, no learning curve.
        </p>

        {/* 3D Carousel */}
        <div className="animate-on-scroll relative w-full max-w-[900px] mx-auto mb-8" style={{ perspective: '1200px' }}>
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
                  onClick={() => setActive(i)}
                >
                  <div
                    className="rounded-3xl bg-[#16161e] border border-white/10 overflow-hidden shadow-2xl shadow-black/50 flex flex-col mx-auto"
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
        <div className="flex items-center justify-center gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
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
