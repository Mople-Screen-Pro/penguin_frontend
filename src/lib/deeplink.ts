import type { Session } from '@supabase/supabase-js'
import type { Subscription } from '../types/subscription'

const APP_UNIVERSAL_LINK_BASE = 'https://auth.sc-pro.net/app/auth-callback'
const APP_DEV_SCHEME_BASE = 'screenpro://auth-callback'

/**
 * from 파라미터에 따라 적절한 base URL 반환
 * - app-dev: custom URL scheme (로컬 dev 빌드용)
 * - app: Universal Link (프로덕션용)
 */
function getBaseUrl(from?: string): string {
  return from === 'app-dev' ? APP_DEV_SCHEME_BASE : APP_UNIVERSAL_LINK_BASE
}

/**
 * 앱으로 돌아가는 딥링크 URL 생성
 */
export function buildAppDeepLink(session: Session, subscription: Subscription | null, from?: string): string {
  const params: Record<string, string> = {
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  }

  if (subscription?.subscription_period_end) {
    params.subscription_period_end = subscription.subscription_period_end
  }

  const query = new URLSearchParams(params).toString()
  return `${getBaseUrl(from)}?${query}`
}

/**
 * 딥링크를 실행하여 앱으로 이동
 */
export function redirectToApp(session: Session, subscription: Subscription | null, from?: string): void {
  const deepLink = buildAppDeepLink(session, subscription, from)
  window.location.href = deepLink
}

/**
 * 구독 없는 유저에게 로그인 정보 + subscription_status=none 전달
 * - 앱에 로그인은 시켜주되 구독 없음을 알림
 */
export function notifyAppNoSubscription(session: Session, from?: string): void {
  const params = new URLSearchParams({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    subscription_status: 'none',
  })
  window.location.href = `${getBaseUrl(from)}?${params.toString()}`
}
