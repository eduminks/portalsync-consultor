import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Rocket, Code, Terminal, BracketsCurly, GitBranch } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useEffect, useState, useRef } from 'react'

interface MatrixColumn {
  id: number
  x: number
  speed: number
  characters: string
  delay: number
}

interface BinaryParticle {
  id: number
  x: number
  y: number
  value: string
  delay: number
  duration: number
}

export function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  const [matrixColumns, setMatrixColumns] = useState<MatrixColumn[]>([])
  const [binaryParticles, setBinaryParticles] = useState<BinaryParticle[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const columns = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: (i / 25) * 100,
      speed: Math.random() * 3 + 2,
      characters: '{ } [ ] < > / \\ ; : = + - * # @ $ % & |',
      delay: Math.random() * 2,
    }))
    setMatrixColumns(columns)

    const particles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      value: Math.random() > 0.5 ? '0' : '1',
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }))
    setBinaryParticles(particles)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const chars = '01'
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(0)

    const draw = () => {
      ctx.fillStyle = 'rgba(var(--background), 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = 'var(--primary)'
      ctx.font = `${fontSize}px JetBrains Mono, monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx.fillStyle = i % 3 === 0 ? 'var(--accent)' : 'var(--primary)'
        ctx.globalAlpha = Math.random() * 0.5 + 0.3
        ctx.fillText(text, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
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
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--primary)_0%,transparent_50%)] opacity-20 blur-3xl" />
      
      {matrixColumns.map((column) => (
        <motion.div
          key={column.id}
          className="absolute top-0 font-mono text-xs text-primary/40 whitespace-pre"
          style={{
            left: `${column.x}%`,
          }}
          initial={{ y: -100 }}
          animate={{ y: '100vh' }}
          transition={{
            duration: column.speed,
            delay: column.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {column.characters.split('').map((char, i) => (
            <div key={i} className="leading-tight">
              {char}
            </div>
          ))}
        </motion.div>
      ))}
      
      {binaryParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute font-mono text-xl font-bold"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.1, 0.8, 0.1],
            scale: [0.8, 1.2, 0.8],
            color: ['var(--primary)', 'var(--accent)', 'var(--primary)'],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {particle.value}
        </motion.div>
      ))}
      
      <motion.div 
        className="absolute top-20 left-10 text-accent/40"
        animate={{ 
          rotate: 360,
          scale: [1, 1.3, 1],
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Code size={48} weight="duotone" />
      </motion.div>
      
      <motion.div 
        className="absolute top-40 right-16 text-primary/30"
        animate={{ 
          rotate: [0, 10, -10, 0],
          y: [0, -15, 0],
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Terminal size={56} weight="duotone" />
      </motion.div>

      <motion.div 
        className="absolute bottom-32 right-20 text-accent/25"
        animate={{ 
          rotate: -360,
          x: [0, 20, 0],
        }}
        transition={{ 
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <BracketsCurly size={64} weight="duotone" />
      </motion.div>

      <motion.div 
        className="absolute bottom-48 left-16 text-primary/20"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <GitBranch size={52} weight="duotone" />
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
