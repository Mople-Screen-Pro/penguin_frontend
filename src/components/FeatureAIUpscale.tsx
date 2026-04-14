'use client'

import { useScrollReveal } from '../hooks/useScrollReveal'

export default function FeatureAIUpscale() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className="section-glow ambient-pink pt-[40px] pb-[60px] md:pt-[80px] md:pb-[100px] px-5 bg-[#FAFBFF]">
      <div className="max-w-[1240px] mx-auto">
        {/* Headline */}
        <div className="animate-on-scroll text-center mb-10 md:mb-14">
          <span className="badge-block badge-gold mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
            AI Upscale
          </span>
          <h2 className="text-[28px] md:text-[48px] lg:text-[62px] font-[650] text-gray-900 leading-[1.1] tracking-tight">
            Take every pixel further<br />with <span className="text-[#D3B65F]">AI Upscale.</span>
          </h2>
        </div>

        {/* Before / After — fixed split */}
        <div className="animate-on-scroll">
          <div className="relative w-full max-w-[960px] mx-auto aspect-[16/9] rounded-2xl overflow-hidden select-none">
            {/* After (sharp) — right half */}
            <div className="absolute inset-0">
              <img
                src="/images/upscale.png"
                alt="After — 4K upscaled"
                className="w-full h-full object-cover"
                style={{
                  filter: 'contrast(1.06) saturate(1.1) brightness(1.02)',
                }}
              />
            </div>

            {/* Before (pixelated) — left half, clipped at 50% */}
            <div className="absolute inset-0 w-1/2 overflow-hidden">
              <img
                src="/images/upscale.png"
                alt="Before — 720p"
                className="h-full object-cover"
                style={{
                  width: '200%',
                  maxWidth: 'none',
                  filter: 'blur(1.4px) contrast(0.96) saturate(0.93)',
                }}
              />
            </div>

            {/* Center divider line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-white/90 z-10 shadow-[0_0_12px_rgba(255,255,255,0.3)]" />

            {/* Labels */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-black/10">
              <span className="text-[12px] md:text-[13px] font-semibold text-white/70">720p</span>
            </div>
            <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-black/10">
              <span className="text-[12px] md:text-[13px] font-semibold text-[#D3B65F]">4K</span>
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="animate-on-scroll grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[960px] mx-auto mt-10">
          <div className="glass-card p-5">
            <div className="w-9 h-9 rounded-lg bg-[rgba(182,150,53,0.12)] flex items-center justify-center text-[#D3B65F]/80 mb-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold text-gray-900 block mb-1">3 AI Models</span>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              FSRCNN, ESPCN, Real-ESRGAN — choose between speed and quality for your export.
            </p>
          </div>

          <div className="glass-card p-5">
            <div className="w-9 h-9 rounded-lg bg-[rgba(182,150,53,0.12)] flex items-center justify-center text-[#D3B65F]/80 mb-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold text-gray-900 block mb-1">Apple Neural Engine</span>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Powered by Core ML and ANE. Everything runs on your Mac — fast, efficient, and completely offline.
            </p>
          </div>

          <div className="glass-card p-5">
            <div className="w-9 h-9 rounded-lg bg-[rgba(182,150,53,0.12)] flex items-center justify-center text-[#D3B65F]/80 mb-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9m-11.25 11.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold text-gray-900 block mb-1">4x Resolution</span>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Upscale from 720p up to 4K. Intelligent tiling ensures seamless, artifact-free results.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
