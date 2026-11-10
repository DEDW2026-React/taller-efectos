import { useEffect, useState } from 'react'

export const titulo = 'Desafío: reproductor'
export const enunciado =
  'Arma un buscador de canciones que permita escuchar un fragmento. Esta vez no hay pasos: tú decides los estados y los efectos.'

// ✅ REQUISITOS (en orden de dificultad)
// 1. Un formulario con un input y un botón "Buscar" que busca en iTunes
// 2. Mientras llega la respuesta, mostrar "Cargando..."
// 3. Una lista (ul y li) con la carátula (artworkUrl100), la canción (trackName) y el artista (artistName)
// 4. Un botón "Escuchar" en cada canción, solo si tiene previewUrl
// 5. Al apretarlo, reproducir el fragmento: <audio controls autoPlay src={...} />
//    Debe haber un solo reproductor: la última canción elegida reemplaza a la anterior
// 6. Si la búsqueda falla, mostrar "No pudimos buscar". Si no hay resultados, "No encontramos canciones"
// 7. Mientras hay una canción elegida, el título de la pestaña dice "▶ " más el nombre de la canción.
//    Si el componente desaparece, el título vuelve a ser el que tenía antes
// 8. Si haces dos búsquedas seguidas, queda el resultado de la última
//
// Antes de programar, responde en papel: ¿qué cambia mientras se usa la app?
// ¿Qué efectos necesitas? ¿De qué depende cada uno? ¿Alguno necesita limpieza?

// 🎁 Esto ya viene hecho.
function urlBusqueda(termino) {
  return `https://itunes.apple.com/search?term=${encodeURIComponent(termino)}&entity=song&limit=10&country=CL`
}

export default function Reproductor() {
  // 🎃 Desde aquí es tuyo.

  return <p className="muted">Aquí va tu reproductor. Usa urlBusqueda(termino).</p>
}

// 💡 Pistas, solo si te quedas pegado (léelas de a una):
//
// Pista 1: el ejercicio 05 ya resuelve casi todo lo de buscar. Parte copiándolo.
//
// Pista 2: el ejercicio 04 ya resuelve los errores. Fíjate que iTunes puede responder
//          bien y traer una lista vacía: eso no es un error.
//
// Pista 3: para saber si no hay resultados, necesitas distinguir entre "todavía no busco"
//          y "busqué y no llegó nada".
//
// Pista 4: guarda en el estado la canción elegida. Con eso basta para el reproductor.
//
// Pista 5: el título es un segundo efecto. Guarda el título anterior en una variable
//          y devuélvelo en la limpieza.
