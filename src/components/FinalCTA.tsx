'use client'

import { analytics } from '../lib/analytics'
import { useScrollReveal } from '../hooks/useScrollReveal'

const DOWNLOAD_URL = 'https://grkyrqhgfgthpghircbu.supabase.co/functions/v1/download'

export default function FinalCTA() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className="relative py-[60px] md:py-[100px] px-5 bg-[#0C0C14] overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(168,85,247,0.15)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(236,72,153,0.1)_0%,transparent_70%)]" />
      </div>

      {/* Top transition */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0C0C14] to-transparent" />

      <div className="relative max-w-2xl mx-auto text-center">
        <h2 className="animate-on-scroll text-[28px] md:text-[48px] lg:text-[56px] font-[650] text-white leading-[1.1] tracking-tight mb-5">
          Ready to make screen recording effortless?
        </h2>
        <p className="animate-on-scroll text-base md:text-lg text-white/60 mb-10 max-w-lg mx-auto leading-relaxed">
          Download Clipa Studio for free. No account needed. No watermark. Just record, edit, and share.
        </p>

        <div className="animate-on-scroll flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href={DOWNLOAD_URL}
            onClick={() => analytics.downloadClick("cta")}
            rel="noopener"
            className="btn-block text-white font-semibold px-10 py-4 text-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Download Free for Mac
          </a>
        </div>

        <p className="animate-on-scroll text-[13px] text-white/50">
          macOS 15.0+ &middot; Apple Silicon optimized &middot; 100% offline
        </p>
      </div>
    </section>
  )
}
