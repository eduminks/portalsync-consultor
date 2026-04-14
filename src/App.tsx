import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from '@/components/ui/sonner'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { TechStack } from '@/components/TechStack'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { ScrollProgress } from '@/components/ScrollProgress'
import { ScrollToTop } from '@/components/ScrollToTop'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { SectionDivider } from '@/components/SectionDivider'
import { LoadingScreen } from '@/components/LoadingScreen'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      
      <div className="min-h-screen bg-background text-foreground">
        <ScrollProgress />
        <Header />
        <main>
          <Hero />
          <Services />
          <TechStack />
          <About />
          <SectionDivider />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
        <WhatsAppButton />
        <Toaster />
      </div>
    </>
  )
}

export default App
