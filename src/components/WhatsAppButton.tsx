import { motion, AnimatePresence } from 'framer-motion'
import { WhatsappLogo } from '@phosphor-icons/react'
import { useState } from 'react'

const WA_URL = 'https://wa.me/5549999627921'

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-background border border-border shadow-lg rounded-xl px-3 py-2 text-sm font-medium whitespace-nowrap"
          >
            Fale pelo WhatsApp
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse rings */}
      <div className="relative">
        <motion.span
          className="absolute inset-0 rounded-full bg-green-500/40"
          animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.span
          className="absolute inset-0 rounded-full bg-green-500/25"
          animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
        />

        {/* Button */}
        <motion.a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fale conosco pelo WhatsApp"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/40 text-white"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
        >
          <WhatsappLogo size={28} weight="fill" />
        </motion.a>
      </div>
    </div>
  )
}
