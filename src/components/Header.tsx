import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, List, X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import logoWhite from '@/assets/images/portalsync_branco_transp.png'
import logoBlack from '@/assets/images/logo_preto-removebg-preview.png'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = ['hero', 'services', 'tech', 'about', 'contact']
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerHeight = 80
      const y = element.getBoundingClientRect().top + window.scrollY - headerHeight
      window.scrollTo({ top: y, behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  const navLinks = [
    { label: 'Início', id: 'hero' },
    { label: 'Serviços', id: 'services' },
    { label: 'Especialidades', id: 'tech' },
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
            className="cursor-pointer relative h-16"
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={theme}
                src={theme === 'dark' ? logoWhite : logoBlack}
                alt="PortalSync"
                className="h-16 w-auto object-contain"
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </AnimatePresence>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="relative group px-4 py-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className={`relative z-10 font-mono text-sm tracking-wide transition-colors ${
                  activeSection === link.id
                    ? 'text-foreground'
                    : 'text-foreground/70 group-hover:text-foreground'
                }`}>
                  {link.label}
                </span>
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent transition-transform origin-left ${
                  activeSection === link.id
                    ? 'scale-x-100'
                    : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block"
            >
              <Button
                variant="outline"
                onClick={toggleTheme}
                className="rounded-full gap-2 border-2 hover:bg-primary/10 hover:border-primary transition-all group relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {theme === 'dark' ? (
                      <Sun className="h-5 w-5 relative z-10" weight="duotone" />
                    ) : (
                      <Moon className="h-5 w-5 relative z-10" weight="duotone" />
                    )}
                  </motion.div>
                </AnimatePresence>
                <span className="font-mono text-xs tracking-wider">
                  {theme === 'dark' ? 'Claro' : 'Escuro'}
                </span>
              </Button>
            </motion.div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="sm:hidden rounded-full relative group"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5 relative z-10" weight="duotone" />
                  ) : (
                    <Moon className="h-5 w-5 relative z-10" weight="duotone" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="rounded-full">
                  {mobileOpen ? (
                    <X className="h-6 w-6" weight="bold" />
                  ) : (
                    <List className="h-6 w-6" weight="bold" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-xl border-l border-primary/20">
                <div className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className={`text-left text-lg font-medium transition-colors font-mono relative group px-4 py-2 rounded-lg ${
                        activeSection === link.id ? 'text-primary' : 'hover:text-primary'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="relative z-10">{link.label}</span>
                      <div className={`absolute inset-0 bg-primary/10 transition-transform origin-left rounded-lg ${
                        activeSection === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`} />
                    </motion.button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
