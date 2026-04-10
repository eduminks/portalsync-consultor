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

        <g opacity={mapOpacity} fill="var(--primary)" stroke="var(--primary)" strokeWidth="0.08">
          <path d="M 8,12 L 9,11.5 L 10,11 L 10.5,10.8 L 11,10.5 L 11.5,10.3 L 12,10.2 L 12.5,10.5 L 13,11 L 13.5,11.5 L 14,12 L 14.5,12.8 L 15,13.5 L 15.5,14 L 16,14.5 L 16.5,15 L 17,15.5 L 17.5,16 L 18,16.5 L 18.5,17 L 19,17.8 L 19.5,18.5 L 20,19 L 20.5,19.8 L 21,20.5 L 21.5,21.2 L 22,22 L 22.5,22.8 L 23,23.5 L 23.5,24 L 24,24.5 L 24.5,25 L 25,25.5 L 25.5,26.2 L 26,27 L 26.5,27.8 L 27,28.5 L 27.5,29 L 28,29.5 L 28,30 L 27.8,30.5 L 27.5,31 L 27,31.5 L 26.5,32 L 26,32.5 L 25.5,33 L 25,33.5 L 24.5,34 L 24,34.5 L 23.5,35 L 23,35.5 L 22.5,36 L 22,36.5 L 21.5,37 L 21,37.2 L 20.5,37.5 L 20,37.8 L 19.5,38 L 19,38 L 18.5,37.8 L 18,37.5 L 17.5,37 L 17,36.5 L 16.5,36 L 16,35.5 L 15.5,35 L 15,34.5 L 14.5,34 L 14,33.5 L 13.5,33 L 13,32.5 L 12.5,32 L 12,31.5 L 11.5,31 L 11,30.5 L 10.5,30 L 10,29.5 L 9.5,29 L 9,28.5 L 8.5,28 L 8,27.5 L 7.5,27 L 7.2,26.5 L 7,26 L 6.8,25.5 L 6.5,25 L 6.5,24.5 L 6.5,24 L 6.5,23.5 L 6.8,23 L 7,22.5 L 7.2,22 L 7.5,21.5 L 7.8,21 L 8,20.5 L 8.2,20 L 8.5,19.5 L 8.8,19 L 9,18.5 L 9.2,18 L 9.5,17.5 L 9.8,17 L 10,16.5 L 10.2,16 L 10.5,15.5 L 10.5,15 L 10.2,14.5 L 10,14 L 9.5,13.5 L 9,13 L 8.5,12.5 L 8,12 Z" />
          
          <path d="M 18,44 L 19,43 L 20,42.5 L 21,42 L 22,41.8 L 23,41.5 L 24,41.5 L 25,41.8 L 26,42.2 L 27,42.8 L 28,43.5 L 29,44.2 L 30,45 L 31,45.8 L 32,46.5 L 33,47.2 L 34,48 L 35,48.8 L 36,49.5 L 37,50.2 L 38,51 L 39,51.8 L 40,52.5 L 41,53.2 L 42,54 L 43,54.8 L 44,55.5 L 45,56.2 L 46,57 L 46.5,57.8 L 47,58.5 L 47.5,59.2 L 48,60 L 48.5,60.8 L 49,61.5 L 49.5,62 L 50,62.5 L 50.5,63 L 51,63.5 L 51,64 L 50.8,64.5 L 50.5,65 L 50,65.5 L 49.5,66 L 49,66.5 L 48.5,67 L 48,67.5 L 47.5,68 L 47,68.5 L 46.5,69 L 46,69.5 L 45.5,70 L 45,70.2 L 44.5,70.5 L 44,70.8 L 43.5,71 L 43,71 L 42.5,70.8 L 42,70.5 L 41.5,70 L 41,69.5 L 40.5,69 L 40,68.5 L 39.5,68 L 39,67.5 L 38.5,67 L 38,66.5 L 37.5,66 L 37,65.5 L 36.5,65 L 36,64.5 L 35.5,64 L 35,63.5 L 34.5,63 L 34,62.5 L 33.5,62 L 33,61.5 L 32.5,61 L 32,60.5 L 31.5,60 L 31,59.5 L 30.5,59 L 30,58.5 L 29.5,58 L 29,57.5 L 28.5,57 L 28,56.5 L 27.5,56 L 27,55.5 L 26.5,55 L 26,54.5 L 25.5,54 L 25,53.5 L 24.5,53 L 24,52.5 L 23.5,52 L 23,51.5 L 22.5,51 L 22,50.5 L 21.5,50 L 21,49.5 L 20.5,49 L 20,48.5 L 19.5,48 L 19,47.5 L 18.5,47 L 18.2,46.5 L 18,46 L 17.8,45.5 L 18,45 L 18,44.5 L 18,44 Z" />
          
          <path d="M 45,16 L 46,15.5 L 47,15 L 48,14.8 L 49,14.5 L 50,14.5 L 51,14.8 L 52,15.2 L 53,15.8 L 54,16.5 L 55,17.2 L 56,18 L 57,18.8 L 58,19.5 L 59,20.2 L 60,21 L 61,21.8 L 62,22.5 L 63,23.2 L 64,24 L 65,24.8 L 66,25.5 L 67,26.2 L 68,27 L 69,27.8 L 70,28.5 L 71,29.2 L 72,30 L 72.5,30.8 L 73,31.5 L 73.5,32.2 L 74,33 L 74.5,33.8 L 75,34.5 L 75.5,35.2 L 76,36 L 76.5,36.8 L 77,37.5 L 77,38 L 76.8,38.5 L 76.5,39 L 76,39.5 L 75.5,40 L 75,40.5 L 74.5,41 L 74,41.5 L 73.5,42 L 73,42.5 L 72.5,43 L 72,43.5 L 71.5,44 L 71,44.2 L 70.5,44.5 L 70,44.8 L 69.5,45 L 69,45 L 68.5,44.8 L 68,44.5 L 67.5,44 L 67,43.5 L 66.5,43 L 66,42.5 L 65.5,42 L 65,41.5 L 64.5,41 L 64,40.5 L 63.5,40 L 63,39.5 L 62.5,39 L 62,38.5 L 61.5,38 L 61,37.5 L 60.5,37 L 60,36.5 L 59.5,36 L 59,35.5 L 58.5,35 L 58,34.5 L 57.5,34 L 57,33.5 L 56.5,33 L 56,32.5 L 55.5,32 L 55,31.5 L 54.5,31 L 54,30.5 L 53.5,30 L 53,29.5 L 52.5,29 L 52,28.5 L 51.5,28 L 51,27.5 L 50.5,27 L 50,26.5 L 49.5,26 L 49,25.5 L 48.5,25 L 48,24.5 L 47.5,24 L 47,23.5 L 46.5,23 L 46,22.5 L 45.5,22 L 45.2,21.5 L 45,21 L 44.8,20.5 L 44.5,20 L 44.5,19.5 L 44.5,19 L 44.5,18.5 L 44.8,18 L 45,17.5 L 45.2,17 L 45.5,16.5 L 45,16 Z" />
          
          <path d="M 50,38 L 51,37.5 L 52,37 L 53,36.8 L 54,36.5 L 55,36.5 L 56,36.8 L 57,37.2 L 58,37.8 L 59,38.5 L 60,39.2 L 61,40 L 62,40.8 L 63,41.5 L 64,42.2 L 65,43 L 66,43.8 L 67,44.5 L 68,45.2 L 69,46 L 70,46.8 L 71,47.5 L 72,48.2 L 73,49 L 74,49.8 L 75,50.5 L 76,51.2 L 77,52 L 78,52.8 L 79,53.5 L 80,54.2 L 81,55 L 82,55.8 L 83,56.5 L 84,57.2 L 85,58 L 85.5,58.8 L 86,59.5 L 86.5,60.2 L 87,61 L 87,61.5 L 86.8,62 L 86.5,62.5 L 86,63 L 85.5,63.5 L 85,64 L 84.5,64.5 L 84,65 L 83.5,65.5 L 83,66 L 82.5,66.5 L 82,67 L 81.5,67.5 L 81,67.8 L 80.5,68 L 80,68.2 L 79.5,68.5 L 79,68.5 L 78.5,68.2 L 78,68 L 77.5,67.5 L 77,67 L 76.5,66.5 L 76,66 L 75.5,65.5 L 75,65 L 74.5,64.5 L 74,64 L 73.5,63.5 L 73,63 L 72.5,62.5 L 72,62 L 71.5,61.5 L 71,61 L 70.5,60.5 L 70,60 L 69.5,59.5 L 69,59 L 68.5,58.5 L 68,58 L 67.5,57.5 L 67,57 L 66.5,56.5 L 66,56 L 65.5,55.5 L 65,55 L 64.5,54.5 L 64,54 L 63.5,53.5 L 63,53 L 62.5,52.5 L 62,52 L 61.5,51.5 L 61,51 L 60.5,50.5 L 60,50 L 59.5,49.5 L 59,49 L 58.5,48.5 L 58,48 L 57.5,47.5 L 57,47 L 56.5,46.5 L 56,46 L 55.5,45.5 L 55,45 L 54.5,44.5 L 54,44 L 53.5,43.5 L 53,43 L 52.5,42.5 L 52,42 L 51.5,41.5 L 51,41 L 50.5,40.5 L 50.2,40 L 50,39.5 L 49.8,39 L 50,38.5 L 50,38 Z" />
          
          <path d="M 66,18 L 67,17.5 L 68,17 L 69,16.8 L 70,16.5 L 71,16.5 L 72,16.8 L 73,17.2 L 74,17.8 L 75,18.5 L 76,19.2 L 77,20 L 78,20.8 L 79,21.5 L 80,22.2 L 81,23 L 82,23.8 L 83,24.5 L 84,25.2 L 85,26 L 86,26.8 L 87,27.5 L 88,28.2 L 89,29 L 90,29.8 L 91,30.5 L 92,31.2 L 93,32 L 94,32.8 L 95,33.5 L 96,34.2 L 97,35 L 98,35.8 L 99,36.5 L 100,37.2 L 100.5,38 L 101,38.8 L 101.5,39.5 L 102,40.2 L 102.5,41 L 103,41.8 L 103.5,42.5 L 104,43.2 L 104.5,44 L 105,44.8 L 105.5,45.5 L 106,46.2 L 106,47 L 105.8,47.5 L 105.5,48 L 105,48.5 L 104.5,49 L 104,49.5 L 103.5,50 L 103,50.5 L 102.5,51 L 102,51.5 L 101.5,52 L 101,52.5 L 100.5,53 L 100,53.2 L 99.5,53.5 L 99,53.8 L 98.5,54 L 98,54 L 97.5,53.8 L 97,53.5 L 96.5,53 L 96,52.5 L 95.5,52 L 95,51.5 L 94.5,51 L 94,50.5 L 93.5,50 L 93,49.5 L 92.5,49 L 92,48.5 L 91.5,48 L 91,47.5 L 90.5,47 L 90,46.5 L 89.5,46 L 89,45.5 L 88.5,45 L 88,44.5 L 87.5,44 L 87,43.5 L 86.5,43 L 86,42.5 L 85.5,42 L 85,41.5 L 84.5,41 L 84,40.5 L 83.5,40 L 83,39.5 L 82.5,39 L 82,38.5 L 81.5,38 L 81,37.5 L 80.5,37 L 80,36.5 L 79.5,36 L 79,35.5 L 78.5,35 L 78,34.5 L 77.5,34 L 77,33.5 L 76.5,33 L 76,32.5 L 75.5,32 L 75,31.5 L 74.5,31 L 74,30.5 L 73.5,30 L 73,29.5 L 72.5,29 L 72,28.5 L 71.5,28 L 71,27.5 L 70.5,27 L 70,26.5 L 69.5,26 L 69,25.5 L 68.5,25 L 68,24.5 L 67.5,24 L 67,23.5 L 66.5,23 L 66.2,22.5 L 66,22 L 65.8,21.5 L 65.5,21 L 65.5,20.5 L 65.5,20 L 65.5,19.5 L 65.8,19 L 66,18.5 L 66,18 Z" />
          
          <path d="M 82,62 L 83,61.5 L 84,61 L 85,60.8 L 86,60.5 L 87,60.5 L 88,60.8 L 89,61.2 L 90,61.8 L 91,62.5 L 92,63.2 L 93,64 L 94,64.8 L 95,65.5 L 96,66.2 L 97,67 L 98,67.8 L 99,68.5 L 100,69.2 L 101,70 L 102,70.8 L 103,71.5 L 104,72.2 L 105,73 L 105.5,73.8 L 106,74.5 L 106.5,75.2 L 107,76 L 107,76.5 L 106.8,77 L 106.5,77.5 L 106,78 L 105.5,78.5 L 105,79 L 104.5,79.5 L 104,80 L 103.5,80.5 L 103,81 L 102.5,81.5 L 102,82 L 101.5,82.5 L 101,82.8 L 100.5,83 L 100,83.2 L 99.5,83.5 L 99,83.5 L 98.5,83.2 L 98,83 L 97.5,82.5 L 97,82 L 96.5,81.5 L 96,81 L 95.5,80.5 L 95,80 L 94.5,79.5 L 94,79 L 93.5,78.5 L 93,78 L 92.5,77.5 L 92,77 L 91.5,76.5 L 91,76 L 90.5,75.5 L 90,75 L 89.5,74.5 L 89,74 L 88.5,73.5 L 88,73 L 87.5,72.5 L 87,72 L 86.5,71.5 L 86,71 L 85.5,70.5 L 85,70 L 84.5,69.5 L 84,69 L 83.5,68.5 L 83,68 L 82.5,67.5 L 82.2,67 L 82,66.5 L 81.8,66 L 81.5,65.5 L 81.5,65 L 81.5,64.5 L 81.8,64 L 82,63.5 L 82.2,63 L 82.5,62.5 L 82,62 Z" />
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
