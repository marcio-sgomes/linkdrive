import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)
const KEY = 'linkdrive-theme'

export function ThemeProvider({ children }) {
  // Dark Mode por padrão
  const [theme, setTheme] = useState(() => localStorage.getItem(KEY) ?? 'dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(KEY, theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
