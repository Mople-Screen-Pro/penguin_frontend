'use client'

import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'
import { analytics } from '../lib/analytics'
import { buildDownloadUrl } from '../lib/download'

type AnalyticsLocation = 'header' | 'hero' | 'cta' | 'mobile_menu'

interface AuthenticatedDownloadButtonProps {
  children: ReactNode
  className: string
  location: string
  analyticsLocation?: AnalyticsLocation
  onBeforeNavigate?: () => void
}

export default function AuthenticatedDownloadButton({
  children,
  className,
  location,
  analyticsLocation,
  onBeforeNavigate,
}: AuthenticatedDownloadButtonProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  const handleClick = () => {
    const referrer = document.referrer || '직접 접속'

    if (analyticsLocation) {
      analytics.downloadClick(analyticsLocation)
    }

    if (loading) return

    onBeforeNavigate?.()

    if (user) {
      window.location.assign(buildDownloadUrl(location, referrer))
      return
    }

    sessionStorage.setItem('clipa:pendingDownloadLocation', location)
    sessionStorage.setItem('clipa:pendingDownloadReferrer', referrer)

    const params = new URLSearchParams({ from: 'download', location, referrer })
    router.push(`/login?${params.toString()}`)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={className}
      aria-label="Download Clipa Studio for Mac"
    >
      {children}
    </button>
  )
}
