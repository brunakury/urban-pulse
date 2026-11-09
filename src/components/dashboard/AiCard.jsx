import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { fmt, fmtIvs, classify } from '../../data/zones.js'

export default function AiCard({ scenario, equip }) {
  const [open, setOpen] = useState(false)
  const { pop, tr, ivs, near } = scenario
  return (
    <section className="flex flex-col rounded-lg border border-line bg-surface p-6" aria-labelledby="ai-title">
      <h2 id="ai-title" className="font-sora text-[22px] font-normal text-tx">UrbanPulse AI</h2>
      <p className="mt-1 text-[12px] text-t2">Contexto da simulação atual</p>
      <h3 className="mt-7 font-sora text-[26px] font-normal leading-[1.25] tracking-[-0.01em] text-tx">Compare o alcance antes de expandir.</h3>
      <p className="mt-8 text-[14px] leading-[1.6] text-t2">
        A {near.name} reúne {fmt(pop)} habitantes no raio ativo. Considere transporte e vulnerabilidade para avaliar a próxima {equip}.
      </p>
      {open && (
        <p className="mb-4 border-l-2 border-brand pl-3 text-[13px] text-t2">
          Cobertura média de {Math.round(tr)}% e IVS {fmtIvs(ivs)} ({classify(ivs)}) no recorte. Raio geográfico demonstrativo, não representa isócrona de tempo. Valide antes de decidir.
        </p>
      )}
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="no-print mt-auto inline-flex items-center gap-2 self-start text-[14px] text-tx">
        Abrir conversa <ArrowUpRight size={14} aria-hidden />
      </button>
    </section>
  )
}
