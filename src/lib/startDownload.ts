import { buildDownloadUrl } from './download'

export const startDownload = (location?: string) => {
  const iframe = document.createElement('iframe')
  iframe.src = buildDownloadUrl(location)
  iframe.style.display = 'none'
  iframe.setAttribute('aria-hidden', 'true')
  document.body.appendChild(iframe)

  window.setTimeout(() => {
    iframe.remove()
  }, 60_000)
}
