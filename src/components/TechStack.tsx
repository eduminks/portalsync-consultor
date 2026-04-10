import { Badge } from '@/components/ui/badge'
import { AnimatedSection } from './AnimatedSection'
import { motion } from 'framer-motion'
import { useState } from 'react'

const technologies = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'Java',
  'PostgreSQL',
  'MongoDB',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'REST APIs',
  'GraphQL',
  'Microservices',
  'Git',
  'CI/CD',
]

export function TechStack() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  return (
    <section id="tech" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent)_1px,transparent_1px)] bg-[length:32px_32px] opacity-[0.05]" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-accent">
              Stack Tecnológico
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tecnologias de Ponta
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trabalhamos com as ferramentas mais modernas e robustas do mercado
            para garantir soluções de alta qualidade e performance.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.1, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Badge
                  variant="outline"
                  className="text-base px-5 py-2.5 font-medium border-2 hover:border-accent hover:bg-accent/10 cursor-default relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20"
                    initial={{ x: '-100%' }}
                    animate={{ x: hoveredIndex === index ? '100%' : '-100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative">{tech}</span>
                </Badge>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
