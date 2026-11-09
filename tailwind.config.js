/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Dashboard (variáveis permitem tema escuro/claro)
        canvas: 'var(--canvas)',
        surface: 'var(--surface)',
        line: 'var(--line)',
        strong: 'var(--strong)',
        tx: 'var(--tx)',
        t2: 'var(--t2)',
        field: 'var(--field)',
        // Marca e landing
        brand: '#2563EB',
        brandHover: '#1D4ED8',
        night: '#0B0F17',
        paper: '#F7F9FC',
        sky: '#E8EEF8',
      },
    },
  },
  plugins: [],
}
