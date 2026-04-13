'use client'

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "../../contexts/AuthContext"
import {
  getPaddle,
  openCheckout,
  setOnCheckoutComplete,
  PRICE_IDS,
} from "../../lib/paddle"
import { useSubscription } from "../../hooks/useSubscription"
import { isActive, isPastDue, isCanceled, isExpired } from "../../types/subscription"
import { redirectToApp } from "../../lib/deeplink"
import { supabase } from "../../lib/supabase"
import { analytics } from "../../lib/analytics"
import UpgradeModal from "../../components/UpgradeModal"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: 21,
    period: "/month",
    description: "Perfect for trying out Clipa",
    priceId: PRICE_IDS.monthly,
    popular: true,
    features: [
      "Unlimited recordings",
      "Auto cursor zoom & smart editing",
      "AI upscale up to 4K",
      "10+ styling presets",
      "YouTube, TikTok, Instagram export",
    ],
  },
  {
    id: "yearly",
    name: "Yearly",
    price: 8,
    period: "/month",
    billedAs: "Billed $96/year",
    description: "Best value for regular users",
    priceId: PRICE_IDS.yearly,
    savings: "Save 62%",
    features: [
      "Everything in Monthly",
      "Auto cursor zoom & smart editing",
      "AI upscale up to 4K",
      "10+ styling presets",
      "YouTube, TikTok, Instagram export",
      "2 months free",
    ],
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: 240,
    period: "one-time",
    description: "Pay once, use forever",
    priceId: PRICE_IDS.lifetime,
    features: [
      "Everything in Yearly",
      "Auto cursor zoom & smart editing",
      "AI upscale up to 4K",
      "10+ styling presets",
      "YouTube, TikTok, Instagram export",
      "All future updates included",
      "No recurring fees, ever",
    ],
  },
]

