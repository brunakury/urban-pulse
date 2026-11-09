import { GRID, RIVER, ROUTE, PX } from '../data/geo.js'
import { ZONES, EQUIPMENT, RAMP, binOf } from '../data/zones.js'

const THEME = {
  light: { bg: '#F4F7FB', grid: '#E1E8F2', riverEdge: '#D3DDEB', riverFill: '#E9EEF6', zone: '#E6ECF8', zoneStroke: '#CBD7EC', radiusFill: 'rgba(37,99,235,.12)', pin: '#0B0F17', pinStroke: 'none', label: '#0B0F17', muted: '#6B7280' },
  dark: { bg: '#0B111E', grid: '#1E293B', riverEdge: '#1E3A5F', riverFill: '#070D17', zone: '#16233a', zoneStroke: '#334155', radiusFill: 'rgba(37,99,235,.25)', pin: '#0B111E', pinStroke: '#E5E7EB', label: '#CBD5E1', muted: '#9CA3AF' },
}

/** Ilustração cartográfica estática (SVG) usada na landing e no relatório. */
export default function MapArt({
  variant = 'light', viewBox = '0 0 1000 600', radiusKm = 3, badge = false, labels = true,
  ramp = false, north = true, scale = true, caption = true, className = '', title = 'Mapa ilustrativo do território com zonas, equipamentos e raio de atendimento',
}) {
  const c = THEME[variant]
  const river = RIVER.map((p) => p.join(',')).join(' ')
  return (
    <svg viewBox={viewBox} preserveAspectRatio="xMidYMid slice" role="img" aria-label={title} className={className}>
      <rect x="-300" y="-300" width="1600" height="1200" fill={c.bg} />
      {GRID.map(([a, b], i) => <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={c.grid} />)}
      <polyline points={river} fill="none" stroke={c.riverEdge} strokeWidth="44" strokeLinejoin="round" />
      <polyline points={river} fill="none" stroke={c.riverFill} strokeWidth="32" strokeLinejoin="round" />
      {ZONES.map((z) => (
        <polygon key={z.id} points={z.poly.map((p) => p.join(',')).join(' ')}
          fill={ramp ? RAMP[binOf('den', z.den)] : c.zone} fillOpacity={ramp ? 0.75 : 0.85} stroke={c.zoneStroke} />
      ))}
      <polyline points={ROUTE.map((p) => p.join(',')).join(' ')} fill="none" stroke="#2563EB" strokeWidth="3" />
      <circle cx="500" cy="300" r={radiusKm * PX} fill={c.radiusFill} stroke="#2563EB" strokeWidth="2" />
      {labels && ZONES.map((z) => (
        <text key={z.id} x={z.x} y={z.y + (z.id === 'central' ? -10 : 4)} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" letterSpacing="1.1" fill={c.label} fontWeight={variant === 'light' && z.id === 'central' ? 700 : 500}>{z.lab}</text>
      ))}
      {EQUIPMENT.map((e, i) => (
        <g key={i} transform={`translate(${e.x.toFixed(0)} ${e.y.toFixed(0)})`}>
          <circle r="13" fill={c.pin} stroke={c.pinStroke} strokeWidth="1.5" />
          <text y="4" textAnchor="middle" fontSize="12" fontFamily="Inter" fill="#fff">{e.t}</text>
        </g>
      ))}
      <circle cx="500" cy="300" r="14" fill="rgba(37,99,235,.35)" />
      <circle cx="500" cy="300" r="6" fill="#fff" stroke="#2563EB" strokeWidth="2" />
      {badge && (
        <g transform="translate(518 306)">
          <rect width="118" height="32" fill="#2563EB" />
          <text x="59" y="21" textAnchor="middle" fontFamily="Inter" fontSize="13" fill="#fff">Raio ativo · {radiusKm} km</text>
        </g>
      )}
      {north && <text x="965" y="30" textAnchor="end" fontFamily="JetBrains Mono" fontSize="12" fill={c.muted}>N ↑</text>}
      {scale && (
        <g fontFamily="JetBrains Mono" fontSize="10" fill={c.muted}>
          <line x1="900" y1="578" x2="945" y2="578" stroke={c.muted} />
          <text x="900" y="565">0</text><text x="945" y="565" textAnchor="end">1 km</text>
        </g>
      )}
      {caption && <text x="20" y="582" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1" fill={c.muted}>CARTOGRAFIA ILUSTRATIVA</text>}
    </svg>
  )
}
