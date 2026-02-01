import { initializePaddle } from '@paddle/paddle-js'
import type { Paddle } from '@paddle/paddle-js'

let paddleInstance: Paddle | null = null

export async function getPaddle(): Promise<Paddle | null> {
  if (paddleInstance) return paddleInstance

  const clientToken = import.meta.env.VITE_PADDLE_CLIENT_TOKEN
  if (!clientToken) {
    console.error('Paddle client token not found')
    return null
  }

  try {
    const paddle = await initializePaddle({
      token: clientToken,
      environment: clientToken.startsWith('test_') ? 'sandbox' : 'production',
    })
    paddleInstance = paddle ?? null
    return paddleInstance
  } catch (error) {
    console.error('Failed to initialize Paddle:', error)
    return null
  }
}

// Paddle 체크아웃 열기
export async function openCheckout(priceId: string, userEmail?: string) {
  const paddle = await getPaddle()
  if (!paddle) return

  paddle.Checkout.open({
    items: [{ priceId, quantity: 1 }],
    customer: userEmail ? { email: userEmail } : undefined,
  })
}
