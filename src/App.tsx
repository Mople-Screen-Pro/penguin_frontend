import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Demo from './components/Demo'
import HowItWorks from './components/HowItWorks'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Demo />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default App
