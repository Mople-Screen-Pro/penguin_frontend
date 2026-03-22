import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Recording from '../components/Recording'
import Editor from '../components/Editor'
import Export from '../components/Export'
import HowItWorks from '../components/HowItWorks'
import Demo from '../components/Demo'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Recording />
        <Editor />
        <Export />
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
