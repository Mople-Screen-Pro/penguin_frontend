import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ScrollToTop from './components/ScrollToTop'
import SEO from './components/SEO'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Demo from './components/Demo'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import RefundPage from './pages/RefundPage'
import MyPage from './pages/MyPage'
import AuthCallbackPage from './pages/AuthCallbackPage'
import PricingPage from './pages/PricingPage'
import LoginPage from './pages/LoginPage'
import AppRedirectPage from './pages/AppRedirectPage'
import NotFoundPage from './pages/NotFoundPage'

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        path="/"
        description="Penguin auto-zooms to your cursor in real time — making every tutorial look professionally edited. Half the price, zero effort. Download free for macOS."
        ogTitle="Penguin - Screen Recording, Reimagined."
        ogDescription="Auto-zooms to your cursor in real time. Pro-quality tutorials with zero editing. Free for macOS."
      />
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Demo />
        <Testimonials />
        <CTA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/refund" element={<RefundPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/app/auth-callback" element={<AppRedirectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
