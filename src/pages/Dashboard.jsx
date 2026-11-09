import { useMemo, useState } from 'react'
import TopBar from '../components/dashboard/TopBar.jsx'
import Sidebar from '../components/dashboard/Sidebar.jsx'
import KpiCards from '../components/dashboard/KpiCards.jsx'
import TerritoryMap from '../components/dashboard/TerritoryMap.jsx'
import ZonePanel from '../components/dashboard/ZonePanel.jsx'
import AccessibleTable from '../components/dashboard/AccessibleTable.jsx'
import TransportChart from '../components/dashboard/TransportChart.jsx'
import AiCard from '../components/dashboard/AiCard.jsx'
import { ZONES, LAYERS, calcScenario, buildCsv } from '../data/zones.js'

export default function Dashboard() {
  const [theme, setTheme] = useState('dark')
  const [table, setTable] = useState(false)
  const [layer, setLayer] = useState('den')
  const [equip, setEquip] = useState('UBS')
  const [km, setKm] = useState(3)
  const [center, setCenter] = useState({ x: 500, y: 300 })
  const [selId, setSelId] = useState('central')
  const [extras, setExtras] = useState([])
  const [status, setStatus] = useState('')

  const scenario = useMemo(() => calcScenario(center.x, center.y, km), [center, km])
  const zone = ZONES.find((z) => z.id === selId)

  const pick = (x, y) => {
    const c = { x: Math.max(0, Math.min(1000, x)), y: Math.max(0, Math.min(600, y)) }
    setCenter(c)
    setSelId(calcScenario(c.x, c.y, km).near.id)
  }
  const selectZone = (z) => { setSelId(z.id); setCenter({ x: z.x, y: z.y }) }
  const toggle = () => {
    setTable(!table)
    setStatus(!table ? 'Exibindo tabela acessível.' : 'Exibindo mapa.')
    requestAnimationFrame(() => document.getElementById('explorer-title')?.focus())
  }
  const exportCsv = () => {
    const url = URL.createObjectURL(new Blob(['\ufeff' + buildCsv()], { type: 'text/csv;charset=utf-8' }))
    const a = document.createElement('a')
    a.href = url; a.download = 'urbanpulse-cenario-01.csv'; a.click()
    URL.revokeObjectURL(url)
    setStatus('Arquivo CSV exportado.')
  }
  const addPoint = () => { setExtras([...extras, { ...center }]); setStatus(`Ponto simulado adicionado: ${equip}, raio de ${km} km.`) }

  return (
    <div className={`${theme === 'light' ? 'theme-light' : ''} min-h-screen bg-canvas font-inter text-tx`}>
      <TopBar theme={theme} setTheme={setTheme} table={table} onToggle={toggle} onCsv={exportCsv} onPdf={() => window.print()} />
      <div className="grid gap-6 p-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar layer={layer} setLayer={setLayer} equip={equip} setEquip={setEquip} km={km} setKm={setKm} onAdd={addPoint} extras={extras.length} />
        <main className="flex min-w-0 flex-col gap-6">
          <KpiCards scenario={scenario} km={km} />
          <section aria-labelledby="explorer-title">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
              <h2 id="explorer-title" tabIndex={-1} className="font-sora text-[22px] font-normal text-tx">
                {table ? 'Tabela territorial acessível' : 'Explorador territorial'}
              </h2>
              <p className="text-[12px] text-t2">
                {table ? 'Mesmos dados, outra forma de explorar.' : <>Mapa ativo &nbsp;/&nbsp; {LAYERS[layer].label}</>}
              </p>
            </div>
            {table ? (
              <>
                <AccessibleTable selectedId={selId} onSelect={selectZone} />
                <p className="mono-label mt-6 text-t2">Base sintética / apenas para demonstração visual</p>
                <p className="mt-3 text-[13px] text-t2">Manter busca, ordenação, exportação CSV e leitura por tecnologia assistiva.</p>
              </>
            ) : (
              <div className="grid overflow-hidden rounded-lg border border-line lg:grid-cols-[minmax(0,1fr)_288px]">
                <TerritoryMap layer={layer} km={km} center={center} onPick={pick} selectedId={selId} extras={extras} />
                <ZonePanel zone={zone} />
              </div>
            )}
          </section>
          <div className="grid gap-6 lg:grid-cols-[628fr_436fr]">
            <TransportChart selectedId={selId} />
            <AiCard scenario={scenario} equip={equip === 'UBS' ? 'UBS' : equip} />
          </div>
        </main>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{status}</p>
    </div>
  )
}
