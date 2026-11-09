import { ChevronDown, Plus } from 'lucide-react'
import { LAYERS, EQUIP_TYPES } from '../../data/zones.js'

export default function Sidebar({ layer, setLayer, equip, setEquip, km, setKm, onAdd, extras }) {
  return (
    <aside className="no-print flex flex-col rounded-lg border border-line bg-surface p-5" aria-label="Controles da simulação">
      <p className="mono-label text-t2">Estudo territorial</p>
      <h1 className="mt-4 font-sora text-[28px] font-normal leading-tight text-tx">Cenário 01</h1>
      <p className="mt-1 text-[13px] text-t2">Base demonstrativa · 5 zonas</p>
      <hr className="my-6 border-line" />

      <h2 className="mb-4 text-[14px] font-normal text-tx">Camada de análise</h2>
      <div className="flex flex-col gap-[5px]">
        {Object.entries(LAYERS).map(([k, l]) => (
          <button key={k} type="button" aria-pressed={layer === k} onClick={() => setLayer(k)}
            className={`h-10 rounded-[4px] border px-3 text-left text-[13px] ${layer === k ? 'border-brand bg-brand text-white' : 'border-line bg-transparent text-t2 hover:bg-line'}`}>
            {l.label}
          </button>
        ))}
      </div>

      <label htmlFor="equip" className="mb-3 mt-8 block text-[14px] text-tx">Equipamento simulado</label>
      <div className="relative">
        <select id="equip" value={equip} onChange={(e) => setEquip(e.target.value)} className="h-12 w-full cursor-pointer appearance-none rounded-[4px] border border-line bg-field px-3 text-[13px] text-tx">
          {EQUIP_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>
        <ChevronDown size={14} className="pointer-events-none absolute right-3 top-[17px] text-t2" aria-hidden />
      </div>

      <div className="mb-3 mt-8 flex items-baseline justify-between">
        <label htmlFor="km" className="text-[14px] text-tx">Raio de atendimento</label>
        <output htmlFor="km" className="font-sora text-[22px] text-tx">{km} km</output>
      </div>
      <input id="km" type="range" min="1" max="10" step="1" value={km} onChange={(e) => setKm(+e.target.value)}
        className="up-range" style={{ '--p': `${((km - 1) / 9) * 100}%` }} aria-valuetext={`${km} quilômetros`} />
      <div className="mt-2 flex justify-between text-[11px] text-t2"><span>1 km</span><span>10 km</span></div>

      <button type="button" onClick={onAdd} className="mt-8 flex h-11 w-full items-center justify-between rounded-md bg-brand px-5 text-[14px] font-medium text-white hover:bg-brandHover">
        Adicionar ponto <Plus size={14} aria-hidden />
      </button>
      <p className="mt-5 text-[12px] leading-[1.5] text-t2">Clique no mapa para definir o centro. Arraste o ponto para comparar outra localização.</p>

      <div className="mt-auto border-t border-line pt-5 text-[11px] text-t2">
        <p>H Hospital&nbsp;&nbsp; E Escola&nbsp;&nbsp; T Terminal</p>
        <p className="mt-4">19 equipamentos na base sintética{extras > 0 && ` + ${extras} simulado${extras > 1 ? 's' : ''}`}</p>
      </div>
    </aside>
  )
}
