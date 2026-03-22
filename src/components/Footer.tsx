'use client'

import Link from 'next/link'

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Demo', href: '#demo' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Releases', href: '/releases' },
    { name: 'Blog', href: '/blog' },
  ],
  resources: [
    { name: 'Contact', href: '#contact' },
    { name: 'Email', href: 'mailto:jwjygpt0507@gmail.com' },
  ],
  company: [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Refund Policy', href: '/refund' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-white pt-48 pb-12 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16 mb-24">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 mb-5"
            >
              <img src="/logo.png" alt="Penguin" className="w-8 h-8 rounded-xl" />
              <span className="text-lg font-bold text-gray-900 tracking-tight">Penguin</span>
            </button>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Record, edit, and export polished screen recordings — all in one app.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-emerald-500 font-medium">Available Now</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Product</h4>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Resources</h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Penguin. All rights reserved.
          </p>
          <div className="flex items-center gap-x-2 gap-y-1 text-sm">
            <Link href="/terms" className="text-gray-500 hover:text-gray-900 transition-colors">
              Terms
            </Link>
            <span className="text-gray-300">&middot;</span>
            <Link href="/privacy" className="text-gray-500 hover:text-gray-900 transition-colors">
              Privacy
            </Link>
            <span className="text-gray-300">&middot;</span>
            <Link href="/refund" className="text-gray-500 hover:text-gray-900 transition-colors">
              Refund
            </Link>
          </div>
        </div>
      </div>

      {/* Background Logo Mark */}
      <div className="absolute -bottom-20 -right-20 md:-bottom-40 md:-right-40 text-primary-600 opacity-[0.07] pointer-events-none z-0">
        <svg width="800" height="800" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      </div>
    </footer>
  )
}
