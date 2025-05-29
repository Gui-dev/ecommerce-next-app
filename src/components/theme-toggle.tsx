'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      type="button"
      className="rounded p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      aria-label="Alternar tema"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <Sun className="text-yellow-400" /> : <Moon />}
    </button>
  )
}
