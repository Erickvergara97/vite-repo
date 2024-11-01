import { Playlist } from '../types/Playlist'
import PinIcon from '../icons/pinIcon.svg?react'

interface Props {
  playlist: Playlist
}
export default function SideMenuCard({ playlist }: Props) {
  const { id, owner, images, name } = playlist

  //TODO: use Intl.ListFormat = Intl.ListFormat || function () {}
  // const artistsString = artists.join(', ')
  return (
    <a
      href={`/playlist/${id}`}
      className='playlist-item flex relative overflow-hidden items-center gap-5 rounded-md hover:bg-zinc-800'
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
        <span className='text-xs text-gray-400 flex flex-row gap-2'>
          <PinIcon />
          Playlist • {owner.display_name}
        </span>
      </div>
    </a>
  )
}
