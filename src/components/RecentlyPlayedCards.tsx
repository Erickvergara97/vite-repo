import { Playlist } from '../types/Playlist'

interface Props {
  playlist: Playlist
}
export default function RecentlyPlayedCards({ playlist }: Props) {
  const { id, images, name, owner } = playlist

  return (
    <a
      href={`/playlist/${id}`}
      className='h-12 bg-white bg-opacity-10 text-white flex  items-center overflow-hidden gap-2 rounded-md hover:bg-opacity-20'
    >
      <picture className='h-12 w-12 flex-none'>
        <img
          src={images?.[0].url}
          alt={`Cover of ${name} by ${owner.display_name}`}
          className='object-cover w-full h-full rounded-md'
        />
      </picture>
      <div className='flex flex-auto flex-col truncate'>
        <h4 className='text-sm'>{name}</h4>
      </div>
    </a>
  )
}
