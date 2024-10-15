import { createSlice } from '@reduxjs/toolkit'

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    isPlaying: false,
    currentMusic: { playlist: null, song: null, songs: [] },
    volume: 1
  },
  reducers: {
    setVolume(state, action) {
      state.volume = action.payload
    },
    setIsPlaying(state, action) {
      state.isPlaying = action.payload
    },
    setCurrentMusic(state, action) {
      state.currentMusic = action.payload
    }
  }
})

// Exportar las acciones generadas automáticamente por createSlice
export const { setVolume, setIsPlaying, setCurrentMusic } = playerSlice.actions

// Exportar el reducer
export default playerSlice.reducer
