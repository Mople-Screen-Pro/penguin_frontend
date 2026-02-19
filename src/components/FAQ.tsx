import { useState } from 'react'
import { analytics } from '../lib/analytics'

const faqs = [
  {
    question: 'What makes Penguin different from other screen recorders?',
    answer: "Most screen recorders just capture your screen. Penguin goes further — it automatically follows your cursor and creates smooth, professional zoom effects in real time. No post-editing required. What used to take hours of manual work now happens instantly while you record.",
  },
  {
    question: 'How does the auto cursor zoom actually work?',
    answer: "Penguin tracks your mouse cursor during recording and intelligently creates smooth zoom transitions whenever your cursor moves to a new area. It highlights exactly what you're demonstrating — in real time, with zero manual intervention. You just record naturally, and Penguin handles the rest.",
  },
  {
    question: 'Which operating systems are supported?',
    answer: 'Penguin is currently available for macOS 15.0 (Sequoia) and later. A Windows version is actively in development and coming soon.',
  },
  {
    question: 'Can I adjust zoom levels after recording?',
    answer: "Absolutely. Penguin gives you full control in post-production too. Fine-tune zoom intensity, adjust timing, add new zoom points, or remove ones you don't need. The auto-zoom gets you 90% there — the editor lets you perfect the last 10%.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    if (openIndex !== index) {
      analytics.faqOpen(faqs[index].question)
    }
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-12 sm:py-20 bg-slate-50 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-600 text-sm font-medium mb-4 shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            FAQ
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Got questions?
            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent"> We've got answers</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Everything you need to know before getting started with Penguin.
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? 'border-sky-200 bg-white shadow-lg shadow-sky-100/50'
                  : 'border-slate-200 bg-white/80 hover:bg-white hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center gap-4"
              >
                <span className={`font-semibold transition-colors ${
                  openIndex === index ? 'text-sky-900' : 'text-slate-900'
                }`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-sky-500 text-white rotate-180'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="px-4 sm:px-6 pb-4 sm:pb-6 text-slate-600 leading-relaxed text-sm sm:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
