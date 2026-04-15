'use client'

import { useState } from 'react'
import { analytics } from '../lib/analytics'
import { useScrollReveal } from '../hooks/useScrollReveal'

const faqs = [
  {
    question: 'What is Clipa Editor and what makes it different?',
    answer: "Clipa Editor is an all-in-one screen recording app for macOS that covers recording, editing, and exporting in a single workflow. Most screen recorders stop at capture — leaving you to juggle separate tools for trimming, zooming, and exporting. Clipa handles it all in one place, so you go from screen to polished video in minutes with zero tool-switching.",
  },
  {
    question: 'Is my data safe? Does Clipa upload my recordings?',
    answer: "No. Everything — recording, editing, and exporting — happens entirely on your Mac. Your videos never leave your device unless you choose to share them. There are no cloud uploads, no remote processing, and no third-party access to your content.",
  },
  {
    question: 'How does Auto Cursor Zoom work?',
    answer: "Clipa automatically tracks your mouse movement and adds smooth zoom animations in real time. It highlights exactly where your cursor goes, so your tutorials and demos look professionally edited — without you placing a single keyframe. You can also fine-tune the zoom scale and position manually if needed.",
  },
  {
    question: 'Can I record my camera and system audio at the same time?',
    answer: "Yes. Clipa captures your screen, system audio, and microphone simultaneously. You can also add a camera overlay and position it in any of 9 preset spots on the screen — perfect for tutorials, product walkthroughs, or async team updates.",
  },
  {
    question: 'What is AI Upscale?',
    answer: "AI Upscale uses machine learning models to enhance your video resolution up to 4K. You can choose from multiple AI engines depending on your needs — whether you prioritize speed or visual quality. It all runs locally, so there's no upload or waiting on a server.",
  },
  {
    question: 'Which platforms and formats does Clipa support?',
    answer: "Clipa includes one-click presets for YouTube, TikTok, Instagram, and standard desktop formats. Just pick your target platform and Clipa handles the resolution, aspect ratio, and export settings automatically.",
  },
  {
    question: 'Does Clipa work on Windows?',
    answer: "Clipa is currently available for macOS 15.0 (Sequoia) and later. A Windows version is actively in development and coming soon.",
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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const sectionRef = useScrollReveal()

  const toggleFAQ = (index: number) => {
    if (openIndex !== index) {
      analytics.faqOpen(faqs[index].question)
    }
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" ref={sectionRef} className="section-glow ambient-purple py-[40px] md:py-[80px] px-6 bg-[#0C0C14]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-3xl mx-auto">
        <h3 className="animate-on-scroll text-3xl md:text-4xl font-bold text-white mb-12 text-center tracking-tight">
          Got questions? We've got answers.
        </h3>

        <div className="animate-on-scroll space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden transition-all duration-500 ${
                openIndex === index
                  ? 'glass-card-static !border-primary-400/20 shadow-lg shadow-primary-500/10'
                  : 'glass-card-static !border-white/10 hover:!border-white/15'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-5 sm:px-7 py-5 sm:py-6 text-left flex justify-between items-center gap-4"
              >
                <span className={`font-semibold text-[0.9375rem] transition-colors ${
                  openIndex === index ? 'text-primary-300' : 'text-white/80'
                }`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 ${
                  openIndex === index
                    ? 'bg-primary-500 text-white rotate-180'
                    : 'bg-white/10 text-white/60'
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
                <p className="px-5 sm:px-7 pb-5 sm:pb-7 text-white/60 leading-relaxed text-[0.9375rem]">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="animate-on-scroll mt-12 text-center">
          <p className="text-white/60 text-sm">
            Still have questions?{' '}
            <a
              href="mailto:jwjygpt0507@gmail.com"
              onClick={() => analytics.contactEmailClick()}
              className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
            >
              Send us an email &rarr;
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
