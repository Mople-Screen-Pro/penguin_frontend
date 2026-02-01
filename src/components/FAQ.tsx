import { useState } from 'react'
import { analytics } from '../lib/analytics'

const faqs = [
  {
    question: 'What makes Screen Pro different?',
    answer: "Screen Pro's auto cursor zoom feature automatically follows your mouse and creates professional zoom effects in real-time. Unlike other screen recorders, you don't need to manually edit zoom points - it just works. This saves hours of post-production time.",
  },
  {
    question: 'How does the auto cursor zoom work?',
    answer: "Screen Pro intelligently tracks your mouse cursor movements during recording. When your cursor moves to a new area, the app automatically creates a smooth zoom transition to that region, highlighting exactly what you're demonstrating. This happens in real-time and requires no manual intervention.",
  },
  {
    question: 'Which operating systems are supported?',
    answer: 'Screen Pro is currently available for macOS 15.0 (Sequoia) and later. We are actively working on a Windows version, which will be released in the near future.',
  },
  {
    question: 'Can I adjust zoom levels after recording?',
    answer: "Absolutely! Our zoom editing feature allows you to fine-tune every zoom point after recording. You can adjust the zoom intensity, change timing, add new zoom points, or remove unwanted ones. You have complete control over the final result.",
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
    <section id="faq" className="py-20 bg-slate-50 relative">
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
            Questions?
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> We've got answers</span>
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about Screen Pro.
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? 'border-violet-200 bg-white shadow-lg shadow-violet-100/50'
                  : 'border-slate-200 bg-white/80 hover:bg-white hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center gap-4"
              >
                <span className={`font-semibold transition-colors ${
                  openIndex === index ? 'text-violet-900' : 'text-slate-900'
                }`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-violet-500 text-white rotate-180'
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
                <p className="px-6 pb-6 text-slate-600 leading-relaxed">
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
