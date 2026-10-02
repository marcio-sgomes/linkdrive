import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminRoute, PrivateRoute, SubscriptionGate } from './routes/guards'
import Placeholder from './pages/Placeholder'
import AppLayout from './components/AppLayout'
import Calculator from './pages/Calculator'

const page = (title) => <Placeholder title={title} />

export default function App() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={page('Entrar')} />
      <Route path="/register" element={page('Criar conta')} />
      <Route path="/track/:uuid" element={page('Rastreamento')} />

      {/* Autenticadas */}
      <Route element={<PrivateRoute />}>
        <Route path="/subscription" element={page('Planos e assinatura')} />

        {/* Exigem trial ou assinatura ativa */}
        <Route element={<SubscriptionGate />}>
          <Route element={<AppLayout />}>
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/vehicles" element={page('Minha frota')} />
            <Route path="/schedule" element={page('Agendamentos')} />
          </Route>
        </Route>

        {/* Somente admin */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={page('Painel administrativo')} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/calculator" replace />} />
    </Routes>
  )
}
