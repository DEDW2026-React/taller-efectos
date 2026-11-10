import { useEffect, useState } from 'react'

export const titulo = 'Cronómetro'
export const enunciado = 'Haz que el cronómetro sume un segundo mientras está corriendo, y que se detenga al apretar "Detener".'

export default function Cronometro() {
  const [segundos, setSegundos] = useState(0)
  const [corriendo, setCorriendo] = useState(false)

  // 🎃 1. Crea un efecto que dependa de corriendo.
  // 🎃 2. Si no está corriendo, termina con return.
  // 🎃 3. Inicia un intervalo y guarda su id:
  //       const id = setInterval(() => setSegundos(s => s + 1), 1000)
  //       Se usa s => s + 1 porque el intervalo no ve los valores nuevos de segundos.
  // 🎃 4. Retorna la limpieza, que detiene el intervalo:
  //       return () => clearInterval(id)

  return (
    <div>
      <p className="tiempo">⏱️ {segundos} s</p>
      <button onClick={() => setCorriendo(!corriendo)}>
        {corriendo ? 'Detener' : 'Iniciar'}
      </button>

      {/* 💯 Extra: agrega un botón "Reiniciar" que vuelva a 0 */}
    </div>
  )
}
