import { useKV } from '@github/spark/hooks'
import { useEffect } from 'react'

export type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useKV<Theme>('theme-preference', 'light')

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    if (theme) {
      root.classList.add(theme)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => current === 'light' ? 'dark' : 'light')
  }

  return { theme, setTheme, toggleTheme }
}
