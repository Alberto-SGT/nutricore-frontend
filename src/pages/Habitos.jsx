import { useState } from 'react'
import './Habitos.css'

const HABITOS = ['Ejercicio', 'Lectura', 'Trabajo', 'Meditac.']
const DIAS_MES = 30
const HOY = 15

const DATOS_INICIALES = {
  'Ejercicio': [1,1,1,0,1,1,1,1,0,1,1,1,1,0,0],
  'Lectura':   [1,1,1,1,1,1,1,1,0,1,1,1,1,1,0],
  'Trabajo':   [1,0,1,0,1,0,1,1,0,1,0,1,1,0,0],
  'Meditac.':  [1,1,0,1,1,1,1,0,1,1,1,1,0,1,0],
}

const COLORES = {
  'Ejercicio': '#378ADD',
  'Lectura':   '#1D9E75',
  'Trabajo':   '#EF9F27',
  'Meditac.':  '#9B59B6',
}

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
               'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

function calcularProgreso(datos, diasTranscurridos) {
  const cumplidos = datos.slice(0, diasTranscurridos).filter(d => d === 1).length
  const pct = Math.round((cumplidos / diasTranscurridos) * 100)
  return { cumplidos, pct }
}

function calcularAcumulado(datos) {
  let acumulado = 0
  return datos.map(d => {
    acumulado += d
    return acumulado
  })
}

function Habitos() {
  const [mes, setMes] = useState(5)
  const [anio, setAnio] = useState(2026)
  const [registros, setRegistros] = useState(DATOS_INICIALES)

  const diasTranscurridos = HOY - 1

  function toggleDia(habito, diaIndex) {
    if (diaIndex >= HOY) return
    setRegistros(prev => {
      const nuevo = { ...prev }
      const arr = [...nuevo[habito]]
      arr[diaIndex] = arr[diaIndex] === 1 ? 0 : 1
      nuevo[habito] = arr
      return nuevo
    })
  }

  function mesAnterior() {
    if (mes === 0) { setMes(11); setAnio(a => a - 1) }
    else setMes(m => m - 1)
  }

  function mesSiguiente() {
    if (mes === 11) { setMes(0); setAnio(a => a + 1) }
    else setMes(m => m + 1)
  }

  const semanasSep = [7, 14, 21, 28]

  // Dimensiones del gráfico
  const W = 200
  const H = 80
  const PAD_L = 8
  const PAD_R = 8
  const PAD_T = 8
  const PAD_B = 8
  const maxY = DIAS_MES

  function toX(dia) {
    return PAD_L + (dia / (DIAS_MES - 1)) * (W - PAD_L - PAD_R)
  }

  function toY(valor) {
    return H - PAD_B - (valor / maxY) * (H - PAD_T - PAD_B)
  }

  return (
    <div className="habitos-page">

      <div className="habitos-topbar">
        <div className="habitos-topbar-title">Hábitos</div>
        <div className="habitos-month-nav">
          <button className="habitos-month-btn" onClick={mesAnterior}>‹</button>
          {MESES[mes]} {anio}
          <button className="habitos-month-btn" onClick={mesSiguiente}>›</button>
        </div>
      </div>

      <div className="habitos-content">

        <div className="habitos-left">
          <div className="section-label">// registro mensual</div>
          <table className="registro-table">
            <thead>
              <tr>
                <th className="col-dia">Día</th>
                {HABITOS.map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: DIAS_MES }, (_, i) => (
                <tr key={i} className={semanasSep.includes(i) ? 'semana-sep' : ''}>
                  <td className="col-dia">{i + 1}</td>
                  {HABITOS.map(h => (
                    <td key={h} onClick={() => toggleDia(h, i)}>
                      {i >= HOY
                        ? <span className="check-future">·</span>
                        : registros[h][i] === 1
                          ? <span className="check-done">✕</span>
                          : <span className="check-fail">—</span>
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="habitos-right">
          <div className="section-label">// progreso</div>

          {HABITOS.map(h => {
            const { cumplidos, pct } = calcularProgreso(registros[h], diasTranscurridos)
            return (
              <div key={h} className="progreso-row">
                <div className="progreso-nombre">{h}</div>
                <div className="progreso-valores">
                  <div className={`progreso-pct ${pct < 60 ? 'warn' : ''}`}>{pct}%</div>
                  <div className="progreso-dias">{cumplidos}/{diasTranscurridos} días</div>
                </div>
              </div>
            )
          })}

          <div className="chart-wrap">
            <div className="section-label">// días acumulados</div>
            <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">

              {/* Línea perfecta de referencia */}
              <line
                x1={toX(0)} y1={toY(0)}
                x2={toX(DIAS_MES - 1)} y2={toY(DIAS_MES)}
                stroke="#222222"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* Línea por hábito */}
              {HABITOS.map(h => {
                const acumulado = calcularAcumulado(registros[h].slice(0, HOY))
                const points = acumulado
                  .map((v, i) => `${toX(i)},${toY(v)}`)
                  .join(' ')
                return (
                  <polyline
                    key={h}
                    points={points}
                    fill="none"
                    stroke={COLORES[h]}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                )
              })}
            </svg>

            <div className="chart-week-labels">
              {['1', '7', '14', '21', '30'].map(d => (
                <span key={d} className="chart-week-label">{d}</span>
              ))}
            </div>

            <div className="chart-legend">
              {Object.entries(COLORES).map(([habito, color]) => (
                <div key={habito} className="legend-item">
                  <div className="legend-line" style={{background: color}}></div>
                  {habito}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Habitos
