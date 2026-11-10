import { useEffect, useState } from 'react'

export const titulo = 'Buscador con API'
export const enunciado = 'Busca canciones en iTunes al apretar "Buscar". Si haces dos búsquedas seguidas, debe quedar el resultado de la última.'

function urlBusqueda(termino) {
  return `https://itunes.apple.com/search?term=${encodeURIComponent(termino)}&entity=song&limit=10&country=CL`
}

export default function Buscador() {
  const [query, setQuery] = useState('')       // lo que se está escribiendo
  const [termino, setTermino] = useState('')   // lo que se buscó
  const [canciones, setCanciones] = useState([])

  // 🎃 1. Crea un efecto que dependa de termino. Si termino está vacío, termina con return.
  // 🎃 2. Adentro, crea una función async que haga fetch(urlBusqueda(termino)),
  //       convierta la respuesta con response.json() y guarde data.results con setCanciones.
  // 🎃 3. Una respuesta vieja no debe pisar a la nueva. Antes de la función, escribe:
  //       let ignorar = false
  //       Guarda los resultados solo si no hay que ignorarlos: if (!ignorar) setCanciones(...)
  //       Y retorna la limpieza: return () => { ignorar = true }

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

      {/* 💯 Extra: muestra "Cargando..." mientras llega la respuesta */}
    </div>
  )
}
