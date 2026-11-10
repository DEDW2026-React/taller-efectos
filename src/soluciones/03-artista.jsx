import { useEffect, useState } from 'react'

const URL_ARTISTA = 'https://api.discogs.com/artists/81013'

export default function Artista() {
  const [artist, setArtist] = useState(null)

  useEffect(() => {
    async function cargar() {
      const response = await fetch(URL_ARTISTA)
      const data = await response.json()
      setArtist(data)
    }
    cargar()
  }, [])

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
