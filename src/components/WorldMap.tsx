import { useEffect, useRef } from 'react'
import { useTheme } from '@/hooks/use-theme'

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

  const mapOpacity = theme === 'dark' ? 0.25 : 0.18
  const connectionOpacity = theme === 'dark' ? 0.6 : 0.5

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <svg
        ref={svgRef}
        className="w-full h-full"
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

        <g opacity={mapOpacity} fill="var(--primary)" stroke="var(--primary)" strokeWidth="0.05">
          <path d="M 14,15 L 15,14.5 L 16,14.8 L 17,15.2 L 18,15.5 L 19,16 L 20,16.8 L 21,17.5 L 22,18 L 23,18.2 L 24,18.5 L 25,19 L 25.5,19.5 L 26,20 L 26.5,21 L 27,22 L 27,23 L 26.8,24 L 26.5,25 L 26,26 L 25.5,27 L 25,28 L 24,29 L 23,29.5 L 22,29.8 L 21,30 L 20,29.8 L 19,29.5 L 18,29 L 17,28.5 L 16,28 L 15,27.5 L 14.5,27 L 14,26.5 L 13.5,26 L 13,25 L 12.5,24 L 12,23 L 12,22 L 12.2,21 L 12.5,20 L 13,19 L 13.5,18 L 14,17 L 14,16 L 14,15 Z" />
          
          <path d="M 21,48 L 22,47 L 23,46.5 L 24,46.2 L 25,46 L 26,46.5 L 27,47 L 28,48 L 29,49 L 30,50 L 31,51 L 32,52 L 33,53 L 34,54 L 35,54.5 L 36,55 L 37,55.2 L 38,55 L 39,54.5 L 40,54 L 41,53 L 42,52 L 42.5,51 L 43,50 L 43,49 L 42.8,48 L 42.5,47 L 42,46 L 41.5,45 L 41,44.5 L 40,44 L 39,43.8 L 38,44 L 37,44.5 L 36,45 L 35,45.5 L 34,46 L 33,46.5 L 32,47 L 31,47.5 L 30,48 L 29,48.2 L 28,48.5 L 27,48.8 L 26,49 L 25,49.2 L 24,49.5 L 23,49.5 L 22,49.2 L 21,49 L 21,48 Z" />
          
          <path d="M 47,20 L 48,19 L 49,18.5 L 50,18 L 51,18.2 L 52,18.5 L 53,19 L 54,19.5 L 55,20 L 56,21 L 57,22 L 58,23 L 59,24 L 60,25 L 60.5,26 L 61,27 L 61.5,28 L 62,29 L 62.5,30 L 63,31 L 63,32 L 62.8,33 L 62.5,34 L 62,35 L 61.5,36 L 61,36.5 L 60,37 L 59,37.2 L 58,37 L 57,36.5 L 56,36 L 55,35.5 L 54,35 L 53,34.5 L 52,34 L 51,33.5 L 50,33 L 49,32.5 L 48,32 L 47.5,31 L 47,30 L 46.5,29 L 46,28 L 46,27 L 46,26 L 46,25 L 46,24 L 46.2,23 L 46.5,22 L 47,21 L 47,20 Z" />
          
          <path d="M 52,36 L 53,35 L 54,34.5 L 55,34.2 L 56,34 L 57,34.2 L 58,34.5 L 59,35 L 60,36 L 61,37 L 62,38 L 63,39 L 64,40 L 65,41 L 66,42 L 67,43 L 68,44 L 69,45 L 70,46 L 70.5,47 L 71,48 L 71,49 L 70.8,50 L 70.5,51 L 70,52 L 69.5,53 L 69,54 L 68,54.5 L 67,55 L 66,55.2 L 65,55 L 64,54.5 L 63,54 L 62,53.5 L 61,53 L 60,52.5 L 59,52 L 58,51.5 L 57,51 L 56,50.5 L 55,50 L 54,49.5 L 53,49 L 52.5,48 L 52,47 L 52,46 L 52,45 L 52,44 L 52,43 L 52,42 L 52,41 L 52,40 L 52,39 L 52,38 L 52,37 L 52,36 Z" />
          
          <path d="M 68,24 L 69,23 L 70,22.5 L 71,22.2 L 72,22 L 73,22.2 L 74,22.5 L 75,23 L 76,24 L 77,25 L 78,26 L 79,27 L 80,28 L 81,29 L 82,30 L 83,31 L 84,32 L 85,33 L 86,34 L 87,35 L 88,36 L 89,37 L 90,38 L 91,39 L 92,40 L 92.5,41 L 93,42 L 93,43 L 92.8,44 L 92.5,45 L 92,46 L 91.5,47 L 91,48 L 90,48.5 L 89,49 L 88,49.2 L 87,49 L 86,48.5 L 85,48 L 84,47.5 L 83,47 L 82,46.5 L 81,46 L 80,45.5 L 79,45 L 78,44.5 L 77,44 L 76,43.5 L 75,43 L 74,42.5 L 73,42 L 72,41.5 L 71,41 L 70,40.5 L 69,40 L 68.5,39 L 68,38 L 68,37 L 68,36 L 68,35 L 68,34 L 68,33 L 68,32 L 68,31 L 68,30 L 68,29 L 68,28 L 68,27 L 68,26 L 68,25 L 68,24 Z" />
          
          <path d="M 83,56 L 84,55 L 85,54.5 L 86,54.2 L 87,54 L 88,54.2 L 89,54.5 L 90,55 L 91,56 L 92,57 L 93,58 L 94,59 L 95,60 L 96,61 L 96.5,62 L 97,63 L 97,64 L 96.8,65 L 96.5,66 L 96,67 L 95.5,68 L 95,69 L 94,70 L 93,70.5 L 92,71 L 91,71.2 L 90,71 L 89,70.5 L 88,70 L 87,69.5 L 86,69 L 85,68.5 L 84,68 L 83.5,67 L 83,66 L 83,65 L 83,64 L 83,63 L 83,62 L 83,61 L 83,60 L 83,59 L 83,58 L 83,57 L 83,56 Z" />
        </g>

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
