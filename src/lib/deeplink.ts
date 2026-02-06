import type { Session } from '@supabase/supabase-js'
import type { Subscription } from '../types/subscription'

// TODO: 앱 개발자와 협의하여 실제 URL 스킴으로 교체
const APP_SCHEME = 'screenpro'

/**
 * 앱으로 돌아가는 딥링크 URL 생성
 */
export function buildAppDeepLink(session: Session, subscription: Subscription | null): string {
  const params: Record<string, string> = {
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  }

  if (subscription?.subscription_period_end) {
    params.subscription_period_end = subscription.subscription_period_end
  }

  const query = new URLSearchParams(params).toString()
  return `${APP_SCHEME}://auth?${query}`
}

/**
 * 딥링크를 실행하여 앱으로 이동
 */
export function redirectToApp(session: Session, subscription: Subscription | null): void {
  const deepLink = buildAppDeepLink(session, subscription)
  window.location.href = deepLink
}
