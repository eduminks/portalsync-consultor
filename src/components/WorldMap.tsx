import { useTheme } from '@/hooks/use-theme'
import { motion } from 'framer-motion'
import mapImage from '@/assets/images/MAPA_MUNDI_AZUL.png'

// Coordenadas aproximadas num viewBox 100×56 (proporcional ao mapa)
const cities = [
  { x: 20, y: 22 }, // 0  New York
  { x: 14, y: 15 }, // 1  Vancouver
  { x: 28, y: 42 }, // 2  São Paulo
  { x: 48, y: 19 }, // 3  London
  { x: 55, y: 26 }, // 4  Cairo
  { x: 63, y: 24 }, // 5  Dubai
  { x: 70, y: 27 }, // 6  Mumbai
  { x: 79, y: 33 }, // 7  Singapore
  { x: 86, y: 22 }, // 8  Tokyo
  { x: 88, y: 46 }, // 9  Sydney
  { x: 56, y: 44 }, // 10 Cape Town
]

const pairs = [
  [0, 3], [0, 2], [1, 8],
  [2, 10], [3, 4], [4, 5],
  [5, 6], [6, 7], [7, 8],
  [8, 9], [4, 10], [3, 8],
]

function arcPath(i: number, j: number): string {
  const a = cities[i]
  const b = cities[j]
  const cx = (a.x + b.x) / 2
  const cy = (a.y + b.y) / 2
  const dist = Math.hypot(b.x - a.x, b.y - a.y)
  const arch = dist * 0.28
  return `M${a.x},${a.y} Q${cx},${cy - arch} ${b.x},${b.y}`
}

export function WorldMap() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Mapa: bg-cover para preencher toda a seção */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${mapImage})`,
          opacity: isDark ? 0.18 : 0.12,
          filter: 'saturate(0.45) brightness(1.15)',
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 56"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="wm-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="0.3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="wm-line" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="0">
            <stop offset="0%"   stopColor="var(--primary)" stopOpacity="0.1" />
            <stop offset="45%"  stopColor="var(--accent)"  stopOpacity="0.95" />
            <stop offset="55%"  stopColor="var(--primary)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--accent)"  stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Arcos animados: draw-in → hold → fade-out em loop */}
        {pairs.map(([i, j], idx) => (
          <motion.path
            key={idx}
            d={arcPath(i, j)}
            fill="none"
            stroke="url(#wm-line)"
            strokeWidth="0.22"
            strokeLinecap="round"
            filter="url(#wm-glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity:    [0, 0.9, 0.75, 0],
            }}
            transition={{
              duration:    5,
              delay:       idx * 0.5,
              repeat:      Infinity,
              repeatDelay: 1,
              ease:        'easeInOut',
            }}
          />
        ))}

        {/* Pontos de cidade com duplo anel pulsante */}
        {cities.map((c, i) => (
          <g key={i}>
            <motion.circle
              cx={c.x} cy={c.y} r={0.38}
              fill="var(--accent)"
              filter="url(#wm-glow)"
              animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.15, 1] }}
              transition={{ duration: 2.5 + i * 0.1, delay: i * 0.18, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Anel 1 */}
            <motion.circle
              cx={c.x} cy={c.y}
              fill="none" stroke="var(--accent)" strokeWidth="0.09"
              initial={{ r: 0.38, opacity: 0.65 }}
              animate={{ r: [0.38, 1.6], opacity: [0.65, 0] }}
              transition={{ duration: 2.8, delay: i * 0.18, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* Anel 2 (defasado) */}
            <motion.circle
              cx={c.x} cy={c.y}
              fill="none" stroke="var(--primary)" strokeWidth="0.06"
              initial={{ r: 0.38, opacity: 0.4 }}
              animate={{ r: [0.38, 2.2], opacity: [0.4, 0] }}
              transition={{ duration: 3.2, delay: i * 0.18 + 1, repeat: Infinity, ease: 'easeOut' }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
