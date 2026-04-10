import { useKV } from '@github/spark/hooks'
import { useEffect } from 'react'

export type Theme = 'light' | 'dark' | 'cyberpunk'

export function useTheme() {
  const [theme, setTheme] = useKV<Theme>('theme-preference', 'light')

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark', 'cyberpunk')
    if (theme) {
      root.classList.add(theme)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => {
      if (current === 'light') return 'dark'
      if (current === 'dark') return 'cyberpunk'
      return 'light'
    })
  }

  const cycleTheme = () => {
    setTheme((current) => {
      if (current === 'light') return 'dark'
      if (current === 'dark') return 'cyberpunk'
      return 'light'
    })
  }

  return { theme, setTheme, toggleTheme, cycleTheme }
}
