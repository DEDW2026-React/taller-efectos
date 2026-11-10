import { useEffect, useState } from 'react'

export default function Cronometro() {
  const [segundos, setSegundos] = useState(0)
  const [corriendo, setCorriendo] = useState(false)

  useEffect(() => {
    if (!corriendo) return

    const id = setInterval(() => setSegundos(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [corriendo])

  return (
    <div>
      <p className="tiempo">⏱️ {segundos} s</p>
      <div className="row">
        <button onClick={() => setCorriendo(!corriendo)}>
          {corriendo ? 'Detener' : 'Iniciar'}
        </button>
        <button onClick={() => setSegundos(0)}>Reiniciar</button>
      </div>
    </div>
  )
}
