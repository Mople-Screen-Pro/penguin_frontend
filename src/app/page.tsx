import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import FeatureRecord from '../components/FeatureRecord'
import FeatureEdit from '../components/FeatureEdit'
import FeatureAutoZoom from '../components/FeatureAutoZoom'
import FeatureStyling from '../components/FeatureStyling'
import FeatureAIUpscale from '../components/FeatureAIUpscale'
import FeatureExport from '../components/FeatureExport'
import HowItWorks from '../components/HowItWorks'
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
        <FeatureRecord />
        <FeatureEdit />
        <FeatureAutoZoom />
        <FeatureStyling />
        <FeatureAIUpscale />
        <FeatureExport />
        <HowItWorks />
        <Testimonials />
        <CTA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
