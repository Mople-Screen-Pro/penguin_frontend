'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { analytics } from "../lib/analytics";
import { useAuth } from "../contexts/AuthContext";

const DOWNLOAD_URL =
  "https://grkyrqhgfgthpghircbu.supabase.co/functions/v1/download";

export default function Header() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || '';

  const handleLogout = async () => {
    setDropdownOpen(false);
    await signOut();
    router.push('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    if (isHome) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const navLinks = [
    { name: "Features", sectionId: "features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "Releases", href: "/releases" },
  ];

  return (
    <>
      {/* Top Banner */}
      <a
        href={DOWNLOAD_URL}
        onClick={() => analytics.downloadClick("header")}
        rel="noopener"
        className="block bg-primary-600 text-white text-sm py-2.5 px-4 text-center hover:bg-primary-700 transition-colors cursor-pointer"
      >
        <span className="flex items-center justify-center gap-2 font-medium">
          <span className="hidden sm:inline">Record, edit, and export pro-quality videos in minutes</span>
          <span className="sm:hidden">Pro-quality videos in minutes</span>
          <span className="opacity-80">— Try it free</span>
          <svg className="w-4 h-4 ml-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </a>

      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 w-full bg-[#0a0a0a] transition-all duration-300 ${
          scrolled ? "border-b border-gray-800 shadow-sm" : "border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-12">
            {/* Logo */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (isHome) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  router.push("/");
                }
              }}
              className="flex items-center gap-2.5 text-2xl font-bold tracking-tighter text-primary-600"
            >
              <img
                src="/logo.png"
                alt="Penguin"
                className="w-8 h-8 rounded-xl"
              />
              Penguin
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 text-[16px] font-medium text-gray-300">
              {navLinks.map((link) =>
                link.sectionId ? (
                  <button
                    key={link.name}
                    onClick={() => {
                      handleSectionClick(link.sectionId);
                      analytics.navClick(link.name);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href!}
                    onClick={() => analytics.navClick(link.name)}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 text-[16px] font-medium text-gray-300 hover:text-white transition-colors"
                    >
                      {displayName}
                      <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                        <div className="absolute right-0 mt-3 w-48 bg-[#0a0a0a] rounded-xl border border-gray-800 shadow-xl z-50 overflow-hidden p-1">
                          <Link
                            href="/mypage"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-400 hover:bg-gray-800 rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            My Page
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-400 hover:bg-gray-800 rounded-lg transition-colors w-full"
                          >
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign Out
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="text-[16px] font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Sign in
                  </Link>
                )}
              </>
            )}
            <a
              href={DOWNLOAD_URL}
              onClick={() => analytics.downloadClick("header")}
              rel="noopener"
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-200 text-[16px]"
            >
              Download for Mac
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-400"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0a0a0a] border-b border-gray-800 overflow-hidden">
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) =>
                link.sectionId ? (
                  <button
                    key={link.name}
                    onClick={() => {
                      handleSectionClick(link.sectionId);
                      setMobileMenuOpen(false);
                    }}
                    className="text-lg font-medium text-gray-200 py-2 border-b border-gray-800 text-left"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href!}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-gray-200 py-2 border-b border-gray-800"
                  >
                    {link.name}
                  </Link>
                )
              )}
              {user ? (
                <>
                  <Link
                    href="/mypage"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-gray-200 py-2 border-b border-gray-800"
                  >
                    My Page
                  </Link>
                  <button
                    onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                    className="text-lg font-medium text-gray-200 py-2 border-b border-gray-800 text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-4">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 text-center font-medium text-gray-200 border border-gray-800 rounded-lg"
                  >
                    Sign in
                  </Link>
                  <a
                    href={DOWNLOAD_URL}
                    className="w-full py-3 text-center font-medium text-white bg-primary-600 rounded-lg"
                  >
                    Download for Mac
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
