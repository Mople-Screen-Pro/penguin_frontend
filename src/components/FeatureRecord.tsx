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
    <section id="feature-record" ref={sectionRef} className="section-glow ambient-purple pt-[40px] pb-[60px] md:pt-[80px] md:pb-[100px] px-5 bg-[#FAFBFF]">
      <div className="max-w-[1240px] mx-auto">
        {/* Header — center aligned */}
        <div className="animate-on-scroll text-center mb-14">
          <span className="badge-block badge-red mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inset-0 rounded-full opacity-60 bg-red-400" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-400" />
            </span>
            Record
          </span>
          <h2 className="text-[28px] md:text-[48px] lg:text-[62px] font-[650] text-gray-900 leading-[1.1] tracking-tight mb-5">
            <span style={{ color: '#d46060' }}>Record it</span> your way.
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-[1.5] max-w-[50ch] mx-auto px-2">
            One floating panel. Four capture modes. No setup, no learning curve — just click and go.
          </p>
        </div>

        {/* Feature cards + arrows + panel */}
        <div className="animate-on-scroll max-w-[1240px] mx-auto">
          {/* Highlight cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-0">
            {highlights.map((h) => (
              <div key={h.label} className="glass-card flex items-start gap-3.5 p-5">
                <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 border-b-2 border-b-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0">
                  {h.icon}
                </div>
                <div>
                  <span className="text-[14px] font-semibold text-gray-900 block mb-1">{h.label}</span>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Panel image */}
          <div className="mt-10">
            <div className="relative">
              <div className="absolute -inset-8 rounded-3xl bg-gray-50 blur-2xl" />
              <img
                src="/screenshots/panel.png"
                alt="Clipa recording control panel"
                className="relative w-full rounded-2xl"
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
