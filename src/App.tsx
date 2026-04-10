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
import { SectionDivider } from '@/components/SectionDivider'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <TechStack />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  )
}

export default App