export default function PricingClient() {
  const { user } = useAuth()
  const { subscription, loading: subLoading, refetch } = useSubscription()
  const [loading, setLoading] = useState<string | null>(null)
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)
  const [downgradeModalOpen, setDowngradeModalOpen] = useState(false)
  const [lifetimeModalOpen, setLifetimeModalOpen] = useState(false)
  const [pendingPriceId, setPendingPriceId] = useState<string | null>(null)
  const [lastPlanId, setLastPlanId] = useState<string | null>(null)
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [cancelDowngradeModalOpen, setCancelDowngradeModalOpen] =
    useState(false)
  const [cancelingDowngrade, setCancelingDowngrade] = useState(false)
  const [reactivateLoading, setReactivateLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const from = searchParams.get("from")
  const state = searchParams.get("state") || ""

  useEffect(() => {
    getPaddle()
  }, [])

  // 체크아웃 완료 콜백 등록
  useEffect(() => {
    setOnCheckoutComplete(async () => {
      analytics.purchaseComplete(lastPlanId || "unknown")
      setShowCompleteModal(true)

      await new Promise((r) => setTimeout(r, 3000))
      setShowCompleteModal(false)

      if ((from === "app" || from === "app-dev") && user) {
        const { data } = await supabase.auth.refreshSession()
        if (data.session) {
          try {
            await redirectToApp(data.session, state)
            return
          } catch (e) {
            console.error("Failed to redirect to app:", e)
          }
        }
      }
      router.push("/mypage?fromCheckout=true")
    })
  }, [from, state, router, user, lastPlanId])

  // 로그인 후 pending checkout 자동 실행
  useEffect(() => {
    if (user && pendingPriceId) {
      openCheckout({
        priceId: pendingPriceId,
        userEmail: user.email,
        userId: user.id,
      })
      setPendingPriceId(null)
      setLoading(null)
    }
  }, [user, pendingPriceId])

  const handlePurchase = async (priceId: string, planId: string) => {
    setLoading(planId)
    setLastPlanId(planId)

    if (!user) {
      // 비로그인 → 로그인 페이지로 이동, 결제할 priceId 저장
      setPendingPriceId(priceId)
      router.push("/login?from=pricing")
      setLoading(null)
      return
    }

    await openCheckout({
      priceId,
      userEmail: user.email,
      userId: user.id,
    })
    setLoading(null)
  }

  const handleCancelDowngrade = async () => {
    setCancelingDowngrade(true)
    try {
      const { error: err } = await supabase.functions.invoke(
        "upgrade-subscription",
        {
          body: { action: "cancel_downgrade" },
        }
      )
      if (err) {
        console.error("Failed to cancel downgrade:", err)
        return
      }
      await new Promise((r) => setTimeout(r, 2000))
      refetch()
      setCancelDowngradeModalOpen(false)
    } catch (err) {
      console.error("Failed to cancel downgrade:", err)
    } finally {
      setCancelingDowngrade(false)
    }
  }

  const handleReactivate = async () => {
    setReactivateLoading(true)
    try {
      const { error } = await supabase.functions.invoke(
        "reactivate-subscription",
        { body: {} }
      )
      if (error) {
        console.error("Failed to reactivate subscription:", error)
        alert("Failed to reactivate subscription. Please try again.")
        return
      }
      await new Promise((r) => setTimeout(r, 2000))
      refetch()
    } catch (err) {
      console.error("Failed to reactivate subscription:", err)
      alert("Failed to reactivate subscription. Please try again.")
    } finally {
      setReactivateLoading(false)
    }
  }

  const alreadySubscribed = isActive(subscription)
  const pastDue = isPastDue(subscription)
  const currentPriceId = alreadySubscribed ? subscription?.price_id : null
  const isLifetimePlan = currentPriceId === PRICE_IDS.lifetime
  const isMonthly =
    alreadySubscribed && subscription?.billing_cycle_interval === "month"
  const isYearly =
    alreadySubscribed &&
    subscription?.billing_cycle_interval === "year" &&
    !isLifetimePlan
  const hasScheduledDowngrade = !!(
    subscription?.scheduled_change_effective_at &&
    new Date(subscription.scheduled_change_effective_at) > new Date() &&
    subscription.scheduled_change_billing_cycle_interval === "month"
  )
  const canceled = isCanceled(subscription)
  const expired = isExpired(subscription)
  const canceledNotExpired = canceled && !expired
  const hasScheduledCancel = !!(
    subscription?.scheduled_change_effective_at &&
    new Date(subscription.scheduled_change_effective_at) > new Date() &&
    !subscription.scheduled_change_billing_cycle_interval
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[15%] left-[5%] w-72 h-44 rounded-3xl bg-gradient-to-br from-purple-500/[0.07] to-purple-600/[0.03] rotate-[-12deg] blur-sm" />
        <div className="absolute top-[40%] right-[8%] w-56 h-56 rounded-2xl bg-gradient-to-br from-blue-500/[0.05] to-indigo-600/[0.02] rotate-[8deg] blur-sm" />
        <div className="absolute bottom-[20%] left-[15%] w-48 h-48 rounded-2xl bg-gradient-to-br from-pink-500/[0.05] to-rose-600/[0.02] rotate-[5deg] blur-sm" />
      </div>

      {/* Content */}
      <main className="relative z-10 section-glow max-w-7xl mx-auto px-6 pt-24 sm:pt-28 pb-[80px] md:pb-[160px] flex-grow w-full">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="badge-block badge-gold mb-6 animate-on-load">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            Pricing
          </span>
          <h1 className="heading-lg font-bold text-gray-900 mb-4 animate-on-load delay-1">
            Simple, <span className="gradient-text">transparent</span> pricing
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-lg mx-auto animate-on-load delay-2">
            Choose the plan that works best for you.
            <br className="hidden sm:block" />
            All plans include full access to Clipa features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              className={`animate-on-load delay-${i + 2} relative glass-card p-6 lg:p-8 flex flex-col ${
                plan.popular
                  ? "!border-primary-400/50 shadow-xl shadow-primary-500/20 scale-[1.03] lg:scale-105"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="badge-block text-primary-300 bg-primary-500/15 border-primary-500/25 !border-b-primary-600/30 !text-[10px] !px-3 !py-1">
                    Most Popular
                  </span>
                </div>
              )}

              {plan.savings && (
                <div className="absolute top-5 right-5">
                  <span className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200 shadow-sm shadow-green-500/10">
                    {plan.savings}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  {plan.name}
                </h2>
                <p className="text-gray-500 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl lg:text-5xl font-bold tracking-tight ${plan.popular ? 'gradient-text' : 'text-gray-900'}`}>
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
                {plan.billedAs && (
                  <p className="text-sm text-gray-500 mt-1.5">{plan.billedAs}</p>
                )}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-sm text-gray-600"
                  >
                    <svg
                      className={`w-4 h-4 flex-shrink-0 ${plan.popular ? 'text-accent-pink' : 'text-primary-400'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {user && subLoading ? (
                <button
                  disabled
                  className="w-full py-3 px-4 rounded-xl font-medium bg-gray-100 text-gray-500 cursor-default"
                >
                  &nbsp;
                </button>
              ) : pastDue ? (
                <button
                  disabled
                  className="w-full py-3 px-4 rounded-xl font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20 cursor-not-allowed"
                >
                  Update Payment Method
                </button>
              ) : (canceledNotExpired || hasScheduledCancel) &&
                subscription?.price_id === plan.priceId ? (
                <button
                  onClick={handleReactivate}
                  disabled={reactivateLoading}
                  className="btn-block w-full disabled:opacity-50"
                >
                  {reactivateLoading ? "Resubscribing..." : "Resubscribe"}
                </button>
              ) : currentPriceId === plan.priceId ? (
                <button
                  disabled
                  className="w-full py-3 px-4 rounded-xl font-medium bg-gray-100 text-gray-500 cursor-default"
                >
                  Current Plan
                </button>
              ) : isLifetimePlan && plan.id !== "lifetime" ? (
                <button
                  disabled
                  className="w-full py-3 px-4 rounded-xl font-medium bg-gray-100 text-gray-500 cursor-not-allowed"
                >
                  Lifetime Active
                </button>
              ) : (isMonthly || isYearly) && plan.id === "lifetime" ? (
                <button
                  onClick={() => setLifetimeModalOpen(true)}
                  className="btn-block w-full"
                >
                  Upgrade
                </button>
              ) : isMonthly && plan.id === "yearly" ? (
                <button
                  onClick={() => setUpgradeModalOpen(true)}
                  className="btn-block w-full"
                >
                  Upgrade
                </button>
              ) : isYearly && plan.id === "monthly" && hasScheduledDowngrade ? (
                <button
                  onClick={() => setCancelDowngradeModalOpen(true)}
                  className="w-full py-3 px-4 rounded-xl font-medium bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-400 transition-colors"
                >
                  Switching Soon
                </button>
              ) : isYearly && plan.id === "monthly" ? (
                <button
                  onClick={() => setDowngradeModalOpen(true)}
                  className="btn-block-ghost w-full"
                >
                  Switch to Monthly
                </button>
              ) : (
                <button
                  onClick={() => handlePurchase(plan.priceId, plan.id)}
                  disabled={loading === plan.id}
                  className={`w-full disabled:opacity-50 ${
                    plan.popular
                      ? "btn-block"
                      : "btn-block-ghost"
                  }`}
                >
                  {loading === plan.id
                    ? "Loading..."
                    : alreadySubscribed
                    ? "Upgrade"
                    : "Get Started"}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Trust badge */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-500 text-sm">
            <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Secure payment via Paddle &middot; Cancel anytime
          </div>
        </div>
      </main>

      <Footer />

      {/* 결제 완료 모달 */}
      {showCompleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center shadow-xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h3>
            <p className="text-gray-500 text-sm">
              Thank you for subscribing to Clipa. Redirecting...
            </p>
          </div>
        </div>
      )}

      {/* Cancel Downgrade Modal */}
      {cancelDowngradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 max-w-md mx-4 w-full shadow-xl">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
              Cancel Scheduled Switch?
            </h3>
            <p className="text-sm text-gray-500 text-center mb-5">
              Your plan is scheduled to switch to monthly. Would you like to
              cancel this and keep your yearly subscription?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelDowngradeModalOpen(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Keep Switch
              </button>
              <button
                onClick={handleCancelDowngrade}
                disabled={cancelingDowngrade}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all disabled:opacity-50"
              >
                {cancelingDowngrade ? "Canceling..." : "Stay on Yearly"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal (Monthly → Yearly) */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        onComplete={() => router.push("/mypage?fromCheckout=true")}
        mode="upgrade"
        targetPriceId={PRICE_IDS.yearly}
        targetInterval="year"
      />

      {/* Downgrade Modal (Yearly → Monthly) */}
      <UpgradeModal
        isOpen={downgradeModalOpen}
        onClose={() => setDowngradeModalOpen(false)}
        onComplete={() => router.push("/mypage?fromCheckout=true")}
        mode="downgrade"
        targetPriceId={PRICE_IDS.monthly}
        targetInterval="month"
      />

      {/* Lifetime Upgrade Modal */}
      <UpgradeModal
        isOpen={lifetimeModalOpen}
        onClose={() => setLifetimeModalOpen(false)}
        onComplete={() => router.push("/mypage?fromCheckout=true")}
        mode="lifetime"
        targetPriceId={PRICE_IDS.lifetime}
      />
    </div>
  )
}
