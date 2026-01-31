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

function App() {
  return (
    <div className="min-h-screen bg-white">
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

export default App
