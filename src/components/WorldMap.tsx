import { useEffect, useRef } from 'react'
import { useTheme } from '@/hooks/use-theme'
import mapImage from '@/assets/images/MAPA_MUNDI_AZUL.png'

interface Connection {
  from: { x: number; y: number }
  to: { x: number; y: number }
  delay: number
  duration: number
}

const cities = [
  { x: 18, y: 38, name: 'New York' },
  { x: 12, y: 30, name: 'Vancouver' },
  { x: 26, y: 60, name: 'São Paulo' },
  { x: 48, y: 30, name: 'London' },
  { x: 50, y: 32, name: 'Paris' },
  { x: 55, y: 40, name: 'Cairo' },
  { x: 62, y: 38, name: 'Dubai' },
  { x: 70, y: 42, name: 'Mumbai' },
  { x: 78, y: 36, name: 'Singapore' },
  { x: 85, y: 34, name: 'Tokyo' },
  { x: 88, y: 64, name: 'Sydney' },
  { x: 56, y: 56, name: 'Cape Town' },
]

const generateConnections = (): Connection[] => {
  const connections: Connection[] = []
  
  const pairs = [
    [0, 1], [0, 2], [0, 3], [1, 9],
    [2, 3], [2, 11], [3, 4], [3, 5],
    [4, 6], [5, 6], [6, 7], [7, 8],
    [8, 9], [9, 10], [8, 10], [5, 11],
  ]
  
  pairs.forEach(([i, j]) => {
    connections.push({
      from: { x: cities[i].x, y: cities[i].y },
      to: { x: cities[j].x, y: cities[j].y },
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 2,
    })
  })
  
  return connections
}

export function WorldMap() {
  const connections = useRef(generateConnections()).current
  const svgRef = useRef<SVGSVGElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!svgRef.current) return

    const svg = svgRef.current
    const lines = svg.querySelectorAll('.animated-line')
    
    lines.forEach((line, index) => {
      const element = line as SVGLineElement
      const connection = connections[index]
      if (!connection) return

      const length = Math.sqrt(
        Math.pow(connection.to.x - connection.from.x, 2) +
          Math.pow(connection.to.y - connection.from.y, 2)
      )

      element.style.strokeDasharray = `${length}`
      element.style.strokeDashoffset = `${length}`

      const animate = () => {
        element.animate(
          [
            { strokeDashoffset: length },
            { strokeDashoffset: 0 },
            { strokeDashoffset: -length }
          ],
          {
            duration: connection.duration * 1000,
            delay: connection.delay * 1000,
            iterations: Infinity,
            easing: 'linear'
          }
        )
      }

      setTimeout(animate, 0)
    })
  }, [connections])

  const mapOpacity = theme === 'dark' ? 0.35 : 0.25
  const connectionOpacity = theme === 'dark' ? 0.6 : 0.5

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div 
        className="absolute inset-0 bg-center bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url(${mapImage})`,
          opacity: mapOpacity,
          filter: theme === 'dark' ? 'brightness(0.8)' : 'brightness(1.1)',
        }}
      />
      <svg
        ref={svgRef}
        className="w-full h-full absolute inset-0"
        viewBox="0 0 100 50"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={connectionOpacity * 0.5} />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity={connectionOpacity} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={connectionOpacity * 0.5} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {connections.map((connection, index) => (
          <line
            key={index}
            className="animated-line"
            x1={connection.from.x}
            y1={connection.from.y}
            x2={connection.to.x}
            y2={connection.to.y}
            stroke="url(#lineGradient)"
            strokeWidth="0.15"
            filter="url(#glow)"
          />
        ))}

        {cities.map((city, index) => (
          <g key={index}>
            <circle
              cx={city.x}
              cy={city.y}
              r="0.3"
              fill="var(--accent)"
              opacity={connectionOpacity}
              filter="url(#glow)"
            />
            <circle
              cx={city.x}
              cy={city.y}
              r="0.5"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.08"
              opacity={connectionOpacity * 0.5}
            >
              <animate
                attributeName="r"
                from="0.5"
                to="1"
                dur="2s"
                begin={`${index * 0.3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from={connectionOpacity * 0.5}
                to="0"
                dur="2s"
                begin={`${index * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  )
}
