import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Connection {
  from: { x: number; y: number }
  to: { x: number; y: number }
  delay: number
  duration: number
}

const cities = [
  { x: 180, y: 120, name: 'Vancouver' },
  { x: 220, y: 140, name: 'San Francisco' },
  { x: 240, y: 150, name: 'New York' },
  { x: 260, y: 165, name: 'Miami' },
  { x: 280, y: 190, name: 'Mexico City' },
  { x: 310, y: 220, name: 'Bogotá' },
  { x: 320, y: 250, name: 'Lima' },
  { x: 340, y: 280, name: 'São Paulo' },
  { x: 350, y: 290, name: 'Rio de Janeiro' },
  { x: 360, y: 300, name: 'Buenos Aires' },
  { x: 440, y: 110, name: 'London' },
  { x: 460, y: 115, name: 'Paris' },
  { x: 470, y: 120, name: 'Amsterdam' },
  { x: 480, y: 125, name: 'Berlin' },
  { x: 490, y: 135, name: 'Madrid' },
  { x: 500, y: 145, name: 'Rome' },
  { x: 510, y: 150, name: 'Istanbul' },
  { x: 520, y: 180, name: 'Cairo' },
  { x: 530, y: 210, name: 'Lagos' },
  { x: 540, y: 230, name: 'Nairobi' },
  { x: 550, y: 250, name: 'Johannesburg' },
  { x: 560, y: 260, name: 'Cape Town' },
  { x: 570, y: 140, name: 'Moscow' },
  { x: 590, y: 155, name: 'Dubai' },
  { x: 600, y: 170, name: 'Mumbai' },
  { x: 610, y: 175, name: 'Delhi' },
  { x: 630, y: 165, name: 'Bangkok' },
  { x: 650, y: 160, name: 'Singapore' },
  { x: 670, y: 150, name: 'Hong Kong' },
  { x: 680, y: 145, name: 'Shanghai' },
  { x: 690, y: 135, name: 'Beijing' },
  { x: 700, y: 125, name: 'Seoul' },
  { x: 720, y: 130, name: 'Tokyo' },
  { x: 730, y: 135, name: 'Osaka' },
  { x: 750, y: 240, name: 'Sydney' },
  { x: 760, y: 250, name: 'Melbourne' },
  { x: 740, y: 210, name: 'Auckland' },
]

const generateConnections = (): Connection[] => {
  const connections: Connection[] = []
  
  const majorHubs = [2, 10, 11, 23, 28, 29, 32, 34]
  
  for (let i = 0; i < cities.length; i++) {
    const connectionsPerCity = majorHubs.includes(i) ? 6 : 3
    const possibleConnections: number[] = []
    
    for (let j = 0; j < cities.length; j++) {
      if (i !== j) {
        const distance = Math.sqrt(
          Math.pow(cities[j].x - cities[i].x, 2) +
          Math.pow(cities[j].y - cities[i].y, 2)
        )
        if (distance < 400) {
          possibleConnections.push(j)
        }
      }
    }
    
    possibleConnections.sort(() => Math.random() - 0.5)
    
    for (let k = 0; k < Math.min(connectionsPerCity, possibleConnections.length); k++) {
      const j = possibleConnections[k]
      const exists = connections.some(
        conn => 
          (conn.from.x === cities[i].x && conn.from.y === cities[i].y && 
           conn.to.x === cities[j].x && conn.to.y === cities[j].y) ||
          (conn.from.x === cities[j].x && conn.from.y === cities[j].y && 
           conn.to.x === cities[i].x && conn.to.y === cities[i].y)
      )
      
      if (!exists) {
        connections.push({
          from: { x: cities[i].x, y: cities[i].y },
          to: { x: cities[j].x, y: cities[j].y },
          delay: Math.random() * 8,
          duration: 2.5 + Math.random() * 2.5,
        })
      }
    }
  }
  
  const intercontinentalPairs = [
    [2, 10], [2, 32], [10, 32], [11, 2], [11, 34],
    [23, 10], [23, 32], [28, 11], [29, 2], [32, 34],
    [7, 10], [8, 11], [19, 23], [24, 28], [27, 34]
  ]
  
  intercontinentalPairs.forEach(([i, j]) => {
    const exists = connections.some(
      conn => 
        (conn.from.x === cities[i].x && conn.from.y === cities[i].y && 
         conn.to.x === cities[j].x && conn.to.y === cities[j].y) ||
        (conn.from.x === cities[j].x && conn.from.y === cities[j].y && 
         conn.to.x === cities[i].x && conn.to.y === cities[i].y)
    )
    
    if (!exists) {
      connections.push({
        from: { x: cities[i].x, y: cities[i].y },
        to: { x: cities[j].x, y: cities[j].y },
        delay: Math.random() * 6,
        duration: 4 + Math.random() * 3,
      })
    }
  })
  
  return connections
}

export function WorldMap() {
  const connections = useRef(generateConnections()).current

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none" style={{ zIndex: 0 }}>
      <svg
        className="w-full h-full"
        viewBox="0 0 900 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {connections.slice(0, 30).map((connection, index) => {
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
                strokeWidth="1.5"
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
            <circle
              cx={city.x}
              cy={city.y}
              r="2.5"
              fill="var(--accent)"
              opacity="0.8"
            />
            {index % 5 === 0 && (
              <motion.circle
                cx={city.x}
                cy={city.y}
                r="5"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="1"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                transition={{
                  duration: 3,
                  delay: index * 0.1,
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
              />
            )}
          </g>
        ))}
      </svg>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
    </div>
  )
}
