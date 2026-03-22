'use client'

import { useState, useEffect, useRef } from 'react'
import { analytics } from '../lib/analytics'

const faqs = [
  {
    question: 'What makes Penguin different from other screen recorders?',
    answer: "Most screen recorders just capture your screen — then you're on your own for editing and exporting. Penguin handles the entire workflow in one app: record, edit, and export. No switching tools, no complicated setup. You go from screen to finished video in minutes.",
  },
  {
    question: 'What editing features are included?',
    answer: "Penguin includes everything you need to polish recordings quickly — trimming, timing adjustments, and zoom controls. It also features auto cursor zoom that intelligently follows your mouse to highlight what matters. The goal is to get you to a polished result fast, without needing a separate video editor.",
  },
  {
    question: 'Which operating systems are supported?',
    answer: 'Penguin is currently available for macOS 15.0 (Sequoia) and later. A Windows version is actively in development and coming soon.',
  },
  {
    question: 'How fast is the export?',
    answer: "Penguin exports directly to MP4, optimized for fast rendering. Most recordings are ready to share within minutes. No upload required, no cloud processing — everything happens locally on your Mac.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
}

const featureList = {
  agility: {
    title: 'Speed',
    subtitle: 'Record, edit, and export — all in one app. No switching between tools.',
    items: [
      'One-click recording with zero setup time',
      'Built-in editor for trimming and adjustments',
      'Fast MP4 export — no cloud processing, no waiting',
      'Entire workflow in a single app',
      'Half the price of competing tools',
    ],
  },
  impact: {
    title: 'Quality',
    subtitle: 'Every recording comes out polished — no editing degree required.',
    items: [
      'Clean, professional recording output',
      'Smart cursor zoom for highlighting key moments',
      'Smooth transitions and distraction-free results',
      'Works with any app — GitHub, Figma, VS Code, and more',
    ],
  },
  scale: {
    title: 'Flexibility',
    subtitle: 'From quick demos to polished tutorials — Penguin adapts to your needs.',
    items: [
      'Full screen or custom area capture',
      'Fine-tune timing and zoom after recording',
      'Perfect for tutorials, demos, documentation, and presentations',
    ],
  },
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
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

  const toggleFAQ = (index: number) => {
    if (openIndex !== index) {
      analytics.faqOpen(faqs[index].question)
    }
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" ref={sectionRef} className="py-24 px-6 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Feature List Section - NOVA style */}
        <h2 className="animate-on-scroll text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-20 flex flex-wrap items-center gap-4">
          Everything
          <span className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-6 py-2 text-gray-900 shadow-sm">
            creators
          </span>
          love about Penguin
        </h2>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start mb-32">
          {/* Left Column - Feature Lists */}
          <div className="space-y-24">
            {Object.entries(featureList).map(([key, section]) => (
              <div key={key} className="animate-on-scroll grid md:grid-cols-[120px_1fr] gap-8">
                <h3 className="text-xl font-semibold text-gray-900 pt-1">{section.title}</h3>
                <div>
                  <p className="text-xl text-gray-900 mb-8 leading-relaxed font-medium">
                    {section.subtitle}
                  </p>
                  <ul className="space-y-0">
                    {section.items.map((item, i) => (
                      <li key={i} className="border-t border-gray-100 py-5 group cursor-pointer flex items-center justify-between">
                        <span className="text-gray-600 group-hover:text-gray-900 transition-colors pr-8">{item}</span>
                        <svg className="w-5 h-5 text-gray-300 group-hover:text-primary-600 transform group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Sticky Video */}
          <div className="animate-on-scroll slide-right hidden lg:block sticky top-32">
            <div className="rounded-2xl overflow-hidden bg-gray-900 shadow-2xl aspect-[4/3] relative">
              <video
                className="w-full h-full object-cover opacity-80"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/figma2.mp4" type="video/mp4" />
              </video>
              {/* Overlay UI */}
              <div className="absolute inset-0 p-8 flex flex-col">
                <div className="w-full max-w-sm ml-auto bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 text-white">
                  <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                    <div className="w-4 h-4 rounded bg-primary-500" />
                    <span className="text-sm font-medium">Editor Tools</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {['Record', 'Trim', 'Export', 'Pause', 'Settings', 'Preview'].map((label) => (
                      <div key={label} className="aspect-square rounded border border-white/20 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="w-6 h-6 rounded-sm bg-white/20" />
                        <span className="text-[10px] text-white/60">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <h3 className="animate-on-scroll text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center tracking-tight">
            Got questions? We've got answers.
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`animate-on-scroll rounded-2xl border overflow-hidden transition-all duration-500 ${
                  openIndex === index
                    ? 'border-primary-200/60 bg-white shadow-lg shadow-primary-100/30'
                    : 'border-gray-200/60 bg-white/80 hover:bg-white hover:border-gray-200'
                }`}
                data-delay={String(Math.min(index * 0.1, 0.4))}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-5 sm:px-7 py-5 sm:py-6 text-left flex justify-between items-center gap-4"
                >
                  <span className={`font-semibold text-[0.9375rem] transition-colors ${
                    openIndex === index ? 'text-primary-900' : 'text-gray-800'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 ${
                    openIndex === index
                      ? 'bg-primary-500 text-white rotate-180'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="px-5 sm:px-7 pb-5 sm:pb-7 text-gray-500 leading-relaxed text-[0.9375rem]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
