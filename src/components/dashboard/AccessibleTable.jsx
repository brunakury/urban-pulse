import { useMemo, useState } from 'react'
import { ChevronDown, ArrowUp } from 'lucide-react'
import { ZONES, TOTAL_POP, fmt, fmtIvs } from '../../data/zones.js'

const SORTS = { name: 'nome A–Z', pop: 'população', den: 'densidade', inc: 'renda média', tr: 'transporte', ivs: 'IVS' }

export default function AccessibleTable({ selectedId, onSelect }) {
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('name')
  const rows = useMemo(() => {
    const f = ZONES.filter((z) => z.name.toLowerCase().includes(q.trim().toLowerCase()))
    return f.sort((a, b) => (sort === 'name' ? a.name.localeCompare(b.name, 'pt-BR') : b[sort] - a[sort]))
  }, [q, sort])

  const th = 'px-3 py-[18px] text-left text-[13px] font-normal text-t2'
  const td = 'border-t border-line px-3 py-[26px] text-[13px] text-tx'
  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <label htmlFor="q" className="sr-only">Buscar zona por nome</label>
          <input id="q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar zona por nome..."
            className="h-12 w-full min-w-[260px] rounded-[4px] border border-line bg-field px-4 text-[13px] text-tx placeholder:text-t2 md:w-[440px]" />
        </div>
        <div className="flex items-center gap-2 text-[13px] text-t2">
          <span aria-live="polite">{rows.length} {rows.length === 1 ? 'zona' : 'zonas'}</span><span aria-hidden>·</span>
          <label className="relative">
            <span className="sr-only">Ordenar por</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="cursor-pointer appearance-none bg-transparent pr-5 text-[13px] text-t2">
              {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>Ordenar: {v}</option>)}
            </select>
            <ChevronDown size={12} className="pointer-events-none absolute right-0 top-[5px]" aria-hidden />
          </label>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse">
          <caption className="sr-only">Indicadores demográficos, de transporte e de vulnerabilidade por zona urbana</caption>
          <thead className="bg-canvas">
            <tr>
              <th scope="col" className={th}><span className="inline-flex items-center gap-1">Zona urbana {sort === 'name' && <ArrowUp size={11} aria-hidden />}</span></th>
              {['População', 'Densidade / km²', 'Renda média', 'Transporte', 'IVS', 'Equipamentos'].map((h) => <th key={h} scope="col" className={th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((z) => (
              <tr key={z.id} className={z.id === selectedId ? 'bg-[rgba(37,99,235,0.15)]' : 'hover:bg-line'}>
                <th scope="row" className={`${td} text-left font-normal`}>
                  <button type="button" onClick={() => onSelect(z)} aria-current={z.id === selectedId} className="text-left underline decoration-strong underline-offset-4">{z.name}</button>
                </th>
                <td className={td}>{fmt(z.pop)}</td>
                <td className={td}>{fmt(z.den)}</td>
                <td className={td}>R$ {fmt(z.inc)}</td>
                <td className={td}>{z.tr}%</td>
                <td className={td}>{fmtIvs(z.ivs)}</td>
                <td className={td}>{z.h} H · {z.e} E · {z.t} T</td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={7} className={td}>Nenhuma zona encontrada para “{q}”.</td></tr>}
          </tbody>
          <tfoot className="bg-canvas">
            <tr>
              <th scope="row" className="px-3 py-5 text-left text-[13px] font-normal text-tx">Total da base</th>
              <td className="px-3 py-5 text-[13px] text-tx">{fmt(TOTAL_POP)}</td>
              <td colSpan={4} />
              <td className="px-3 py-5 text-[13px] text-tx">19 equipamentos</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="mt-5 text-[12px] text-t2">H = hospital&nbsp;&nbsp; E = escola&nbsp;&nbsp; T = terminal</p>
    </div>
  )
}
