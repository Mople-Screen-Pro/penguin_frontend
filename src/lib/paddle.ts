import { initializePaddle } from "@paddle/paddle-js";
import type { Paddle, CheckoutEventsData } from "@paddle/paddle-js";

export const PRICE_IDS = {
  monthly: "pri_01kjhjc26eb9xm8rzkg6gq7t9j",
  yearly: "pri_01kjhjayspsa36mvpcrcemdn1r",
  lifetime: "pri_01kjhj96b14r7yrfmebf10eamd",
} as const;

let paddleInstance: Paddle | null = null;
let onCheckoutComplete: ((data: CheckoutEventsData) => void) | null = null;

export function setOnCheckoutComplete(
  callback: (data: CheckoutEventsData) => void,
) {
  onCheckoutComplete = callback;
}

export async function getPaddle(): Promise<Paddle | null> {
  if (paddleInstance) return paddleInstance;

  const clientToken = import.meta.env.VITE_PADDLE_CLIENT_TOKEN;
  if (!clientToken) {
    console.error("Paddle client token not found");
    return null;
  }

  try {
    const paddle = await initializePaddle({
      token: clientToken,
      environment: clientToken.startsWith("test_") ? "sandbox" : "production",
      eventCallback: (event) => {
        if (event.name === "checkout.completed" && event.data) {
          paddleInstance?.Checkout.close();
          onCheckoutComplete?.(event.data);
        }
      },
    });
    paddleInstance = paddle ?? null;
    return paddleInstance;
  } catch (error) {
    console.error("Failed to initialize Paddle:", error);
    return null;
  }
}

interface CheckoutOptions {
  priceId: string;
  userEmail?: string;
  userId?: string;
  discountId?: string;
}

export async function openCheckout({
  priceId,
  userEmail,
  userId,
  discountId,
}: CheckoutOptions) {
  const paddle = await getPaddle();
  if (!paddle) return;

  paddle.Checkout.open({
    items: [{ priceId, quantity: 1 }],
    customer: userEmail ? { email: userEmail } : undefined,
    customData: userId ? { user_id: userId } : undefined,
    ...(discountId ? { discountId } : {}),
  });
}
