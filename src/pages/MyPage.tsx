import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getPaddle } from '../lib/paddle'
import { useSubscription } from '../hooks/useSubscription'
import { getPlanLabel, isActive, isPastDue, isCanceled, isLifetime, isExpired } from '../types/subscription'
import { analytics } from '../lib/analytics'
import CancelSubscriptionModal from '../components/CancelSubscriptionModal'
import { useState } from 'react'

async function fetchPortalUrls() {
  const { data, error } = await (await import('../lib/supabase')).supabase.functions.invoke('subscription-portal')
  if (error || !data) {
    console.error('Failed to fetch portal:', error ?? data)
    return null
  }
  return data as { cancel_url: string; update_payment_method_url: string }
}

function formatDate(isoString: string | null): string {
  if (!isoString) return '-'
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(isoString))
}

export default function MyPage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const { subscription, loading: subLoading, refetch } = useSubscription()
  const navigate = useNavigate()
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)

  const openManageSubscription = async () => {
    setPortalLoading(true)
    try {
      const data = await fetchPortalUrls()
      if (!data?.cancel_url || !data?.subscription_id) return
      const url = new URL(data.cancel_url)
      const cplId = url.pathname.replace('/', '')
      window.open(`${url.origin}/subscriptions/${data.subscription_id}/${cplId}?token=${url.searchParams.get('token')}`, '_blank')
    } finally {
      setPortalLoading(false)
    }
  }

  // Paddle 초기화
  useEffect(() => {
    getPaddle()
  }, [])

  // 비로그인 시 홈으로 리다이렉트
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/')
    }
  }, [user, authLoading, navigate])


  if (authLoading || subLoading) {
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
    await analytics.subscriptionCancel(email, reason, detail)
    await openManageSubscription()
    setCancelModalOpen(false)
  }

  // 사용자 정보
  const email = user?.email || ''
  const name = user?.user_metadata?.full_name || user?.user_metadata?.name || ''
  const avatar = user?.user_metadata?.avatar_url || null
  const provider = user?.app_metadata?.provider || ''

  // 구독 상태 파생
  const planLabel = getPlanLabel(subscription)
  const active = isActive(subscription)
  const pastDue = isPastDue(subscription)
  const canceled = isCanceled(subscription)
  const lifetime = isLifetime(subscription)
  const expired = isExpired(subscription)

  const getPlanBadge = () => {
    if (!subscription) return { label: 'Free', color: 'bg-slate-100 text-slate-700' }
    if (pastDue) return { label: `${planLabel} (Past Due)`, color: 'bg-amber-100 text-amber-700' }
    if (canceled && !expired) return { label: `${planLabel} (Canceled)`, color: 'bg-red-100 text-red-700' }
    if (canceled && expired) return { label: 'Expired', color: 'bg-slate-100 text-slate-700' }
    if (lifetime) return { label: 'Lifetime', color: 'bg-violet-100 text-violet-700' }
    if (planLabel === 'Yearly') return { label: 'Yearly', color: 'bg-blue-100 text-blue-700' }
    return { label: 'Monthly', color: 'bg-green-100 text-green-700' }
  }

  const planBadge = getPlanBadge()

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
                {provider && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500 capitalize">
                      Signed in with {provider}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Subscription Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-900">Subscription</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${planBadge.color}`}>
                {planBadge.label}
              </span>
            </div>

            {/* 상태 배너 */}
            {(() => {
              if (!subscription || (canceled && expired)) {
                return (
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{canceled && expired ? 'Subscription Expired' : 'Free Plan'}</p>
                      <p className="text-sm text-slate-500">
                        {canceled && expired ? 'Resubscribe to access Pro features.' : 'Upgrade to unlock all features.'}
                      </p>
                    </div>
                    <Link
                      to="/pricing"
                      className="px-4 py-2 bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm font-medium rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all shrink-0"
                    >
                      {canceled && expired ? 'Resubscribe' : 'Upgrade'}
                    </Link>
                  </div>
                )
              }
              if (lifetime) {
                return (
                  <div className="rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 p-4">
                    <p className="font-medium text-violet-900">Lifetime Access</p>
                    <p className="text-sm text-violet-600">Active forever — no renewal needed</p>
                  </div>
                )
              }
              if (canceled && !expired) {
                return (
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                    <p className="font-medium text-amber-900">Canceled</p>
                    <p className="text-sm text-amber-700">Pro features available until {formatDate(subscription.subscription_period_end)}</p>
                  </div>
                )
              }
              if (pastDue) {
                return (
                  <div className="rounded-xl bg-red-50 border border-red-200 p-4">
                    <p className="font-medium text-red-900">Payment Failed</p>
                    <p className="text-sm text-red-700">Please update your payment method to keep your subscription.</p>
                  </div>
                )
              }
              // active
              return (
                <div className="rounded-xl bg-green-50 border border-green-200 p-4">
                  <p className="font-medium text-green-900">Active</p>
                  <p className="text-sm text-green-700">Next billing on {formatDate(subscription.next_billed_at)}</p>
                </div>
              )
            })()}

            {/* 구독 상세 (구독이 있는 경우) */}
            {subscription && !(canceled && expired) && (
              <div className="mt-5 space-y-5">
                {/* 기간 진행률 (정기 구독만) */}
                {!lifetime && (() => {
                  const start = new Date(subscription.subscription_period_start).getTime()
                  const end = new Date(subscription.subscription_period_end).getTime()
                  const now = Date.now()
                  const total = end - start
                  const elapsed = Math.min(now - start, total)
                  const progress = Math.round((elapsed / total) * 100)
                  const daysLeft = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)))

                  return (
                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Current billing period</span>
                        <span className="text-sm font-medium text-slate-900">
                          {daysLeft > 0 ? `${daysLeft} days left` : 'Renewing soon'}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-slate-400">
                        <span>{formatDate(subscription.subscription_period_start)}</span>
                        <span>{formatDate(subscription.subscription_period_end)}</span>
                      </div>
                    </div>
                  )
                })()}

                {/* 구독 상세 정보 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-500 mb-1">Plan</p>
                    <p className="text-sm font-medium text-slate-900">{planLabel}</p>
                  </div>
                  {!lifetime && (
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs text-slate-500 mb-1">Billing Cycle</p>
                      <p className="text-sm font-medium text-slate-900 capitalize">{subscription.billing_cycle_interval}ly</p>
                    </div>
                  )}
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-500 mb-1">Subscribed Since</p>
                    <p className="text-sm font-medium text-slate-900">{formatDate(subscription.subscription_created_at)}</p>
                  </div>
                  {canceled && subscription.canceled_at && (
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs text-slate-500 mb-1">Canceled On</p>
                      <p className="text-sm font-medium text-red-600">{formatDate(subscription.canceled_at)}</p>
                    </div>
                  )}
                </div>

                {(active || pastDue) && !lifetime && (
                  <button
                    onClick={() => setCancelModalOpen(true)}
                    className="text-sm text-slate-400 hover:text-red-500 transition-colors"
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
              <button
                onClick={openManageSubscription}
                className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between"
              >
                <span>Manage Subscription</span>
                {portalLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setDeleteModalOpen(true)}
                className="w-full text-left px-4 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors flex items-center justify-between"
              >
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

      {/* Delete Account Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 max-w-md mx-4 w-full shadow-xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center mb-2">Delete Account</h3>
            <p className="text-sm text-slate-600 text-center mb-1">
              This action is <span className="font-semibold text-red-600">permanent and irreversible</span>.
            </p>
            <p className="text-sm text-slate-600 text-center mb-5">
              All your account data and subscription will be permanently deleted. Your local recordings will not be affected.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // TODO: API 연결
                  setDeleteModalOpen(false)
                }}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
