// Respuesta falsa de fetch, para no depender de internet
export function respuesta(datos, ok = true) {
  return { ok, status: ok ? 200 : 404, json: async () => datos }
}

// Una respuesta que llega recién cuando el test llama a resolver()
export function diferida() {
  let resolver
  const promesa = new Promise(resolve => { resolver = resolve })
  return { promesa, resolver }
}

export const cancion = (trackId, trackName, extra = {}) => ({
  trackId,
  trackName,
  artistName: 'Artista de prueba',
  collectionName: 'Disco de prueba',
  artworkUrl100: 'https://example.com/caratula.jpg',
  previewUrl: `https://example.com/${trackId}.m4a`,
  ...extra,
})
