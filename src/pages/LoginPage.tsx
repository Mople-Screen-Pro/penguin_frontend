import { useEffect, useState } from 'react'
import { Link, useSearchParams, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { getSubscription } from '../lib/subscription'
import { redirectToApp, notifyAppNoSubscription } from '../lib/deeplink'

export default function LoginPage() {
  const { user, session, loading, signInWithGoogle, signInWithApple, signInWithGithub } = useAuth()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const from = searchParams.get('from') || undefined
  const [appRedirectHandled, setAppRedirectHandled] = useState(false)

  const isFromApp = from === 'app' || from === 'app-dev'

  // 이미 로그인된 유저가 from=app으로 접근한 경우 처리
  useEffect(() => {
    if (loading || !user || !session || !isFromApp || appRedirectHandled) return

    setAppRedirectHandled(true)

    const handleAppRedirect = async () => {
      // 앱에서 signOut 후 재로그인 시 토큰이 무효화될 수 있으므로 세션 갱신
      const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession()

      if (refreshError || !refreshed.session) {
        // 세션이 무효화됨 (앱에서 signOut으로 인해) → 웹도 로그아웃 후 재로그인 유도
        await supabase.auth.signOut()
        setAppRedirectHandled(false)
        return
      }

      const freshSession = refreshed.session
      const subscription = await getSubscription(user.id)
      const hasActive = subscription?.status === 'active' || subscription?.status === 'past_due'

      if (hasActive) {
        redirectToApp(freshSession, subscription)
      } else {
        notifyAppNoSubscription(freshSession)
        // 약간의 딜레이 후 mypage로 이동 (딥링크가 먼저 처리되도록)
        setTimeout(() => navigate('/mypage', { replace: true }), 100)
      }
    }

    handleAppRedirect()
  }, [loading, user, session, from, isFromApp, appRedirectHandled, navigate])

  if (!loading && user && !isFromApp) {
    return <Navigate to="/" replace />
  }

  // from=app이고 이미 로그인된 유저는 처리 중 로딩 표시
  if (!loading && user && isFromApp) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to app...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Branding & Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-violet-500/25 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/25 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-fuchsia-500/15 rounded-full blur-3xl" />

        {/* Grid background */}
        <div className="absolute inset-0 bg-grid opacity-10" />

        {/* Content */}
        <div className="relative flex flex-col justify-center items-center w-full px-12">
          {/* Logo & Title */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img
                src="/logo.png"
                alt="Screen Pro"
                className="w-14 h-14 rounded-2xl shadow-lg shadow-violet-500/30"
              />
              <span className="text-3xl font-bold text-white">Screen Pro</span>
            </div>
            <p className="text-lg text-slate-300 max-w-sm">
              Create professional tutorials and demos with automatic cursor zoom
            </p>
          </div>

          {/* Mac Window Mockup */}
          <div className="w-full max-w-md">
            <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700/50">
              {/* Window header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700/50">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-slate-400 font-medium">Screen Pro — Recording</span>
              </div>

              {/* Window content */}
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 aspect-[16/10]">
                {/* Simulated editor */}
                <div className="absolute inset-3 rounded-lg bg-slate-800/60 border border-slate-700/40">
                  <div className="p-4 font-mono text-xs">
                    <div className="flex items-center gap-2 text-slate-500 mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-violet-500/40" />
                      <span>presentation.tsx</span>
                    </div>
                    <div className="space-y-1.5 text-slate-400">
                      <p><span className="text-purple-400">import</span> <span className="text-violet-300">{'{ motion }'}</span> <span className="text-purple-400">from</span> <span className="text-emerald-400">"framer-motion"</span></p>
                      <p />
                      <p><span className="text-purple-400">export const</span> <span className="text-blue-300">Slide</span> = () =&gt; {'{'}</p>
                      <p className="pl-4"><span className="text-purple-400">return</span> (</p>
                      <p className="pl-8 text-orange-300">&lt;motion.div&gt;</p>
                      <p className="pl-12 text-slate-500">{'// Your content here'}</p>
                      <p className="pl-8 text-orange-300">&lt;/motion.div&gt;</p>
                      <p className="pl-4">)</p>
                      <p>{'}'}</p>
                    </div>
                  </div>
                </div>

                {/* Cursor with zoom ring */}
                <div className="absolute top-[45%] left-[55%] animate-cursor-move">
                  <div className="absolute -inset-6 border-2 border-violet-400/30 rounded-full animate-cursor-zoom" />
                  <div className="absolute -inset-10 border border-violet-400/15 rounded-full animate-cursor-zoom" style={{ animationDelay: '0.2s' }} />
                  <svg className="w-5 h-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4l16 8-7 2-2 7z" />
                  </svg>
                </div>

                {/* Recording indicator */}
                <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/20 backdrop-blur border border-red-400/30">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-red-300 text-xs font-medium">REC</span>
                  <span className="text-red-300/70 text-xs tabular-nums">02:47</span>
                </div>

                {/* Auto zoom badge */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-violet-500/20 backdrop-blur border border-violet-400/30 text-violet-300 text-xs font-medium">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  Auto Zoom
                </div>
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="flex items-center gap-6 mt-10 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Auto Focus
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Easy Edit
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Quick Export
            </div>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="Screen Pro"
              className="w-8 h-8 rounded-xl shadow-md shadow-violet-500/20 group-hover:shadow-violet-500/30 transition-shadow"
            />
            <span className="text-lg font-bold text-slate-900 lg:hidden">Screen Pro</span>
          </Link>
          <Link
            to="/"
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </div>

        {/* Login content - centered */}
        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-sm">
            {/* Heading */}
            <div className="text-center mb-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Welcome back
              </h1>
              <p className="text-slate-500">
                Sign in to access your Screen Pro account
              </p>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              {/* Google */}
              <button
                onClick={() => signInWithGoogle(from)}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-base font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm transition-all duration-200"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {/* Apple */}
              <button
                onClick={() => signInWithApple(from)}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-slate-900 rounded-xl text-base font-medium text-white hover:bg-slate-800 transition-all duration-200"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Continue with Apple
              </button>

              {/* GitHub */}
              <button
                onClick={() => signInWithGithub(from)}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-base font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm transition-all duration-200"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Continue with GitHub
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-slate-400">or download to get started</span>
              </div>
            </div>

            {/* Download CTA */}
            <a
              href="https://grkyrqhgfgthpghircbu.supabase.co/functions/v1/download"
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Download for Mac
            </a>

            {/* Terms */}
            <p className="text-center text-xs text-slate-400 mt-8 leading-relaxed">
              By continuing, you agree to our{' '}
              <Link to="/terms" className="text-violet-600 hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-violet-600 hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
