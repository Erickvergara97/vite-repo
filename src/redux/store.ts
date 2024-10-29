import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import playerSlice from './slices/playerSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
