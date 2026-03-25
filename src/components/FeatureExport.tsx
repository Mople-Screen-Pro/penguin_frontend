'use client'

import { useEffect, useRef, useState } from 'react'

const DOWNLOAD_URL = 'https://grkyrqhgfgthpghircbu.supabase.co/functions/v1/download'

// Exact from ExportOptionsView.swift
const formats = ['MP4', 'MOV', 'WebM']
const qualities = ['Low', 'Medium', 'High']
const frameRates = ['30 fps', '40 fps', '50 fps', '60 fps']
const resolutions = [
  { label: '720p', size: '1280 × 720' },
  { label: '1080p', size: '1920 × 1080' },
  { label: '4K', size: '3840 × 2160' },
]
const upscaleMethods = ['None', 'AI']

function OptionRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[12px] text-white/70 w-[90px] flex-shrink-0">{label}</span>
      {children}
    </div>
  )
}

// Segmented control matching app's SegmentedButtonGroup
function SegmentedControl({ items, active, onChange, minW }: { items: string[]; active: number; onChange: (i: number) => void; minW?: string }) {
  return (
    <div className="flex rounded-md overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.15)' }}>
      {items.map((item, i) => (
        <div key={item} className="flex items-center">
          {i > 0 && <div className="w-px h-4 bg-white/[0.1]" />}
          <button
            onClick={() => onChange(i)}
            className={`px-3 text-[11px] cursor-pointer transition-all ${active === i ? 'bg-blue-500 text-white' : 'text-white/70 hover:text-white'}`}
            style={{ minWidth: minW || '47px', minHeight: '24px' }}
          >
            {item}
          </button>
        </div>
      ))}
    </div>
  )
}

export default function FeatureExport() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [format, setFormat] = useState(0)
  const [quality, setQuality] = useState(2)
  const [fps, setFps] = useState(3)
  const [resolution, setResolution] = useState(1)
  const [upscale, setUpscale] = useState(0)
  const [exporting, setExporting] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleExport = () => {
    if (exporting) return
    setExporting(true); setProgress(0)
    const iv = setInterval(() => {
      setProgress((p) => { if (p >= 100) { clearInterval(iv); setTimeout(() => { setExporting(false); setProgress(0) }, 1200); return 100 } return p + 1.5 })
    }, 50)
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }) }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    if (sectionRef.current) sectionRef.current.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-[120px] md:py-[160px] px-5 bg-[#000]">
      <div className="max-w-[1240px] mx-auto">
        <div className="animate-on-scroll text-center mb-14">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-[13px] font-medium text-white/55 bg-white/[0.06] border border-white/[0.08] mb-6">Export</span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[62px] font-[650] text-white leading-[1.1] tracking-tight mb-5">Export &amp; Share.<br />Smooth and easy.</h2>
          <p className="text-base md:text-lg text-white/55 leading-[1.5] max-w-[55ch] mx-auto">YouTube, internal wiki, or your website — export in the optimal format and resolution for any destination.</p>
        </div>

        {/* Export Dialog — exact 460px width from ExportOptionsView.swift */}
        <div className="animate-on-scroll max-w-[460px] mx-auto">
          <div className="rounded-xl overflow-hidden" style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>
            {/* Header — px-6 py-5 pt-5 pb-3.5 */}
            <div className="px-6 pt-5 pb-3.5 border-b border-white/[0.08]">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-semibold text-white">Export Video</h3>
                <span className="text-[11px] text-white/48 font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>1920 × 1080</span>
              </div>
            </div>

            {/* Settings — px-6 py-5 */}
            <div className="px-6 py-5 space-y-6">
              {/* VIDEO Section */}
              <div>
                <span className="text-[12px] font-medium text-white/48 uppercase tracking-[0.5px] mb-3.5 block">Video</span>
                <div className="space-y-3.5">
                  <OptionRow label="Format"><SegmentedControl items={formats} active={format} onChange={setFormat} minW="52px" /></OptionRow>
                  <OptionRow label="Quality"><SegmentedControl items={qualities} active={quality} onChange={setQuality} /></OptionRow>
                  <OptionRow label="Frame Rate"><SegmentedControl items={frameRates} active={fps} onChange={setFps} /></OptionRow>
                </div>
              </div>

              {/* OUTPUT Section */}
              <div>
                <span className="text-[12px] font-medium text-white/48 uppercase tracking-[0.5px] mb-3.5 block">Output</span>
                <OptionRow label="Resolution">
                  <div className="flex rounded-md overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.15)' }}>
                    {resolutions.map((res, i) => (
                      <div key={res.label} className="flex items-center">
                        {i > 0 && <div className="w-px h-4 bg-white/[0.1]" />}
                        <button onClick={() => setResolution(i)} className={`px-3 py-1.5 text-center cursor-pointer transition-all ${resolution === i ? 'bg-blue-500' : 'hover:bg-white/[0.04]'}`} style={{ minWidth: '70px' }}>
                          <span className={`block text-[11px] ${resolution === i ? 'text-white' : 'text-white/70'}`}>{res.label}</span>
                          <span className={`block text-[9px] ${resolution === i ? 'text-white/70' : 'text-white/30'}`}>{res.size}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </OptionRow>
              </div>

              {/* AI Section */}
              <div>
                <span className="text-[12px] font-medium text-white/48 uppercase tracking-[0.5px] mb-3.5 block">AI</span>
                <OptionRow label="Upscale"><SegmentedControl items={upscaleMethods} active={upscale} onChange={setUpscale} /></OptionRow>
                {upscale === 1 && (
                  <div className="mt-2 ml-[106px]">
                    <span className="text-[11px] text-white/40">Model: FSRCNN (Core ML)</span>
                  </div>
                )}
              </div>

              {/* Progress */}
              {exporting && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-white/50">Rendering...</span>
                    <span className="text-[12px] text-white/50 font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full bg-blue-500 transition-all duration-100" style={{ width: `${progress}%` }} />
                  </div>
                  {progress === 100 && (
                    <div className="flex items-center gap-2 justify-center py-1">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      <span className="text-[13px] text-emerald-400 font-medium">Export complete!</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer — exact from app */}
            <div className="px-4 py-3 border-t border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <svg className="w-[11px] h-[11px] text-white/32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/></svg>
                  <span className="text-[11px] text-white/32">~/Movies/Penguin/</span>
                </div>
                <div className="flex gap-3">
                  <button className="px-3.5 py-1.5 rounded-md text-[12px] text-white/50 hover:text-white/70 transition-colors cursor-pointer border border-white/[0.1]">Cancel</button>
                  <button onClick={handleExport} disabled={exporting} className={`px-4 py-1.5 rounded-md text-[12px] font-semibold transition-all cursor-pointer ${exporting ? 'bg-blue-500/30 text-white/50' : 'bg-blue-500 text-white hover:bg-blue-400'}`}>
                    {exporting ? 'Exporting...' : 'Export'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-[13px] text-white/25 mt-6">Fast local rendering — no cloud upload needed</p>
          <div className="text-center mt-8">
            <a href={DOWNLOAD_URL} className="inline-flex items-center gap-2.5 bg-primary-600 hover:bg-primary-500 text-white px-7 py-3.5 rounded-xl font-semibold text-[15px] transition-all duration-200 hover:shadow-[0_0_24px_4px_rgba(12,140,233,0.25)]">
              Download Penguin
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </a>
            <p className="text-[13px] text-white/20 mt-3">Free to use · macOS only</p>
          </div>
        </div>
      </div>
    </section>
  )
}
