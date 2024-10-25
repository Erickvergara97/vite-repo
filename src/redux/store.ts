import { configureStore } from '@reduxjs/toolkit'
import playerSlice from './slices/playerSlice'

const store = configureStore({
  reducer: playerSlice
})

export default store
