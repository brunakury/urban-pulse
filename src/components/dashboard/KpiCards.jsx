import { fmt, fmtIvs, classify, TOTAL_POP } from '../../data/zones.js'

function Kpi({ label, value, caption }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <p className="text-[13px] text-t2">{label}</p>
      <p className="my-1 text-[36px] font-semibold leading-[1.2] tracking-[-0.02em] text-tx">{value}</p>
      <p className="text-[11px] text-t2">{caption}</p>
    </div>
  )
}

export default function KpiCards({ scenario, km }) {
  const { pop, tr, ivs, near } = scenario
  const share = ((pop / TOTAL_POP) * 100).toFixed(1).replace('.', ',')
  return (
    <section aria-label="Indicadores do cenário" className="grid gap-4 md:grid-cols-3">
      <Kpi label="População no raio" value={fmt(pop)} caption={`${share}% da base demonstrativa`} />
      <Kpi label="Cobertura de transporte" value={`${Math.round(tr)}%`} caption={`${near.name} · raio de ${km} km`} />
      <Kpi label="Vulnerabilidade social" value={fmtIvs(ivs)} caption={`Classificação: ${classify(ivs)}`} />
    </section>
  )
}
