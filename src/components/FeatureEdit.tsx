'use client'

import { useRef, useState, useCallback } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const editFeatures = [
  {
    id: 'overview',
    label: 'Full Editor',
    desc: 'Your complete editing workspace — preview, timeline, and controls in one view.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" /></svg>
    ),
    image: '/screenshots/editor_full.png',
    originX: '50%', originY: '50%', scale: 1,
  },
  {
    id: 'cut',
    label: 'Cut & Trim',
    desc: 'Split, trim, and rearrange clips on a multi-track timeline.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm9.304 0a3 3 0 105.196-3 3 3 0 00-5.196 3zm0 0l-1.536.887m0 0L12 12m3.616-2.863L12 12m0 0l-3.616-2.863M12 12v9" /></svg>
    ),
    image: '/screenshots/editor_cut.png',
    originX: '0%', originY: '100%', scale: 2.8,
  },
  {
    id: 'speed',
    label: 'Speed Control',
    desc: 'Speed up or slow down any segment independently.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    image: '/screenshots/editor_speed.png',
    originX: '100%', originY: '6%', scale: 2.8,
  },
  {
    id: 'subtitle',
    label: 'Subtitles',
    desc: 'Add timed subtitles with a dedicated track and live preview.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
    ),
    image: '/screenshots/editor_subtitle.png',
    originX: '35%', originY: '100%', scale: 2.8,
  },
  {
    id: 'zoom',
    label: 'Zoom',
    desc: 'Add and adjust zoom segments with auto mouse tracking.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>
    ),
    image: '/screenshots/editor_zoom.png',
    originX: '100%', originY: '6%', scale: 2.8,
  },
]

export default function FeatureEdit() {
  const sectionRef = useScrollReveal()
  const [active, setActive] = useState(0)
  const [visibleImage, setVisibleImage] = useState(0)
  const [phase, setPhase] = useState<'zoomed' | 'zoomingOut' | 'swapping' | 'zoomingIn'>('zoomed')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const innerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activeRef = useRef(0)

  const handleTabClick = useCallback((i: number) => {
    if (i === activeRef.current) return

    // Cancel any in-progress animation
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (innerTimerRef.current) {
      clearTimeout(innerTimerRef.current)
      innerTimerRef.current = null
    }

    activeRef.current = i
    setPhase('zoomingOut')
    setActive(i)

    // Phase 2: at scale ~1, swap image seamlessly
    timerRef.current = setTimeout(() => {
      timerRef.current = null
      setVisibleImage(i)
      setPhase('swapping')

      // Wait for browser to paint with transition:none, then start zoom in
      innerTimerRef.current = setTimeout(() => {
        innerTimerRef.current = null
        setPhase('zoomingIn')
      }, 50)
    }, 500)
  }, [])

  const feat = editFeatures[visibleImage]
  const getTransform = () => {
    if (phase === 'zoomingOut') return 'scale(1)'
    if (phase === 'swapping') return 'scale(1)'
    return `scale(${feat.scale})`
  }
  const getTransition = () => {
    if (phase === 'zoomingOut') return 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    if (phase === 'swapping') return 'none'
    return 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }

  return (
    <section ref={sectionRef} className="section-glow ambient-blue pt-[40px] pb-[60px] md:pt-[80px] md:pb-[100px] px-5 bg-[#0C0C14]">
      <div className="max-w-[1240px] mx-auto">
        <div className="animate-on-scroll text-center mb-14">
          <span className="badge-block badge-blue mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm9.304 0a3 3 0 105.196-3 3 3 0 00-5.196 3zm0 0l-1.536.887m0 0L12 12m3.616-2.863L12 12m0 0l-3.616-2.863M12 12v9" /></svg>
            Edit
          </span>
          <h2 className="text-[28px] md:text-[48px] lg:text-[62px] font-[650] text-white leading-[1.1] tracking-tight mb-5">
            <span style={{ color: '#6090d4' }}>Trim, cut, and polish.</span><br />Without leaving the app.
          </h2>
        </div>

        <div className="animate-on-scroll flex flex-col lg:flex-row gap-8 items-start">
          {/* Feature tabs — horizontal scroll on mobile, vertical list on desktop */}
          <div className="w-full lg:w-[300px] flex-shrink-0 relative z-10">
            {/* Mobile: horizontal scroll */}
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 -mx-1 px-1 hide-scrollbar">
              {editFeatures.map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => handleTabClick(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap cursor-pointer transition-all duration-300 flex-shrink-0 touch-manipulation ${
                    active === i
                      ? 'glass-card-static !rounded-xl !border-white/10'
                      : 'bg-transparent border border-transparent'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    active === i ? 'bg-[#6090d4]/20 text-[#82aee0]' : 'bg-white/10 text-white/55'
                  }`}>
                    {f.icon}
                  </div>
                  <span className={`text-[13px] font-semibold transition-colors duration-300 ${active === i ? 'text-white' : 'text-white/60'}`}>
                    {f.label}
                  </span>
                </button>
              ))}
            </div>
            {/* Desktop: vertical list */}
            <div className="hidden lg:flex flex-col gap-2">
              {editFeatures.map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => handleTabClick(i)}
                  className={`w-full flex items-start gap-3.5 p-3.5 rounded-xl text-left cursor-pointer transition-all duration-300 ${
                    active === i
                      ? 'glass-card-static !rounded-xl !border-white/10'
                      : 'bg-transparent border border-transparent hover:bg-white/5'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    active === i ? 'bg-[#6090d4]/20 text-[#82aee0]' : 'bg-white/10 text-white/55'
                  }`}>
                    {f.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className={`text-[14px] font-semibold transition-colors duration-300 ${active === i ? 'text-white' : 'text-white/60'}`}>
                      {f.label}
                    </h4>
                    <p className={`text-[12px] leading-relaxed transition-colors duration-300 ${active === i ? 'text-white/60' : 'text-white/50'}`}>
                      {f.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Single image with zoom out → swap → zoom in */}
          <div className="flex-1 min-w-0">
            <div className="glass-card-static !rounded-2xl overflow-hidden p-1" style={{ filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.5))' }}>
              <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: '2495 / 1384' }}>
                <img
                  src={feat.image}
                  alt={`Clipa editor — ${feat.label}`}
                  className="w-full h-full object-cover"
                  style={{
                    transformOrigin: `${feat.originX} ${feat.originY}`,
                    transform: getTransform(),
                    transition: getTransition(),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
