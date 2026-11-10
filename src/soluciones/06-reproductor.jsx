import { useEffect, useState } from 'react'

function urlBusqueda(termino) {
  return `https://itunes.apple.com/search?term=${encodeURIComponent(termino)}&entity=song&limit=10&country=CL`
}

export default function Reproductor() {
  const [query, setQuery] = useState('')
  const [termino, setTermino] = useState('')
  const [canciones, setCanciones] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [elegida, setElegida] = useState(null)

  useEffect(() => {
    if (termino === '') return

    let ignorar = false

    async function buscar() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(urlBusqueda(termino))
        if (!response.ok) throw new Error('Respuesta con error')
        const data = await response.json()
        if (!ignorar) {
          setCanciones(data.results)
          setLoading(false)
        }
      } catch {
        if (!ignorar) {
          setCanciones([])
          setError('No pudimos buscar')
          setLoading(false)
        }
      }
    }
    buscar()

    return () => {
      ignorar = true
    }
  }, [termino])

  useEffect(() => {
    if (elegida === null) return

    const tituloAnterior = document.title
    document.title = `▶ ${elegida.trackName}`
    return () => {
      document.title = tituloAnterior
    }
  }, [elegida])

  function handleSubmit(e) {
    e.preventDefault()
    setTermino(query)
  }

  const sinResultados = termino !== '' && !loading && !error && canciones.length === 0

  return (
    <div>
      <form onSubmit={handleSubmit} className="row">
        <input
          placeholder="Busca un artista"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button>Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {sinResultados && <p>No encontramos canciones</p>}

      <ul className="lista-canciones">
        {canciones.map(cancion => (
          <li key={cancion.trackId}>
            <img src={cancion.artworkUrl100} alt={cancion.collectionName} />
            <div className="info">
              {cancion.trackName}
              <small>{cancion.artistName}</small>
            </div>
            {cancion.previewUrl && <button onClick={() => setElegida(cancion)}>Escuchar</button>}
          </li>
        ))}
      </ul>

      {elegida && <audio controls autoPlay src={elegida.previewUrl} />}
    </div>
  )
}
