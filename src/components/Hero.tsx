import { motion } from 'framer-motion'
import { ArrowDown, Rocket } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

export function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `repeating-radial-gradient(circle at 20% 50%, transparent 0, oklch(0.45 0.19 252 / 0.05) 2px, transparent 4px, transparent 100px),
                           repeating-radial-gradient(circle at 80% 50%, transparent 0, oklch(0.75 0.15 195 / 0.05) 2px, transparent 4px, transparent 100px)`
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Rocket className="text-primary" weight="duotone" />
              <span className="text-sm font-mono uppercase tracking-wider text-primary">
                Tecnologia & Inovação
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            Transformando Ideias em{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Soluções Digitais
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed"
          >
            Especialistas em desenvolvimento de software, integrações de sistemas,
            ERPs e automação comercial. Levamos sua empresa para o próximo nível.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={scrollToContact}
              className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/50 transition-all hover:scale-105"
            >
              Fale Conosco
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.getElementById('services')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-lg px-8 py-6 rounded-full border-2 hover:bg-accent/10"
            >
              Conheça Nossos Serviços
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-20"
          >
            <ArrowDown
              className="mx-auto text-muted-foreground animate-bounce"
              size={32}
              weight="bold"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
