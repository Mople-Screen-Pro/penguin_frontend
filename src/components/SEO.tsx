import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://www.penguin-editor.com'
const SITE_NAME = 'Penguin'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

interface SEOProps {
  title?: string
  description?: string
  path?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export default function SEO({
  title,
  description = 'Penguin auto-zooms to your cursor in real time — making every tutorial look professionally edited. Half the price, zero effort. Download free for macOS.',
  path = '',
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  jsonLd,
}: SEOProps) {
  const fullTitle = title
    ? `${title} - ${SITE_NAME}`
    : `${SITE_NAME} - Screen Recording, Reimagined. Auto Cursor Zoom for Mac.`
  const canonicalUrl = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Helmet>
  )
}
