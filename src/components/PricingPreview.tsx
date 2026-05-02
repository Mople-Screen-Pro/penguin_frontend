'use client'

import Link from 'next/link'
import { useScrollReveal } from '../hooks/useScrollReveal'
import AuthenticatedDownloadButton from './AuthenticatedDownloadButton'

export default function PricingPreview() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className="section-glow ambient-purple pt-[40px] pb-[60px] md:pt-[80px] md:pb-[100px] px-5 bg-[#0C0C14]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="animate-on-scroll text-[28px] md:text-[48px] lg:text-[56px] font-[650] text-white leading-[1.1] tracking-tight mb-4">
          Start free. Upgrade when you're ready.
        </h2>
        <p className="animate-on-scroll text-sm sm:text-base text-white/60 mb-12 max-w-lg mx-auto">
          Record, edit, and export with no time limits. Unlock AI Upscale, premium presets, and more with Pro.
        </p>

        <div className="animate-on-scroll grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
          {/* Free */}
          <div className="glass-card p-7 text-left">
            <span className="text-xs font-bold text-white/55 tracking-widest uppercase mb-3 block">Free</span>
            <div className="text-3xl font-bold text-white mb-1">$0</div>
            <p className="text-sm text-white/60 mb-5">Forever free, no strings attached.</p>
            <ul className="space-y-2.5">
              {['Screen, window & area recording', 'Full timeline editor', 'Cut, trim, & speed control', 'Export to MP4, GIF, WebM'].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/60">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="glass-card p-7 text-left !border-primary-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl tracking-wider uppercase">
              Popular
            </div>
            <span className="text-xs font-bold text-primary-400 tracking-widest uppercase mb-3 block">Pro</span>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold text-white">$8</span>
              <span className="text-sm text-white/55">/mo</span>
            </div>
            <p className="text-sm text-white/60 mb-5">Billed yearly. Lifetime option available.</p>
            <ul className="space-y-2.5">
              {['Everything in Free', 'AI Upscale up to 4K', 'Premium styling presets', 'Priority support'].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/60">
                  <svg className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="animate-on-scroll flex flex-col sm:flex-row items-center justify-center gap-4">
          <AuthenticatedDownloadButton location="pricing_preview" className="btn-block text-white font-semibold px-8 py-3 text-base">
            Download Free for Mac
          </AuthenticatedDownloadButton>
          <Link href="/pricing" className="text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors">
            See all plans &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
