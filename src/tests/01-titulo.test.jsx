import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Titulo from '@taller/01-titulo'

describe('01 Título de la pestaña', () => {
  beforeEach(() => { document.title = 'Sin cambiar' })

  test('al aparecer, el título muestra 0 likes', () => {
    render(<Titulo />)
    expect(document.title).toBe('❤️ 0 likes')
  })

  test('el título se actualiza con cada like', async () => {
    render(<Titulo />)
    await userEvent.click(screen.getByRole('button'))
    await userEvent.click(screen.getByRole('button'))
    expect(document.title).toBe('❤️ 2 likes')
  })
})
