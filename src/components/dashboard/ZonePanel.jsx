import { fmt, fmtIvs, classify } from '../../data/zones.js'

export default function ZonePanel({ zone }) {
  const rows = [
    ['Densidade', `${fmt(zone.den)} hab./km²`],
    ['Renda média', `R$ ${fmt(zone.inc)}`],
    ['Transporte', `${zone.tr}%`],
    ['IVS', `${fmtIvs(zone.ivs)} · ${classify(zone.ivs)}`],
  ]
  return (
    <div className="border-t border-line bg-surface p-6 lg:border-l lg:border-t-0" aria-live="polite">
      <p className="mono-label text-t2">Zona selecionada</p>
      <h3 className="mt-5 font-sora text-[26px] font-normal leading-tight text-tx">{zone.name}</h3>
      <p className="mt-2 text-[13px] text-t2">Detalhamento territorial</p>
      <hr className="my-5 border-line" />
      <dl className="grid grid-cols-[1fr_1.2fr] gap-x-2 gap-y-6 text-[13px]">
        {rows.map(([k, v]) => (<div key={k} className="contents"><dt className="text-t2">{k}</dt><dd className="text-tx">{v}</dd></div>))}
      </dl>
      <p className="mt-10 text-[13px] text-t2">Equipamentos</p>
      <p className="mt-2 text-[12px] text-tx">
        {zone.h} hospital · {zone.e} {zone.e === 1 ? 'escola' : 'escolas'} · {zone.t} terminal
      </p>
    </div>
  )
}
