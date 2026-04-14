import { AnimatedSection } from './AnimatedSection'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import {
  Code,
  CurrencyDollar,
  TrendUp,
  Rocket,
  Gear,
  Globe,
  Briefcase,
  CheckCircle,
} from '@phosphor-icons/react'

const specialtyCards = [
  {
    icon: CurrencyDollar,
    title: 'Redução De Custos',
    color: 'from-green-500 to-emerald-400',
    border: 'border-green-500/30',
    glow: 'hover:shadow-green-500/20',
    description: 'Desenvolvemos soluções tecnológicas que reduzem custos operacionais, eliminam desperdícios e aumentam a eficiência dos processos, garantindo maior rentabilidade para o seu negócio.',
  },
  {
    icon: TrendUp,
    title: 'Aumento De Produtividade',
    color: 'from-blue-500 to-cyan-400',
    border: 'border-blue-500/30',
    glow: 'hover:shadow-blue-500/20',
    description: 'Criamos sistemas que otimizam fluxos de trabalho, automatizam tarefas repetitivas e liberam sua equipe para focar no que realmente importa: gerar resultados e impulsionar a produtividade.',
  },
  {
    icon: Code,
    title: 'Desenvolvimento De Software',
    color: 'from-violet-500 to-purple-400',
    border: 'border-violet-500/30',
    glow: 'hover:shadow-violet-500/20',
    description: 'Transformamos ideias em softwares personalizados, escaláveis e seguros, projetados para atender às necessidades específicas de cada empresa e acelerar sua evolução digital.',
  },
  {
    icon: Rocket,
    title: 'Eficiência E Inovação',
    color: 'from-orange-500 to-amber-400',
    border: 'border-orange-500/30',
    glow: 'hover:shadow-orange-500/20',
    description: 'Aplicamos tecnologia de forma estratégica para conectar pessoas, processos e resultados, oferecendo soluções inovadoras que simplificam a gestão e geram crescimento sustentável.',
  },
  {
    icon: Gear,
    title: 'Integração De Sistemas',
    color: 'from-rose-500 to-pink-400',
    border: 'border-rose-500/30',
    glow: 'hover:shadow-rose-500/20',
    description: 'Somos especialistas em mensageiros, Webservices REST/SOAP e em desenvolvimento de soluções personalizadas para integração de diferentes sistemas independente da complexidade.',
  },
  {
    icon: Globe,
    title: 'Transformação Digital',
    color: 'from-sky-500 to-blue-400',
    border: 'border-sky-500/30',
    glow: 'hover:shadow-sky-500/20',
    description: 'Impulsionamos empresas na jornada da transformação digital, tornando processos mais ágeis, inteligentes e preparados para os desafios do futuro.',
  },
]

const consultingServices = [
  { label: 'Implantação', description: 'Desenvolvimento, implantação e hypercare de soluções customizadas.' },
  { label: 'Consultoria Sistemas Senior', description: 'Somos especialistas em soluções Senior ERP e HCM.' },
  { label: 'LSP®', description: 'Profissionais certificados Linguagem Senior de Programação®.' },
  { label: 'Suporte e Sustentação', description: 'Atendimento contínuo, SLA garantido 24/7.' },
]

export function TechStack() {
  return (
    <section id="tech" className="py-16 lg:py-20 relative overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent)_1px,transparent_1px)] bg-[length:32px_32px] opacity-[0.05]" />

      {/* Animated background orbs */}
      <motion.div
        className="absolute top-10 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-16 left-8 w-72 h-72 rounded-full bg-gradient-to-br from-accent/10 to-primary/10 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-56 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl pointer-events-none"
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -20, 20, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Somos Especialistas Em...
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Combinamos expertise técnica e visão de negócio para entregar soluções
            que geram resultados reais e duradouros para cada cliente.
          </p>
        </AnimatedSection>

        {/* Specialty Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {specialtyCards.map((card, i) => {
            const Icon = card.icon
            return (
              <AnimatedSection key={card.title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="h-full"
                >
                  <Card
                    className={`h-full p-5 border-2 ${card.border} bg-card/80 backdrop-blur-sm hover:shadow-xl ${card.glow} transition-shadow duration-300`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}>
                        <Icon size={22} weight="duotone" className="text-white" />
                      </div>
                      <h3 className="font-bold text-base">{card.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {card.description}
                    </p>
                  </Card>
                </motion.div>
              </AnimatedSection>
            )
          })}
        </div>

        {/* Consulting Card */}
        <AnimatedSection delay={0.5}>
          <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <Card className="border-2 border-accent/40 bg-gradient-to-br from-card/90 to-accent/5 backdrop-blur-sm hover:shadow-2xl hover:shadow-accent/20 transition-shadow duration-300 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
                  <Briefcase size={24} weight="duotone" className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Consultoria</h3>
                  <p className="text-xs text-muted-foreground">Serviços especializados em ERPs, transformação digital e desenvolvimento de soluções customizadas.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {consultingServices.map((service, i) => (
                  <motion.div
                    key={service.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 + i * 0.08 }}
                    className="flex flex-col gap-2 p-4 rounded-xl bg-card/70 border border-border hover:border-accent/50 hover:bg-accent/5 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle size={18} weight="duotone" className="text-accent shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-sm">{service.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
