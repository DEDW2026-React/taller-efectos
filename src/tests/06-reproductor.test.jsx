import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Reproductor from '@taller/06-reproductor'
import { cancion, diferida, respuesta } from './ayuda'

async function buscar(texto) {
  const input = screen.getByRole('textbox')
  await userEvent.clear(input)
  await userEvent.type(input, texto)
  await userEvent.click(screen.getByRole('button', { name: 'Buscar' }))
}

const dosCanciones = { results: [cancion(1, 'Canción uno'), cancion(2, 'Canción dos')] }
const apiCon = datos => vi.stubGlobal('fetch', vi.fn(async () => respuesta(datos)))
const audios = () => [...document.querySelectorAll('audio')]

describe('06 Desafío: reproductor', () => {
  beforeEach(() => { document.title = 'Título original' })
  afterEach(() => { vi.unstubAllGlobals() })

  test('1. busca en iTunes con el formulario', async () => {
    apiCon(dosCanciones)
    render(<Reproductor />)
    await buscar('queen')
    await screen.findByText('Canción uno')
    expect(fetch.mock.calls[0][0]).toContain('itunes.apple.com/search?term=queen&')
  })

  test('2. muestra "Cargando..." mientras llega la respuesta', async () => {
    const pendiente = diferida()
    vi.stubGlobal('fetch', vi.fn(() => pendiente.promesa))
    render(<Reproductor />)
    await buscar('queen')

    expect(screen.getByText('Cargando...')).toBeInTheDocument()
    await act(async () => { pendiente.resolver(respuesta(dosCanciones)) })
    expect(screen.queryByText('Cargando...')).not.toBeInTheDocument()
  })

  test('3. lista las canciones con carátula, nombre y artista', async () => {
    apiCon(dosCanciones)
    render(<Reproductor />)
    await buscar('queen')

    const fila = (await screen.findByText('Canción uno')).closest('li')
    expect(fila).toHaveTextContent('Artista de prueba')
    expect(fila.querySelector('img')).toHaveAttribute('src', 'https://example.com/caratula.jpg')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  test('4. el botón "Escuchar" aparece solo si la canción tiene previewUrl', async () => {
    apiCon({ results: [cancion(1, 'Con audio'), cancion(2, 'Sin audio', { previewUrl: undefined })] })
    render(<Reproductor />)
    await buscar('queen')

    const conAudio = (await screen.findByText('Con audio')).closest('li')
    const sinAudio = screen.getByText('Sin audio').closest('li')
    expect(within(conAudio).getByRole('button', { name: 'Escuchar' })).toBeInTheDocument()
    expect(within(sinAudio).queryByRole('button', { name: 'Escuchar' })).not.toBeInTheDocument()
  })

  test('5. hay un solo reproductor, con la última canción elegida', async () => {
    apiCon(dosCanciones)
    render(<Reproductor />)
    await buscar('queen')
    await screen.findByText('Canción uno')

    const botones = screen.getAllByRole('button', { name: 'Escuchar' })
    await userEvent.click(botones[0])
    await userEvent.click(botones[1])

    expect(audios()).toHaveLength(1)
    expect(audios()[0]).toHaveAttribute('src', 'https://example.com/2.m4a')
  })

  test('6a. muestra "No pudimos buscar" si la búsqueda falla', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('Sin conexión') }))
    render(<Reproductor />)
    await buscar('queen')
    expect(await screen.findByText('No pudimos buscar')).toBeInTheDocument()
  })

  test('6a. muestra "No pudimos buscar" si la API responde con error', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => respuesta({ errorMessage: 'Error' }, false)))
    render(<Reproductor />)
    await buscar('queen')
    expect(await screen.findByText('No pudimos buscar')).toBeInTheDocument()
  })

  test('6b. muestra "No encontramos canciones" solo después de buscar', async () => {
    apiCon({ results: [] })
    render(<Reproductor />)
    expect(screen.queryByText('No encontramos canciones')).not.toBeInTheDocument()

    await buscar('zzzz')
    expect(await screen.findByText('No encontramos canciones')).toBeInTheDocument()
  })

  test('7. el título muestra la canción y vuelve al original al desaparecer', async () => {
    apiCon(dosCanciones)
    const { unmount } = render(<Reproductor />)
    await buscar('queen')
    await screen.findByText('Canción uno')
    await userEvent.click(screen.getAllByRole('button', { name: 'Escuchar' })[0])

    expect(document.title).toBe('▶ Canción uno')
    unmount()
    expect(document.title).toBe('Título original')
  })

  test('8. si dos respuestas llegan desordenadas, queda la de la última búsqueda', async () => {
    const primera = diferida()
    const segunda = diferida()
    vi.stubGlobal('fetch', vi.fn(url => (url.includes('primera') ? primera.promesa : segunda.promesa)))
    render(<Reproductor />)

    await buscar('primera')
    await buscar('segunda')

    await act(async () => { segunda.resolver(respuesta({ results: [cancion(2, 'Resultado nuevo')] })) })
    await act(async () => { primera.resolver(respuesta({ results: [cancion(1, 'Resultado viejo')] })) })

    expect(screen.getByText('Resultado nuevo')).toBeInTheDocument()
    expect(screen.queryByText('Resultado viejo')).not.toBeInTheDocument()
  })
})
