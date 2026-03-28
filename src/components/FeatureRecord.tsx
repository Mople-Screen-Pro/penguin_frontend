'use client'

import { useScrollReveal } from '../hooks/useScrollReveal'

const features = [
  { label: 'Full Screen', desc: 'Capture your entire display', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9m-11.25 11.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15" /></svg>
  )},
  { label: 'Window', desc: 'Record a specific app window', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 9h18" /></svg>
  )},
  { label: 'Custom Area', desc: 'Select any region with presets', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5" /></svg>
  )},
  { label: 'System Audio + Mic', desc: 'Capture both simultaneously', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>
  )},
  { label: 'Camera Overlay', desc: 'Show your face in 9 positions', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>
  )},
  { label: 'Pause & Resume', desc: 'Full control over your recording', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" /></svg>
  )},
]

export default function FeatureRecord() {
  const sectionRef = useScrollReveal()

  return (
    <section id="feature-record" ref={sectionRef} className="py-[120px] md:py-[160px] px-5 bg-[#000]">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          {/* Text — left */}
          <div className="animate-on-scroll flex-1 basis-0 min-w-0">
            <span className="relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[15px] font-semibold text-red-400 bg-red-500/[0.1] border border-red-500/[0.2] mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inset-0 rounded-full bg-red-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
              Record
              <span className="absolute -inset-1 rounded-full bg-red-500/[0.06] blur-md -z-10" />
            </span>
            <h2 className="text-[32px] md:text-[48px] lg:text-[62px] font-[650] text-white leading-[1.1] tracking-tight mb-6">
              Record it your way
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-[1.5] max-w-[45ch] mb-10">
              One floating panel. Four capture modes. No setup, no learning curve — just click and go.
            </p>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((f) => (
                <div key={f.label} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.05] border border-white/[0.10] hover:border-white/[0.20] transition-colors duration-200">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center text-white/60 flex-shrink-0">
                    {f.icon}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[14px] font-semibold text-white block">{f.label}</span>
                    <p className="text-[12px] text-white/60 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel — right, large and prominent */}
          <div className="animate-on-scroll flex-1 basis-0 min-w-0 w-full flex items-center justify-center">
            <div className="w-full max-w-[600px]">
              {/* Subtle glow behind panel */}
              <div className="relative">
                <div className="absolute -inset-8 rounded-3xl bg-white/[0.02] blur-2xl" />
                <img
                  src="/screenshots/panel.png"
                  alt="Penguin recording control panel"
                  className="relative w-full rounded-xl"
                  style={{
                    imageRendering: 'auto',
                    filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.8))',
                  }}
                  width={2640}
                  height={256}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
