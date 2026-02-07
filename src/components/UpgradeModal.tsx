import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { supabase } from '../lib/supabase'
import { PRICE_IDS } from '../lib/paddle'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

interface PreviewData {
  credit: number  // absolute value in cents
  charge: number  // in cents
  result: number  // in cents
}

function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

// API 응답에서 update_summary의 문자열 금액을 숫자로 파싱
function parsePreview(data: Record<string, unknown>): PreviewData {
  const summary = data.update_summary as {
    credit: { amount: string }
    charge: { amount: string }
    result: { amount: string }
  }
  return {
    credit: Math.abs(parseInt(summary.credit.amount, 10)),
    charge: parseInt(summary.charge.amount, 10),
    result: parseInt(summary.result.amount, 10),
  }
}

export default function UpgradeModal({
  isOpen,
  onClose,
  onComplete,
}: UpgradeModalProps) {
  const [preview, setPreview] = useState<PreviewData | null>(null)
  const [loading, setLoading] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Preview 호출 (모달 열릴 때)
  useEffect(() => {
    if (!isOpen) {
      setPreview(null)
      setError(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    supabase.functions
      .invoke('upgrade-subscription', {
        body: { action: 'preview', price_id: PRICE_IDS.yearly },
      })
      .then(({ data, error: err }) => {
        if (cancelled) return
        if (err || !data) {
          setError(err?.message || 'Failed to load upgrade details.')
        } else {
          setPreview(parsePreview(data))
        }
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load upgrade details.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [isOpen])

  const handleConfirm = async () => {
    setConfirming(true)
    setError(null)
    try {
      const { error: err } = await supabase.functions.invoke(
        'upgrade-subscription',
        { body: { action: 'confirm', price_id: PRICE_IDS.yearly } }
      )
      if (err) {
        setError(err.message || 'Upgrade failed. Please try again.')
        return
      }
      onComplete()
      onClose()
    } catch {
      setError('Upgrade failed. Please try again.')
    } finally {
      setConfirming(false)
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">
            Upgrade to Yearly
          </h2>
          <p className="text-slate-600 mt-1">
            Save more with an annual subscription
          </p>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-slate-500 mt-3">Calculating your upgrade price...</p>
            </div>
          ) : error && !preview ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          ) : preview ? (
            <>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Yearly plan</span>
                  <span className="font-medium text-slate-900">{formatCents(preview.charge)}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Remaining credit</span>
                  <span className="font-medium text-green-600">-{formatCents(preview.credit)}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="font-semibold text-slate-900">Amount due today</span>
                  <span className="text-lg font-bold text-violet-600">{formatCents(preview.result)}</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </>
          ) : null}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 text-slate-700 font-medium rounded-xl border-2 border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!preview || confirming}
              className="flex-1 px-4 py-3 text-white font-medium rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {confirming ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Upgrading...</span>
                </div>
              ) : (
                'Upgrade'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
