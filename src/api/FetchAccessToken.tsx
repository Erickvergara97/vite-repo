import {
  clearTokens,
  setAccessToken,
  setRefreshToken
} from '../redux/slices/authSlice'
import store from '../redux/store'

const YOUR_CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const YOUR_CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET
const YOUR_REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI

// const scopes = 'user-read-private user-read-email' // Permisos que necesitas
// Construir la URL de autorización
// &scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
// Paso 1: Redirigir al usuario a la página de autorización
export const redirectToSpotifyAuth = () => {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${YOUR_CLIENT_ID}&redirect_uri=${encodeURIComponent(YOUR_REDIRECT_URI)}&response_type=code&scope=user-read-private user-read-email playlist-read-private`
  window.location.href = AUTH_URL
}

// Paso 2: Obtener el código de autorización del callback
export const getAuthorizationCode = () => {
  const queryParams = new URLSearchParams(window.location.search)
  return queryParams.get('code')
}

// Paso 3: Obtener el token de acceso usando el código
export const fetchAccessToken = async (code: string) => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(YOUR_CLIENT_ID + ':' + YOUR_CLIENT_SECRET)
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: YOUR_REDIRECT_URI
    })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error('Error al obtener el token')
  }

  return data
}

export const refreshAccessToken = async (refreshToken: string) => {
  const url = 'https://accounts.spotify.com/api/token'

  if (!refreshToken) return

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${YOUR_CLIENT_ID}:${YOUR_CLIENT_SECRET}`)}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  }
  try {
    const response = await fetch(url, payload)

    if (!response.ok) {
      throw new Error('Failed to refresh access token')
    }

    const data = await response.json()
    store.dispatch(
      setAccessToken({
        accessToken: data.access_token,
        expiresIn: data.expires_in
      })
    )
    if (data.refresh_token) {
      store.dispatch(setRefreshToken(data.refresh_token)) // Almacena el nuevo refresh token en Redux
    }
    // return data.access_token // Retorna el nuevo access_token
  } catch (error) {
    console.error('Error refreshing token:', error)
    store.dispatch(clearTokens()) // Limpia tokens si hay un error
  }
}
