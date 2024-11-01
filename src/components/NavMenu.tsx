import SpotifyIcon from '../icons/spotifyIcon.svg?react'
export default function NavMenu() {
  return (
    <div className='flex flex-row justify-between px-5 py-2'>
      <SpotifyIcon />
      <span>Buscador</span>
      <span>Right helpers</span>
    </div>
  )
}
