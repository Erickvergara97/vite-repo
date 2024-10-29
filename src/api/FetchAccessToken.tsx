const YOUR_CLIENT_ID = '468abe4343844f4584fbc728f7802068'
const YOUR_CLIENT_SECRET = '2d408f4431404c1d88df2c051e5f86f8'
const YOUR_REDIRECT_URI = 'http://localhost:5173/login'

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

  // localStorage.setItem('access_token', data.access_token) //esto puede ir en return data asi estaba antes.
  // localStorage.setItem('refresh_token', data.refresh_token)
  return data
}
