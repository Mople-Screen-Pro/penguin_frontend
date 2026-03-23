'use client'

import { useEffect, useRef } from 'react'

const DOWNLOAD_URL = 'https://grkyrqhgfgthpghircbu.supabase.co/functions/v1/download'

const steps = [
  {
    title: 'Record',
    description: 'One click to start. Capture your full screen or a custom area — no complicated setup, no learning curve.',
    active: true,
  },
  {
    title: 'Edit',
    description: 'Trim clips, adjust timing, and polish your recording with built-in tools. Everything you need, nothing you don\'t.',
    active: false,
  },
  {
    title: 'Export',
    description: 'Export as MP4 in minutes. Share anywhere — YouTube, Notion, Slack, documentation, and more.',
    active: false,
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = (entry.target as HTMLElement).dataset.delay || '0'
            setTimeout(() => entry.target.classList.add('visible'), parseFloat(delay) * 1000)
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
    <section id="how-it-works" ref={sectionRef} className="py-24 px-6 bg-[#0a0a0a] border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Two Column Header */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <h2 className="animate-on-scroll slide-left text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
            <span className="text-primary-200">From</span> screen <span className="text-white">to</span>
            <br />
            <span className="gradient-text">finished video</span>, fast
          </h2>
          <div className="animate-on-scroll slide-right md:pl-12" data-delay="0.1">
            <p className="text-xl text-gray-400 mb-6 leading-relaxed">
              Penguin handles the entire workflow — record, edit, and export — all in one app. No switching between tools, no steep learning curve. Just fast, polished results.
            </p>
            <a
              href={DOWNLOAD_URL}
              className="inline-flex items-center text-white font-semibold hover:text-primary-600 transition-colors border-b border-white hover:border-primary-600 pb-0.5"
            >
              Download Penguin
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Interface Mockup */}
        <div className="animate-on-scroll scale-in rounded-2xl bg-gray-800 p-4 md:p-8 mb-12">
          <div className="rounded-xl overflow-hidden shadow-xl bg-[#1e1e1e] aspect-[16/9] md:aspect-[21/9] relative">
            <video
              className="w-full h-full object-cover opacity-90"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/vscode.mp4" type="video/mp4" />
            </video>
            {/* UI Overlay */}
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gray-900/95 backdrop-blur-md border-r border-gray-800 p-6 hidden md:flex flex-col">
              <div className="text-white/50 text-xs font-mono mb-6 uppercase tracking-wider">Penguin Settings</div>
              <div className="space-y-4">
                <div className="h-8 bg-white/10 rounded border border-white/5" />
                <div className="h-24 bg-white/5 rounded border border-white/5" />
                <div className="h-8 bg-white/10 rounded border border-white/5" />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="animate-on-scroll group"
              data-delay={String(index * 0.15)}
            >
              <div className={`h-1 w-full rounded-full mb-6 ${step.active ? 'bg-white' : 'bg-gray-700'}`} />
              <h3 className={`text-xl font-bold mb-3 ${step.active ? 'text-white' : 'text-gray-400'}`}>
                {step.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
