import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getSubscription } from '../lib/subscription'
import type { Subscription } from '../types/subscription'

interface UseSubscriptionReturn {
  subscription: Subscription | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useSubscription(): UseSubscriptionReturn {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const userId = user?.id

  const fetch = useCallback(async () => {
    if (!userId) {
      setSubscription(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const sub = await getSubscription(userId)
      setSubscription(sub)
    } catch (err) {
      console.error('Failed to fetch subscription:', err)
      setError('Failed to load subscription info')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetch()
  }, [fetch])

  return { subscription, loading, error, refetch: fetch }
}
