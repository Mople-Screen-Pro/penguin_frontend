import { buildDownloadUrl } from './download'

export const startDownload = (location?: string, referrer?: string) => {
  const iframe = document.createElement('iframe')
  iframe.src = buildDownloadUrl(location, referrer)
  iframe.style.display = 'none'
  iframe.setAttribute('aria-hidden', 'true')
  document.body.appendChild(iframe)

  window.setTimeout(() => {
    iframe.remove()
  }, 60_000)
}
