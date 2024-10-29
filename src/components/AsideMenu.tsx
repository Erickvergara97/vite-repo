import SideMenuItem from './SideMenuItem'
import SideMenuCard from './SideMenuCard'
import LibraryIcon from '../icons/library.svg?react'
import { useAppSelector } from '../redux/reduxHooks'
import { useEffect, useState } from 'react'
import { fetchUserPlaylists } from '../api/FetchPlaylist'
import { Playlist } from '../types/Playlist'

export default function AsideMenu() {
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  const [playlists, setPlaylists] = useState<Playlist[]>([])

  useEffect(() => {
    if (accessToken) {
      fetchUserPlaylists(accessToken).then((data) => setPlaylists(data))
    }
  }, [accessToken])

  return (
    <nav className='flex flex-col flex-1 gap-2'>
      <div className='bg-zinc-900 rounded-lg p-2 flex-1'>
        <ul>
          <SideMenuItem href='/'>
            <LibraryIcon />
            Tu biblioteca
          </SideMenuItem>
          {playlists.map((playlist, index) => (
            <SideMenuCard key={index} playlist={playlist} />
          ))}
        </ul>
      </div>
    </nav>
  )
}
