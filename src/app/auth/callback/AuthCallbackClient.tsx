'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '../../../lib/supabase'
import { getSubscription } from '../../../lib/subscription'
import { redirectToApp } from '../../../lib/deeplink'

export default function AuthCallbackClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        console.error('Auth callback error:', error)
        router.push('/')
        return
      }

      const from = searchParams.get('from')
      const state = searchParams.get('state') || ''
      const user = data.session.user

      // 구독 상태 조회
      const subscription = await getSubscription(user.id)
      const hasActive = subscription?.status === 'active' || subscription?.status === 'past_due'

      if (from === 'app' || from === 'app-dev') {
        if (hasActive) {
          // 구독 있음 → 바로 앱으로 딥링크 콜백
          try {
            await redirectToApp(data.session, state)
          } catch (e) {
            console.error('Failed to redirect to app:', e)
            router.push('/')
          }
        } else {
          // 구독 없음 → pricing 페이지로 이동 (결제 완료 후 앱으로 콜백)
          router.replace(`/pricing?from=${from}&state=${encodeURIComponent(state)}`)
        }
      } else if (from === 'pricing') {
        router.replace('/pricing')
      } else {
        // 웹에서 진입한 경우
        router.push('/')
      }
    }

    handleCallback()
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  )
}
