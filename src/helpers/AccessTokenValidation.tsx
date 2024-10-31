export function isTokenExpired(expiresAt: number) {
  return Date.now() >= Number(expiresAt)
}
