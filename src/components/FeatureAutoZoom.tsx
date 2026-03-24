'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const easings = ['Linear', 'Ease In', 'Ease Out', 'Ease In-Out', 'Spring']

export default function FeatureAutoZoom() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [zoomScale, setZoomScale] = useState(2.5)
  const [activeEasing, setActiveEasing] = useState(4)
  const [zoomActive, setZoomActive] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!previewRef.current) return
    const rect = previewRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setCursorPos({ x: Math.max(10, Math.min(90, x)), y: Math.max(10, Math.min(90, y)) })
    setZoomActive(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setZoomActive(false)
    setCursorPos({ x: 50, y: 50 })
  }, [])

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
    <section ref={sectionRef} className="py-[120px] md:py-[160px] px-5 bg-[#000] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-primary-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto relative">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-[13px] font-medium text-white/55 bg-white/[0.06] border border-white/[0.08] mb-6">
            Auto Zoom
          </span>
          <h2 className="text-[36px] md:text-[56px] lg:text-[72px] font-[650] text-white leading-[1.05] tracking-tight mb-5">
            Engaging recordings.<br />
            <span className="gradient-text">Created in minutes.</span>
          </h2>
          <p className="text-base md:text-xl text-white/55 leading-[1.5] max-w-[55ch] mx-auto">
            AI analyzes your mouse movements and automatically zooms in and out.
            Professional focus effects with zero manual work.
          </p>
        </div>

        {/* Interactive Zoom Demo */}
        <div className="animate-on-scroll mb-12">
          <div
            ref={previewRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="rounded-xl overflow-hidden shadow-[0_0_60px_15px_rgba(12,140,233,0.06)] relative cursor-none group"
          >
            {/* Base video */}
            <div
              className="w-full aspect-[1280/760] overflow-hidden transition-all"
              style={{
                transformOrigin: `${cursorPos.x}% ${cursorPos.y}%`,
                transform: zoomActive ? `scale(${1 + (zoomScale - 1) * 0.3})` : 'scale(1)',
                transition: activeEasing === 4
                  ? 'transform 0.6s cubic-bezier(0.37, 1.2, 0.42, 1.02)'
                  : activeEasing === 3
                    ? 'transform 0.5s ease-in-out'
                    : activeEasing === 2
                      ? 'transform 0.4s ease-out'
                      : activeEasing === 1
                        ? 'transform 0.4s ease-in'
                        : 'transform 0.3s linear',
              }}
            >
              <video className="w-full h-full object-cover bg-[#13151b]" autoPlay loop muted playsInline>
                <source src="/github.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Custom cursor */}
            {zoomActive && (
              <div
                className="absolute pointer-events-none z-20 transition-all duration-100"
                style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="w-8 h-8 rounded-full border-2 border-white/80 shadow-[0_0_12px_rgba(255,255,255,0.3)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            {/* Zoom indicator overlay */}
            <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/[0.08] transition-opacity duration-300 ${zoomActive ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-[12px] text-white font-mono">{zoomScale.toFixed(1)}x zoom</span>
            </div>

            {/* Hint */}
            <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${zoomActive ? 'opacity-0' : 'opacity-100'}`}>
              <span className="text-[13px] text-white/60">Hover to experience auto zoom</span>
            </div>
          </div>
        </div>

        {/* Controls beneath video */}
        <div className="animate-on-scroll flex flex-col md:flex-row gap-4">
          {/* Zoom Scale Card */}
          <div className="flex-1 p-5 rounded-xl bg-[#13151b] border border-white/[0.08]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[15px] font-semibold text-white">Zoom Scale</h4>
              <span className="text-[13px] text-primary-400 font-mono font-semibold">{zoomScale.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min={1.5}
              max={5}
              step={0.1}
              value={zoomScale}
              onChange={(e) => setZoomScale(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/[0.06] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(255,255,255,0.3)] [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <div className="flex justify-between mt-2 text-[11px] text-white/25">
              <span>1.5x</span>
              <span>5.0x</span>
            </div>
          </div>

          {/* Easing Card */}
          <div className="flex-1 p-5 rounded-xl bg-[#13151b] border border-white/[0.08]">
            <h4 className="text-[15px] font-semibold text-white mb-4">Easing</h4>
            <div className="flex flex-wrap gap-2">
              {easings.map((e, i) => (
                <button
                  key={e}
                  onClick={() => setActiveEasing(i)}
                  className={`px-3 py-2 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
                    activeEasing === i
                      ? 'bg-white/[0.12] text-white border border-white/[0.15]'
                      : 'bg-white/[0.03] text-white/35 border border-white/[0.06] hover:border-white/[0.1]'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Keyframe Timeline Card */}
          <div className="flex-1 p-5 rounded-xl bg-[#13151b] border border-white/[0.08]">
            <h4 className="text-[15px] font-semibold text-white mb-4">Zoom Keyframes</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#40d9a6]" />
                <span className="text-[12px] text-white/35">Auto-generated by AI</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-[12px] text-white/35">Manually added</span>
              </div>
              <div className="h-8 rounded-md bg-white/[0.03] mt-2 relative overflow-hidden border border-white/[0.05]">
                <div className="absolute left-[3%] top-1 bottom-1 w-[20%] bg-[#40d9a6]/15 rounded border border-[#40d9a6]/25" />
                <div className="absolute left-[28%] top-1 bottom-1 w-[15%] bg-[#40d9a6]/15 rounded border border-[#40d9a6]/25" />
                <div className="absolute left-[50%] top-1 bottom-1 w-[12%] bg-blue-400/15 rounded border border-blue-400/25" />
                <div className="absolute left-[68%] top-1 bottom-1 w-[18%] bg-[#40d9a6]/15 rounded border border-[#40d9a6]/25" />
                {/* Diamond keyframe markers */}
                {[3, 23, 28, 43, 50, 62, 68, 86].map((pos) => (
                  <div
                    key={pos}
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-white/60"
                    style={{ left: `${pos}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
