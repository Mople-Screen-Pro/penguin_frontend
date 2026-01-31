// GA4 이벤트 추적 헬퍼

const SLACK_WEBHOOK_URL =
  "https://hooks.slack.com/services/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";

// 슬랙 알림 전송
const sendSlackNotification = async (message: string) => {
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
      `<!channel>\n🔔 딩동! 다운로드 알림이에요~ 🔔 \n\n(${location}에서 왔어요)`
    );
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

  // Contact Support 클릭
  contactClick: () => {
    trackEvent("contact_click", "engagement", "faq_section");
  },

  // 문의 전송
  contactSubmit: async (name: string, email: string, message: string) => {
    trackEvent("contact_submit", "engagement", "contact_form");
    await sendSlackNotification(
      `<!channel>\n📩 새로운 문의가 도착했어요! 📩 \n\n 이름: ${name}\n 이메일: ${email}\n 메시지: ${message}`
    );
  },

  // Demo 재생/일시정지
  demoInteract: (action: "play" | "pause") => {
    trackEvent("demo_interact", "engagement", action);
  },
};
