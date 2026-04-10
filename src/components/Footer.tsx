import { GithubLogo, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '@/hooks/use-theme'
import logoWhite from '@/assets/images/portalsync_branco_transp.png'
import logoBlack from '@/assets/images/logo_preto.png'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const { theme } = useTheme()

  const socialLinks = [
    { icon: GithubLogo, href: 'https://github.com', label: 'GitHub' },
    { icon: LinkedinLogo, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: EnvelopeSimple, href: 'mailto:contato@portalsync.com.br', label: 'Email' },
  ]

  const quickLinks = [
    { id: 'services', label: 'Serviços' },
    { id: 'tech', label: 'Tecnologias' },
    { id: 'about', label: 'Sobre' },
    { id: 'contact', label: 'Contato' },
  ]

  return (
    <footer className="bg-muted/50 border-t border-border py-12 relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={theme === 'light' ? logoBlack : logoWhite} 
                alt="PortalSync" 
                className="h-8 w-auto object-contain"
              />
            </motion.div>
            <p className="text-muted-foreground">
              Transformando ideias em soluções digitais de alto impacto.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-muted-foreground">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <motion.button
                    onClick={() => {
                      const element = document.getElementById(link.id)
                      if (element) element.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="hover:text-foreground transition-colors relative"
                    whileHover={{ x: 5 }}
                    onHoverStart={() => setHoveredLink(link.id)}
                    onHoverEnd={() => setHoveredLink(null)}
                  >
                    {hoveredLink === link.id && (
                      <motion.span
                        className="absolute -left-4 top-1/2 -translate-y-1/2 text-primary"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                      >
                        →
                      </motion.span>
                    )}
                    {link.label}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-semibold mb-4">Conecte-se</h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center relative overflow-hidden group"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary to-accent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <social.icon className="relative z-10 group-hover:text-white transition-colors" size={20} weight="fill" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="pt-8 border-t border-border text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p>© {currentYear} PortalSync. Todos os direitos reservados.</p>
        </motion.div>
      </div>
    </footer>
  )
}
