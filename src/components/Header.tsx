import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, List, X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import logoWhite from '@/assets/images/portalsync_branco_transp.png'
import logoBlack from '@/assets/images/logo_preto.png'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  const navLinks = [
    { label: 'Início', id: 'hero' },
    { label: 'Serviços', id: 'services' },
    { label: 'Tecnologias', id: 'tech' },
    { label: 'Sobre', id: 'about' },
    { label: 'Contato', id: 'contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            className="cursor-pointer"
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={theme === 'dark' ? logoWhite : logoBlack} 
              alt="PortalSync" 
              className="h-10 w-auto object-contain"
            />
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-foreground/70 hover:text-foreground transition-colors font-medium"
              >
              alt="PortalSync" 
              </button>
            />
          </nav>

          <nav className="hidden md:flex items-center gap-2">
            <Button
              <motion.button
              size="icon"
                onClick={() => scrollToSection(link.id)}
              className="rounded-full"
                whileHover={{ scale: 1.05 }}
              {theme === 'light' ? (
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              )}
                <span className="relative z-10 font-mono text-sm tracking-wide">{link.label}</span>
                <motion.div
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                  layoutId="headerNav">
                />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.button>
              </SheetTrigger>
          </nav>me="w-[300px]">
                <div className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                variant="ghost"
                size="icon"xt-primary transition-colors"
                onClick={toggleTheme}
                      {link.label}
              >
                  ))}
                </div>
                  <Moon className="h-5 w-5 relative z-10" weight="duotone" />
            </Sheet>
          </div>
        </div>
              </Button>
            </motion.div>

}
                <Button variant="ghost" size="icon" className="rounded-full relative group">                </Button>              <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-xl border-l border-primary/20">                  {navLinks.map((link, index) => (                    <motion.button                      onClick={() => scrollToSection(link.id)}                      className="text-left text-lg font-medium hover:text-primary transition-colors font-mono relative group px-4 py-2 rounded-lg"                      initial={{ opacity: 0, x: 20 }}                      <span className="relative z-10">{link.label}</span>                    </motion.button>                  ))}                </div>              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
