import { act, render, screen } from '@testing-library/react'
import Artista from '@taller/03-artista'
import { respuesta } from './ayuda'

const queen = { name: 'Queen', images: [{ uri150: 'https://example.com/queen.jpg' }] }

describe('03 Cargar un artista', () => {
  beforeEach(() => { vi.stubGlobal('fetch', vi.fn(async () => respuesta(queen))) })
  afterEach(() => { vi.unstubAllGlobals() })

  test('muestra "Cargando..." y después el artista', async () => {
    render(<Artista />)
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
    expect(await screen.findByRole('heading')).toHaveTextContent('Queen')
  })

  test('pide el artista a Discogs', async () => {
    render(<Artista />)
    await screen.findByRole('heading')
    expect(fetch.mock.calls[0][0]).toContain('api.discogs.com/artists/81013')
  })

  test('hace una sola petición', async () => {
    render(<Artista />)
    await screen.findByRole('heading')
    await act(() => new Promise(resolve => setTimeout(resolve, 30)))
    expect(fetch, 'Se pidió más de una vez. ¿Pusiste el arreglo de dependencias?').toHaveBeenCalledTimes(1)
  })
})
