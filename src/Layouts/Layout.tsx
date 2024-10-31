import { Navigate, Outlet } from 'react-router-dom'
import AsideMenu from '../components/AsideMenu'
import NavMenu from '../components/NavMenu'
import Player from '../components/Player'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { useEffect } from 'react'
import { getUserPlaylists } from '../redux/slices/playlistsSlice'
import { isTokenExpired } from '../helpers/AccessTokenValidation'
import { refreshAccessToken } from '../api/FetchAccessToken'

export default function Layout() {
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  const dispatch = useAppDispatch() // Hook para despachar acciones
  const tokenExpire = useAppSelector((state) => state.auth.expiresAt)
  const refreshToken = useAppSelector((state) => state.auth.refreshToken)

  useEffect(() => {
    if (tokenExpire && refreshToken && isTokenExpired(tokenExpire)) {
      refreshAccessToken(refreshToken) // Refresca el token si ha expirado
    }
    if (accessToken && tokenExpire && tokenExpire !== null) {
      dispatch(getUserPlaylists({ accessToken }))
    }
  }, [dispatch, accessToken, tokenExpire, refreshToken])

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
