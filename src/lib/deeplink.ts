import type { Session } from '@supabase/supabase-js'

const APP_SCHEME_BASE = 'penguin://auth-callback'
const SUPABASE_FUNCTIONS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`

/**
 * 서버에 임시 코드를 생성하고, 딥링크로 앱에 전달
 * - 토큰은 서버에 임시 저장 (60초 TTL, 1회용)
 * - 앱은 코드를 POST exchange-code Edge Function으로 교환
 */
export async function redirectToApp(session: Session, state: string): Promise<void> {
  const response = await fetch(`${SUPABASE_FUNCTIONS_URL}/generate-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({
      refresh_token: session.refresh_token,
    }),
  })

  if (!response.ok) {
    console.error('Failed to generate auth code:', response.status)
    throw new Error('Failed to generate auth code')
  }

  const { code } = await response.json()

  const params = new URLSearchParams({ code })
  if (state) {
    params.set('state', state)
  }

  window.location.href = `${APP_SCHEME_BASE}?${params.toString()}`
}
