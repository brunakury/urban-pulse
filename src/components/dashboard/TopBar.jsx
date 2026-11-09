import { Link } from 'react-router-dom'
import { ChevronDown, Download } from 'lucide-react'

const outline = 'no-print flex h-11 items-center justify-between rounded-md border border-strong bg-transparent px-5 text-[14px] font-medium text-tx hover:bg-line'

export default function TopBar({ theme, setTheme, table, onToggle, onCsv, onPdf }) {
  return (
    <header className="flex min-h-[88px] flex-wrap items-center gap-x-6 gap-y-3 border-b border-line bg-canvas px-6 py-3">
      <Link to="/" className="font-sora text-[28px] font-medium lowercase tracking-[-0.01em] text-tx" aria-label="urbanpulse, voltar para a página inicial">urbanpulse</Link>
      <span className="hidden text-[14px] text-t2 lg:block">Hub de inteligência territorial</span>
      <div className="flex-1" />
      <label className="relative no-print">
        <span className="sr-only">Tema</span>
        <select value={theme} onChange={(e) => setTheme(e.target.value)} className="h-11 w-[150px] cursor-pointer appearance-none rounded-md border border-transparent bg-transparent pr-8 text-[13px] text-t2">
          <option value="dark">Tema: escuro</option>
          <option value="light">Tema: claro</option>
        </select>
        <ChevronDown size={14} className="pointer-events-none absolute right-2 top-[15px] text-t2" aria-hidden />
      </label>
      <button type="button" onClick={onToggle} aria-pressed={table} className={`${outline} w-[200px]`}>
        {table ? 'Voltar ao mapa' : 'Tabela acessível'}
      </button>
      <button type="button" onClick={onCsv} className={`${outline} w-[183px]`}>Exportar CSV <Download size={14} aria-hidden /></button>
      <button type="button" onClick={onPdf} className="no-print flex h-11 w-[253px] items-center justify-between rounded-md bg-brand px-5 text-[14px] font-medium text-white hover:bg-brandHover">
        Relatório PDF <Download size={14} aria-hidden />
      </button>
    </header>
  )
}
