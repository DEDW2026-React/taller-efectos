import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Errores from '@taller/04-errores'
import { respuesta } from './ayuda'

const MENSAJE = 'No pudimos cargar el artista'

function apiFalsa(url) {
  if (url.includes('999999999')) return respuesta({ message: 'Artist not found.' }, false)
  return respuesta({ name: url.includes('18839') ? 'Metallica' : 'Queen' })
}

describe('04 Cuando la API falla', () => {
  beforeEach(() => { vi.stubGlobal('fetch', vi.fn(async url => apiFalsa(url))) })
  afterEach(() => { vi.unstubAllGlobals() })

  test('carga el artista inicial', async () => {
    render(<Errores />)
    expect(await screen.findByRole('heading')).toHaveTextContent('Queen')
  })

  test('muestra el error si el artista no existe (404)', async () => {
    render(<Errores />)
    await screen.findByRole('heading')
    await userEvent.click(screen.getByRole('button', { name: 'Uno que no existe' }))
    expect(await screen.findByText(MENSAJE)).toBeInTheDocument()
    expect(screen.queryByRole('heading'), 'Sigue visible el artista anterior').not.toBeInTheDocument()
  })

  test('muestra el error si falla la conexión', async () => {
    fetch.mockRejectedValueOnce(new Error('Sin conexión'))
    render(<Errores />)
    expect(await screen.findByText(MENSAJE)).toBeInTheDocument()
  })

  test('el error desaparece al cargar otro artista', async () => {
    render(<Errores />)
    await screen.findByRole('heading')
    await userEvent.click(screen.getByRole('button', { name: 'Uno que no existe' }))
    await screen.findByText(MENSAJE)
    await userEvent.click(screen.getByRole('button', { name: 'Metallica' }))

    expect(await screen.findByRole('heading')).toHaveTextContent('Metallica')
    expect(screen.queryByText(MENSAJE)).not.toBeInTheDocument()
  })
})
