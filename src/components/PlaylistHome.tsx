import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchPlaylistById } from '../api/FetchPlaylist'
import { useAppSelector } from '../redux/reduxHooks'
import { Playlist } from '../types/Playlist'

export default function PlaylistHome() {
  const { id } = useParams()
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [playlist, setPlaylist] = useState<Playlist | null>(null)

  useEffect(() => {
    if (accessToken && id) {
      setLoading(true)
      fetchPlaylistById(accessToken, id)
        .then((data) => {
          setPlaylist(data)
          setError(null)
        })
        .catch((error) => {
          console.log(error)
          setError('Error al cargar playlists. Por favor, intenta de nuevo.')
        })
        .finally(() => setLoading(false))
    }
  }, [accessToken, id])
  console.log(playlist)

  if (loading) {
    return <p>Cargando playlist...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (!playlist) {
    return <p>No se encontró la playlist</p>
  }

  return (
    <div
      id='playlist-container'
      className='relative flex flex-col h-full bg-green-900 overflow-x-hidden'
    >
      <header className='flex flex-row gap-8 px-6'>
        <picture className='aspect-square w-32 h-32 flex-none mt-12'>
          <img
            src={playlist?.images?.[0]?.url}
            alt={`Cover of ${playlist?.name}`}
            className='object-cover w-full h-full shadow-lg rounded-md'
          />
        </picture>
        <div className='flex flex-col justify-between'>
          <h2 className='flex flex-1 items-end'>Playlist</h2>
          <div>
            <h1 className=' text-8xl font-bold block text-white'>
              {playlist?.name}
              <span></span>
            </h1>
          </div>
          <div className='flex-1 flex flex-row items-end'>
            <div className=' flex flex-row text-sm text-gray-300 font-normal'>
              <div>
                <span className='font-bold'>
                  {playlist?.owner?.display_name}
                </span>
              </div>
              <p className='mx-1'>•</p>
              <p className='flex flex-row'>
                {playlist?.followers?.total}{' '}
                {playlist?.followers?.total > 1
                  ? 'veces guardadas'
                  : 'vez guardada'}
                <p className='mx-1'>•</p>
                <span className='text-white'>
                  {' '}
                  {playlist?.tracks?.total}{' '}
                  {playlist?.tracks?.total > 1 || playlist?.tracks?.total === 0
                    ? 'canciones'
                    : 'cancion'}
                </span>{' '}
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className='relative z-10 px-6 pt-10'></div>
      <div className='absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 -z-10'></div>
    </div>
  )
}
