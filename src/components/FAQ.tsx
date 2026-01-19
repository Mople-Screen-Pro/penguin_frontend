import { useState } from 'react'

const faqs = [
  {
    question: 'Is Screen Pro free?',
    answer: 'Yes, Screen Pro is free to download and use. All core features including screen recording, auto zoom, zoom editing, and video export are available for free.',
  },
  {
    question: 'What operating systems are supported?',
    answer: 'Currently, we support macOS. A Windows version is planned for future release.',
  },
  {
    question: 'What is cursor-based auto zoom?',
    answer: 'It\'s a feature that tracks your mouse cursor movement during recording and automatically zooms in around the cursor area. This naturally highlights important parts when creating tutorials or demo videos.',
  },
  {
    question: 'Can I edit the zoom level after recording?',
    answer: 'Yes, you can freely adjust the zoom level using the zoom editing feature even after recording is complete. Make parts bigger or smaller as you need.',
  },
  {
    question: 'What video formats can I export to?',
    answer: 'You can save your videos in various formats including MP4, WebM, and more. Choose the appropriate format for your needs.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Got questions? We've got answers.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-gray-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="px-6 pb-5 text-gray-600 leading-relaxed">
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
