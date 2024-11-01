import { useAppSelector } from '../redux/reduxHooks'
import Greeting from './Greeting'
import PlaylistItemCard from './PlaylistItemCard'
import RecentlyPlayedCards from './RecentlyPlayedCards'

export default function Home() {
  const { playlists } = useAppSelector((state) => state.playlists)
  return (
    <div
      id='playlist-container'
      className='relative transition-all duration-1000 bg-green-600'
    >
      <div className='relative z-10 px-6 pt-10'>
        <div className='flex flex-wrap mt-6'>
          {playlists.slice(0, 8).map((playlist, index) => (
            <div key={index} className='w-1/2 p-1'>
              <RecentlyPlayedCards playlist={playlist} />
            </div>
          ))}
        </div>
        <Greeting />
        <div className='flex flex-wrap mt-6 gap-4'>
          {playlists.slice(0, 5).map((playlist, index) => (
            <PlaylistItemCard key={index} playlist={playlist} />
          ))}
        </div>
      </div>
      <div className='absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80'></div>
    </div>
  )
}
