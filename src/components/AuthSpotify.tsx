import { useEffect, useRef } from 'react'
import {
  fetchAccessToken,
  getAuthorizationCode,
  redirectToSpotifyAuth
} from '../api/FetchAccessToken'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { setAccessToken } from '../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'

export default function AuthSpotify() {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  const navigate = useNavigate()
  const hasFetchedToken = useRef(false)
  useEffect(() => {
    const code = getAuthorizationCode()

    if (code && !accessToken && !hasFetchedToken.current) {
      hasFetchedToken.current = true
      fetchAccessToken(code)
        .then((data) => {
          dispatch(setAccessToken(data.access_token))
          navigate('/')
          //   const url = new URL(window.location.href)
          //   url.searchParams.delete('code')
          //   window.history.pushState({}, document.title, url.toString())
        })
        .catch((error) => {
          console.error('Error al obtener el token:', error)
          alert(
            'Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.'
          )
        })
    }
  }, [dispatch, accessToken, navigate])
  return (
    <div>
      {accessToken ? (
        <p>Autenticado</p>
      ) : (
        <div className='flex justify-center items-center h-screen'>
          <button
            className='p-2 rounded-xl bg-green-600 hover:bg-green-400'
            onClick={redirectToSpotifyAuth}
          >
            Iniciar sesion en Spotify
          </button>
        </div>
      )}
    </div>
  )
}
