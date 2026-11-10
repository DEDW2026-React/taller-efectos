import { useEffect, useState } from 'react'

export const titulo = 'Cargar un artista'
export const enunciado = 'Pide los datos de Queen a la API de Discogs cuando el componente aparece en pantalla.'

const URL_ARTISTA = 'https://api.discogs.com/artists/81013'

export default function Artista() {
  const [artist, setArtist] = useState(null)

  // 🎃 1. Crea un efecto. Adentro, define una función async y llámala:
  //       async function cargar() {
  //         const response = await fetch(URL_ARTISTA)
  //         const data = await response.json()
  //         setArtist(data)
  //       }
  //       cargar()
  // 🎃 2. Agrégale el arreglo de dependencias. Esto debe correr una sola vez.
  //       Sin él, cada respuesta provoca un render y cada render pide de nuevo el artista.

  if (artist === null) {
    return <p>Cargando...</p>
  }

  return (
    <article className="card">
      <img src={artist.images[0].uri150} alt={artist.name} />
      <h3>{artist.name}</h3>
    </article>
  )
}
