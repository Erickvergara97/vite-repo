// api/FetchPlaylists.ts
export async function fetchUserPlaylists(accessToken: string) {
  const url = 'https://api.spotify.com/v1/me/playlists'

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch playlists')
    }

    const data = await response.json()
    return data.items
  } catch (error) {
    console.error('Error fetching playlists:', error)
    return []
  }
}

export async function fetchPlaylistById(
  accessToken: string,
  playlist_id: string
) {
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}`

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch requested playlist')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching requested playlist:', error)
    return []
  }
}
