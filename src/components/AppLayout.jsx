import { NavLink, Outlet } from 'react-router-dom'
import { Calculator, CalendarDays, Car, Moon, Sun, User } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const tabs = [
  { to: '/calculator', label: 'Calculadora', icon: Calculator },
  { to: '/vehicles', label: 'Frota', icon: Car },
  { to: '/schedule', label: 'Agenda', icon: CalendarDays },
  { to: '/subscription', label: 'Perfil', icon: User }
]

export function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  return (
    <button onClick={toggleTheme} aria-label="Alternar tema"
      className={`grid place-items-center w-10 h-10 rounded-full bg-white/15 text-white ${className}`}>
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

export default function AppLayout() {
  return (
    <div className="mx-auto max-w-md min-h-screen pb-24">
      <Outlet />
      <nav className="fixed bottom-0 inset-x-0 mx-auto max-w-md bg-light-card dark:bg-dark-card border-t border-light-line dark:border-dark-line pb-[env(safe-area-inset-bottom)]">
        <ul className="flex justify-around">
          {tabs.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 min-h-touch min-w-[64px] py-2 text-[11px] ${
                  isActive ? 'text-secondary font-semibold' : 'text-light-muted dark:text-dark-muted'}`}>
                <Icon size={20} />{label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
