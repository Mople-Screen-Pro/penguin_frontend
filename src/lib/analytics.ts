// GA4 이벤트 추적 헬퍼

const SLACK_WEBHOOK_URL = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || "";

// 슬랙 알림 전송
const sendSlackNotification = async (message: string) => {
  if (!SLACK_WEBHOOK_URL) return;
  try {
    await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify({ text: message }),
    });
  } catch (error) {
    console.error("Slack notification failed:", error);
  }
};

declare global {
  interface Window {
    gtag: (
      command: "event" | "config" | "js",
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export const trackEvent = (
  action: string,
  category: string,
  label?: string
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
};

// 사전 정의된 이벤트들
export const analytics = {
  // 다운로드 버튼 클릭
  downloadClick: (location: "header" | "hero" | "cta" | "mobile_menu") => {
    trackEvent("download_click", "CTA", location);
    sendSlackNotification(
      `<!channel>\n🔔 딩동! 다운로드 알림이에요~ 🔔\n\n(${location}에서 왔어요)`
    );
  },

  // 문의 이메일 클릭
  contactEmailClick: () => {
    trackEvent("contact_email_click", "engagement", "faq_section");
    sendSlackNotification(
      `<!channel>\n📩 문의 이메일 링크가 클릭되었어요! 📩\n\n(FAQ 하단에서 왔어요)`
    );
  },

  // Pricing 페이지 이동
  pricingClick: (location: string) => {
    trackEvent("pricing_click", "engagement", location);
    sendSlackNotification(
      `<!channel>\n💰 Pricing 페이지로 이동했어요! 💰\n\n(${location}에서 왔어요)`
    );
  },

  // 랜딩페이지 방문
  pageVisit: () => {
    trackEvent("page_visit", "traffic", "landing");
  },

  // Watch Demo 클릭
  watchDemoClick: () => {
    trackEvent("watch_demo_click", "engagement", "hero");
  },

  // 네비게이션 클릭
  navClick: (item: string) => {
    trackEvent("nav_click", "navigation", item);
  },

  // FAQ 열기
  faqOpen: (question: string) => {
    trackEvent("faq_open", "engagement", question);
  },

  // 구독 취소 사유
  subscriptionCancel: async (
    email: string,
    reason: string,
    detail?: string
  ) => {
    trackEvent("subscription_cancel", "churn", reason);
    await sendSlackNotification(
      `<!channel>\n🚨 [Penguin] 구독 취소 요청 🚨\n\n 이메일: ${email}\n 취소 사유: ${reason}${
        detail ? `\n 상세: ${detail}` : ""
      }`
    );
  },
};
