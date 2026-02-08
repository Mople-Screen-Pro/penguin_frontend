import type { Session } from '@supabase/supabase-js'
import type { Subscription } from '../types/subscription'

const APP_UNIVERSAL_LINK_BASE = 'https://sc-pro.net/app/auth-callback'

/**
 * 앱으로 돌아가는 Universal Link URL 생성
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
  return `${APP_UNIVERSAL_LINK_BASE}?${query}`
}

/**
 * Universal Link를 실행하여 앱으로 이동
 */
export function redirectToApp(session: Session, subscription: Subscription | null): void {
  const deepLink = buildAppDeepLink(session, subscription)
  window.location.href = deepLink
}

/**
 * 구독 없는 유저에게 로그인 정보 + subscription_status=none Universal Link 전달
 * - 앱에 로그인은 시켜주되 구독 없음을 알림
 */
export function notifyAppNoSubscription(session: Session): void {
  const params = new URLSearchParams({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    subscription_status: 'none',
  })
  window.location.href = `${APP_UNIVERSAL_LINK_BASE}?${params.toString()}`
}
