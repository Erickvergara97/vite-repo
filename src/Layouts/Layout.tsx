import AsideMenu from '../components/AsideMenu'
import NavMenu from '../components/NavMenu'
import Player from '../components/Player'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div id='app' className='relative h-screen p-2 gap-2'>
      <nav className='[grid-area:nav] flex-row justify-center	 min-h-[100px]'>
        <NavMenu />
      </nav>
      <aside className='[grid-area:aside] flex-col flex overflow-y-auto '>
        <AsideMenu />
      </aside>
      <main className='[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto'>
        {children}
      </main>
      <footer className='[grid-area:player] min-h-[100px]'>
        <Player />
      </footer>
    </div>
  )
}
