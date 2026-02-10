import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

export interface DeviceInfo {
  hardware_uuid: string
  device_name: string
  activated_at: string
}

interface UseDeviceReturn {
  device: DeviceInfo | null
  loading: boolean
  error: string | null
  deactivating: boolean
  deactivateDevice: () => Promise<boolean>
  refetch: () => Promise<void>
}

export function useDevice(): UseDeviceReturn {
  const { user } = useAuth()
  const [device, setDevice] = useState<DeviceInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deactivating, setDeactivating] = useState(false)

  const userId = user?.id

  const fetch = useCallback(async () => {
    if (!userId) {
      setDevice(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { data, error: rpcError } = await supabase.rpc('get_my_device')

      if (rpcError) {
        console.error('Failed to fetch device:', rpcError)
        setError('Failed to load device info')
        setDevice(null)
        return
      }

      setDevice(data as DeviceInfo | null)
    } catch (err) {
      console.error('Failed to fetch device:', err)
      setError('Failed to load device info')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetch()
  }, [fetch])

  const deactivateDevice = useCallback(async (): Promise<boolean> => {
    if (!device) return false

    setDeactivating(true)
    try {
      const { error: rpcError } = await supabase.rpc('deactivate_device')

      if (rpcError) {
        console.error('Failed to deactivate device:', rpcError)
        return false
      }

      setDevice(null)
      return true
    } catch (err) {
      console.error('Failed to deactivate device:', err)
      return false
    } finally {
      setDeactivating(false)
    }
  }, [device])

  return { device, loading, error, deactivating, deactivateDevice, refetch: fetch }
}
