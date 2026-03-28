'use client'

import { useState, useEffect, useRef } from 'react'
import { analytics } from '../lib/analytics'

const faqs = [
  {
    question: 'What is Penguin Editor and what makes it different?',
    answer: "Penguin Editor is an all-in-one screen recording app for macOS that covers recording, editing, and exporting in a single workflow. Most screen recorders stop at capture — leaving you to juggle separate tools for trimming, zooming, and exporting. Penguin handles it all in one place, so you go from screen to polished video in minutes with zero tool-switching.",
  },
  {
    question: 'Is my data safe? Does Penguin upload my recordings?',
    answer: "No. Everything — recording, editing, and exporting — happens entirely on your Mac. Your videos never leave your device unless you choose to share them. There are no cloud uploads, no remote processing, and no third-party access to your content.",
  },
  {
    question: 'How does Auto Cursor Zoom work?',
    answer: "Penguin automatically tracks your mouse movement and adds smooth zoom animations in real time. It highlights exactly where your cursor goes, so your tutorials and demos look professionally edited — without you placing a single keyframe. You can also fine-tune the zoom scale and position manually if needed.",
  },
  {
    question: 'Can I record my camera and system audio at the same time?',
    answer: "Yes. Penguin captures your screen, system audio, and microphone simultaneously. You can also add a camera overlay and position it in any of 9 preset spots on the screen — perfect for tutorials, product walkthroughs, or async team updates.",
  },
  {
    question: 'What is AI Upscale?',
    answer: "AI Upscale uses machine learning models to enhance your video resolution up to 4K. You can choose from multiple AI engines depending on your needs — whether you prioritize speed or visual quality. It all runs locally, so there's no upload or waiting on a server.",
  },
  {
    question: 'Which platforms and formats does Penguin support?',
    answer: "Penguin includes one-click presets for YouTube, TikTok, Instagram, and standard desktop formats. Just pick your target platform and Penguin handles the resolution, aspect ratio, and export settings automatically.",
  },
  {
    question: 'Does Penguin work on Windows?',
    answer: "Penguin is currently available for macOS 15.0 (Sequoia) and later. A Windows version is actively in development and coming soon.",
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

const miniFeatures = [
  { title: 'Presets for Every Platform', description: 'YouTube, TikTok, desktop — one click to match any format.', video: '/features/preset.mp4' },
  { title: 'Custom Zoom', description: 'Adjust zoom scale and position exactly where you want.', video: '/features/zoom.mp4' },
  { title: 'History Management', description: 'Go back to any previous state whenever you need.', video: '/features/history.mp4' },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  const toggleVideo = (i: number) => {
    if (playingVideo !== null && playingVideo !== i) {
      const prev = videoRefs.current[playingVideo]
      if (prev) { prev.pause(); prev.currentTime = 0 }
    }
    const video = videoRefs.current[i]
    if (!video) return
    if (playingVideo === i) {
      video.pause()
      video.currentTime = 0
      setPlayingVideo(null)
    } else {
      video.currentTime = 0
      video.play().catch(() => {})
      setPlayingVideo(i)
      video.onended = () => setPlayingVideo(null)
    }
  }

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
    <section id="faq" ref={sectionRef} className="py-24 px-6 bg-[#0a0a0a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-7xl mx-auto">
        {/* There is more */}
        <h2 className="animate-on-scroll text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
          Beyond the basics
        </h2>
        <p className="animate-on-scroll text-lg text-gray-400 mb-16 max-w-xl">
          Simple tools that quietly make your recordings better.
        </p>

        {/* Horizontal scroll cards */}
        <div className="flex gap-6 overflow-x-auto pb-4 mb-32 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {miniFeatures.map((feature, i) => (
            <div
              key={feature.title}
              className={`animate-on-scroll shrink-0 ${i === 0 ? 'w-[500px]' : 'w-[340px]'} rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
              data-delay={String(Math.min(i * 0.06, 0.4))}
              onClick={() => toggleVideo(i)}
            >
              <div className={`${i === 0 ? 'aspect-[5/4]' : 'aspect-[3/4]'} bg-gray-900 relative rounded-2xl overflow-hidden`}>
                <video
                  ref={(el) => { videoRefs.current[i] = el }}
                  className={`w-full h-full object-cover transition-all duration-300 ${playingVideo === i ? 'contrast-110 brightness-105 saturate-110' : ''}`}
                  muted
                  playsInline
                >
                  <source src={feature.video} type="video/mp4" />
                </video>
                <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${playingVideo === i ? 'opacity-0' : 'opacity-100'}`} />
                <div className={`absolute top-5 left-5 transition-opacity duration-300 ${playingVideo === i ? 'opacity-0' : 'opacity-100'}`}>
                  <h4 className="text-3xl font-bold text-white mb-1">{feature.title}</h4>
                  <p className="text-[13px] text-white/70 leading-relaxed">{feature.description}</p>
                </div>
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playingVideo === i ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <h3 className="animate-on-scroll text-3xl md:text-4xl font-bold text-white mb-12 text-center tracking-tight">
            Got questions? We've got answers.
          </h3>

          <div className="animate-on-scroll space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-2xl border overflow-hidden transition-[border-color,background-color,box-shadow] duration-500 ${
                  openIndex === index
                    ? 'border-primary-800/60 bg-gray-900 shadow-lg shadow-primary-900/30'
                    : 'border-gray-700/60 bg-gray-900/80 hover:bg-gray-900 hover:border-gray-700'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-5 sm:px-7 py-5 sm:py-6 text-left flex justify-between items-center gap-4"
                >
                  <span className={`font-semibold text-[0.9375rem] transition-colors ${
                    openIndex === index ? 'text-primary-300' : 'text-gray-200'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 ${
                    openIndex === index
                      ? 'bg-primary-500 text-white rotate-180'
                      : 'bg-gray-800 text-gray-400'
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
                  <p className="px-5 sm:px-7 pb-5 sm:pb-7 text-gray-400 leading-relaxed text-[0.9375rem]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions? */}
          <div className="animate-on-scroll mt-12 text-center">
            <p className="text-gray-400 text-sm">
              Still have questions?{' '}
              <a
                href="mailto:jwjygpt0507@gmail.com"
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
              >
                Send us an email &rarr;
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
