import { supabase } from './supabase'
import type { Subscription } from '../types/subscription'

/**
 * 유저의 최신 구독 정보 단건 조회
 * - 재구독 시 새 레코드가 INSERT 되므로 최신순 1건만 조회
 */
export async function getSubscription(userId: string): Promise<Subscription | null> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .order('subscription_created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('Failed to fetch subscription:', error)
    return null
  }

  return data as Subscription
}

/**
 * 활성 구독 여부 확인 (active 또는 past_due)
 */
export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const sub = await getSubscription(userId)
  if (!sub) return false
  return sub.status === 'active' || sub.status === 'past_due'
}
