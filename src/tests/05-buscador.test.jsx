import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Buscador from '@taller/05-buscador'
import { cancion, diferida, respuesta } from './ayuda'

async function buscar(texto) {
  const input = screen.getByRole('textbox')
  await userEvent.clear(input)
  await userEvent.type(input, texto)
  await userEvent.click(screen.getByRole('button', { name: 'Buscar' }))
}

describe('05 Buscador con API', () => {
  afterEach(() => { vi.unstubAllGlobals() })

  test('no busca hasta apretar "Buscar"', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => respuesta({ results: [] })))
    render(<Buscador />)
    await userEvent.type(screen.getByRole('textbox'), 'queen')
    expect(fetch).not.toHaveBeenCalled()
  })

  test('busca el término en iTunes y muestra las canciones', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => respuesta({ results: [cancion(1, 'Canción uno'), cancion(2, 'Canción dos')] })))
    render(<Buscador />)
    await buscar('queen')

    expect(await screen.findByText('Canción uno')).toBeInTheDocument()
    expect(screen.getByText('Canción dos')).toBeInTheDocument()
    expect(fetch.mock.calls[0][0]).toContain('itunes.apple.com/search?term=queen&')
  })

  test('si dos respuestas llegan desordenadas, queda la de la última búsqueda', async () => {
    const primera = diferida()
    const segunda = diferida()
    vi.stubGlobal('fetch', vi.fn(url => (url.includes('primera') ? primera.promesa : segunda.promesa)))
    render(<Buscador />)

    await buscar('primera')
    await buscar('segunda')

    await act(async () => { segunda.resolver(respuesta({ results: [cancion(2, 'Resultado nuevo')] })) })
    await act(async () => { primera.resolver(respuesta({ results: [cancion(1, 'Resultado viejo')] })) })

    expect(screen.getByText('Resultado nuevo')).toBeInTheDocument()
    expect(screen.queryByText('Resultado viejo'), 'Una respuesta vieja pisó a la nueva').not.toBeInTheDocument()
  })
})
