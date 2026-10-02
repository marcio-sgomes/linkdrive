import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Splash() {
  return <div className="min-h-screen grid place-items-center text-secondary">Carregando…</div>
}

// Exige login
export function PrivateRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) return <Splash />
  return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
}

// RN-02 / RN-03: telas operacionais exigem trial ou assinatura ativa
export function SubscriptionGate() {
  const { access } = useAuth()
  return access === 'blocked' ? <Navigate to="/subscription" replace /> : <Outlet />
}

// RN-10: apenas is_admin = true
export function AdminRoute() {
  const { isAdmin, loading } = useAuth()
  if (loading) return <Splash />
  return isAdmin ? <Outlet /> : <Navigate to="/calculator" replace />
}
