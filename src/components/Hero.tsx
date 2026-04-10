import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Rocket, Code, Cpu, Lightning, CloudArrowUp } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

interface FloatingIcon {
  id: number
  Icon: typeof Code
  x: number
  y: number
  delay: number
  duration: number
}

export function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([])

  useEffect(() => {
    const icons = [Code, Cpu, Lightning, CloudArrowUp, Rocket]
    const floating = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      Icon: icons[i % icons.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 5 + 8,
    }))
    setFloatingIcons(floating)
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
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[100vh] min-w-[177.77vh] min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          src="https://www.youtube.com/embed/hrs0_uY6pzk?autoplay=1&mute=1&loop=1&playlist=hrs0_uY6pzk&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
          title="Background Video"
          allow="autoplay; encrypted-media"
          style={{ border: 'none' }}
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/40 to-background/60 backdrop-blur-[2px]" />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.15)_0%,transparent_50%)]" />
      
      {floatingIcons.map((item) => {
        const IconComponent = item.Icon
        return (
          <motion.div
            key={item.id}
            className="absolute text-primary/20"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <IconComponent size={64} weight="duotone" />
          </motion.div>
        )
      })}

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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6"
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
            className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto"
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
                className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/50 transition-all"
              >
                Fale Conosco
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
                className="text-lg px-8 py-6 rounded-full border-2 hover:bg-primary/10 hover:border-primary transition-all"
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
