export type SubscriptionType = "subscription" | "limitless";

export type SubscriptionStatus = "active" | "past_due" | "canceled";

export type BillingCycleInterval = "month" | "year";

export interface Subscription {
  id: string;
  user_id: string;
  type: SubscriptionType;
  paddle_transaction_id: string;
  paddle_customer_id: string;
  status: SubscriptionStatus;
  product_id: string;
  price_id: string;
  billing_cycle_interval: BillingCycleInterval;
  subscription_period_start: string;
  subscription_period_end: string;
  next_billed_at: string | null;
  canceled_at: string | null;
  subscription_created_at: string;
}

// 구독 상태 헬퍼 1
export function isActive(sub: Subscription | null): boolean {
  return sub?.status === "active";
}

export function isPastDue(sub: Subscription | null): boolean {
  return sub?.status === "past_due";
}

export function isCanceled(sub: Subscription | null): boolean {
  return sub?.status === "canceled";
}

export function isLifetime(sub: Subscription | null): boolean {
  return sub?.type === "limitless";
}

export function getPlanLabel(sub: Subscription | null): string {
  if (!sub) return "Free";
  if (sub.type === "limitless") return "Lifetime";
  if (sub.billing_cycle_interval === "year") return "Yearly";
  return "Monthly";
}

// 만료 여부 확인 (canceled 상태에서 period_end 경과 여부)
export function isExpired(sub: Subscription | null): boolean {
  if (!sub) return true;
  if (sub.status === "canceled") {
    return new Date(sub.subscription_period_end) < new Date();
  }
  return false;
}
