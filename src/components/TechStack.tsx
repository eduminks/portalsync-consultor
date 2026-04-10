import { AnimatedSection } from './AnimatedSection'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Code,
  Database,
  Cloud,
  GitBranch,
  Plugs,
  Briefcase,
  CheckCircle,
  Cpu,
} from '@phosphor-icons/react'

const stackCards = [
  {
    icon: Code,
    title: 'Frontend',
    color: 'from-blue-500 to-cyan-400',
    border: 'border-blue-500/30',
    glow: 'hover:shadow-blue-500/20',
    items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Next.js'],
  },
  {
    icon: Cpu,
    title: 'Backend',
    color: 'from-violet-500 to-purple-400',
    border: 'border-violet-500/30',
    glow: 'hover:shadow-violet-500/20',
    items: ['Node.js', 'Python', 'Java', 'Microservices', 'CI/CD'],
  },
  {
    icon: Database,
    title: 'Banco de Dados',
    color: 'from-orange-500 to-amber-400',
    border: 'border-orange-500/30',
    glow: 'hover:shadow-orange-500/20',
    items: ['Oracle', 'SQL Server', 'PostgreSQL', 'MongoDB'],
  },
  {
    icon: Plugs,
    title: 'APIs & Integrações',
    color: 'from-green-500 to-emerald-400',
    border: 'border-green-500/30',
    glow: 'hover:shadow-green-500/20',
    items: ['REST APIs', 'SOAP APIs', 'GraphQL', 'Webhooks', 'EDI'],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    color: 'from-sky-500 to-blue-400',
    border: 'border-sky-500/30',
    glow: 'hover:shadow-sky-500/20',
    items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Git'],
  },
  {
    icon: GitBranch,
    title: 'Sistemas & Plataformas',
    color: 'from-rose-500 to-pink-400',
    border: 'border-rose-500/30',
    glow: 'hover:shadow-rose-500/20',
    items: ['Senior ERP', 'Senior HCM', 'RD Station CRM', 'Plataforma GoCli'],
  },
]

const consultingServices = [
  { label: 'Implantação', description: 'Desenvolvimento, implantação e hypercare de soluções customizadas.' },
  { label: 'Consultoria Sistemas Senior', description: 'Somos especialistas em soluções Senior ERP e HCM.' },
  { label: 'LSP', description: 'Profissionais certificados Linguagem Senior de Programação®.' },
  { label: 'Suporte e Sustentação', description: 'Atendimento contínuo, SLA garantido 24/7.' },
]

export function TechStack() {
  return (
    <section id="tech" className="py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent)_1px,transparent_1px)] bg-[length:32px_32px] opacity-[0.05]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <AnimatedSection className="text-center mb-12">
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

        {/* Stack Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {stackCards.map((card, i) => {
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
                    <div className="flex flex-wrap gap-2">
                      {card.items.map((item) => (
                        <Badge
                          key={item}
                          variant="secondary"
                          className="text-xs font-medium px-2.5 py-1 bg-muted/60 hover:bg-accent/20 hover:text-accent transition-colors cursor-default"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
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
