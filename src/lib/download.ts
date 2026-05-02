export const DOWNLOAD_SOURCE_URL = 'https://grkyrqhgfgthpghircbu.supabase.co/functions/v1/download'

export const buildDownloadUrl = (location?: string) => {
  const params = new URLSearchParams()
  if (location) params.set('location', location)
  const qs = params.toString()
  return qs ? `/api/download?${qs}` : '/api/download'
}
