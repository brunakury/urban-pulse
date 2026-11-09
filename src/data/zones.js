import { PX, hexOf } from './geo.js'

// ---------- Base sintética (5 zonas) ----------
export const ZONES = [
  { id: 'central', name: 'Zona Central', short: 'Central', lab: 'CENTRAL', pop: 128000, den: 8400, inc: 3200, tr: 78, ivs: 0.38, h: 1, e: 3, t: 1, x: 500, y: 300, r: 130,
    // zr calibrado: raio de 3 km centrado na Zona Central = 42.800 habitantes
    zr: Math.sqrt((135 * 135 * 128000) / 42800) },
  { id: 'norte', name: 'Norte Industrial', short: 'Norte Industrial', lab: 'NORTE INDUSTRIAL', pop: 96000, den: 4100, inc: 2400, tr: 54, ivs: 0.52, h: 1, e: 2, t: 1, x: 360, y: 80, r: 95, zr: 110 },
  { id: 'sul', name: 'Sul Residencial', short: 'Sul Residencial', lab: 'SUL RESIDENCIAL', pop: 112000, den: 6200, inc: 4100, tr: 65, ivs: 0.31, h: 1, e: 2, t: 1, x: 330, y: 520, r: 100, zr: 110 },
  { id: 'leste', name: 'Distrito Leste', short: 'Distrito Leste', lab: 'DISTRITO LESTE', pop: 84000, den: 3800, inc: 1900, tr: 46, ivs: 0.61, h: 1, e: 2, t: 1, x: 800, y: 260, r: 100, zr: 110 },
  { id: 'parque', name: 'Parque Tecnológico West', short: 'Parque Tecnológico West', lab: 'PARQUE TECNOLÓGICO', pop: 54000, den: 2900, inc: 6800, tr: 82, ivs: 0.22, h: 0, e: 1, t: 1, x: 780, y: 500, r: 95, zr: 110 },
].map((z) => ({ ...z, poly: hexOf(z) }))

export const TOTAL_POP = ZONES.reduce((a, z) => a + z.pop, 0) // 474.000

// ---------- Camadas de análise ----------
export const LAYERS = {
  den: { label: 'Densidade populacional', key: 'den', cuts: [2000, 5000, 8000], legend: ['< 2 mil', '2–5 mil', '5–8 mil', '> 8 mil'], unit: 'Densidade / hab. por km²' },
  inc: { label: 'Renda média', key: 'inc', cuts: [2000, 4000, 6000], legend: ['< R$ 2 mil', 'R$ 2–4 mil', 'R$ 4–6 mil', '> R$ 6 mil'], unit: 'Renda média / R$' },
  tr: { label: 'Cobertura de transporte', key: 'tr', cuts: [50, 65, 80], legend: ['< 50%', '50–65%', '65–80%', '> 80%'], unit: 'Cobertura de transporte / %' },
  ivs: { label: 'Vulnerabilidade social', key: 'ivs', cuts: [0.3, 0.4, 0.55], legend: ['< 0,30', '0,30–0,40', '0,40–0,55', '> 0,55'], unit: 'IVS / índice' },
}
export const RAMP = ['#16233a', '#1b3a6b', '#2149a8', '#3B82F6']
export const binOf = (layer, v) => LAYERS[layer].cuts.filter((c) => v >= c).length

// ---------- Equipamentos (19) ----------
export const EQUIPMENT = []
ZONES.forEach((z, zi) => {
  ;[...'H'.repeat(z.h), ...'E'.repeat(z.e), ...'T'.repeat(z.t)].forEach((t, k) => {
    const a = k * 2.2 + zi * 1.3
    const d = (z.id === 'central' ? 75 : 50) + (k % 2) * 28
    EQUIPMENT.push({ t, x: z.x + Math.cos(a) * d, y: z.y + Math.sin(a) * d * 0.8 })
  })
})
export const EQUIP_TYPES = [
  { id: 'UBS', label: 'Unidade Básica de Saúde' },
  { id: 'centro logístico', label: 'Centro logístico' },
  { id: 'terminal', label: 'Terminal de transporte' },
]

// ---------- Formatação ----------
export const fmt = (n) => Math.round(n).toLocaleString('pt-BR')
export const fmtIvs = (v) => v.toFixed(2).replace('.', ',')
export const classify = (v) => (v < 0.33 ? 'baixa' : v < 0.5 ? 'média' : 'alta')

// ---------- Cálculo do cenário ----------
// Área de interseção entre dois círculos (raio de atendimento x zona)
const lens = (r1, r2, d) => {
  if (d >= r1 + r2) return 0
  if (d <= Math.abs(r1 - r2)) return Math.PI * Math.min(r1, r2) ** 2
  const a = r1 * r1 * Math.acos((d * d + r1 * r1 - r2 * r2) / (2 * d * r1))
  const b = r2 * r2 * Math.acos((d * d + r2 * r2 - r1 * r1) / (2 * d * r2))
  const c = 0.5 * Math.sqrt((-d + r1 + r2) * (d + r1 - r2) * (d - r1 + r2) * (d + r1 + r2))
  return a + b - c
}
export function calcScenario(cx, cy, km) {
  const R = km * PX
  let pop = 0, tw = 0, iw = 0
  ZONES.forEach((z) => {
    const f = lens(R, z.zr, Math.hypot(cx - z.x, cy - z.y)) / (Math.PI * z.zr ** 2)
    pop += z.pop * f; tw += z.pop * f * z.tr; iw += z.pop * f * z.ivs
  })
  const near = ZONES.reduce((a, z) => (Math.hypot(cx - z.x, cy - z.y) < Math.hypot(cx - a.x, cy - a.y) ? z : a))
  return { pop: Math.round(pop), tr: pop ? tw / pop : 0, ivs: pop ? iw / pop : 0, near }
}

export function buildCsv() {
  const head = ['Zona', 'Populacao', 'Densidade_km2', 'Renda_media', 'Transporte_pct', 'IVS', 'Hospitais', 'Escolas', 'Terminais']
  const rows = ZONES.map((z) => [z.name, z.pop, z.den, z.inc, z.tr, String(z.ivs).replace('.', ','), z.h, z.e, z.t])
  return [head, ...rows].map((r) => r.join(';')).join('\n')
}
