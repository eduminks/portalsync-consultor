import { Badge } from '@/components/ui/badge'
import { AnimatedSection } from './AnimatedSection'

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
  return (
    <section id="tech" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-accent-foreground">
              Stack Tecnológico
            </span>
          </div>
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
              <Badge
                key={index}
                variant="outline"
                className="text-base px-5 py-2.5 font-medium border-2 hover:border-accent hover:bg-accent/10 transition-all duration-300 cursor-default"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
