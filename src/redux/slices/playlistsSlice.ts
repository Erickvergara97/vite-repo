// playlistsSlice.js
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { fetchUserPlaylists } from '../../api/FetchPlaylist'
import { Playlist } from '../../types/Playlist'

// Define la estructura del estado del slice

interface PlaylistsState {
  playlists: Playlist[]
  loading: boolean
  error: string | null
}

// Estado inicial
const initialState: PlaylistsState = {
  playlists: [],
  loading: false,
  error: null
}

// Define el tipo de los parámetros para el thunk
interface FetchUserPlaylistsParams {
  accessToken: string
}
// Define la acción asíncrona usando createAsyncThunk
export const getUserPlaylists = createAsyncThunk<
  Playlist[],
  FetchUserPlaylistsParams,
  { rejectValue: string }
>(
  'playlists/getUserPlaylists',
  async ({ accessToken }, { rejectWithValue }) => {
    try {
      return await fetchUserPlaylists(accessToken)
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error desconocido al obtener las playlists'
      return rejectWithValue(errorMessage)
    }
  }
)

// Configura el slice de playlists
const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserPlaylists.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        getUserPlaylists.fulfilled,
        (state, action: PayloadAction<Playlist[]>) => {
          state.loading = false
          state.playlists = action.payload
        }
      )
      .addCase(getUserPlaylists.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'An error has ocurred'
      })
  }
})

export default playlistsSlice.reducer
