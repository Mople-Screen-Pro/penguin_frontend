'use client'

import { useEffect, useRef, useState } from 'react'

// Exact from BackgroundPanel.swift
const bgTypes = ['None', 'Color', 'Gradient', 'Wall']

const solidColors = [
  { name: 'Black', color: '#000000' }, { name: 'White', color: '#ffffff' },
  { name: 'Dark', color: '#262633' }, { name: 'Navy', color: '#00478c' },
  { name: 'Purple', color: '#331a4d' }, { name: 'Forest', color: '#1f402e' },
  { name: 'Charcoal', color: '#333338' }, { name: 'Wine', color: '#591a26' },
]

// Exact 16 gradients from BackgroundStyle.swift
const gradients = [
  { name: 'Midnight', from: '#0d0d33', to: '#00000d' },
  { name: 'Ocean', from: '#0078bf', to: '#002e66' },
  { name: 'Sunset', from: '#ff5933', to: '#8c1a66' },
  { name: 'Forest', from: '#00804d', to: '#003326' },
  { name: 'Lavender', from: '#9470db', to: '#402673' },
  { name: 'Ember', from: '#ff9900', to: '#990000' },
  { name: 'Slate', from: '#4d5461', to: '#1a1c24' },
  { name: 'Aurora', from: '#00cc99', to: '#331a99' },
  { name: 'Dusk', from: '#d97333', to: '#1a144d' },
  { name: 'Copper', from: '#b87333', to: '#401f0d' },
  { name: 'Arctic', from: '#bfe0f2', to: '#264073' },
  { name: 'Cherry', from: '#d95980', to: '#4d0d33' },
  { name: 'Storm', from: '#596680', to: '#0d121f' },
  { name: 'Moss', from: '#4d6626', to: '#14260d' },
  { name: 'Cobalt', from: '#0047d9', to: '#00144d' },
  { name: 'Wine', from: '#801a2e', to: '#260514' },
]

// Wallpaper categories from BackgroundPanel.swift
const wallpaperCategories = [
  { name: 'Vivid', items: ['wallpaper_aurora', 'wallpaper_neon', 'wallpaper_spectrum', 'wallpaper_violet_peak', 'wallpaper_pink_bloom', 'wallpaper_indigo_silk', 'wallpaper_amber_petal', 'wallpaper_red_petal'] },
  { name: 'Soft', items: ['wallpaper_candy', 'wallpaper_rose', 'wallpaper_mint', 'wallpaper_milkyway', 'wallpaper_calm_sea', 'wallpaper_aqua_breeze', 'wallpaper_lavender_mist', 'wallpaper_blue_silk'] },
  { name: 'Minimal', items: ['wallpaper_trails', 'wallpaper_brick', 'wallpaper_wood', 'wallpaper_lilac_wave', 'wallpaper_silver_flow', 'wallpaper_sky_pillar'] },
]

const wallExt: Record<string, string> = {
  wallpaper_aurora: 'jpg', wallpaper_neon: 'jpg', wallpaper_spectrum: 'jpg', wallpaper_violet_peak: 'png',
  wallpaper_pink_bloom: 'png', wallpaper_indigo_silk: 'png', wallpaper_amber_petal: 'png', wallpaper_red_petal: 'png',
  wallpaper_candy: 'jpg', wallpaper_rose: 'jpg', wallpaper_mint: 'jpg', wallpaper_milkyway: 'jpg',
  wallpaper_calm_sea: 'png', wallpaper_aqua_breeze: 'png', wallpaper_lavender_mist: 'png', wallpaper_blue_silk: 'png',
  wallpaper_trails: 'jpg', wallpaper_brick: 'jpg', wallpaper_wood: 'jpg', wallpaper_lilac_wave: 'png',
  wallpaper_silver_flow: 'png', wallpaper_sky_pillar: 'png',
}

// Exact from CursorStylePanel.swift
const cursorTypes = [
  { name: 'System', icon: '↗' }, { name: 'Dot', icon: '●' },
  { name: 'Ring', icon: '○' }, { name: 'Crosshair', icon: '+' },
  { name: 'Target', icon: '◎' }, { name: 'Sparkle', icon: '✦' },
]

// Exact from ClickEffectPanel.swift
const clickTypes = ['Ripple', 'Pulse', 'Highlight']

