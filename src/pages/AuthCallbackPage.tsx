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
      const state = searchParams.get('state') || ''
      const user = data.session.user

      // 구독 상태 조회
      const subscription = await getSubscription(user.id)
      const hasActive = subscription?.status === 'active' || subscription?.status === 'past_due'

      if (from === 'app' || from === 'app-dev') {
        // 앱에서 진입한 경우 → 딥링크로 임시 코드 전달 (구독 유무 무관)
        try {
          await redirectToApp(data.session, state)
        } catch (e) {
          console.error('Failed to redirect to app:', e)
          navigate('/')
          return
        }

        if (!hasActive) {
          // 구독 없음 → mypage로 이동 (딥링크가 먼저 처리되도록 딜레이)
          setTimeout(() => navigate('/mypage?from=app', { replace: true }), 100)
        }
      } else if (from === 'pricing') {
        navigate('/pricing', { replace: true })
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
