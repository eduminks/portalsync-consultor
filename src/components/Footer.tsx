import { GithubLogo, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t border-border py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-bold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              PortalSync
            </div>
            <p className="text-muted-foreground">
              Transformando ideias em soluções digitais de alto impacto.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('services')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="hover:text-foreground transition-colors"
                >
                  Serviços
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('tech')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="hover:text-foreground transition-colors"
                >
                  Tecnologias
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('about')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="hover:text-foreground transition-colors"
                >
                  Sobre
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('contact')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="hover:text-foreground transition-colors"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Conecte-se</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center"
              >
                <GithubLogo size={20} weight="fill" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center"
              >
                <LinkedinLogo size={20} weight="fill" />
              </a>
              <a
                href="mailto:contato@portalsync.com.br"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center"
              >
                <EnvelopeSimple size={20} weight="fill" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {currentYear} PortalSync. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
