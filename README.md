# Taller de efectos

Ejercicios cortos para practicar `useEffect`, de menos a más.

## Cómo empezar

```bash
npm install
npm run dev
```

Abre la URL que aparece. A la izquierda está la lista de ejercicios.

## Cómo se trabaja

1. Elige un ejercicio en el menú.
2. Abre su archivo en `src/ejercicios/` (el nombre aparece en la página).
3. Busca los comentarios con 🎃 y complétalos, en orden.
4. Guarda y mira el resultado en el navegador.
5. Si te sobra tiempo, haz los 💯 extra.

## Revisa tu trabajo con los tests

```bash
npm test 01     # revisa solo el ejercicio 1
npm test        # revisa todos
```

Cada ✓ es algo que ya funciona y cada × es algo que falta. Antes de completar un ejercicio es normal que los tests fallen. Algunos pasan desde el comienzo, porque revisan cómo parte la pantalla.

Los tests simulan las respuestas de las APIs, así que no necesitan internet. En el navegador, los ejercicios sí usan las APIs reales de Discogs y de iTunes.

## Las soluciones

El botón **Solución** muestra cómo debería funcionar cada ejercicio. El código de las soluciones está en `src/soluciones/`, pero intenta no mirarlo antes de terminar.

## Ejercicios

| # | Ejercicio | Practicas |
|---|---|---|
| 01 | Título de la pestaña | Efecto con dependencias |
| 02 | Cronómetro | `setInterval` y la limpieza del efecto |
| 03 | Cargar un artista | `fetch` al aparecer el componente |
| 04 | Cuando la API falla | `response.ok` y `try/catch` |
| 05 | Buscador con API | Dependencias que cambian y respuestas desordenadas |
| 06 | Desafío: reproductor | Todo lo anterior junto, sin pasos guiados |
