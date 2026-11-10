import { useEffect, useState } from 'react'

function urlBusqueda(termino) {
  return `https://itunes.apple.com/search?term=${encodeURIComponent(termino)}&entity=song&limit=10&country=CL`
}

export default function Buscador() {
  const [query, setQuery] = useState('')
  const [termino, setTermino] = useState('')
  const [canciones, setCanciones] = useState([])

  useEffect(() => {
    if (termino === '') return

    let ignorar = false

    async function buscar() {
      const response = await fetch(urlBusqueda(termino))
      const data = await response.json()
      if (!ignorar) setCanciones(data.results)
    }
    buscar()

    return () => {
      ignorar = true
    }
  }, [termino])

  function handleSubmit(e) {
    e.preventDefault()
    setTermino(query)
  }

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

      <ul className="lista-canciones">
        {canciones.map(cancion => (
          <li key={cancion.trackId}>
            <div className="info">
              {cancion.trackName}
              <small>{cancion.artistName}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
