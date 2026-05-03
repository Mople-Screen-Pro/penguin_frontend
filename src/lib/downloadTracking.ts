import { supabase } from './supabase'

const cleanValue = (value: string | undefined, maxLength: number) => {
  const trimmed = value?.trim()
  if (!trimmed) return null
  return trimmed.slice(0, maxLength)
}

export const recordFirstAppDownload = async (location?: string, referrer?: string) => {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const { error } = await supabase.rpc('record_first_app_download', {
      p_location: cleanValue(location, 100),
      p_referrer: cleanValue(referrer, 500),
      p_user_agent: cleanValue(navigator.userAgent, 500),
    })

    if (error) {
      console.error('Download tracking failed:', error)
    }
  } catch (error) {
    console.error('Download tracking failed:', error)
  }
}
