import { buildDownloadUrl } from './download'
import { recordFirstAppDownload } from './downloadTracking'

export const DOWNLOAD_FEEDBACK_MS = 3_500
export const DOWNLOAD_FEEDBACK_EVENT = 'clipa:download-feedback'
export const DOWNLOAD_FEEDBACK_STORAGE_KEY = 'clipa:downloadFeedback'

export interface DownloadFeedbackDetail {
  location?: string
  expiresAt: number
}

const setDownloadFeedback = (location?: string) => {
  if (typeof window === 'undefined') return

  const detail: DownloadFeedbackDetail = {
    location,
    expiresAt: Date.now() + DOWNLOAD_FEEDBACK_MS,
  }

  try {
    sessionStorage.setItem(DOWNLOAD_FEEDBACK_STORAGE_KEY, JSON.stringify(detail))
  } catch {
    // Download feedback is best-effort; never block the download itself.
  }

  window.dispatchEvent(new CustomEvent<DownloadFeedbackDetail>(DOWNLOAD_FEEDBACK_EVENT, { detail }))
}

export const startDownload = (location?: string, referrer?: string) => {
  setDownloadFeedback(location)
  void recordFirstAppDownload(location, referrer)

  const iframe = document.createElement('iframe')
  iframe.src = buildDownloadUrl(location, referrer)
  iframe.style.display = 'none'
  iframe.setAttribute('aria-hidden', 'true')
  document.body.appendChild(iframe)

  window.setTimeout(() => {
    iframe.remove()
  }, 60_000)
}
