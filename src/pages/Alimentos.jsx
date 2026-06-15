import { useState } from 'react'
import './Alimentos.css'

const ALIMENTOS_INICIALES = [
  { id: 1, nombre: 'Pechuga de pollo', prot: 31, carbos: 0,  grasas: 3,  kcal: 165 },
  { id: 2, nombre: 'Huevo entero',     prot: 13, carbos: 1,  grasas: 11, kcal: 155 },
  { id: 3, nombre: 'Arroz blanco',     prot: 3,  carbos: 28, grasas: 0,  kcal: 130 },
  { id: 4, nombre: 'Aguacate',         prot: 2,  carbos: 9,  grasas: 15, kcal: 160 },
  { id: 5, nombre: 'Atún en agua',     prot: 25, carbos: 0,  grasas: 1,  kcal: 110 },
  { id: 6, nombre: 'Avena',            prot: 13, carbos: 58, grasas: 7,  kcal: 389 },
  { id: 7, nombre: 'Salmón',           prot: 25, carbos: 0,  grasas: 13, kcal: 208 },
  { id: 8, nombre: 'Lentejas',         prot: 9,  carbos: 20, grasas: 0,  kcal: 116 },
]

function macroAlto(a) {
  const macros = { prot: a.prot, carbos: a.carbos, grasas: a.grasas }
  return Object.keys(macros).reduce((a, b) => macros[a] > macros[b] ? a : b)
}

function Alimentos() {
  const [filtro, setFiltro] = useState('todos')
  const [selA, setSelA] = useState(null)
  const [selB, setSelB] = useState(null)

  function handleCmp(alimento) {
    if (selA?.id === alimento.id) { setSelA(null); return }
    if (selB?.id === alimento.id) { setSelB(null); return }
    if (!selA) { setSelA(alimento); return }
    if (!selB) { setSelB(alimento); return }
  }

  function getCmpClass(alimento) {
    if (selA?.id === alimento.id) return 'cmp-btn selected-a'
    if (selB?.id === alimento.id) return 'cmp-btn selected-b'
    return 'cmp-btn'
  }

  function getCmpLabel(alimento) {
    if (selA?.id === alimento.id) return 'A'
    if (selB?.id === alimento.id) return 'B'
    return '+'
  }

  const ordenados = [...ALIMENTOS_INICIALES].sort((a, b) => {
    if (filtro === 'proteina') return b.prot - a.prot
    if (filtro === 'carbos')   return b.carbos - a.carbos
    if (filtro === 'grasas')   return b.grasas - a.grasas
    if (filtro === 'calorias') return a.kcal - b.kcal
    return 0
  })

  function barPct(valA, valB) {
    const max = Math.max(valA, valB)
    if (max === 0) return { a: 0, b: 0 }
    return { a: (valA / max) * 100, b: (valB / max) * 100 }
  }

  return (
    <div className="alimentos-page">

      <div className="alimentos-topbar">
        <div className="alimentos-topbar-title">Alimentos</div>
        <button className="añadir-btn">+ Añadir</button>
      </div>

      <div className="alimentos-content">

        <div className="alimentos-left">
          <div className="filtros">
            {[
              { key: 'todos',    label: 'Todos' },
              { key: 'proteina', label: '+ Proteína' },
              { key: 'carbos',   label: '+ Carbos' },
              { key: 'grasas',   label: '+ Grasas' },
              { key: 'calorias', label: '- Calorías' },
            ].map(f => (
              <button
                key={f.key}
                className={filtro === f.key ? 'filtro-btn active' : 'filtro-btn'}
                onClick={() => setFiltro(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="alimentos-table-wrap">
            <table className="alimentos-table">
              <thead>
                <tr>
                  <th>Alimento</th>
                  <th>Prot.</th>
                  <th>Carbos</th>
                  <th>Grasas</th>
                  <th>Kcal</th>
                  <th>Cmp.</th>
                </tr>
              </thead>
              <tbody>
                {ordenados.map(a => {
                  const alto = macroAlto(a)
                  return (
                    <tr key={a.id}>
                      <td>{a.nombre}</td>
                      <td className={alto === 'prot'   ? 'hi' : ''}>{a.prot}g</td>
                      <td className={alto === 'carbos' ? 'hi' : ''}>{a.carbos}g</td>
                      <td className={alto === 'grasas' ? 'hi' : ''}>{a.grasas}g</td>
                      <td>{a.kcal}</td>
                      <td>
                        <button
                          className={getCmpClass(a)}
                          onClick={() => handleCmp(a)}
                        >
                          {getCmpLabel(a)}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="alimentos-right">
          <div className="section-label">// comparador</div>

          {!selA && !selB && (
            <div className="cmp-empty">
              Selecciona dos alimentos<br />
              de la tabla para comparar.<br />
              Columna <span style={{color:'#378ADD'}}>Cmp.</span> → A y B
            </div>
          )}

          {(selA || selB) && (
            <div>
              <div className="cmp-nombres">
                <div className="cmp-nombre-a">{selA ? selA.nombre : '—'}</div>
                <div className="cmp-nombre-b">{selB ? selB.nombre : '—'}</div>
              </div>

              {[
                { label: 'Proteína',      key: 'prot' },
                { label: 'Carbohidratos', key: 'carbos' },
                { label: 'Grasas',        key: 'grasas' },
                { label: 'Calorías',      key: 'kcal' },
              ].map(({ label, key }) => {
                const valA = selA ? selA[key] : 0
                const valB = selB ? selB[key] : 0
                const { a, b } = barPct(valA, valB)
                const unidad = key === 'kcal' ? '' : 'g'
                return (
                  <div key={key} className="cmp-macro">
                    <div className="cmp-macro-label">{label}</div>
                    <div className="cmp-bars">
                      <div className="cmp-val-a">{valA}{unidad}</div>
                      <div className="cmp-track-wrap">
                        <div className="cmp-half cmp-half-a">
                          <div className="cmp-fill-a" style={{width: `${a}%`}}></div>
                        </div>
                        <div className="cmp-half cmp-half-b">
                          <div className="cmp-fill-b" style={{width: `${b}%`}}></div>
                        </div>
                      </div>
                      <div className="cmp-val-b">{valB}{unidad}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Alimentos
