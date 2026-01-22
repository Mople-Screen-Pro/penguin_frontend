import { useState } from 'react'

const faqs = [
  {
    question: 'Which operating systems are supported?',
    answer: 'Screen Pro is currently available for macOS 15.0 (Sequoia) and later. We are actively working on a Windows version, which will be released in the near future.',
  },
  {
    question: 'How does the auto cursor zoom work?',
    answer: "Screen Pro intelligently tracks your mouse cursor movements during recording. When your cursor moves to a new area, the app automatically creates a smooth zoom transition to that region, highlighting exactly what you're working on. This happens in real-time and requires no manual intervention.",
  },
  {
    question: 'Can I adjust zoom levels after recording?',
    answer: "Absolutely! Our zoom editing feature allows you to fine-tune every zoom point after recording. You can adjust the zoom intensity, change timing, add new zoom points, or remove unwanted ones. You have complete control over the final result.",
  },
  {
    question: 'What video formats can I export to?',
    answer: 'Screen Pro supports exporting to popular formats including MP4 (H.264), WebM, and MOV. You can choose the resolution and quality settings that best fit your needs, whether for web sharing, presentations, or high-quality archives.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No account required! Simply download Screen Pro and start recording immediately. We respect your privacy and keep things simple.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            FAQ
          </div>
          <h2 className="heading-lg font-bold text-slate-900 mb-4">
            Frequently asked
            <span className="gradient-text"> questions</span>
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about Screen Pro.
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 ${
                openIndex === index
                  ? 'border-sky-200 bg-sky-50/50 shadow-lg shadow-sky-100/50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center gap-4"
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
                <p className="px-6 pb-6 text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-slate-600 mb-4">
            Can't find the answer you're looking for? We're here to help.
          </p>
          <a
            href="mailto:jwjygpt0507@gmail.com"
            className="inline-flex items-center gap-2 text-sky-600 font-medium hover:text-sky-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Support
          </a>
        </div>
      </div>
    </section>
  )
}
