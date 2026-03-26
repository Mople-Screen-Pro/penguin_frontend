'use client'

import { useEffect, useRef } from 'react'

const features = [
  { label: 'On-device Processing', desc: 'Core ML handles everything locally', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  )},
  { label: '4x Resolution', desc: 'Upscale from 720p up to 4K', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9m-11.25 11.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15" /></svg>
  )},
  { label: '3 AI Models', desc: 'FSRCNN, ESPCN, SRVGGNet', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
  )},
  { label: 'Completely Private', desc: 'No cloud upload, stays on your Mac', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
  )},
]

const models = [
  { name: 'FSRCNN', speed: 'Fast', quality: 60 },
  { name: 'ESPCN', speed: 'Balanced', quality: 78 },
  { name: 'SRVGGNet', speed: 'Best quality', quality: 95 },
]

export default function FeatureAIUpscale() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
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
    <section ref={sectionRef} className="py-[120px] md:py-[160px] px-5 bg-[#000]">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          {/* Left — Text + Feature cards */}
          <div className="animate-on-scroll flex-1 basis-0 min-w-0">
            <span className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[15px] font-semibold text-amber-400 bg-amber-500/[0.1] border border-amber-500/[0.2] mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
              AI Upscale
              <span className="absolute -inset-1 rounded-full bg-amber-500/[0.06] blur-md -z-10" />
            </span>
            <h2 className="text-[32px] md:text-[48px] lg:text-[62px] font-[650] text-white leading-[1.1] tracking-tight mb-6">
              Enhance your video<br /><span className="text-white/40">with on-device AI.</span>
            </h2>
            <p className="text-base md:text-lg text-white/55 leading-[1.5] max-w-[45ch] mb-10">
              Upscale 720p to 4K using Core ML — fast, private, and completely offline.
            </p>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((f) => (
                <div key={f.label} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-200">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/[0.08] flex items-center justify-center text-amber-400/60 flex-shrink-0">
                    {f.icon}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[14px] font-semibold text-white block">{f.label}</span>
                    <p className="text-[12px] text-white/35 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — App Panel Mockup */}
          <div className="animate-on-scroll flex-1 basis-0 min-w-0 w-full md:max-w-[420px]">
            <div className="relative">
              <div className="absolute -inset-8 rounded-3xl bg-amber-500/[0.02] blur-2xl" />
              <div className="relative rounded-xl bg-[#0f0f0f] border border-white/[0.08] overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-white">AI Upscale</span>
                    <div className="w-8 h-[18px] rounded-full bg-amber-500 relative">
                      <div className="absolute right-0.5 top-0.5 w-[14px] h-[14px] rounded-full bg-white" />
                    </div>
                  </div>
                </div>

                {/* Model Selection */}
                <div className="p-4 space-y-2">
                  <span className="text-[11px] text-white/35 uppercase tracking-wider font-medium">Model</span>
                  {models.map((model, i) => (
                    <div
                      key={model.name}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        i === 2
                          ? 'bg-white/[0.06] border border-white/[0.12]'
                          : 'bg-transparent border border-white/[0.04]'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        i === 2 ? 'border-amber-500' : 'border-white/20'
                      }`}>
                        {i === 2 && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-[13px] font-medium ${i === 2 ? 'text-white' : 'text-white/50'}`}>{model.name}</span>
                          <span className="text-[10px] text-white/30">{model.speed}</span>
                        </div>
                        <div className="h-1 rounded-full bg-white/[0.06] mt-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${i === 2 ? 'bg-amber-500' : 'bg-white/10'}`}
                            style={{ width: `${model.quality}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Resolution indicator */}
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-white/[0.06] text-[11px] text-white/40 font-mono">720p</span>
                      <svg className="w-4 h-4 text-amber-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                      <span className="px-2 py-0.5 rounded bg-amber-500/[0.15] text-[11px] text-amber-400 font-mono font-semibold">4K</span>
                    </div>
                    <span className="text-[10px] text-white/25">4x upscale</span>
                  </div>

                  <p className="text-[11px] text-white/20 text-center mt-3 flex items-center justify-center gap-1.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Core ML · On-device · No upload
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
