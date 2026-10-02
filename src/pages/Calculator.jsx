import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Flag, MapPin } from 'lucide-react'
import { ThemeToggle } from '../components/AppLayout'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { MULTIPLIERS, brl, calcRide, marketAnchor } from '../lib/pricing'

const Field = ({ label, icon: Icon, children }) => (
  <label className="block">
    <span className="label">{label}</span>
    <div className="relative mt-1">{children}{Icon && <Icon size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary dark:text-secondary" />}</div>
  </label>
)

export default function Calculator() {
  const { user } = useAuth()
  const [vehicle, setVehicle] = useState(null)
  const [f, setF] = useState({ origin: '', dest: '', emptyKm: 0, tripKm: 0, margin: 2, fee: 5 })
  const [active, setActive] = useState([])
  const [result, setResult] = useState(null)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  useEffect(() => {
    if (!user) return
    supabase.from('vehicles').select('*').eq('user_id', user.id).eq('is_active', true).limit(1).maybeSingle()
      .then(({ data }) => setVehicle(data))
  }, [user])

  const toggle = (k) => setActive((a) => (a.includes(k) ? a.filter((x) => x !== k) : [...a, k]))
  const ready = vehicle && Number(f.tripKm) > 0

  const calculate = () => setResult(calcRide({
    emptyKm: +f.emptyKm, tripKm: +f.tripKm, margin: +f.margin, fee: +f.fee, active,
    fuelPrice: Number(vehicle.fuel_price_per_liter), kmPerLiter: Number(vehicle.km_per_liter)
  }))

  const anchor = useMemo(() => marketAnchor(+f.tripKm), [f.tripKm])

  const whatsapp = () => {
    const msg = `*LinkDrive – Cotação*\nDe: ${f.origin}\nPara: ${f.dest}\nDistância: ${f.tripKm} km\nValor: *${brl(result.total)}*`
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <main>
      <header className="app-header">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Calculadora de corrida</h1>
          <ThemeToggle />
        </div>
      </header>

      <section className="px-5 -mt-3 space-y-4">
        <div className="card p-4 space-y-3">
          <Field label="Local de embarque" icon={MapPin}><input className="input pr-10" placeholder="Endereço de origem" value={f.origin} onChange={set('origin')} /></Field>
          <Field label="Local de destino" icon={Flag}><input className="input pr-10" placeholder="Endereço de destino" value={f.dest} onChange={set('dest')} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Deslocamento vazio (km)"><input type="number" min="0" className="input" value={f.emptyKm} onChange={set('emptyKm')} /></Field>
            <Field label="Trajeto (km)"><input type="number" min="0" className="input" value={f.tripKm} onChange={set('tripKm')} /></Field>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(MULTIPLIERS).map(([k, m]) => (
              <button key={k} onClick={() => toggle(k)} aria-pressed={active.includes(k)}
                className={`min-h-[40px] px-4 rounded-full text-sm border transition ${active.includes(k)
                  ? 'bg-secondary text-primary border-secondary font-semibold' : 'border-light-line dark:border-dark-line'}`}>
                {m.label} ×{m.value}
              </button>
            ))}
          </div>
          {!vehicle && <p className="text-xs text-light-muted dark:text-dark-muted">Cadastre e ative um veículo em Frota para calcular.</p>}
          <button className="btn-primary w-full flex items-center justify-center gap-2" disabled={!ready} onClick={calculate}>
            Calcular preço <ArrowRight size={16} />
          </button>
        </div>

        {result && (
          <>
            <div className="rounded-3xl bg-primary text-white p-5">
              <p className="text-center text-sm text-white/70">Preço total estimado</p>
              <p className="text-center text-5xl font-extrabold my-2 text-accent">{brl(result.total)}</p>
              <dl className="mt-4 pt-4 border-t border-white/20 space-y-2 text-sm">
                {[
                  ['Combustível (trajeto)', result.fuelTrip],
                  ['Deslocamento vazio', result.empty],
                  ['Lucro', result.profit],
                  ['Taxa fixa', result.fee],
                  ...(result.extra > 0 ? [['Multiplicadores', result.extra]] : [])
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between"><dt className="text-white/80">{k}</dt><dd className="font-semibold">{brl(v)}</dd></div>
                ))}
              </dl>
              <p className="mt-4 text-center text-xs text-white/60">Custo por km: {brl(result.c)}</p>
            </div>

            <div className="card p-4 flex items-center justify-between">
              <div><p className="label">Âncora de mercado (Uber/99)</p><p className="text-lg font-bold">{brl(anchor)}</p><p className="text-[11px] text-light-muted dark:text-dark-muted">Estimativa local</p></div>
              <div className="text-right"><p className="label">LinkDrive</p>
                <p className={`text-lg font-bold ${result.total <= anchor ? 'text-secondary' : ''}`}>{brl(result.total)}</p></div>
            </div>

            <button className="btn-cta w-full" onClick={whatsapp}>Enviar orçamento no WhatsApp</button>
          </>
        )}
      </section>
    </main>
  )
}
