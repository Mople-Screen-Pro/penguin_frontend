import dynamic from 'next/dynamic'
import Header from '../components/Header'
import Hero from '../components/Hero'

const Features = dynamic(() => import('../components/Features'))
const FeatureRecord = dynamic(() => import('../components/FeatureRecord'))
const FeatureEdit = dynamic(() => import('../components/FeatureEdit'))
const FeatureStyling = dynamic(() => import('../components/FeatureStyling'))
const FeatureAIUpscale = dynamic(() => import('../components/FeatureAIUpscale'))
const BeyondBasics = dynamic(() => import('../components/BeyondBasics'))
const FAQ = dynamic(() => import('../components/FAQ'))
const Footer = dynamic(() => import('../components/Footer'))

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content">
        <Hero />
        <Features />
        <FeatureRecord />
        <FeatureEdit />
        <FeatureStyling />
        <FeatureAIUpscale />
        <BeyondBasics />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
