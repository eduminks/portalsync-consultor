import { useEffect, useRef } from 'react'

interface Connection {
  from: { x: number; y: number }
  to: { x: number; y: number }
  delay: number
  duration: number
}

const cities = [
  { x: 220, y: 180, name: 'New York' },
  { x: 180, y: 140, name: 'Vancouver' },
  { x: 210, y: 250, name: 'São Paulo' },
  { x: 480, y: 150, name: 'London' },
  { x: 500, y: 160, name: 'Paris' },
  { x: 550, y: 200, name: 'Cairo' },
  { x: 620, y: 190, name: 'Dubai' },
  { x: 680, y: 200, name: 'Mumbai' },
  { x: 750, y: 180, name: 'Singapore' },
  { x: 820, y: 170, name: 'Tokyo' },
  { x: 850, y: 320, name: 'Sydney' },
  { x: 560, y: 280, name: 'Cape Town' },
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

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 1000 450"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g opacity="0.15" stroke="var(--primary)" strokeWidth="1.5" fill="none">
          <path d="M 150 200 Q 170 180 190 185 L 210 190 L 230 185 Q 250 180 270 195 L 290 210 L 270 230 L 250 240 L 230 235 L 210 245 L 190 250 Q 170 255 150 240 Z" />
          <path d="M 140 130 L 160 125 L 180 120 L 200 115 L 220 120 L 240 130 L 250 145 L 245 160 L 230 170 L 210 175 L 190 172 L 170 165 L 155 155 Z" />
          <path d="M 180 260 Q 200 255 220 260 L 240 270 L 250 285 L 255 305 L 250 325 L 240 340 L 220 350 L 200 345 L 185 330 L 175 310 L 172 290 Z" />
          <path d="M 450 130 L 470 125 L 490 120 L 510 118 L 530 120 L 550 125 L 570 135 L 585 150 L 595 170 L 598 190 L 595 210 L 585 230 L 570 245 L 550 255 L 530 258 L 510 255 L 490 245 L 470 230 L 455 210 L 448 190 L 445 170 Z" />
          <path d="M 530 260 Q 550 255 570 260 L 590 275 L 605 295 L 610 320 L 605 345 L 590 365 L 570 375 L 550 378 L 530 375 L 510 365 L 495 345 L 490 320 L 493 295 L 505 275 Z" />
          <path d="M 650 170 Q 670 165 690 170 L 710 180 L 730 195 L 745 215 L 750 235 L 745 255 L 730 270 L 710 280 L 690 283 L 670 280 L 650 270 L 635 255 L 630 235 L 633 215 L 640 195 Z" />
          <path d="M 780 150 L 800 145 L 820 142 L 840 145 L 860 152 L 880 165 L 895 182 L 905 202 L 908 222 L 905 242 L 895 260 L 880 275 L 860 285 L 840 288 L 820 285 L 800 275 L 785 260 L 775 242 L 772 222 L 775 202 Z" />
          <path d="M 820 300 Q 840 295 860 300 L 880 310 L 895 325 L 905 345 L 908 365 L 902 385 L 890 400 L 870 410 L 850 413 L 830 410 L 810 400 L 795 385 L 788 365 L 788 345 L 795 325 Z" />
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
            strokeWidth="2"
            filter="url(#glow)"
          />
        ))}

        {cities.map((city, index) => (
          <g key={index}>
            <circle
              cx={city.x}
              cy={city.y}
              r="4"
              fill="var(--accent)"
              opacity="0.8"
              filter="url(#glow)"
            />
            <circle
              cx={city.x}
              cy={city.y}
              r="8"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1"
              opacity="0.3"
            >
              <animate
                attributeName="r"
                from="8"
                to="14"
                dur="2s"
                begin={`${index * 0.3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.3"
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
