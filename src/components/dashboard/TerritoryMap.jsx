import { useEffect, useMemo, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Polygon, Polyline, Circle, Marker, useMap, useMapEvents } from 'react-leaflet'
import { Plus, Minus } from 'lucide-react'
import { GRID, RIVER, ROUTE, PX, H, ll } from '../../data/geo.js'
import { ZONES, EQUIPMENT, LAYERS, RAMP, binOf } from '../../data/zones.js'

const BOUNDS = [[0, 0], [600, 1000]]
const pin = (t, sim) => L.divIcon({ className: '', html: `<div class="eq-pin ${sim ? 'sim' : ''}">${t}</div>`, iconSize: [26, 26], iconAnchor: [13, 13] })
const centerIcon = L.divIcon({ className: '', html: '<div class="center-dot"><i></i></div>', iconSize: [28, 28], iconAnchor: [14, 14] })

// Enquadra o território cobrindo toda a área visível (sem tiles remotos: cartografia vetorial)
function Fit() {
  const map = useMap()
  useEffect(() => {
    const z = map.getBoundsZoom(L.latLngBounds(BOUNDS), true)
    map.setMinZoom(z - 1)
    map.setMaxZoom(z + 2)
    map.setView([300, 500], z, { animate: false })
  }, [map])
  return null
}
function Picker({ onPick }) {
  useMapEvents({ click: (e) => onPick(e.latlng.lng, H - e.latlng.lat) })
  return null
}

export default function TerritoryMap({ layer, km, center, onPick, selectedId, extras }) {
  const [map, setMap] = useState(null)
  const L_ = LAYERS[layer]
  const pins = useMemo(() => EQUIPMENT.map((e) => ({ ...e, icon: pin(e.t) })), [])
  const labelIcons = useMemo(() => ZONES.map((z) => L.divIcon({ className: '', html: `<span class="zlabel">${z.lab}</span>`, iconSize: [0, 0] })), [])
  const badgeIcon = useMemo(() => L.divIcon({ className: '', html: `<div class="radius-badge">Raio ativo · ${km} km</div>`, iconSize: [0, 0], iconAnchor: [-18, -6] }), [km])

  const onKey = (e) => {
    const d = { ArrowLeft: [-15, 0], ArrowRight: [15, 0], ArrowUp: [0, -15], ArrowDown: [0, 15] }[e.key]
    if (d) { e.preventDefault(); onPick(center.x + d[0], center.y + d[1]) }
  }

  return (
    <div className="relative isolate min-h-[411px] bg-[#0B111E]" onKeyDown={onKey} tabIndex={0}
      role="application" aria-label="Mapa territorial. Use as setas do teclado para mover o centro do raio. Para ler os dados em texto, ative Tabela acessível.">
      <MapContainer ref={setMap} crs={L.CRS.Simple} center={[300, 500]} zoom={0} zoomSnap={0} zoomDelta={0.5}
        zoomControl={false} attributionControl={false} keyboard={false} style={{ position: 'absolute', inset: 0 }}>
        <Fit />
        <Picker onPick={onPick} />
        {GRID.map(([a, b], i) => <Polyline key={i} positions={[ll(...a), ll(...b)]} pathOptions={{ color: '#1E293B', weight: 1 }} interactive={false} />)}
        <Polyline positions={RIVER.map((p) => ll(...p))} pathOptions={{ color: '#1E3A5F', weight: 40, lineCap: 'round' }} interactive={false} />
        <Polyline positions={RIVER.map((p) => ll(...p))} pathOptions={{ color: '#070D17', weight: 30, lineCap: 'round' }} interactive={false} />
        {ZONES.map((z) => (
          <Polygon key={z.id} positions={z.poly.map((p) => ll(...p))} interactive={false}
            pathOptions={{ color: z.id === selectedId ? '#FFFFFF' : '#334155', weight: z.id === selectedId ? 2 : 1, fillColor: RAMP[binOf(layer, z[L_.key])], fillOpacity: 0.75 }} />
        ))}
        <Polyline positions={ROUTE.map((p) => ll(...p))} pathOptions={{ color: '#2563EB', weight: 3 }} interactive={false} />
        <Circle center={ll(center.x, center.y)} radius={km * PX} interactive={false}
          pathOptions={{ color: '#2563EB', weight: 2, fillColor: '#2563EB', fillOpacity: 0.25 }} />
        {ZONES.map((z, i) => <Marker key={z.id} position={ll(z.x, z.y + (z.id === 'central' ? -22 : 0))} icon={labelIcons[i]} interactive={false} keyboard={false} />)}
        {pins.map((e, i) => <Marker key={i} position={ll(e.x, e.y)} icon={e.icon} interactive={false} keyboard={false} />)}
        {extras.map((e, i) => <Marker key={`x${i}`} position={ll(e.x, e.y)} icon={pin('+', true)} interactive={false} keyboard={false} />)}
        <Marker position={ll(center.x, center.y)} icon={badgeIcon} interactive={false} keyboard={false} />
        <Marker position={ll(center.x, center.y)} icon={centerIcon} draggable keyboard={false} zIndexOffset={1000}
          eventHandlers={{ dragend: (e) => { const p = e.target.getLatLng(); onPick(p.lng, H - p.lat) } }} />
      </MapContainer>

      <div className="absolute right-4 top-4 z-[1000] flex flex-col rounded-md border border-line bg-[#0B0F17]">
        <button type="button" aria-label="Aproximar" onClick={() => map?.zoomIn(0.5)} className="grid h-11 w-10 place-items-center text-white"><Plus size={18} /></button>
        <button type="button" aria-label="Afastar" onClick={() => map?.zoomOut(0.5)} className="grid h-11 w-10 place-items-center border-t border-line text-white"><Minus size={18} /></button>
      </div>

      <div className="absolute bottom-4 left-4 z-[1000] w-[calc(100%-96px)] max-w-[550px] rounded-md border border-[#1F2937] bg-[rgba(11,15,23,0.9)] px-3.5 py-3 text-[#9CA3AF]">
        <p className="mono-label text-[10px]">{L_.unit}</p>
        <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[12px]">
          {L_.legend.map((t, i) => (
            <li key={t} className="flex items-center gap-2"><span aria-hidden className="inline-block h-[6px] w-5" style={{ background: RAMP[i] }} />{t}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
