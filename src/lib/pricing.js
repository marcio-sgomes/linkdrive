// Motor de cálculo (seção 3 da especificação)
export const MULTIPLIERS = {
  rain: { label: 'Chuva', value: 1.2 },
  night: { label: 'Madrugada', value: 1.15 },
  traffic: { label: 'Trânsito', value: 1.1 }
}

export const costPerKm = (fuelPrice, kmPerLiter) => (kmPerLiter > 0 ? fuelPrice / kmPerLiter : 0)

// Consumo pelo "Método da Bomba": km rodados ÷ litros abastecidos
export const kmPerLiterFromPump = (km, liters) => (liters > 0 ? km / liters : 0)

export function calcRide({ emptyKm, tripKm, fuelPrice, kmPerLiter, margin = 2, fee = 5, active = [] }) {
  const c = costPerKm(fuelPrice, kmPerLiter)
  const fuelTrip = tripKm * c
  const empty = emptyKm * c
  const profit = fuelTrip * (margin - 1)
  const subtotal = empty + fuelTrip + profit + fee
  const mult = active.reduce((acc, k) => acc * MULTIPLIERS[k].value, 1)
  const total = subtotal * mult
  return { c, fuelTrip, empty, profit, fee, extra: total - subtotal, total, mult }
}

// Âncora de mercado: ESTIMATIVA local até integrar uma fonte real de preço Uber/99
export const marketAnchor = (tripKm, minutes = 0) => 4 + tripKm * 1.9 + minutes * 0.35

export const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
