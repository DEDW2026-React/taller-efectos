import { useEffect, useState } from 'react'

export const titulo = 'Cuando la API falla'
export const enunciado = 'Si el artista no existe o falla la conexión, muestra "No pudimos cargar el artista".'

const OPCIONES = [
  { id: 81013, nombre: 'Queen' },
  { id: 18839, nombre: 'Metallica' },
  { id: 999999999, nombre: 'Uno que no existe' },
]

export default function Errores() {
  const [artistId, setArtistId] = useState(81013)
  const [artist, setArtist] = useState(null)
  const [loading, setLoading] = useState(true)
  // 🎃 1. Crea un estado "error" que parta en null

  useEffect(() => {
    async function cargar() {
      setLoading(true)
      // 🎃 2. Limpia el error anterior: setError(null)

      // 🎃 3. Envuelve las 4 líneas siguientes en un try { ... } catch { ... }
      const response = await fetch(`https://api.discogs.com/artists/${artistId}`)
      // 🎃 4. fetch no falla con un 404. Revisa la respuesta tú:
      //       if (!response.ok) throw new Error('Respuesta con error')
      const data = await response.json()
      setArtist(data)
      setLoading(false)

      // 🎃 5. En el catch: setArtist(null), setError('No pudimos cargar el artista') y setLoading(false)
    }
    cargar()
  }, [artistId])

  return (
    <div>
      <div className="row">
        {OPCIONES.map(opcion => (
          <button key={opcion.id} onClick={() => setArtistId(opcion.id)}>
            {opcion.nombre}
          </button>
        ))}
      </div>

      {loading && <p>Cargando...</p>}
      {/* 🎃 6. Muestra el error: {error && <p className="error">{error}</p>} */}
      {!loading && artist && <h3>{artist.name}</h3>}
    </div>
  )
}
