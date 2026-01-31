// GA4 이벤트 추적 헬퍼

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      action: string,
      params?: Record<string, unknown>
    ) => void
  }
}

export const trackEvent = (
  action: string,
  category: string,
  label?: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    })
  }
}

// 사전 정의된 이벤트들
export const analytics = {
  // 다운로드 버튼 클릭
  downloadClick: (location: 'header' | 'hero' | 'cta' | 'mobile_menu') => {
    trackEvent('download_click', 'CTA', location)
  },

  // Watch Demo 클릭
  watchDemoClick: () => {
    trackEvent('watch_demo_click', 'engagement', 'hero')
  },

  // 네비게이션 클릭
  navClick: (item: string) => {
    trackEvent('nav_click', 'navigation', item)
  },

  // FAQ 열기
  faqOpen: (question: string) => {
    trackEvent('faq_open', 'engagement', question)
  },

  // Contact Support 클릭
  contactClick: () => {
    trackEvent('contact_click', 'engagement', 'faq_section')
  },

  // Demo 재생/일시정지
  demoInteract: (action: 'play' | 'pause') => {
    trackEvent('demo_interact', 'engagement', action)
  },
}
