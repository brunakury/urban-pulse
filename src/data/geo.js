// Geometria sintética compartilhada pelo mapa Leaflet e pelas ilustrações da landing.
// Sistema de coordenadas: 1000 x 600 unidades. 1 km = 45 unidades.
export const W = 1000
export const H = 600
export const PX = 45
export const ll = (x, y) => [H - y, x] // [lat, lng] para L.CRS.Simple

export const RIVER = [[170, -20], [190, 120], [250, 230], [340, 310], [400, 380], [420, 470], [395, 560], [385, 620]]
export const ROUTE = [[110, 490], [330, 405], [440, 330], [640, 312], [780, 250], [940, 110]]

export const GRID = (() => {
  const a = []
  for (let i = -200; i < 1300; i += 70) a.push([[i, 0], [i + 260, 600]])
  for (let i = 0; i <= 700; i += 75) a.push([[0, i], [1000, i - 60]])
  return a
})()

// Polígono irregular (hexágono deformado) de cada zona
export const hexOf = (z) =>
  [1, 0.9, 1.1, 1, 0.85, 1.05].map((m, i) => {
    const a = (i * Math.PI) / 3 + 0.3
    return [z.x + Math.cos(a) * z.r * m, z.y + Math.sin(a) * z.r * m * 0.85]
  })
