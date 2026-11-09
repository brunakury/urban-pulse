import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer } from 'recharts'
import { ZONES } from '../../data/zones.js'

const data = ZONES.map((z) => ({ id: z.id, name: z.short, v: z.tr }))
const valueOf = (n) => `${data.find((d) => d.name === n)?.v}%`
const Tick = ({ x, y, payload, textAnchor, right }) => (
  <text x={x} y={y} dy={4} textAnchor={textAnchor} fontSize="12" fontFamily="Inter" style={{ fill: right ? 'var(--tx)' : 'var(--t2)' }}>
    {right ? valueOf(payload.value) : payload.value}
  </text>
)

export default function TransportChart({ selectedId }) {
  return (
    <section className="flex flex-col rounded-lg border border-line bg-surface p-6" aria-labelledby="tc-title">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="tc-title" className="font-sora text-[22px] font-normal text-tx">Cobertura de transporte</h2>
        <span className="text-[11px] text-t2">Transporte &nbsp;/&nbsp; Camada ativa</span>
      </div>
      <p className="mb-5 mt-1 text-[12px] text-t2">Comparativo por zona · dados sintéticos</p>
      <div aria-hidden className="h-[190px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 0 }} barCategoryGap={16}>
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis yAxisId="l" type="category" dataKey="name" width={188} axisLine={false} tickLine={false} tick={<Tick />} />
            <YAxis yAxisId="r" orientation="right" type="category" dataKey="name" width={44} axisLine={false} tickLine={false} tick={<Tick right />} />
            <Bar yAxisId="l" dataKey="v" barSize={5} radius={3} background={{ fill: '#1F2937', radius: 3 }} isAnimationActive={false}>
              {data.map((d) => <Cell key={d.id} fill={d.id === selectedId ? '#2563EB' : '#6B7280'} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table className="sr-only">
        <caption>Cobertura de transporte por zona</caption>
        <thead><tr><th scope="col">Zona</th><th scope="col">Cobertura</th></tr></thead>
        <tbody>{data.map((d) => <tr key={d.id}><th scope="row">{d.name}</th><td>{d.v}%</td></tr>)}</tbody>
      </table>
    </section>
  )
}
