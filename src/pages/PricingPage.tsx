import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getPaddle, openCheckout } from "../lib/paddle";

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: 21,
    period: "/month",
    description: "Perfect for trying out Screen Pro",
    priceId: "pri_monthly", // TODO: Replace with actual Paddle Price ID
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
    priceId: "pri_yearly", // TODO: Replace with actual Paddle Price ID
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
    priceId: "pri_lifetime", // TODO: Replace with actual Paddle Price ID
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
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    getPaddle();
  }, []);

  const handlePurchase = async (priceId: string, planId: string) => {
    setLoading(planId);
    await openCheckout(priceId, user?.email);
    setLoading(null);
  };

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
          {/* <Link
            to="/"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            Back to Home
          </Link> */}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-base text-slate-600">
            Choose the plan that works best for you. All plans include full access to Screen Pro features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl border p-8 flex flex-col ${
                plan.popular
                  ? "border-violet-500 shadow-xl shadow-violet-500/10"
                  : "border-slate-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full">
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

              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  {plan.name}
                </h2>
                <p className="text-slate-600 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">
                    ${plan.price}
                  </span>
                  <span className="text-slate-500">{plan.period}</span>
                </div>
                {plan.billedAs && (
                  <p className="text-sm text-slate-500 mt-1">{plan.billedAs}</p>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-slate-600"
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

              <button
                onClick={() => handlePurchase(plan.priceId, plan.id)}
                disabled={loading === plan.id}
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all disabled:opacity-50 ${
                  plan.popular
                    ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {loading === plan.id ? "Loading..." : "Get Started"}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ or Trust badges */}
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
            {/* <span className="flex items-center gap-2">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              7-day refund policy
            </span> */}
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
    </div>
  );
}
