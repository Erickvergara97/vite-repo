import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  expiresAt: number | null // Agregar expiresAt
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  expiresAt: localStorage.getItem('expiresAt')
    ? Number(localStorage.getItem('expiresAt'))
    : null // Leer el expiresAt del localStorage
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload.accessToken // Cambiado para que sea un objeto
      state.expiresAt = Date.now() + action.payload.expiresIn * 1000 // Establecer la hora de expiración
      localStorage.setItem('accessToken', action.payload.accessToken)
      localStorage.setItem('expiresAt', state.expiresAt.toString()) // Guardar expiresAt en localStorage
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload
      localStorage.setItem('refreshToken', action.payload)
    },
    clearTokens(state) {
      state.accessToken = null
      state.refreshToken = null
      state.expiresAt = null // Limpiar expiresAt
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('expiresAt') // Eliminar expiresAt del localStorage
    }
  }
})

export const { setAccessToken, setRefreshToken, clearTokens } =
  authSlice.actions
export default authSlice.reducer
