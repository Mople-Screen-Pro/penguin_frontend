import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getPaddle, openCheckout, setOnCheckoutComplete, PRICE_IDS } from "../lib/paddle";
import { useSubscription } from "../hooks/useSubscription";
import { isActive } from "../types/subscription";
import { redirectToApp } from "../lib/deeplink";
import { supabase } from "../lib/supabase";
import { getSubscription } from "../lib/subscription";
import LoginModal from "../components/LoginModal";
import UpgradeModal from "../components/UpgradeModal";

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: 21,
    period: "/month",
    description: "Perfect for trying out Screen Pro",
    priceId: PRICE_IDS.monthly,
    popular: true,
    features: [
      "Unlimited recordings",
      "Auto cursor zoom",
      "Smart zoom editing",
      "MP4 export",
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
      "Unlimited recordings",
      "Auto cursor zoom",
      "Smart zoom editing",
      "MP4 export",
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
      "Unlimited recordings",
      "Auto cursor zoom",
      "Smart zoom editing",
      "MP4 export",
      "All future updates",
      "No recurring fees",
    ],
  },
];

export default function PricingPage() {
  const { user } = useAuth();
  const { subscription, refetch } = useSubscription();
  const [loading, setLoading] = useState<string | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [pendingPriceId, setPendingPriceId] = useState<string | null>(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const from = searchParams.get("from");

  useEffect(() => {
    getPaddle();
  }, []);

  // 체크아웃 완료 콜백 등록
  useEffect(() => {
    setOnCheckoutComplete(async () => {
      setShowCompleteModal(true);

      await new Promise((r) => setTimeout(r, 3000));
      setShowCompleteModal(false);

      if (from === "app" && user) {
        const { data } = await supabase.auth.getSession();
        const sub = await getSubscription(user.id);
        if (data.session) {
          redirectToApp(data.session, sub);
          return;
        }
      }
      navigate("/mypage", { state: { fromCheckout: true } });
    });
  }, [from, navigate, user]);

  // 로그인 후 pending checkout 자동 실행
  useEffect(() => {
    if (user && pendingPriceId) {
      openCheckout({
        priceId: pendingPriceId,
        userEmail: user.email,
        userId: user.id,
      });
      setPendingPriceId(null);
      setLoading(null);
    }
  }, [user, pendingPriceId]);

  const handlePurchase = async (priceId: string, planId: string) => {
    setLoading(planId);

    if (!user) {
      // 비로그인 → 로그인 모달 열기, 결제할 priceId 저장
      setPendingPriceId(priceId);
      setLoginModalOpen(true);
      setLoading(null);
      return;
    }

    await openCheckout({
      priceId,
      userEmail: user.email,
      userId: user.id,
    });
    setLoading(null);
  };

  const alreadySubscribed = isActive(subscription);
  const currentPriceId = alreadySubscribed ? subscription?.price_id : null;
  const isLifetime = currentPriceId === PRICE_IDS.lifetime;
  const isMonthly = alreadySubscribed && subscription?.billing_cycle_interval === "month";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group w-fit">
            <img
              src="/logo.png"
              alt="Screen Pro"
              className="w-9 h-9 rounded-xl shadow-lg shadow-violet-500/25"
            />
            <span className="text-xl font-bold text-slate-900">Screen Pro</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-grow">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Choose the plan that works best for you. All plans include full access to Screen Pro features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl border p-5 sm:p-6 lg:p-8 flex flex-col ${
                plan.popular
                  ? "border-violet-500 shadow-xl shadow-violet-500/10"
                  : "border-slate-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-violet-500/25">
                    Most Popular
                  </span>
                </div>
              )}

              {plan.savings && (
                <div className="absolute top-4 right-4">
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                    {plan.savings}
                  </span>
                </div>
              )}

              <div className="mb-4 lg:mb-6">
                <h2 className="text-lg lg:text-xl font-bold text-slate-900 mb-1 lg:mb-2">
                  {plan.name}
                </h2>
                <p className="text-slate-600 text-sm">{plan.description}</p>
              </div>

              <div className="mb-4 lg:mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl lg:text-4xl font-bold text-slate-900">
                    ${plan.price}
                  </span>
                  <span className="text-slate-500">{plan.period}</span>
                </div>
                {plan.billedAs && (
                  <p className="text-sm text-slate-500 mt-1">{plan.billedAs}</p>
                )}
              </div>

              <ul className="space-y-2 lg:space-y-3 mb-6 lg:mb-8 flex-grow">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 lg:gap-3 text-sm lg:text-base text-slate-600"
                  >
                    <svg
                      className="w-5 h-5 text-violet-500 flex-shrink-0"
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
                    {feature}
                  </li>
                ))}
              </ul>

              {currentPriceId === plan.priceId ? (
                <button
                  disabled
                  className="w-full py-3 px-4 rounded-xl font-medium bg-slate-100 text-slate-500 cursor-not-allowed"
                >
                  Current Plan
                </button>
              ) : isLifetime && plan.id !== "lifetime" ? (
                <button
                  disabled
                  className="w-full py-3 px-4 rounded-xl font-medium bg-slate-100 text-slate-400 cursor-not-allowed"
                >
                  Lifetime Active
                </button>
              ) : isMonthly && plan.id === "yearly" ? (
                <button
                  onClick={() => setUpgradeModalOpen(true)}
                  className="w-full py-3 px-4 rounded-xl font-medium transition-all bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700"
                >
                  Upgrade
                </button>
              ) : (
                <button
                  onClick={() => handlePurchase(plan.priceId, plan.id)}
                  disabled={loading === plan.id}
                  className={`w-full py-3 px-4 rounded-xl font-medium transition-all disabled:opacity-50 ${
                    plan.popular
                      ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  {loading === plan.id ? "Loading..." : isMonthly ? "Upgrade" : "Get Started"}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm">
            Secure payment powered by Paddle.
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-slate-400">
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Secure checkout
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-4 text-sm text-slate-500">
          <Link to="/terms" className="hover:text-slate-700">
            Terms of Service
          </Link>
          <span>·</span>
          <Link to="/privacy" className="hover:text-slate-700">
            Privacy Policy
          </Link>
          <span>·</span>
          <Link to="/refund" className="hover:text-slate-700">
            Refund Policy
          </Link>
          <span>·</span>
          <a
            href="mailto:jwjygpt0507@gmail.com"
            className="hover:text-slate-700"
          >
            Contact Support
          </a>
        </div>
      </footer>

      {/* 결제 완료 모달 */}
      {showCompleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center shadow-xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Payment Successful!</h3>
            <p className="text-slate-600 text-sm">Thank you for subscribing to Screen Pro. Redirecting...</p>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        onComplete={() => navigate("/mypage", { state: { fromCheckout: true } })}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => {
          setLoginModalOpen(false);
          setPendingPriceId(null);
        }}
      />
    </div>
  );
}
