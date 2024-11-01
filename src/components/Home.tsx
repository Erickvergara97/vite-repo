import { useAppSelector } from '../redux/reduxHooks'
import Greeting from './Greeting'
import PlaylistItemCard from './PlaylistItemCard'

export default function Home() {
  const { playlists } = useAppSelector((state) => state.playlists)
  return (
    <div
      id='playlist-container'
      className='relative transition-all duration-1000 bg-green-600'
    >
      <div className='relative z-10 px-6 pt-10'>
        <Greeting />
        <div className='flex flex-wrap mt-6 gap-4'>
          {playlists.map((playlist, index) => (
            <PlaylistItemCard key={index} playlist={playlist} />
          ))}
        </div>
      </div>
      <div className='absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80'></div>
    </div>
  )
}
