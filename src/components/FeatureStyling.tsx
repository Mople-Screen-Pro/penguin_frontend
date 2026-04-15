'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const wallExt: Record<string, string> = {
  wallpaper_neon: 'jpg', wallpaper_candy: 'jpg', wallpaper_rose: 'jpg', wallpaper_mint: 'jpg',
  wallpaper_milkyway: 'jpg', wallpaper_trails: 'jpg',
  wallpaper_amber_petal: 'png', wallpaper_lavender_mist: 'png', wallpaper_sky_pillar: 'png', wallpaper_pastel_dream: 'png',
}

const presets = [
  {
    name: 'Sky Pillar',
    description: 'Calm blue tones',
    video: '/videos/presets/sky-pillar.mp4',
    bg: { type: 'wallpaper' as const, wallpaper: 'wallpaper_sky_pillar' },
    cursor: { name: 'Default', css: 'default' },
    effect: { name: 'Pulse', color: '#3b82f6' },
  },
  {
    name: 'Lavender Mist',
    description: 'Soft purple haze',
    video: '/videos/presets/lavender-mist.mp4',
    bg: { type: 'wallpaper' as const, wallpaper: 'wallpaper_lavender_mist' },
    cursor: { name: 'Grab', css: 'grab' },
    effect: { name: 'Pulse', color: '#3b82f6' },
  },
  {
    name: 'Pastel Dream',
    description: 'Light and dreamy',
    video: '/videos/presets/pastel-dream.mp4',
    bg: { type: 'wallpaper' as const, wallpaper: 'wallpaper_pastel_dream' },
    cursor: { name: 'Pointer', css: 'pointer' },
    effect: { name: 'Ripple', color: '#a855f7' },
  },
  {
    name: 'Amber Petal',
    description: 'Warm golden glow',
    video: '/videos/presets/amber-petal.mp4',
    bg: { type: 'wallpaper' as const, wallpaper: 'wallpaper_amber_petal' },
    cursor: { name: 'Default', css: 'default' },
    effect: { name: 'Highlight', color: '#f97316' },
  },
  {
    name: 'Rose',
    description: 'Elegant pink bloom',
    video: '/videos/presets/rose.mp4',
    bg: { type: 'wallpaper' as const, wallpaper: 'wallpaper_rose' },
    cursor: { name: 'Alias', css: 'alias' },
    effect: { name: 'Pulse', color: '#ec4899' },
  },
  {
    name: 'Trails',
    description: 'Earthy warm paths',
    video: '/videos/presets/trails.mp4',
    bg: { type: 'wallpaper' as const, wallpaper: 'wallpaper_trails' },
    cursor: { name: 'Default', css: 'default' },
    effect: { name: 'Pulse', color: '#f97316' },
  },
]

