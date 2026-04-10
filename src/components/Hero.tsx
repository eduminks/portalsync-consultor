import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Rocket, Sparkle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

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
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_40%,var(--primary)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,var(--accent)_0%,transparent_50%)] blur-3xl" />
      <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_50px,var(--primary)_50px,var(--primary)_51px),repeating-linear-gradient(0deg,transparent_0px,transparent_50px,var(--accent)_50px,var(--accent)_51px)]" />
      
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-primary/30 to-accent/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 5,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      <motion.div 
        className="absolute top-20 left-10 text-accent/30"
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Sparkle size={40} weight="duotone" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-32 right-20 text-primary/20"
        animate={{ 
          rotate: -360,
          y: [0, -20, 0],
        }}
        transition={{ 
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Sparkle size={60} weight="duotone" />
      </motion.div>

      <motion.div 
        className="container mx-auto px-6 lg:px-12 relative z-10"
        style={{ y, opacity }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Rocket className="text-primary" weight="duotone" />
              <span className="text-sm font-mono uppercase tracking-wider text-primary">
                Tecnologia & Inovação
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            Transformando Ideias em{' '}
            <motion.span 
              className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto]"
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              Soluções Digitais
            </motion.span>
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={scrollToContact}
                className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/50 transition-all relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-accent to-primary"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                  style={{ opacity: 0.3 }}
                />
                <span className="relative">Fale Conosco</span>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const element = document.getElementById('services')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-lg px-8 py-6 rounded-full border-2 hover:bg-accent/10 relative overflow-hidden group"
              >
                Conheça Nossos Serviços
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown
                className="mx-auto text-muted-foreground"
                size={32}
                weight="bold"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
