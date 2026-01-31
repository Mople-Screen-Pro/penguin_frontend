import { useState, useEffect } from 'react'
import { analytics } from '../lib/analytics'

const DOWNLOAD_URL = 'https://grkyrqhgfgthpghircbu.supabase.co/functions/v1/download'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'FAQ', href: '#faq' },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-slate-200/50 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="Screen Pro" className="w-9 h-9 rounded-xl shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow" />
            <span className="text-xl font-bold text-slate-900">Screen Pro</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => analytics.navClick(link.name)}
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <a
              href={DOWNLOAD_URL}
              onClick={() => analytics.downloadClick('header')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
            >
              Download
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href={DOWNLOAD_URL}
                onClick={() => {
                  setMobileMenuOpen(false)
                  analytics.downloadClick('mobile_menu')
                }}
                className="mx-4 mt-2 px-5 py-3 text-sm font-semibold text-white text-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-violet-500/25"
              >
                Download
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
