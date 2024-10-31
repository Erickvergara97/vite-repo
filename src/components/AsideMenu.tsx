import SideMenuItem from './SideMenuItem'
import SideMenuCard from './SideMenuCard'
import LibraryIcon from '../icons/library.svg?react'
import { useAppSelector } from '../redux/reduxHooks'

export default function AsideMenu() {
  const { playlists, loading, error } = useAppSelector(
    (state) => state.playlists
  )

  return (
    <nav className='flex flex-col flex-1 gap-2'>
      <div className='bg-zinc-900 rounded-lg p-2 flex-1'>
        <ul>
          <SideMenuItem href='/'>
            <LibraryIcon />
            Tu biblioteca
          </SideMenuItem>
          {loading && <li>Loading playlists...</li>}
          {error && <li>{error}</li>}
          {playlists.length === 0 && !loading && (
            <li>No playlists available.</li>
          )}
          {playlists.map((playlist, index) => (
            <SideMenuCard key={index} playlist={playlist} />
          ))}
        </ul>
      </div>
    </nav>
  )
}
