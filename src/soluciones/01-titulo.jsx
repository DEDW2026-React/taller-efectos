import { useEffect, useState } from 'react'

export default function Titulo() {
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    document.title = `❤️ ${likes} likes`
  }, [likes])

  return (
    <button className="big" onClick={() => setLikes(likes + 1)}>
      ❤️ {likes}
    </button>
  )
}
