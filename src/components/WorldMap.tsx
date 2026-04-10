import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Connection {
  from: { x: number; y: number }
  to: { x: number; y: number }
  delay: number
  duration: number
}

const cities = [
  { x: 240, y: 150, name: 'North America' },
  { x: 320, y: 180, name: 'South America' },
  { x: 480, y: 140, name: 'Europe' },
  { x: 520, y: 200, name: 'Africa' },
  { x: 620, y: 160, name: 'Asia' },
  { x: 740, y: 240, name: 'Oceania' },
]

const generateConnections = (): Connection[] => {
  const connections: Connection[] = []
  for (let i = 0; i < cities.length; i++) {
    for (let j = i + 1; j < cities.length; j++) {
      connections.push({
        from: { x: cities[i].x, y: cities[i].y },
        to: { x: cities[j].x, y: cities[j].y },
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 2,
      })
    }
  }
  return connections
}

export function WorldMap() {
  const connections = useRef(generateConnections()).current

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <svg
        className="w-full h-full"
        viewBox="0 0 900 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {connections.map((connection, index) => {
          const length = Math.sqrt(
            Math.pow(connection.to.x - connection.from.x, 2) +
              Math.pow(connection.to.y - connection.from.y, 2)
          )

          return (
            <g key={index}>
              <motion.line
                x1={connection.from.x}
                y1={connection.from.y}
                x2={connection.to.x}
                y2={connection.to.y}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                strokeDasharray={length}
                strokeDashoffset={length}
                animate={{
                  strokeDashoffset: [length, 0, -length],
                }}
                transition={{
                  duration: connection.duration,
                  delay: connection.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                filter="url(#glow)"
              />
            </g>
          )
        })}

        {cities.map((city, index) => (
          <g key={index}>
            <motion.circle
              cx={city.x}
              cy={city.y}
              r="3"
              fill="var(--accent)"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{
                duration: 2,
                delay: index * 0.2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
            <motion.circle
              cx={city.x}
              cy={city.y}
              r="6"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 2, 3], opacity: [0.8, 0.4, 0] }}
              transition={{
                duration: 2,
                delay: index * 0.2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          </g>
        ))}

        <motion.path
          d="M50 180 Q150 120, 250 150 T450 140 Q550 130, 650 160 T850 180"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="0.5"
          strokeDasharray="5,5"
          strokeDashoffset={0}
          animate={{
            strokeDashoffset: [0, -10],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          opacity="0.3"
        />

        <motion.path
          d="M100 240 Q200 200, 300 220 T500 210 Q600 200, 700 230 T850 240"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="0.5"
          strokeDasharray="5,5"
          strokeDashoffset={0}
          animate={{
            strokeDashoffset: [0, 10],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          opacity="0.3"
        />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
    </div>
  )
}