export default function FeatureStyling() {
  const sectionRef = useScrollReveal()
  const [activeIdx, setActiveIdx] = useState(0)
  const active = presets[activeIdx]

  // Refs for all video elements
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(presets.map(() => null))

  // On mount: play the first video, others will lazy-load via preload="none"
  useEffect(() => {
    const first = videoRefs.current[0]
    if (first) {
      first.play().catch(() => {})
    }
  }, [])

  const handlePresetChange = useCallback((idx: number) => {
    setActiveIdx(prev => {
      if (idx === prev) return prev

      // Pause old video
      const oldVideo = videoRefs.current[prev]
      if (oldVideo) oldVideo.pause()

      // Play new video from same timestamp
      const newVideo = videoRefs.current[idx]
      if (newVideo) {
        if (oldVideo) newVideo.currentTime = oldVideo.currentTime
        newVideo.play().catch(() => {})
      }

      return idx
    })
  }, [])


  return (
    <section ref={sectionRef} className="section-glow ambient-purple pt-[40px] pb-[60px] md:pt-[80px] md:pb-[100px] px-5 bg-[#0C0C14]">
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-14">
          <span className="badge-block badge-green mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>
            Styling
          </span>
          <h2 className="text-[28px] md:text-[48px] lg:text-[62px] font-[650] text-white leading-[1.1] tracking-tight mb-5">Add your <span className="text-[#60d490]">style</span> and <span className="text-[#60d490]">branding.</span></h2>
          <p className="text-sm sm:text-base text-white/50 leading-[1.5] max-w-[50ch] mx-auto px-2">Pick a preset that matches your vibe — background, cursor, and effects applied instantly.</p>
        </div>

        {/* Main Preview — all 6 videos stacked, only active one visible */}
        <div className="animate-on-scroll mb-10">
          <div className="glass-card-static !rounded-2xl aspect-video overflow-hidden relative max-w-[960px] mx-auto p-1" style={{ cursor: active.cursor.css }}>
            {presets.map((preset, i) => (
              <video
                key={preset.name}
                ref={el => { videoRefs.current[i] = el }}
                src={preset.video}
                preload={i === 0 ? 'auto' : 'none'}
                className="absolute inset-0 w-full h-full object-cover"
                loop muted playsInline
                style={{
                  zIndex: activeIdx === i ? 1 : 0,
                  opacity: activeIdx === i ? 1 : 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Preset Cards */}
        <div className="animate-on-scroll overflow-x-auto hide-scrollbar pr-1">
          <div className="relative max-w-[960px] mx-auto pt-4">
            <div className="flex gap-3">
              {presets.map((preset, i) => (
                <button
                  key={preset.name}
                  onClick={() => handlePresetChange(i)}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 text-left flex-shrink-0 w-[120px] sm:w-[calc((100%-60px)/6)] ${
                    activeIdx === i
                      ? 'ring-2 ring-[#60d490]/80 ring-offset-2 ring-offset-[#0C0C14] -translate-y-2 scale-[1.03] shadow-lg shadow-[#35b565]/20'
                      : 'ring-1 ring-white/10 hover:ring-white/20'
                  }`}
                >
                  {/* Card background preview */}
                  <div
                    className="aspect-[4/3] relative overflow-hidden"
                    style={{
                      background: '#000',
                    }}
                  >
                    {preset.bg.type === 'wallpaper' && (
                      <img
                        src={`/wallpapers/${preset.bg.wallpaper}.${wallExt[preset.bg.wallpaper!] || 'jpg'}`}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    {/* Mini detail icons */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-[10px] text-white/80" style={{ cursor: preset.cursor.css }}>{preset.cursor.name === 'Default' ? '↗' : preset.cursor.name === 'Pointer' ? '☝' : preset.cursor.name === 'Grab' ? '✋' : '↗'}</span>
                      <span className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center" style={{ cursor: preset.cursor.css }}>
                        <span className="w-2 h-2 rounded-full" style={{ background: preset.effect.color }} />
                      </span>
                    </div>
                  </div>
                  {/* Card label */}
                  <div className="px-3 py-2.5 bg-white/5">
                    <span className={`block text-[13px] font-semibold leading-none mb-1 transition-colors ${activeIdx === i ? 'text-white' : 'text-white/50'}`}>{preset.name}</span>
                    <span className="block text-[11px] text-white/50 leading-none">{preset.description}</span>
                  </div>
                </button>
              ))}
              {/* Ghost cards */}
              {[
                { wallpaper: 'wallpaper_neon', name: 'Neon', desc: 'Electric glow', opacity: 0.45 },
                { wallpaper: 'wallpaper_candy', name: 'Candy', desc: 'Sweet palette', opacity: 0.25 },
                { wallpaper: 'wallpaper_mint', name: 'Mint', desc: 'Cool fresh', opacity: 0.12 },
                { wallpaper: 'wallpaper_milkyway', name: 'Milkyway', desc: 'Deep space', opacity: 0.05 },
              ].map((ghost, i) => (
                <div key={`ghost-${i}`} className="flex-shrink-0 w-[120px] sm:w-[calc((100%-60px)/6)] rounded-xl overflow-hidden ring-1 ring-white/10" style={{ opacity: ghost.opacity }}>
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img src={`/wallpapers/${ghost.wallpaper}.${wallExt[ghost.wallpaper] || 'jpg'}`} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-[10px] text-white/80">↗</span>
                      <span className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-[#60d490]" />
                      </span>
                    </div>
                  </div>
                  <div className="px-3 py-2.5 bg-white/5">
                    <span className="block text-[13px] font-semibold leading-none mb-1 text-white/50">{ghost.name}</span>
                    <span className="block text-[11px] text-white/50 leading-none">{ghost.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
