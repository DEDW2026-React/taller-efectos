import { useEffect, useState } from 'react'

export const titulo = 'Título de la pestaña'
export const enunciado = 'Haz que el título de la pestaña del navegador muestre cuántos likes hay.'

export default function Titulo() {
  const [likes, setLikes] = useState(0)

  // 🎃 1. Crea un efecto que ponga los likes en el título de la pestaña:
  //       document.title = `❤️ ${likes} likes`
  // 🎃 2. Agrégale el arreglo de dependencias. ¿De qué valor depende este efecto?

  return (
    <button className="big" onClick={() => setLikes(likes + 1)}>
      ❤️ {likes}
    </button>
  )
}