function SliderRow({ label, value, onChange, min, max, step, fmt }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; fmt: (v: number) => string }) {
  const getDefault = () => { if (min === 0.2) return 0.5; if (label === 'Size' && max === 64) return 20; if (label === 'Size') return 40; return 0 }
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[12px] text-white/80">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium font-mono text-white/60">{fmt(value)}</span>
          <button onClick={() => onChange(getDefault())} className="text-[11px] text-blue-500 cursor-pointer">Reset</button>
        </div>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full h-1 rounded-full appearance-none cursor-pointer" style={{ background: 'rgba(255,255,255,0.08)' }} />
    </div>
  )
}
const effectColors = [
  { name: 'Blue', c: '#3b82f6' }, { name: 'Red', c: '#ef4444' },
  { name: 'Green', c: '#22c55e' }, { name: 'Yellow', c: '#eab308' },
  { name: 'Orange', c: '#f97316' }, { name: 'Purple', c: '#a855f7' },
  { name: 'Pink', c: '#ec4899' }, { name: 'White', c: '#ffffff' },
]

export default function FeatureStyling() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [bgType, setBgType] = useState(2)
  const [selGrad, setSelGrad] = useState(0)
  const [selSolid, setSelSolid] = useState(0)
  const [selWall, setSelWall] = useState('wallpaper_aurora')
  const [cursor, setCursor] = useState(0)
  const [cursorSize, setCursorSize] = useState(20)
  const [clickType, setClickType] = useState(0)
  const [clickColor, setClickColor] = useState(0)
  const [clickSize, setClickSize] = useState(40)
  const [clickDur, setClickDur] = useState(0.5)
  const [padding, setPadding] = useState(12)
  const [bgCorners, setBgCorners] = useState(16)
  const [vidCorners, setVidCorners] = useState(8)

  const getBg = () => {
    if (bgType === 0) return undefined
    if (bgType === 1) return solidColors[selSolid].color
    if (bgType === 2) return `linear-gradient(135deg, ${gradients[selGrad].from}, ${gradients[selGrad].to})`
    return undefined
  }
  const isWall = bgType === 3

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }) }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    if (sectionRef.current) sectionRef.current.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-[120px] md:py-[160px] px-5 bg-[#000]">
      <div className="max-w-[1240px] mx-auto">
        <div className="animate-on-scroll flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="inline-block px-3.5 py-1.5 rounded-full text-[13px] font-medium text-white/55 bg-white/[0.06] border border-white/[0.08] mb-6">Styling</span>
            <h2 className="text-[32px] md:text-[48px] lg:text-[62px] font-[650] text-white leading-[1.1] tracking-tight">Add your style<br />and branding</h2>
          </div>
          <p className="text-base text-white/55 leading-[1.5] max-w-[40ch] md:pb-2">Background, cursor, and click effects — customize every visual detail of your recording.</p>
        </div>

        <div className="animate-on-scroll flex flex-col lg:flex-row gap-[2px]">
          {/* Live Preview */}
          <div className="lg:flex-[3] min-w-0">
            <div className="aspect-video rounded-xl overflow-hidden relative transition-all duration-500" style={{ padding: `${padding * 1.2}px`, background: isWall ? '#000' : (getBg() || '#0a0a0a'), borderRadius: `${bgCorners}px` }}>
              {isWall && <img src={`/wallpapers/${selWall}.${wallExt[selWall] || 'jpg'}`} alt="" className="absolute inset-0 w-full h-full object-cover" />}
              {bgType === 0 && <div className="absolute inset-0" style={{ background: 'repeating-conic-gradient(#222 0% 25%, #1a1a1a 0% 50%) 50% / 20px 20px' }} />}
              <div className="relative w-full h-full overflow-hidden shadow-2xl" style={{ borderRadius: `${vidCorners}px` }}>
                <video className="w-full h-full object-cover bg-[#13151b]" autoPlay loop muted playsInline><source src="/figma2.mp4" type="video/mp4" /></video>
              </div>
            </div>
          </div>

          {/* Right Panel — mimics app's panel exactly */}
          <div className="lg:flex-[1.3] min-w-0 lg:min-w-[340px]">
            <div className="rounded-xl overflow-hidden overflow-y-auto" style={{ background: '#000', maxHeight: '520px' }}>

              {/* Background Section Card */}
              <div className="border-b border-white/[0.08]">
                <div className="px-[14px] py-3 flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-white">Background</span>
                </div>
                <div className="px-[14px] pb-[14px] space-y-4">
                  {/* Type picker - exact style from app */}
                  <div className="flex gap-[2px] p-[2px] rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    {bgTypes.map((t, i) => (
                      <button key={t} onClick={() => setBgType(i)} className={`flex-1 py-1.5 rounded-md text-[11px] transition-all cursor-pointer ${bgType === i ? 'font-semibold text-white' : 'font-medium text-white/45 hover:text-white/60'}`} style={bgType === i ? { background: 'rgba(255,255,255,0.18)' } : {}}>
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* Solid Colors - 4 col grid */}
                  {bgType === 1 && (
                    <div>
                      <span className="text-[12px] text-white/80 mb-2 block">Preset</span>
                      <div className="grid grid-cols-4 gap-2">
                        {solidColors.map((c, i) => (
                          <button key={c.name} onClick={() => setSelSolid(i)} className={`h-11 rounded-lg cursor-pointer transition-all ${selSolid === i ? 'ring-2 ring-white' : 'ring-1 ring-white/10'}`} style={{ background: c.color }}>
                            <span className="text-[9px] font-medium text-white/80 drop-shadow-md">{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Gradient Presets - 4 col grid */}
                  {bgType === 2 && (
                    <div>
                      <span className="text-[12px] text-white/80 mb-2 block">Preset</span>
                      <div className="grid grid-cols-4 gap-2">
                        {gradients.map((g, i) => (
                          <button key={g.name} onClick={() => setSelGrad(i)} className={`h-11 rounded-lg cursor-pointer transition-all ${selGrad === i ? 'ring-2 ring-white' : 'ring-1 ring-white/10'}`} style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}>
                            <span className="text-[9px] font-medium text-white/80 drop-shadow-md">{g.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Wallpapers - categorized */}
                  {bgType === 3 && (
                    <div className="space-y-3">
                      {wallpaperCategories.map((cat) => (
                        <div key={cat.name}>
                          <span className="text-[11px] font-semibold text-white/50 mb-1.5 block">{cat.name}</span>
                          <div className="grid grid-cols-4 gap-2">
                            {cat.items.map((w) => (
                              <button key={w} onClick={() => setSelWall(w)} className={`h-11 rounded-lg overflow-hidden cursor-pointer transition-all ${selWall === w ? 'ring-2 ring-blue-500' : 'ring-1 ring-white/10'}`}>
                                <img src={`/wallpapers/${w}.${wallExt[w] || 'jpg'}`} alt="" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Transform sliders */}
                  <div className="space-y-3 pt-2 border-t border-white/[0.08]">
                    <SliderRow label="Padding" value={padding} onChange={setPadding} min={0} max={30} step={1} fmt={(v) => String(v)} />
                    <SliderRow label="Background Corners" value={bgCorners} onChange={setBgCorners} min={0} max={50} step={1} fmt={(v) => String(v)} />
                    <SliderRow label="Video Corners" value={vidCorners} onChange={setVidCorners} min={0} max={50} step={1} fmt={(v) => String(v)} />
                  </div>
                </div>
              </div>

              {/* Cursor Section */}
              <div className="px-4 py-3 border-b border-white/[0.08]">
                <span className="text-[11px] font-medium text-white/50 mb-2 block">Style</span>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {cursorTypes.map((c, i) => (
                    <button key={c.name} onClick={() => setCursor(i)} className={`flex flex-col items-center gap-1 w-[56px] h-[50px] rounded-lg flex-shrink-0 justify-center cursor-pointer transition-all ${cursor === i ? 'bg-white/[0.15] border border-blue-500' : 'bg-white/[0.05] border border-white/[0.1]'}`}>
                      <span className={`text-[16px] ${cursor === i ? 'text-white' : 'text-white/60'}`}>{c.icon}</span>
                      <span className={`text-[9px] ${cursor === i ? 'font-semibold text-white' : 'text-white/60'}`}>{c.name}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <SliderRow label="Size" value={cursorSize} onChange={setCursorSize} min={8} max={64} step={1} fmt={(v) => `${v}px`} />
                </div>
              </div>

              {/* Click Effect Section */}
              <div className="px-4 py-3">
                <span className="text-[11px] font-medium text-white/50 mb-2 block">Effect</span>
                <div className="flex gap-1 mb-3">
                  {clickTypes.map((t, i) => (
                    <button key={t} onClick={() => setClickType(i)} className={`flex-1 py-2 rounded-md text-[11px] cursor-pointer transition-all border ${clickType === i ? 'font-semibold text-white bg-white/[0.2] border-blue-500' : 'text-white/60 bg-white/[0.05] border-white/[0.1]'}`}>{t}</button>
                  ))}
                </div>
                <span className="text-[11px] font-medium text-white/50 mb-2 block">Color</span>
                <div className="flex gap-1.5 mb-3">
                  {effectColors.map((c, i) => (
                    <button key={c.name} onClick={() => setClickColor(i)} className={`w-6 h-6 rounded-full cursor-pointer transition-all flex-shrink-0 ${clickColor === i ? 'ring-2 ring-white ring-offset-1 ring-offset-black' : 'ring-1 ring-white/30'}`} style={{ background: c.c }} />
                  ))}
                </div>
                <div className="space-y-3">
                  <SliderRow label="Size" value={clickSize} onChange={setClickSize} min={20} max={100} step={1} fmt={(v) => `${v}px`} />
                  <SliderRow label="Duration" value={clickDur} onChange={setClickDur} min={0.2} max={1.5} step={0.1} fmt={(v) => `${v.toFixed(1)}s`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
