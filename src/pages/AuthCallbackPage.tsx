import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { getSubscription } from '../lib/subscription'
import { redirectToApp } from '../lib/deeplink'

export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        console.error('Auth callback error:', error)
        navigate('/')
        return
      }

      const from = searchParams.get('from')
      const user = data.session.user

      // 구독 상태 조회
      const subscription = await getSubscription(user.id)
      const hasActive = subscription?.status === 'active' || subscription?.status === 'past_due'

      if (from === 'app') {
        // 앱에서 진입한 경우
        if (hasActive) {
          // 구독 활성 → 딥링크로 앱에 토큰 + 만료시간 전달
          redirectToApp(data.session, subscription)
          return
        } else {
          // 구독 없음 → pricing 페이지로
          navigate('/pricing?from=app')
        }
      } else {
        // 웹에서 진입한 경우
        navigate('/')
      }
    }

    handleCallback()
  }, [navigate, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  )
}
