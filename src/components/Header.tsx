import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { analytics } from "../lib/analytics";
import { useAuth } from "../contexts/AuthContext";

const DOWNLOAD_URL =
  "https://grkyrqhgfgthpghircbu.supabase.co/functions/v1/download";

export default function Header() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || '';
  const avatar = user?.user_metadata?.avatar_url || null;

  const handleLogout = async () => {
    setDropdownOpen(false);
    await signOut();
    navigate('/');
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
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  const navLinks = [
    { name: "Features", sectionId: "features" },
    { name: "How It Works", sectionId: "how-it-works" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        !isHome || scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (isHome) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/");
              }
            }}
            className="flex items-center gap-2 group"
          >
            <img
              src="/logo.png"
              alt="Penguin"
              className="w-9 h-9 rounded-xl shadow-lg shadow-sky-500/25 group-hover:shadow-sky-500/40 transition-shadow"
            />
            <span className="text-xl font-bold text-slate-900">Penguin</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.sectionId ? (
                <button
                  key={link.name}
                  onClick={() => {
                    handleSectionClick(link.sectionId);
                    analytics.navClick(link.name);
                  }}
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300" />
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.href!}
                  onClick={() => analytics.navClick(link.name)}
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300" />
                </Link>
              )
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            {!loading && (
              <>
                {user ? (
                  // 로그인된 상태
                  <div className="hidden sm:block relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all"
                    >
                      {avatar ? (
                        <img src={avatar} alt="" className="w-8 h-8 rounded-full" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                          {(user.email?.charAt(0) || "U").toUpperCase()}
                        </div>
                      )}
                      <span className="text-sm font-medium text-slate-700">
                        {displayName}
                      </span>
                      <svg className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl border border-slate-200 shadow-lg z-50 overflow-hidden">
                          <Link
                            to="/mypage"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            My Page
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors w-full border-t border-slate-100"
                          >
                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign Out
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  // 로그인되지 않은 상태
                  <Link
                    to="/login"
                    className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300"
                  >
                    Sign in
                  </Link>
                )}
              </>
            )}
            <a
              href={DOWNLOAD_URL}
              onClick={() => analytics.downloadClick("header")}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40"
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) =>
                link.sectionId ? (
                  <button
                    key={link.name}
                    onClick={() => {
                      handleSectionClick(link.sectionId);
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-3 text-left text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg font-medium transition-colors"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href!}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                )
              )}
              {user ? (
                <>
                  <Link
                    to="/mypage"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg font-medium transition-colors"
                  >
                    My Page
                  </Link>
                  <button
                    onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                    className="px-4 py-3 text-left text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mx-4 mt-2 px-5 py-3 text-sm font-semibold text-slate-700 text-center rounded-xl border-2 border-slate-200"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

    </header>
  );
}
