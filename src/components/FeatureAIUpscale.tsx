'use client'

import { useEffect, useRef, useState } from 'react'

const models = [
  { name: 'FSRCNN', speed: 'Fast', quality: 60 },
  { name: 'ESPCN', speed: 'Balanced', quality: 78 },
  { name: 'SRVGGNet', speed: 'Best quality', quality: 95 },
]

export default function FeatureAIUpscale() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [sliderPos, setSliderPos] = useState(50)
  const [activeModel, setActiveModel] = useState(2)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleUpscale = () => {
    if (processing) return
    setProcessing(true)
    setProgress(0)
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(iv)
          setTimeout(() => setProcessing(false), 800)
          return 100
        }
        return p + 2
      })
    }, 60)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
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
    <section ref={sectionRef} className="py-[120px] md:py-[160px] px-5 bg-[#000]">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          {/* Left — Before/After Comparison */}
          <div className="animate-on-scroll flex-1 basis-0 min-w-0 w-full">
            <div className="rounded-xl overflow-hidden shadow-[0_0_40px_10px_rgba(12,140,233,0.06)] relative select-none">
              {/* Video layers */}
              <div className="relative aspect-[1280/760]">
                <video className="absolute inset-0 w-full h-full object-cover bg-[#13151b]" autoPlay loop muted playsInline>
                  <source src="/figma.mp4" type="video/mp4" />
                </video>

                {/* Blur overlay for "before" side */}
                <div
                  className="absolute inset-0 backdrop-blur-[3px] bg-black/10"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                />

                {/* Pixel grid overlay on before side for effect */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)',
                  }}
                />

                {/* Slider line */}
                <div className="absolute top-0 bottom-0 w-0.5 bg-white/70 z-10" style={{ left: `${sliderPos}%` }}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-ew-resize">
                    <svg className="w-5 h-5 text-black/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/[0.08] z-10">
                  <span className="text-[11px] text-white/60 mr-1">Before</span>
                  <span className="text-[13px] text-white font-semibold">720p</span>
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-primary-500/20 backdrop-blur-sm border border-primary-500/25 z-10">
                  <span className="text-[11px] text-primary-300/70 mr-1">After</span>
                  <span className="text-[13px] text-white font-semibold">4K</span>
                </div>

                {/* Invisible range input */}
                <input
                  type="range"
                  min={5}
                  max={95}
                  value={sliderPos}
                  onChange={(e) => setSliderPos(parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                />
              </div>
            </div>
            <p className="text-center text-[13px] text-white/25 mt-3">Drag to compare before and after</p>
          </div>

          {/* Right — App Panel Mockup */}
          <div className="animate-on-scroll flex-1 basis-0 min-w-0 w-full md:max-w-[420px]">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block px-3.5 py-1.5 rounded-full text-[13px] font-medium text-white/55 bg-white/[0.06] border border-white/[0.08]">
                AI Upscale
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium text-amber-400/80 bg-amber-500/[0.08] border border-amber-500/[0.12]">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Premium
              </span>
            </div>

            <h2 className="text-[32px] md:text-[48px] font-[650] text-white leading-[1.1] tracking-tight mb-5">
              Turn 720p into<br />4K quality
            </h2>
            <p className="text-base md:text-lg text-white/55 leading-[1.5] max-w-[50ch] mb-8">
              On-device AI upscales your video by 4x. Everything processed locally — fast, private, no cloud upload.
            </p>

            {/* Panel Mockup */}
            <div className="rounded-xl bg-[#0f0f0f] border border-white/[0.08] overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 border-b border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-white">AI Upscale</span>
                  <div className="w-8 h-[18px] rounded-full bg-blue-500 relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-[14px] h-[14px] rounded-full bg-white transition-all" />
                  </div>
                </div>
              </div>

              {/* Model Selection */}
              <div className="p-4 space-y-2">
                <span className="text-[11px] text-white/35 uppercase tracking-wider font-medium">Model</span>
                {models.map((model, i) => (
                  <button
                    key={model.name}
                    onClick={() => setActiveModel(i)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left cursor-pointer transition-all duration-200 ${
                      activeModel === i
                        ? 'bg-white/[0.06] border border-white/[0.12]'
                        : 'bg-transparent border border-white/[0.04] hover:border-white/[0.08]'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      activeModel === i ? 'border-blue-500' : 'border-white/20'
                    }`}>
                      {activeModel === i && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-[13px] font-medium ${activeModel === i ? 'text-white' : 'text-white/50'}`}>{model.name}</span>
                        <span className="text-[10px] text-white/30">{model.speed}</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/[0.06] mt-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${activeModel === i ? 'bg-blue-500' : 'bg-white/10'}`}
                          style={{ width: `${model.quality}%` }}
                        />
                      </div>
                    </div>
                  </button>
                ))}

                {/* Upscale Button */}
                <button
                  onClick={handleUpscale}
                  disabled={processing}
                  className={`w-full mt-3 py-2.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                    processing
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'bg-blue-500 text-white hover:bg-blue-400'
                  }`}
                >
                  {processing ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>Processing... {progress}%</span>
                    </div>
                  ) : progress === 100 ? (
                    'Done! ✓'
                  ) : (
                    'Upscale to 4K'
                  )}
                </button>

                {processing && (
                  <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <div className="h-full rounded-full bg-blue-500 transition-all duration-100" style={{ width: `${progress}%` }} />
                  </div>
                )}

                <p className="text-[11px] text-white/20 text-center mt-2 flex items-center justify-center gap-1.5">
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
    </section>
  )
}
