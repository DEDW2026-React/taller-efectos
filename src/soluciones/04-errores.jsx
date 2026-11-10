import { useEffect, useState } from 'react'

const OPCIONES = [
  { id: 81013, nombre: 'Queen' },
  { id: 18839, nombre: 'Metallica' },
  { id: 999999999, nombre: 'Uno que no existe' },
]

export default function Errores() {
  const [artistId, setArtistId] = useState(81013)
  const [artist, setArtist] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function cargar() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`https://api.discogs.com/artists/${artistId}`)
        if (!response.ok) throw new Error('Respuesta con error')
        const data = await response.json()
        setArtist(data)
        setLoading(false)
      } catch {
        setArtist(null)
        setError('No pudimos cargar el artista')
        setLoading(false)
      }
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
      {error && <p className="error">{error}</p>}
      {!loading && artist && <h3>{artist.name}</h3>}
    </div>
  )
}
