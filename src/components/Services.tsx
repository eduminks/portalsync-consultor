import { Code, Database, GitBranch, ChartBar } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { AnimatedSection } from './AnimatedSection'

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

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-primary">
              Nossas Especialidades
            </span>
          </div>
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
            <AnimatedSection key={index} delay={index * 0.1}>
              <Card className="p-8 h-full hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 group cursor-pointer bg-card/50 backdrop-blur-sm">
                <div className="mb-6 relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="text-white" size={32} weight="duotone" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent/20 blur-xl group-hover:scale-150 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
