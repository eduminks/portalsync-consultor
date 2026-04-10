import { Sparkle, Users, Lightning } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { AnimatedSection } from './AnimatedSection'

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-primary">
                Sobre Nós
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Parceiros em Transformação Digital
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                A <span className="text-foreground font-semibold">PortalSync</span> é uma
                empresa especializada em consultoria e desenvolvimento de sistemas,
                com foco em soluções que realmente transformam negócios.
              </p>
              <p>
                Nossa expertise abrange desde o desenvolvimento de software
                personalizado até a integração complexa de sistemas empresariais,
                ERPs e plataformas de automação comercial.
              </p>
              <p>
                Somos também parceiros e investidores de uma startup de tecnologia
                focada em aplicativos web inovadores, sempre na vanguarda da
                transformação digital.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid gap-6">
              <Card className="p-6 border-2 hover:border-primary/50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Lightning className="text-white" size={24} weight="duotone" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Inovação Constante</h3>
                    <p className="text-muted-foreground">
                      Sempre atualizados com as últimas tecnologias e práticas do mercado.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 hover:border-primary/50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Users className="text-white" size={24} weight="duotone" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Time Especializado</h3>
                    <p className="text-muted-foreground">
                      Profissionais experientes e certificados nas principais tecnologias.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 hover:border-primary/50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Sparkle className="text-white" size={24} weight="duotone" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Resultados Comprovados</h3>
                    <p className="text-muted-foreground">
                      Histórico de projetos bem-sucedidos e clientes satisfeitos.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
