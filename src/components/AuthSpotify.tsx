import { useEffect, useRef, useState } from 'react'
import {
  fetchAccessToken,
  getAuthorizationCode,
  redirectToSpotifyAuth
} from '../api/FetchAccessToken'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { setAccessToken, setRefreshToken } from '../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'

export default function AuthSpotify() {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  const navigate = useNavigate()
  const hasFetchedToken = useRef(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const code = getAuthorizationCode()

    if (code && !accessToken && !hasFetchedToken.current) {
      hasFetchedToken.current = true
      fetchAccessToken(code)
        .then((data) => {
          dispatch(
            setAccessToken({
              accessToken: data.access_token,
              expiresIn: data.expires_in
            })
          )
          dispatch(setRefreshToken(data.refresh_token))
          navigate('/')
        })
        .catch((error) => {
          console.error('Error al obtener el token:', error)
          alert(
            'Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.'
          )
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [dispatch, accessToken, navigate])

  if (loading) {
    return <p>Cargando...</p>
  }

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
            Iniciar sesión en Spotify
          </button>
        </div>
      )}
    </div>
  )
}
