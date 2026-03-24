import dynamic from 'next/dynamic'
import Header from '../components/Header'
import Hero from '../components/Hero'

const Features = dynamic(() => import('../components/Features'))
const FeatureRecord = dynamic(() => import('../components/FeatureRecord'))
const FeatureEdit = dynamic(() => import('../components/FeatureEdit'))
const FeatureStyling = dynamic(() => import('../components/FeatureStyling'))
const FeatureAIUpscale = dynamic(() => import('../components/FeatureAIUpscale'))
const FeatureExport = dynamic(() => import('../components/FeatureExport'))
const HowItWorks = dynamic(() => import('../components/HowItWorks'))
const Testimonials = dynamic(() => import('../components/Testimonials'))
const CTA = dynamic(() => import('../components/CTA'))
const FAQ = dynamic(() => import('../components/FAQ'))
const Contact = dynamic(() => import('../components/Contact'))
const Footer = dynamic(() => import('../components/Footer'))

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <FeatureRecord />
        <FeatureEdit />
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
