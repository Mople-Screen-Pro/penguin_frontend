import { useState } from 'react'
import { useDevice } from '../../hooks/useDevice'
import DeactivateDeviceModal from './DeactivateDeviceModal'

function formatDate(isoString: string | null | undefined): string {
  if (!isoString) return ''
  const date = new Date(isoString)
  if (isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export default function ActiveDeviceSection() {
  const { device, loading, deactivateDevice } = useDevice()
  const [modalOpen, setModalOpen] = useState(false)

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Active Device</h2>
        <div className="flex items-center justify-center py-4">
          <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Active Device</h2>

        {device ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-slate-900">{device.device_name}</p>
                <p className="text-xs text-slate-400">
                  Activated {formatDate(device.activated_at)}
                </p>
              </div>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Deactivate
            </button>
          </div>
        ) : (
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">
              No active device. Export from the Penguin Mac app to activate a device.
            </p>
          </div>
        )}
      </div>

      <DeactivateDeviceModal
        isOpen={modalOpen}
        deviceName={device?.device_name ?? ''}
        onClose={() => setModalOpen(false)}
        onConfirm={deactivateDevice}
      />
    </>
  )
}
