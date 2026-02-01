import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getPaddle, openCheckout } from '../lib/paddle'
import { analytics } from '../lib/analytics'
import CancelSubscriptionModal from '../components/CancelSubscriptionModal'

export default function MyPage() {
  const { user, loading, signOut } = useAuth()
  const navigate = useNavigate()
  const [paddleLoading, setPaddleLoading] = useState(false)
  const [cancelModalOpen, setCancelModalOpen] = useState(false)

  // Paddle 초기화
  useEffect(() => {
    getPaddle()
  }, [])

  // TODO: 개발 완료 후 인증 체크 다시 활성화
  // useEffect(() => {
  //   if (!loading && !user) {
  //     navigate('/')
  //   }
  // }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  const handleCancelConfirm = async (reason: string, detail?: string) => {
    // Slack으로 취소 사유 전송
    await analytics.subscriptionCancel(email, reason, detail)

    // Paddle Customer Portal로 이동하여 실제 취소 진행
    window.open('https://sandbox-customer-portal.paddle.com', '_blank')
    setCancelModalOpen(false)
  }

  // 사용자 정보 추출 (로그인 안 된 경우 더미 데이터)
  const email = user?.email || 'demo@example.com'
  const name = user?.user_metadata?.full_name || user?.user_metadata?.name || 'Demo User'
  const avatar = user?.user_metadata?.avatar_url || null
  const provider = user?.app_metadata?.provider || 'google'

  // TODO: Paddle/Supabase에서 구독 정보 가져오기
  const subscription = {
    plan: 'yearly', // 'free' | 'monthly' | 'yearly' | 'lifetime' (테스트용으로 yearly 설정)
    licenseKey: 'SP-XXXX-XXXX-XXXX',
    purchaseDate: '2025-01-15',
    expiresAt: '2026-01-15',
  }

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'lifetime':
        return { label: 'Lifetime', color: 'bg-violet-100 text-violet-700' }
      case 'yearly':
        return { label: 'Yearly', color: 'bg-blue-100 text-blue-700' }
      case 'monthly':
        return { label: 'Monthly', color: 'bg-green-100 text-green-700' }
      default:
        return { label: 'Free', color: 'bg-slate-100 text-slate-700' }
    }
  }

  const planBadge = getPlanBadge(subscription.plan)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group w-fit">
            <img src="/logo.png" alt="Screen Pro" className="w-9 h-9 rounded-xl shadow-lg shadow-violet-500/25" />
            <span className="text-xl font-bold text-slate-900">Screen Pro</span>
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-slate-900 mb-8">My Account</h1>

        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Profile</h2>
            <div className="flex items-center gap-4">
              {avatar ? (
                <img src={avatar} alt="" className="w-16 h-16 rounded-full" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  {email.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-medium text-slate-900">{name || 'User'}</p>
                <p className="text-slate-600">{email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500 capitalize">
                    Signed in with {provider}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Subscription</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${planBadge.color}`}>
                {planBadge.label}
              </span>
            </div>

            {subscription.plan === 'free' ? (
              <div>
                <p className="text-slate-600 mb-4">
                  You're currently on the free plan with limited features.
                </p>
                <button
                  onClick={async () => {
                    setPaddleLoading(true)
                    // TODO: 실제 Paddle Price ID로 교체
                    await openCheckout('pri_XXXXX', email)
                    setPaddleLoading(false)
                  }}
                  disabled={paddleLoading}
                  className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-br from-violet-500 to-purple-600 text-white font-medium rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all disabled:opacity-50"
                >
                  {paddleLoading ? 'Loading...' : 'Upgrade to Pro'}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {subscription.licenseKey && (
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">License Key</span>
                    <span className="font-mono text-slate-900">{subscription.licenseKey}</span>
                  </div>
                )}
                {subscription.purchaseDate && (
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Purchase Date</span>
                    <span className="text-slate-900">{subscription.purchaseDate}</span>
                  </div>
                )}
                {subscription.expiresAt && (
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Expires</span>
                    <span className="text-slate-900">{subscription.expiresAt}</span>
                  </div>
                )}
                {subscription.plan === 'lifetime' ? (
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Status</span>
                    <span className="text-green-600 font-medium">Active Forever</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setCancelModalOpen(true)}
                    className="mt-4 text-sm text-slate-500 hover:text-red-600 transition-colors"
                  >
                    Cancel subscription
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Account</h2>
            <div className="space-y-3">
              <a
                href="https://sandbox-customer-portal.paddle.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between"
              >
                <span>Manage Subscription</span>
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="https://sandbox-customer-portal.paddle.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between"
              >
                <span>Billing History</span>
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <button className="w-full text-left px-4 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors flex items-center justify-between">
                <span>Delete Account</span>
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 pt-8 border-t border-slate-200 flex flex-wrap gap-4 text-sm text-slate-500">
          <Link to="/terms" className="hover:text-slate-700">Terms of Service</Link>
          <span>·</span>
          <Link to="/privacy" className="hover:text-slate-700">Privacy Policy</Link>
          <span>·</span>
          <Link to="/refund" className="hover:text-slate-700">Refund Policy</Link>
          <span>·</span>
          <a href="mailto:jwjygpt0507@gmail.com" className="hover:text-slate-700">Contact Support</a>
        </div>
      </main>

      {/* Cancel Subscription Modal */}
      <CancelSubscriptionModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={handleCancelConfirm}
      />
    </div>
  )
}
