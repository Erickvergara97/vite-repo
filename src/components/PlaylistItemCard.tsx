import { useEffect, useState } from 'react'
import { Playlist } from '../lib/data'

interface Props {
  playlist: Playlist
}
export default function PlaylistItemCard({ playlist }: Props) {
  const { id, cover, title, artists } = playlist

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Cambia el estado a visible después de un pequeño retraso para activar la transición
    setIsVisible(true)
  }, [])

  //TODO: use Intl.ListFormat = Intl.ListFormat || function () {}
  const artistsString = artists.join(', ')
  return (
    <a
      href={`/playlist/${id}`}
      className='playlist-item transition-all duration-300 flex relative p-2 overflow-hidden gap-2 pb-4
      rounded-md hover:bg-zinc-800 shadow-lg hover:shadow-xl bg-zinc-500/30 w-44 flex-col'
    >
      <picture className='aspect-square w-full h-auto flex-none'>
        <img
          src={cover}
          alt={`Cover of ${title} by ${artistsString}`}
          className='object-cover w-full h-full rounded-md'
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        />
      </picture>
      <div className='flex flex-auto flex-col px-2'>
        <h4 className='text-sm'>{title}</h4>
        <span className='text-xs text-gray-400'>{artistsString}</span>
      </div>
    </a>
  )
}
