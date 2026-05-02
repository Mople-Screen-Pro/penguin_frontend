import { NextRequest, NextResponse } from 'next/server'
import { DOWNLOAD_SOURCE_URL } from '../../../lib/download'

export const runtime = 'nodejs'

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || ''

const getClientIp = (request: NextRequest) => {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwardedFor || request.headers.get('x-real-ip') || '알 수 없음'
}

const notifyDownloadSuccess = async (request: NextRequest, location: string) => {
  if (!SLACK_WEBHOOK_URL) return

  const referrer = request.headers.get('referer') || '직접 접속'
  const userAgent = request.headers.get('user-agent') || '알 수 없음'
  const ip = getClientIp(request)

  try {
    await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `<!channel>\n🔔 딩동! 다운로드 성공 알림이에요~ 🔔\n\n(${location}에서 왔어요)\n📍 IP: ${ip}\n🔗 유입: ${referrer}\n🖥️ User-Agent: ${userAgent}`,
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
