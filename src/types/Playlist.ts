export interface Playlist {
  id: string
  name: string
  owner: { display_name: string }
  images: { url: string }[]
  followers: {
    href: string | null
    total: number
  }
  tracks: {
    total: number
  }
}
