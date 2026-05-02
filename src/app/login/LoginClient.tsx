'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { redirectToApp } from '../../lib/deeplink'
import { startDownload } from '../../lib/startDownload'

export default function LoginClient() {
  const { user, session, loading, signInWithGoogle, signInWithApple, signInWithGithub } = useAuth()
  const searchParams = useSearchParams()
  const router = useRouter()
  const from = searchParams.get('from') || undefined
  const state = searchParams.get('state') || undefined
  const downloadLocation = searchParams.get('location') || 'login'
  const appRedirectHandledRef = useRef(false)

  const isFromApp = from === 'app' || from === 'app-dev'
  const isFromDownload = from === 'download'

  // 이미 로그인된 유저가 from=app으로 접근한 경우 처리
  useEffect(() => {
    if (loading || !user || !session || !isFromApp || appRedirectHandledRef.current) return

    appRedirectHandledRef.current = true

    const handleAppRedirect = async () => {
      // 앱에서 signOut 후 재로그인 시 토큰이 무효화될 수 있으므로 세션 갱신
      const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession()

      if (refreshError || !refreshed.session) {
        // 세션이 무효화됨 (앱에서 signOut으로 인해) → 웹도 로그아웃 후 재로그인 유도
        await supabase.auth.signOut()
        appRedirectHandledRef.current = false
        return
      }

      const freshSession = refreshed.session

      try {
        await redirectToApp(freshSession, state || '')
      } catch (e) {
        console.error('Failed to redirect to app:', e)
        router.replace('/')
      }
    }

    handleAppRedirect()
  }, [loading, user, session, from, state, isFromApp, router])

  useEffect(() => {
    if (loading || !user || isFromApp || !isFromDownload) return
    startDownload(downloadLocation)
    router.replace('/')
  }, [loading, user, isFromApp, isFromDownload, downloadLocation, router])

  useEffect(() => {
    if (loading || !user || isFromApp || isFromDownload) return
    router.replace('/')
  }, [loading, user, isFromApp, isFromDownload, router])

  // 세션 확인 중 로딩 표시
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0C0C14]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400 mx-auto mb-4"></div>
          <p className="text-white/50">Checking login status...</p>
        </div>
      </div>
    )
  }

  if (user && !isFromApp) {
    return null
  }

  // from=app이고 이미 로그인된 유저는 앱으로 리다이렉트
  if (user && isFromApp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0C0C14]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400 mx-auto mb-4"></div>
          <p className="text-white/50">Already signed in. Redirecting to app...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0C0C14] relative overflow-hidden flex items-center justify-center px-5 py-12">
      {/* Floating decorative blocks */}
      <div className="absolute top-[10%] left-[8%] w-48 h-28 rounded-3xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/10 rotate-[-8deg] blur-[1px] animate-float" />
      <div className="absolute top-[25%] right-[10%] w-36 h-36 rounded-2xl bg-gradient-to-br from-purple-400/10 to-violet-600/5 border border-purple-400/10 rotate-[12deg] blur-[1px] animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-[15%] left-[12%] w-28 h-28 rounded-2xl bg-gradient-to-br from-pink-500/10 to-rose-600/5 border border-pink-500/10 rotate-[6deg] blur-[1px] animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-[30%] right-[6%] w-44 h-24 rounded-3xl bg-gradient-to-br from-violet-500/8 to-purple-600/4 border border-violet-500/8 rotate-[-5deg] blur-[1px] animate-float" style={{ animationDelay: '2s' }} />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/[0.06] blur-[120px] pointer-events-none" />

      {/* Back to home */}
      <Link
        href="/"
        className="absolute top-6 left-6 text-sm text-white/40 hover:text-white/70 transition-colors flex items-center gap-1.5 z-10"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to home
      </Link>

      {/* Login card */}
      <div className="glass-card-static !rounded-3xl w-full max-w-[420px] p-8 sm:p-10 relative z-10">
        {/* Logo + Heading */}
        <div className="text-center mb-9">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-16 h-16 mx-auto mb-4"
          >
            <source src="/images/logo-anim.webm" type="video/webm" />
            <source src="/images/logo-anim.mp4" type="video/mp4" />
          </video>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Welcome back
          </h1>
          <p className="text-white/50 text-sm">
            {isFromDownload ? 'Sign in first to download Clipa Studio' : 'Sign in to access your Clipa account'}
          </p>
        </div>

        {/* OAuth Buttons — block style */}
        <div className="space-y-3">
          {/* Google */}
          <button
            onClick={() => signInWithGoogle(from, state)}
            className="btn-block-ghost w-full !justify-center !gap-3"
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
            onClick={() => signInWithApple(from, state)}
            className="btn-block-ghost w-full !justify-center !gap-3"
          >
            <svg className="w-[23px] h-[23px] shrink-0" viewBox="0 0 814 1000" fill="currentColor">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.5-81.6-105.6-208.4-105.6-329.1 0-193.1 125.7-295.7 249.3-295.7 65.7 0 120.4 43.1 161.5 43.1 39.5 0 101.1-45.7 176.7-45.7 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8.6 15.6 1.3 18.2 2.6.6 6.4 1.3 10.2 1.3 45.4 0 103-30.4 139.5-71.4z"/>
            </svg>
            Continue with Apple
          </button>

          {/* GitHub */}
          <button
            onClick={() => signInWithGithub(from, state)}
            className="btn-block-ghost w-full !justify-center !gap-3"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-white/40 mt-8 leading-relaxed">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="text-primary-400 hover:text-primary-300 transition-colors">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-primary-400 hover:text-primary-300 transition-colors">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}
