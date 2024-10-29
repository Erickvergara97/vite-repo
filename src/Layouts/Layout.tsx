import { Navigate, Outlet } from 'react-router-dom'
import AsideMenu from '../components/AsideMenu'
import NavMenu from '../components/NavMenu'
import Player from '../components/Player'
import { useAppSelector } from '../redux/reduxHooks'

export default function Layout() {
  const accessToken = useAppSelector((state) => state.auth.accessToken)

  if (!accessToken) {
    return <Navigate to='/login' />
  }

  return (
    <div id='app' className='relative h-screen p-2 gap-2'>
      <nav className='[grid-area:nav] flex-row justify-center	 min-h-[100px]'>
        <NavMenu />
      </nav>
      <aside className='[grid-area:aside] flex-col flex overflow-y-auto '>
        <AsideMenu />
      </aside>
      <main className='[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto'>
        <Outlet />
      </main>
      <footer className='[grid-area:player] min-h-[100px]'>
        <Player />
      </footer>
    </div>
  )
}
