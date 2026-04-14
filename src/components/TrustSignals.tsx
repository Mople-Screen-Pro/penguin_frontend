'use client'

import { useScrollReveal } from '../hooks/useScrollReveal'

const signals = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
      </svg>
    ),
    title: '100% Offline',
    description: 'Your recordings never leave your Mac. No cloud, no tracking.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Apple Silicon Native',
    description: 'Built for M-series chips. Fast, efficient, and power-friendly.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'No Account Required',
    description: 'Download and start recording — zero sign-up friction.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Lightweight & Fast',
    description: 'Under 50MB install. Launches instantly, records without lag.',
  },
]

export default function TrustSignals() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className="relative pt-[20px] pb-[100px] md:pt-[40px] md:pb-[160px] px-5 bg-[#0a0a12] overflow-hidden">
      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAFBFF] to-transparent" />

      <div className="relative max-w-4xl mx-auto">
        <div className="animate-on-scroll grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {signals.map((signal, i) => (
            <div
              key={signal.title}
              className="animate-on-scroll text-center p-5"
              data-delay={String(i * 0.06)}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mx-auto mb-3">
                {signal.icon}
              </div>
              <h4 className="text-[14px] font-semibold text-white mb-1">{signal.title}</h4>
              <p className="text-[12px] text-white/50 leading-relaxed">{signal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
