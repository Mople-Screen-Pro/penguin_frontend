import { NextRequest, NextResponse } from 'next/server'
import { DOWNLOAD_SOURCE_URL } from '../../../lib/download'

export const runtime = 'nodejs'

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || ''

const getClientIp = (request: NextRequest) => {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwardedFor || request.headers.get('x-real-ip') || '알 수 없음'
}

const decodeHeaderValue = (value: string | null) => {
  if (!value) return ''

  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

const getHeaderLocation = (request: NextRequest) => {
  const city = decodeHeaderValue(request.headers.get('x-vercel-ip-city'))
  const region = decodeHeaderValue(request.headers.get('x-vercel-ip-country-region'))
  const country = request.headers.get('x-vercel-ip-country') || ''

  return [city || region, country].filter(Boolean).join(', ')
}

const formatLocationInfo = (location: string, ip: string) => {
  if (location) return `${location} (${ip})`
  return ip
}

const getLocationInfo = async (request: NextRequest, ip: string) => {
  const headerLocation = getHeaderLocation(request)

  if (ip === '알 수 없음') {
    return headerLocation || '알 수 없음'
  }

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      cache: 'no-store',
    })

    if (!response.ok) return formatLocationInfo(headerLocation, ip)

    const data = await response.json()
    const city = data.city || ''
    const region = data.region_code || data.region || ''
    const country = data.country_code || ''
    const location = [city || region, country].filter(Boolean).join(', ') || headerLocation

    return formatLocationInfo(location, ip)
  } catch {
    return formatLocationInfo(headerLocation, ip)
  }
}

const notifyDownloadSuccess = async (request: NextRequest, location: string) => {
  if (!SLACK_WEBHOOK_URL) return

  const referrer = request.nextUrl.searchParams.get('referrer') || request.headers.get('referer') || '직접 접속'
  const ip = getClientIp(request)
  const locationInfo = await getLocationInfo(request, ip)

  try {
    await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `<!channel>\n🔔 딩동! 다운로드 성공 알림이에요~ 🔔\n\n(${location}에서 왔어요)\n📍 ${locationInfo}\n🔗 유입: ${referrer}`,
      }),
    })
  } catch (error) {
    console.error('Slack notification failed:', error)
  }
}

export async function GET(request: NextRequest) {
  const location = request.nextUrl.searchParams.get('location') || 'unknown'

  const downloadResponse = await fetch(DOWNLOAD_SOURCE_URL, {
    redirect: 'follow',
    cache: 'no-store',
  })

  if (!downloadResponse.ok || !downloadResponse.body) {
    return NextResponse.json(
      { error: 'Download failed' },
      { status: downloadResponse.status || 502 },
    )
  }

  await notifyDownloadSuccess(request, location)

  const headers = new Headers()
  const passthroughHeaders = [
    'content-type',
    'content-length',
    'content-disposition',
    'cache-control',
    'last-modified',
    'etag',
  ]

  passthroughHeaders.forEach((header) => {
    const value = downloadResponse.headers.get(header)
    if (value) headers.set(header, value)
  })

  return new NextResponse(downloadResponse.body, {
    status: downloadResponse.status,
    headers,
  })
}
