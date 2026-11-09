import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import MapArt from '../components/MapArt.jsx'
import { ZONES } from '../data/zones.js'

const wrap = 'mx-auto w-full max-w-[1440px] px-6 md:px-20'
const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const Over = ({ children, dark }) => (
  <p className={`font-mono text-[11px] font-medium uppercase tracking-[.1em] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{children}</p>
)
const H2 = ({ children, dark, className = '' }) => (
  <h2 className={`font-sora font-normal leading-[1.1] tracking-[-0.02em] text-[clamp(34px,4.1vw,60px)] ${dark ? 'text-white' : 'text-night'} ${className}`}>{children}</h2>
)
const Cta = ({ children = 'Solicitar demonstração' }) => (
  <Link to="/app" className="inline-flex h-12 items-center gap-2 rounded-[4px] bg-brand px-6 text-[14px] font-medium text-white hover:bg-brandHover">
    {children} <ArrowUpRight size={14} aria-hidden />
  </Link>
)
const Fig = ({ left, right, dark }) => (
  <div className={`mt-4 flex flex-wrap justify-between gap-2 font-mono text-[11px] uppercase tracking-[.08em] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
    <span>{left}</span><span>{right}</span>
  </div>
)

function Nav() {
  const link = 'text-[13px] text-night hover:underline underline-offset-4'
  return (
    <header className={`${wrap} flex h-[84px] items-center gap-6`}>
      <Link to="/" className="font-sora text-[24px] font-semibold lowercase tracking-[-0.01em] text-night">urbanpulse</Link>
      <span className="hidden text-[12px] text-slate-600 md:block">Inteligência territorial</span>
      <nav aria-label="Principal" className="ml-auto hidden items-center gap-10 md:flex">
        <button className={link} onClick={() => go('plataforma')}>Plataforma</button>
        <button className={link} onClick={() => go('aplicacoes')}>Aplicações</button>
        <button className={link} onClick={() => go('metodo')}>Método</button>
      </nav>
      <div className="ml-auto md:ml-8"><Link to="/app" className="inline-flex h-10 items-center gap-2 rounded-[4px] bg-brand px-5 text-[13px] font-medium text-white hover:bg-brandHover">Solicitar demonstração <ArrowUpRight size={13} aria-hidden /></Link></div>
    </header>
  )
}

function Hero() {
  return (
    <>
      <section className={`${wrap} pb-14 pt-8`}>
        <Over>Onde investir. Onde expandir. Onde fazer diferença.</Over>
        <h1 className="mt-6 font-sora font-normal leading-[1.02] tracking-[-0.035em] text-night text-[clamp(52px,8.2vw,118px)]">
          O território revela.<br />Você decide.
        </h1>
        <div className="mt-12 grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <p className="max-w-[480px] text-[18px] leading-[1.5] text-night">Inteligência territorial para planejar serviços, avaliar expansão e orientar investimentos.</p>
          <div className="flex flex-col items-start gap-4 md:mr-16">
            <Cta />
            <button onClick={() => go('plataforma')} className="inline-flex items-center gap-2 text-[13px] text-slate-600">Conheça a plataforma <ArrowDown size={13} aria-hidden /></button>
          </div>
        </div>
      </section>
      <section aria-label="Cartografia de abertura">
        <div className="relative h-[clamp(320px,40vw,580px)] w-full overflow-hidden">
          <MapArt variant="light" className="absolute inset-0 h-full w-full" badge={false} caption={false} />
          <div className="absolute right-[6%] top-[28%] hidden w-[min(330px,40%)] border-l-2 border-brand bg-white p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,.08)] md:block">
            <p className="font-mono text-[10px] uppercase tracking-[.1em] text-slate-500">Estudo ilustrativo / Localização</p>
            <p className="mt-3 font-sora text-[28px] font-normal leading-[1.1] tracking-[-0.02em] text-night">Onde instalar<br />a próxima UBS?</p>
            <p className="mt-3 text-[12px] leading-[1.5] text-slate-600">Cruze demanda, acesso e vulnerabilidade antes de definir o ponto.</p>
          </div>
        </div>
        <div className={wrap}><Fig left="FIG. 01 — O território como contexto de uma decisão." right="Cartografia ilustrativa · dados sintéticos" /></div>
      </section>
    </>
  )
}

function Audience() {
  return (
    <section className="bg-night py-16 text-white">
      <div className={`${wrap} grid items-center gap-10 md:grid-cols-2`}>
        <h2 className="font-sora text-[clamp(26px,2.6vw,36px)] font-normal leading-[1.2] tracking-[-0.01em]">Para quem decide<br />o futuro do território.</h2>
        <ul className="space-y-6 text-[15px] text-slate-200">
          <li>Governos e gestores públicos</li><li>Operadores logísticos e de mobilidade</li><li>Varejo, infraestrutura e desenvolvimento urbano</li>
        </ul>
      </div>
    </section>
  )
}

function Method() {
  const steps = [
    ['01', 'Conhecer', 'Relacione demografia, renda, mobilidade e vulnerabilidade para entender cada região.', 'Mapeamento territorial'],
    ['02', 'Simular', 'Avalie o alcance de um novo equipamento e ajuste a localização e o raio de atendimento.', 'Simulação geoespacial'],
    ['03', 'Fundamentar', 'Compare indicadores e leve parâmetros, mapas e sínteses para o relatório executivo.', 'Análise contextual e relatórios'],
  ]
  return (
    <section id="plataforma" className={`${wrap} py-24`}>
      <Over>Como a plataforma organiza a análise</Over>
      <div className="mt-6 grid gap-8 md:grid-cols-[1.6fr_1fr] md:items-end">
        <H2>Do dado isolado<br />à decisão fundamentada.</H2>
        <p className="max-w-[260px] text-[13px] leading-[1.5] text-slate-600">Dados, simulações e sínteses no mesmo recorte territorial.</p>
      </div>
      <div className="mt-20 grid gap-10 md:grid-cols-3">
        {steps.map(([n, t, d, l]) => (
          <div key={n} className="flex flex-col">
            <p className="font-mono text-[13px] text-brand">{n}</p>
            <h3 className="mt-6 font-sora text-[28px] font-normal tracking-[-0.01em]">{t}</h3>
            <p className="mt-3 max-w-[290px] text-[13px] leading-[1.6] text-slate-600">{d}</p>
            <p className="mt-12 border-t border-slate-200 pt-4 text-[12px] text-slate-600">{l}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Study() {
  return (
    <section id="metodo" className="bg-night py-20 text-white">
      <div className={wrap}>
        <Over dark>01 / Estudo territorial</Over>
        <div className="mt-6 grid gap-8 md:grid-cols-[1.6fr_1fr] md:items-end">
          <H2 dark>Antes de construir,<br />compare o alcance.</H2>
          <p className="max-w-[260px] text-[13px] leading-[1.5] text-slate-300">Avalie o recorte de atendimento antes de escolher a localização do próximo equipamento.</p>
        </div>
        <div className="mt-10 grid gap-6 text-[12px] text-slate-300 md:grid-cols-[2fr_1fr]">
          <div className="flex justify-between"><span>Camada em análise</span><b className="font-medium text-white">Densidade populacional</b><b className="font-medium text-white md:mr-0">Raio ativo: 3 km</b></div>
        </div>
        <div className="mt-3 grid gap-8 md:grid-cols-[2fr_1fr]">
          <div className="relative h-[clamp(300px,34vw,430px)] overflow-hidden border border-[#1F2937]">
            <MapArt variant="dark" ramp badge className="absolute inset-0 h-full w-full" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[10px] uppercase tracking-[.1em] text-slate-400">Cenário demonstrativo</p>
            <p className="mt-4 font-sora text-[22px] font-normal">UBS / Zona Central</p>
            <p className="mt-8 font-sora text-[clamp(48px,5vw,72px)] font-normal leading-none tracking-[-0.02em]">42.800</p>
            <p className="mt-2 text-[13px] text-slate-300">habitantes no raio de 3 km</p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div><p className="font-sora text-[40px] font-normal leading-none">78%</p><p className="mt-2 text-[12px] text-slate-300">Cobertura de<br />transporte</p></div>
              <div><p className="font-sora text-[40px] font-normal leading-none">0,38</p><p className="mt-2 text-[12px] text-slate-300">IVS médio<br />da área</p></div>
            </div>
            <p className="mt-8 max-w-[300px] text-[11px] leading-[1.5] text-slate-400">Raio geográfico demonstrativo. Não representa uma isócrona de tempo.</p>
          </div>
        </div>
        <Fig dark left="FIG. 02 — Comparação espacial com centro, equipamento e raio explícitos." right="Dados sintéticos" />
      </div>
    </section>
  )
}

function Compare() {
  return (
    <section className={`${wrap} py-24`}>
      <Over>02 / Leitura comparativa</Over>
      <div className="mt-6 grid gap-12 md:grid-cols-2">
        <div className="flex flex-col">
          <H2>Uma cidade não cabe<br />em uma média.</H2>
          <p className="mt-20 font-sora text-[clamp(48px,5vw,72px)] font-normal leading-none tracking-[-0.02em]">46–82%</p>
          <p className="mt-3 max-w-[260px] text-[13px] leading-[1.5] text-slate-600">de cobertura de transporte no conjunto demonstrativo.</p>
          <p className="mt-12 max-w-[360px] text-[12px] text-slate-600">Compare zonas antes de transformar uma média em prioridade de investimento.</p>
        </div>
        <div>
          <div className="bg-night p-5 text-white">
            <p className="font-sora text-[15px]">Cobertura de transporte</p>
            <p className="mt-1 text-[10px] text-slate-400">Comparativo por zona · dados sintéticos</p>
            <div className="mt-5 space-y-3">
              {ZONES.map((z) => (
                <div key={z.id} className="grid grid-cols-[110px_1fr_32px] items-center gap-4 text-[10px] text-slate-300">
                  <span>{z.short.replace('Parque Tecnológico West', 'Parque Tecnológico West')}</span>
                  <div className="h-[4px] bg-[#1F2937]" role="img" aria-label={`${z.short}: ${z.tr}%`}><div className={`h-full ${z.id === 'central' ? 'bg-brand' : 'bg-slate-500'}`} style={{ width: `${z.tr}%` }} /></div>
                  <span className="text-right text-white">{z.tr}%</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-[12px] text-slate-600">A comparação revela diferenças que um indicador agregado não mostra.</p>
          <Fig left="FIG. 03 — Cobertura por zona · valores sintéticos" />
        </div>
      </div>
    </section>
  )
}

function Context() {
  const rows = [['Alcance', '42.800 habitantes no recorte simulado.'], ['Acesso', '78% de cobertura de transporte na área.'], ['Contexto social', 'IVS médio de 0,38. Leia em conjunto com os demais indicadores.']]
  return (
    <section className="bg-sky py-24">
      <div className={`${wrap} grid gap-12 md:grid-cols-2`}>
        <div>
          <Over>03 / Análise contextual</Over>
          <H2 className="mt-6">Da análise<br />ao argumento.</H2>
          <p className="mt-12 max-w-[420px] text-[14px] leading-[1.6] text-slate-700">O UrbanPulse AI organiza o contexto da simulação em uma síntese que pode ser discutida, revisada e levada à decisão.</p>
          <div className="mt-20 max-w-[480px] border-t-2 border-night bg-white p-5">
            <p className="font-mono text-[10px] uppercase tracking-[.1em] text-slate-500">Pergunta à análise</p>
            <p className="mt-3 text-[14px] text-night">O que considerar antes de priorizar uma nova UBS?</p>
          </div>
          <p className="mt-6 text-[12px] text-slate-600">A síntese apoia a avaliação. A decisão continua com quem conhece o território.</p>
        </div>
        <article className="self-start border-t-2 border-night bg-white p-8" aria-label="Nota de análise do UrbanPulse AI">
          <p className="font-mono text-[10px] uppercase tracking-[.1em] text-slate-500">UrbanPulse AI / Nota de análise</p>
          <h3 className="mt-6 font-sora text-[30px] font-normal leading-[1.15] tracking-[-0.01em]">O que este cenário<br />permite avaliar.</h3>
          <p className="mt-3 text-[11px] text-slate-600">UBS · Zona Central · raio geográfico de 3 km</p>
          <dl className="mt-8 space-y-5 text-[13px]">
            {rows.map(([k, v]) => (<div key={k} className="grid grid-cols-[110px_1fr] gap-4"><dt className="text-[11px] text-brand">{k}</dt><dd className="text-night">{v}</dd></div>))}
          </dl>
          <div className="mt-10 border-t border-slate-200 pt-4">
            <p className="text-[11px] text-brand">Limite da análise</p>
            <p className="mt-2 text-[12px] leading-[1.5] text-slate-600">Esses indicadores não determinam, sozinhos, a localização ideal de uma nova unidade.</p>
            <p className="mt-6 text-[11px] text-slate-600">Exemplo ilustrativo · validar antes de decidir.</p>
          </div>
        </article>
      </div>
    </section>
  )
}

function Sectors() {
  const list = [['02', 'Mobilidade urbana', 'Como ampliar o acesso ao transporte?'], ['03', 'Logística', 'Onde posicionar a próxima base logística?'], ['04', 'Varejo', 'Quais regiões merecem avaliar uma expansão?'], ['05', 'Infraestrutura', 'Que vulnerabilidades pesam no investimento?']]
  return (
    <section id="aplicacoes" className={`${wrap} py-24`}>
      <Over>04 / Aplicações</Over>
      <div className="mt-6 grid gap-8 md:grid-cols-[1.6fr_1fr] md:items-end">
        <H2>Cada setor faz<br />uma pergunta diferente.</H2>
        <p className="max-w-[260px] text-[13px] leading-[1.5] text-slate-600">O UrbanPulse reúne critérios territoriais para avaliar o próximo movimento de cada operação.</p>
      </div>
      <div className="mt-16 grid gap-10 md:grid-cols-2">
        <div className="flex min-h-[340px] flex-col bg-night p-8 text-white">
          <p className="font-mono text-[10px] uppercase tracking-[.1em] text-slate-400">01 / Gestão pública</p>
          <h3 className="mt-6 font-sora text-[clamp(30px,3vw,44px)] font-normal leading-[1.1] tracking-[-0.02em]">Onde faltam<br />serviços essenciais?</h3>
          <p className="mt-10 max-w-[380px] text-[12px] leading-[1.6] text-slate-300">Relacione demanda, acesso e vulnerabilidade para avaliar a cobertura de novos equipamentos.</p>
          <p className="mt-auto border-t border-[#1F2937] pt-4 text-[11px] text-slate-400">Planejamento de equipamentos e cobertura</p>
        </div>
        <ul className="divide-y divide-slate-200">
          {list.map(([n, t, q]) => (
            <li key={n} className="grid grid-cols-[40px_1fr] gap-2 py-5 first:pt-0">
              <span className="font-mono text-[11px] text-slate-500">{n}</span>
              <div><p className="font-sora text-[20px] font-normal">{t}</p><p className="mt-1 text-[12px] text-slate-600">{q}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ReportCard() {
  return (
    <div className="mx-auto w-full max-w-[400px] bg-white text-night shadow-[0_10px_15px_-3px_rgba(0,0,0,.2)]" aria-label="Prévia do relatório executivo">
      <div className="flex items-center justify-between px-4 pb-2 pt-3"><span className="font-sora text-[12px] font-semibold lowercase">urbanpulse</span><span className="font-mono text-[6px] uppercase tracking-[.1em] text-slate-500">Inteligência territorial</span></div>
      <div className="mx-4 h-[2px] bg-brand" />
      <div className="px-4 pb-4 pt-4">
        <p className="font-sora text-[19px] leading-[1.15] tracking-[-0.01em]">Relatório de<br />inteligência territorial</p>
        <p className="mt-2 font-mono text-[6px] uppercase tracking-[.1em] text-slate-500">Cenário 01 / Estudo demonstrativo</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[['42.800', 'habitantes'], ['78%', 'transporte'], ['0,38', 'IVS médio']].map(([v, l]) => (<div key={l}><p className="font-sora text-[18px] leading-none">{v}</p><p className="text-[7px] text-slate-500">{l}</p></div>))}
        </div>
        <div className="relative mt-3 h-[96px] overflow-hidden"><MapArt variant="dark" ramp badge labels={false} north={false} scale={false} caption={false} className="absolute inset-0 h-full w-full" /></div>
        <p className="mt-2 text-[7px] text-slate-500">UBS · raio de 3 km · Zona Central</p>
        <p className="mt-3 text-[9px] font-semibold">Síntese executiva</p>
        <p className="mt-1 text-[7px] leading-[1.5] text-slate-600">O cenário integra alcance populacional, mobilidade e vulnerabilidade. Compare alternativas antes de priorizar a expansão.</p>
        <p className="mt-3 text-[6px] text-slate-500">Base sintética · validar indicadores e recomendações.</p>
      </div>
    </div>
  )
}

function Report() {
  return (
    <section className="grid md:grid-cols-2">
      <div className="bg-night px-6 py-24 text-white md:pl-[max(80px,calc((100vw-1440px)/2+80px))] md:pr-16">
        <Over dark>05 / Relatório executivo</Over>
        <H2 dark className="mt-6">Análise que chega<br />à mesa de decisão.</H2>
        <p className="mt-16 max-w-[420px] text-[14px] leading-[1.6] text-slate-300">Transforme o cenário em um documento que preserva os parâmetros, reúne as evidências e organiza a discussão.</p>
        <ul className="mt-24 space-y-4 text-[13px] text-slate-200"><li>Parâmetros explícitos</li><li>Mapa e indicadores no mesmo documento</li><li>Síntese para discussão executiva</li></ul>
      </div>
      <div className="bg-sky px-6 py-24 md:px-16">
        <ReportCard />
        <p className="mx-auto mt-6 max-w-[400px] font-mono text-[11px] uppercase tracking-[.08em] text-slate-500">FIG. 04 — Prévia do relatório executivo</p>
      </div>
    </section>
  )
}

function Rigor() {
  const items = [['01', 'Contexto', 'Demografia, mobilidade e vulnerabilidade no mesmo recorte territorial.'], ['02', 'Comparabilidade', 'Localização, equipamento e raio identificados em cada cenário.'], ['03', 'Registro', 'Parâmetros e resultados organizados no relatório executivo.'], ['04', 'Acesso', 'Mapa e tabela acessível como alternativas para explorar a informação.']]
  return (
    <section className={`${wrap} py-24`}>
      <Over>06 / Rigor na apresentação</Over>
      <H2 className="mt-6">Critérios explícitos.<br />Decisões que podem ser discutidas.</H2>
      <div className="mt-20 grid gap-10 md:grid-cols-4">
        {items.map(([n, t, d]) => (
          <div key={n} className="border-t border-slate-200 pt-4">
            <p className="font-mono text-[11px] text-slate-500">{n}</p>
            <h3 className="mt-6 font-sora text-[20px] font-normal">{t}</h3>
            <p className="mt-2 max-w-[220px] text-[12px] leading-[1.6] text-slate-600">{d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Closing() {
  return (
    <section className={`${wrap} pb-24 pt-8`}>
      <Over>Converse sobre o seu território</Over>
      <H2 className="mt-6">Onde está o seu<br />próximo movimento?</H2>
      <div className="mt-12 grid items-end gap-8 md:grid-cols-[1fr_auto]">
        <p className="max-w-[420px] text-[16px] leading-[1.5] text-night">Planejamento, expansão ou cobertura: comece pela decisão que precisa fundamentar.</p>
        <div className="flex flex-col items-start gap-3 md:mr-16"><Cta /><span className="text-[12px] text-slate-600">Uma conversa sobre o seu contexto.</span></div>
      </div>
    </section>
  )
}

function Footer() {
  const l = 'text-[12px] text-slate-300 hover:underline underline-offset-4'
  return (
    <footer className="bg-night pt-14 text-white">
      <div className={`${wrap} grid gap-10 md:grid-cols-2`}>
        <p className="text-[13px] leading-[1.5] text-slate-300">Inteligência territorial<br />para decisões estratégicas.</p>
        <nav aria-label="Rodapé" className="grid grid-cols-[auto_auto] justify-start gap-x-10 gap-y-3 md:justify-end">
          <button className={`${l} text-left`} onClick={() => go('plataforma')}>Plataforma</button>
          <button className={`${l} text-left`} onClick={() => go('aplicacoes')}>Aplicações</button>
          <button className={`${l} text-left`} onClick={() => go('metodo')}>Método</button><span />
          <Link to="/app" className={l}>Demonstração</Link><span className={l}>Parcerias</span><span className={l}>Contato</span>
        </nav>
      </div>
      <div className={`${wrap} mt-10`}>
        <p aria-hidden className="select-none font-sora font-semibold lowercase leading-[0.9] tracking-[-0.045em] text-[clamp(72px,19.5vw,290px)]">urbanpulse</p>
        <div className="flex justify-between py-6 text-[11px] text-slate-400"><span>© 2026 UrbanPulse</span><span className="flex gap-6"><span>Privacidade</span><span>Acessibilidade</span></span></div>
      </div>
    </footer>
  )
}

export default function Landing() {
  return (
    <div className="on-light bg-paper font-inter text-night">
      <Nav />
      <main>
        <Hero /><Audience /><Method /><Study /><Compare /><Context /><Sectors /><Report /><Rigor /><Closing />
      </main>
      <Footer />
    </div>
  )
}
