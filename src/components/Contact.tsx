'use client'

import { useState, useEffect, useRef } from 'react'
import type { FormEvent } from 'react'
import { analytics } from '../lib/analytics'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await analytics.contactSubmit(formData.name, formData.email, formData.message)

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', message: '' })

    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 bg-[#0f0f0f] border-t border-gray-800">
      <div className="max-w-xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="animate-on-scroll text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight leading-snug">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="animate-on-scroll text-lg text-gray-400 leading-relaxed" data-delay="0.1">
            Questions, feedback, or feature requests? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Form */}
        <div className="animate-on-scroll bg-gray-900 rounded-2xl border border-gray-800 shadow-sm p-8" data-delay="0.2">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-primary-900/30 border border-primary-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-medium text-white">Message sent!</p>
              <p className="text-gray-400 mt-1 text-sm">We'll get back to you soon</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  title="Please enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-700 bg-gray-800 text-white focus:border-primary-400 focus:ring-2 focus:ring-primary-900 outline-none text-sm transition-all"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  title="Please enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-700 bg-gray-800 text-white focus:border-primary-400 focus:ring-2 focus:ring-primary-900 outline-none text-sm transition-all"
                />
              </div>
              <textarea
                placeholder="Your message"
                required
                title="Please enter your message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-700 bg-gray-800 text-white focus:border-primary-400 focus:ring-2 focus:ring-primary-900 outline-none resize-none text-sm transition-all"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
