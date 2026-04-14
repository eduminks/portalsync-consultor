import { useState, useEffect } from 'react'

export type Theme = 'light' | 'dark'

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem('theme-preference')
    return stored ? (JSON.parse(stored) as Theme) : null
  } catch {
    return null
  }
}

function setStoredTheme(value: Theme | null): void {
  try {
    if (value === null) {
      localStorage.removeItem('theme-preference')
    } else {
      localStorage.setItem('theme-preference', JSON.stringify(value))
    }
  } catch {
    // ignore storage errors
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme | null>(getStoredTheme)

  const resolvedTheme: Theme = theme ?? getSystemTheme()

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(resolvedTheme)
  }, [resolvedTheme])

  useEffect(() => {
    if (theme !== null) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(mediaQuery.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const setTheme = (value: Theme | null) => {
    setStoredTheme(value)
    setThemeState(value)
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }

  return { theme: resolvedTheme, setTheme, toggleTheme }
}
