import SideMenuItem from './SideMenuItem'
import SideMenuCard from './SideMenuCard'
import LibraryIcon from '../icons/library.svg?react'
import { playlists } from '../lib/data'
export default function AsideMenu() {
  return (
    <nav className='flex flex-col flex-1 gap-2'>
      <div className='bg-zinc-900 rounded-lg p-2 flex-1'>
        <ul>
          <SideMenuItem href='/'>
            <LibraryIcon />
            Tu biblioteca
          </SideMenuItem>
          {playlists.map((playlist) => (
            <SideMenuCard playlist={playlist} />
          ))}
        </ul>
      </div>
    </nav>
  )
}
