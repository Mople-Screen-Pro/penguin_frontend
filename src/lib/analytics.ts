// GA4 이벤트 추적 헬퍼

const SLACK_WEBHOOK_URL = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || "";

// 사용자 접속 정보 가져오기
const getUserInfo = async (): Promise<string> => {
  const referrer = document.referrer || "직접 접속";
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    const ip = data.ip || "알 수 없음";
    const city = data.city || "";
    const country = data.country_code || "";
    const location = [city, country].filter(Boolean).join(", ") || "알 수 없음";
    return `📍 ${location} (${ip})\n🔗 유입: ${referrer}`;
  } catch {
    return `📍 위치 확인 실패\n🔗 유입: ${referrer}`;
  }
};

// 슬랙 알림 전송 (사용자 정보 포함)
const sendSlackNotification = async (message: string, includeUserInfo = false) => {
  if (!SLACK_WEBHOOK_URL) return;
  try {
    let fullMessage = message;
    if (includeUserInfo && typeof window !== "undefined") {
      const userInfo = await getUserInfo();
      fullMessage += `\n${userInfo}`;
    }
    await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify({ text: fullMessage }),
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
      `<!channel>\n🔔 딩동! 다운로드 알림이에요~ 🔔\n\n(${location}에서 왔어요)`,
      true
    );
  },

  // 문의 이메일 클릭
  contactEmailClick: () => {
    trackEvent("contact_email_click", "engagement", "faq_section");
    sendSlackNotification(
      `<!channel>\n📩 문의 이메일 링크가 클릭되었어요! 📩\n\n(FAQ 하단에서 왔어요)`,
      true
    );
  },

  // 결제 성공
  purchaseComplete: (planName: string) => {
    trackEvent("purchase_complete", "conversion", planName);
    sendSlackNotification(
      `<!channel>\n🎉 결제가 완료되었어요! 🎉\n\n플랜: ${planName}`,
      true
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
      `<!channel>\n🚨 [Clipa] 구독 취소 요청 🚨\n\n 이메일: ${email}\n 취소 사유: ${reason}${
        detail ? `\n 상세: ${detail}` : ""
      }`,
      true
    );
  },
};
