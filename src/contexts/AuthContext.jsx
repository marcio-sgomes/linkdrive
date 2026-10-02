import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

// RN-01..RN-03: trial de 7 dias e bloqueio por inadimplência
export function resolveAccess(sub) {
  if (!sub) return 'blocked'
  const now = Date.now()
  if (sub.status === 'trialing') return new Date(sub.trial_ends_at) > now ? 'trial' : 'blocked'
  if (sub.status === 'active') return new Date(sub.current_period_ends_at) > now ? 'active' : 'blocked'
  return 'blocked' // past_due | canceled
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadAccount = useCallback(async (userId) => {
    if (!userId) { setProfile(null); setSubscription(null); return }
    const [p, s] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).single(),
      supabase.from('subscriptions').select('*').eq('user_id', userId)
        .order('updated_at', { ascending: false }).limit(1).maybeSingle()
    ])
    setProfile(p.data ?? null)
    setSubscription(s.data ?? null)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session)
      await loadAccount(data.session?.user.id)
      setLoading(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      loadAccount(next?.user.id)
    })
    return () => listener.subscription.unsubscribe()
  }, [loadAccount])

  const signIn = (email, password) => supabase.auth.signInWithPassword({ email, password })

  // O trigger no banco cria profile + subscription (trialing, 7 dias)
  const signUp = ({ email, password, fullName, phone }) =>
    supabase.auth.signUp({ email, password, options: { data: { full_name: fullName, phone } } })

  const signOut = () => supabase.auth.signOut()

  const access = resolveAccess(subscription)
  const trialDaysLeft = subscription?.status === 'trialing'
    ? Math.max(0, Math.ceil((new Date(subscription.trial_ends_at) - Date.now()) / 86400000))
    : 0

  const value = useMemo(() => ({
    session, user: session?.user ?? null, profile, subscription, loading,
    access, trialDaysLeft, isAdmin: !!profile?.is_admin,
    signIn, signUp, signOut, refresh: () => loadAccount(session?.user.id)
  }), [session, profile, subscription, loading, access, trialDaysLeft, loadAccount])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
