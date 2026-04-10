import { Code, Database, GitBranch, ChartBar } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { AnimatedSection } from './AnimatedSection'
import { motion } from 'framer-motion'
import { useState } from 'react'

const services = [
  {
    icon: Code,
    title: 'Desenvolvimento de Software',
    description:
      'Criamos aplicações web modernas e escaláveis, utilizando as melhores tecnologias do mercado para transformar sua visão em realidade digital.',
  },
  {
    icon: Database,
    title: 'Consultoria em ERPs',
    description:
      'Especialistas em sistemas de gestão empresarial, oferecemos consultoria completa para implementação, customização e otimização de ERPs.',
  },
  {
    icon: GitBranch,
    title: 'Integrações de Sistemas',
    description:
      'Conectamos seus sistemas e plataformas, automatizando processos e garantindo fluxo de dados eficiente entre diferentes aplicações.',
  },
  {
    icon: ChartBar,
    title: 'Automação Comercial',
    description:
      'Soluções completas para gestão comercial, desde PDV até controle de estoque, otimizando suas operações e aumentando produtividade.',
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <AnimatedSection delay={index * 0.1}>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className="p-8 h-full border-2 hover:border-primary/50 cursor-pointer bg-card/50 backdrop-blur-sm relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div
            className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"
            animate={{
              scale: isHovered ? 1.5 : 1,
              opacity: isHovered ? 0.3 : 0,
            }}
            transition={{ duration: 0.4 }}
          />
          
          <div className="mb-6 relative">
            <motion.div 
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
              animate={{
                rotate: isHovered ? [0, -10, 10, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <service.icon className="text-white" size={32} weight="duotone" />
            </motion.div>
            <motion.div 
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent/30 blur-lg"
              animate={{
                scale: isHovered ? 2 : 1,
                opacity: isHovered ? 0.5 : 0.3,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <motion.h3 
            className="text-xl font-bold mb-3 relative"
            animate={{ color: isHovered ? 'hsl(var(--primary))' : 'hsl(var(--foreground))' }}
            transition={{ duration: 0.2 }}
          >
            {service.title}
          </motion.h3>
          
          <p className="text-muted-foreground leading-relaxed relative">
            {service.description}
          </p>
        </Card>
      </motion.div>
    </AnimatedSection>
  )
}

export function Services() {
  return (
    <section id="services" className="py-16 lg:py-20 bg-muted/30 relative overflow-hidden">
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-accent/10 to-primary/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <AnimatedSection className="text-center mb-12">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-primary">
              Nossas Especialidades
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Serviços que Impulsionam seu Negócio
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Oferecemos soluções completas em tecnologia, focadas em resultados
            e inovação para empresas de todos os portes.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
