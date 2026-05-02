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
    if (analyticsLocation) {
      analytics.downloadClick(analyticsLocation)
    }

    if (loading) return

    onBeforeNavigate?.()

    if (user) {
      window.location.assign(buildDownloadUrl(location))
      return
    }

    const params = new URLSearchParams({ from: 'download', location })
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
