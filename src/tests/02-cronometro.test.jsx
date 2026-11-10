import { act, fireEvent, render, screen } from '@testing-library/react'
import Cronometro from '@taller/02-cronometro'

const avanzar = ms => act(() => { vi.advanceTimersByTime(ms) })
const boton = nombre => screen.getByRole('button', { name: nombre })

describe('02 Cronómetro', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  test('parte detenido en 0', () => {
    render(<Cronometro />)
    avanzar(3000)
    expect(screen.getByText(/0 s/)).toBeInTheDocument()
  })

  test('suma un segundo cada segundo al iniciarlo', () => {
    render(<Cronometro />)
    fireEvent.click(boton('Iniciar'))
    avanzar(3000)
    expect(screen.getByText(/3 s/)).toBeInTheDocument()
  })

  test('"Detener" lo detiene', () => {
    render(<Cronometro />)
    fireEvent.click(boton('Iniciar'))
    avanzar(2000)
    fireEvent.click(boton('Detener'))
    avanzar(5000)
    expect(screen.getByText(/2 s/)).toBeInTheDocument()
  })

  test('limpia el intervalo cuando el componente desaparece', () => {
    const { unmount } = render(<Cronometro />)
    fireEvent.click(boton('Iniciar'))
    unmount()
    expect(vi.getTimerCount(), 'Quedó un intervalo activo. Falta la limpieza del efecto').toBe(0)
  })
})
