import { Sparkle, Users, Lightning } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { AnimatedSection } from './AnimatedSection'
import { motion } from 'framer-motion'
import { useState } from 'react'

const features = [
  {
    icon: Lightning,
    title: 'Inovação Constante',
    description: 'Sempre atualizados com as últimas tecnologias e práticas do mercado.',
  },
  {
    icon: Users,
    title: 'Time Especializado',
    description: 'Profissionais experientes e certificados nas principais tecnologias.',
  },
  {
    icon: Sparkle,
    title: 'Resultados Comprovados',
    description: 'Histórico de projetos bem-sucedidos e clientes satisfeitos.',
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="p-6 border-2 hover:border-primary/50 transition-all relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="flex items-start gap-4 relative">
          <motion.div 
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0"
            animate={{
              rotate: isHovered ? 360 : 0,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <feature.icon className="text-white" size={24} weight="duotone" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">
              {feature.description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export function About() {
  return (
    <section id="about" className="py-12 lg:py-16 bg-muted/30 relative overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [-50, 0, -50],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xs font-mono uppercase tracking-wider text-primary">
                Sobre Nós
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Parceiros em Transformação Digital
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                A <span className="text-foreground font-semibold">PortalSync</span> é uma
                empresa especializada em consultoria e desenvolvimento de sistemas,
                com foco em soluções que realmente transformam negócios.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Nossa expertise abrange desde o desenvolvimento de software
                personalizado até a integração complexa de sistemas empresariais,
                ERPs e plataformas de automação comercial.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Nossa equipe é formada por especialistas apaixonados por inovação, 
                que unem conhecimento técnico e visão estratégica para criar soluções que 
                atendem às necessidades únicas de cada cliente.
              </motion.p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FeatureCard feature={feature} index={index} />
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
