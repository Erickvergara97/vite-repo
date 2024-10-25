import SpotifyIcon from '../icons/spotifyIcon.svg?react'
export default function NavMenu() {
  return (
    <div className='flex flex-row justify-between'>
      <SpotifyIcon />
      <span>Buscador</span>
      <span>Right helpers</span>
    </div>
  )
}
