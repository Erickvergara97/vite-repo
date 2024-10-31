import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import playerSlice from './slices/playerSlice'
import playlistsReducer from './slices/playlistsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerSlice,
    playlists: playlistsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
