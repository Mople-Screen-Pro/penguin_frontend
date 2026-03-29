'use client'

import { useScrollReveal } from '../hooks/useScrollReveal'

const highlights = [
  { label: 'One Panel', desc: 'All recording controls in a single floating bar — always within reach.', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" /></svg>
  )},
  { label: '4 Capture Modes', desc: 'Full screen, window, custom area, or preset — pick what fits.', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" /></svg>
  )},
  { label: 'Audio & Camera Built-in', desc: 'System audio, mic, and camera overlay — no extra apps needed.', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>
  )},
]

export default function FeatureRecord() {
  const sectionRef = useScrollReveal()

  return (
    <section id="feature-record" ref={sectionRef} className="py-[80px] md:py-[160px] px-5 bg-[#000]">
      <div className="max-w-[1240px] mx-auto">
        {/* Header — center aligned */}
        <div className="animate-on-scroll text-center mb-14">
          <span className="relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[15px] font-semibold text-red-400 bg-red-500/[0.1] border border-red-500/[0.2] mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inset-0 rounded-full bg-red-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            Record
            <span className="absolute -inset-1 rounded-full bg-red-500/[0.06] blur-md -z-10" />
          </span>
          <h2 className="text-[28px] md:text-[48px] lg:text-[62px] font-[650] text-white leading-[1.1] tracking-tight mb-5">
            <span className="text-red-400">Record it</span> your way.
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-[1.5] max-w-[50ch] mx-auto px-2">
            One floating panel. Four capture modes. No setup, no learning curve — just click and go.
          </p>
        </div>

        {/* Feature cards + arrows + panel */}
        <div className="animate-on-scroll max-w-[1240px] mx-auto">
          {/* Highlight cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-0">
            {highlights.map((h) => (
              <div key={h.label} className="flex items-start gap-3.5 p-5 rounded-xl bg-white/[0.05] border border-white/[0.10] hover:border-white/[0.20] transition-colors duration-200">
                <div className="w-10 h-10 rounded-lg bg-white/[0.08] flex items-center justify-center text-white/60 flex-shrink-0">
                  {h.icon}
                </div>
                <div>
                  <span className="text-[14px] font-semibold text-white block mb-1">{h.label}</span>
                  <p className="text-[13px] text-white/50 leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Panel image */}
          <div className="mt-10">
            <div className="relative">
              <div className="absolute -inset-8 rounded-3xl bg-white/[0.02] blur-2xl" />
              <img
                src="/screenshots/panel.png"
                alt="Penguin recording control panel"
                className="relative w-full rounded-xl"
                style={{
                  filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.8))',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
