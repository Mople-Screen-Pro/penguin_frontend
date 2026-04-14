# Landing Page Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Clipa Studio 랜딩페이지의 전환율과 시각적 품질을 프리미엄 SaaS 수준으로 끌어올리기 — 신규 섹션 추가, 히어로 CTA 강화, 시각적 리듬 개선

**Architecture:** 기존 Next.js App Router 구조를 유지하면서, 4개의 신규 컴포넌트를 추가하고, Hero/FeatureAIUpscale/page.tsx를 수정한다. 모든 새 섹션은 기존 디자인 시스템(glass-card, btn-block, badge-block, section-glow, animate-on-scroll)을 재사용한다.

**Tech Stack:** Next.js 15 / React 19 / Tailwind CSS 4 / TypeScript

---

## Task 1: Hero CTA 강화 — 다운로드 버튼 추가 + 카피 개선

**Files:**
- Modify: `src/components/Hero.tsx`

**Why:** 현재 히어로의 유일한 CTA가 "See it in action" (스크롤 버튼)이다. 실질적 다운로드 CTA가 헤더 하나뿐이므로, 히어로에 프라이머리 다운로드 버튼을 추가하고 보조 CTA로 "See it in action"을 유지한다.

**Step 1: Hero CTA 영역 수정**

현재 코드 (`Hero.tsx:86-97`):
```tsx
<div className="flex items-center justify-center mb-10 md:mb-0">
  <button
    onClick={scrollToFeatures}
    className="btn-block text-white font-semibold px-8 py-3 text-base"
  >
    See it in action
    <svg ...>...</svg>
  </button>
</div>
```

변경할 코드:
```tsx
<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 md:mb-0">
  <a
    href="https://grkyrqhgfgthpghircbu.supabase.co/functions/v1/download"
    onClick={() => analytics.downloadClick("hero")}
    rel="noopener"
    className="btn-block text-white font-semibold px-8 py-3.5 text-base"
  >
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
    Download Free for Mac
  </a>
  <button
    onClick={scrollToFeatures}
    className="btn-block-ghost text-white/80 font-semibold px-8 py-3.5 text-base !border-white/20 !bg-white/5 hover:!bg-white/10"
  >
    See it in action
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14m-7-7 7 7 7-7" />
    </svg>
  </button>
</div>
```

**Step 2: 히어로 서브헤딩 아래에 신뢰 마이크로카피 추가**

현재 CTA 영역 위 (서브헤딩 `p` 태그 뒤, CTA `div` 앞)에 추가:
```tsx
<p className="text-[13px] text-white/40 mb-8 md:mb-16">
  macOS 15.0+ &middot; Apple Silicon optimized &middot; No account required
</p>
```

그리고 기존 서브헤딩의 `mb-8 md:mb-16`을 `mb-4 md:mb-6`으로 축소한다.

**Step 3: 확인**

Run: `npm run dev` 후 브라우저에서 히어로 영역을 확인.
- 다운로드 버튼이 프라이머리(보라색)로 표시
- "See it in action"이 고스트 스타일로 우측(또는 모바일에서 하단)에 배치
- "macOS 15.0+ ..." 텍스트가 CTA 위에 표시

---

## Task 2: HowItWorks 섹션 — 3단계 플로우

**Files:**
- Create: `src/components/HowItWorks.tsx`
- Modify: `src/app/page.tsx`

**Why:** 히어로의 "Easy to Record. Easy to Edit. Easy to Share." 약속을 시각적으로 즉시 증명한다. 복잡해 보일 수 있는 도구가 3단계로 끝난다는 것을 보여줌.

**Step 1: HowItWorks 컴포넌트 생성**

```tsx
'use client'

import { useScrollReveal } from '../hooks/useScrollReveal'

const steps = [
  {
    number: '01',
    title: 'Record',
    description: 'One click to capture your screen, audio, and camera.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Edit',
    description: 'Trim, zoom, and style — without leaving the app.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm9.304 0a3 3 0 105.196-3 3 3 0 00-5.196 3zm0 0l-1.536.887m0 0L12 12m3.616-2.863L12 12m0 0l-3.616-2.863M12 12v9" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Share',
    description: 'Export for YouTube, TikTok, or GIF — ready in seconds.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className="pt-[40px] pb-[60px] md:pt-[80px] md:pb-[100px] px-5 bg-[#FAFBFF]">
      <div className="max-w-4xl mx-auto">
        <h2 className="animate-on-scroll text-center text-[28px] md:text-[48px] lg:text-[56px] font-[650] text-gray-900 leading-[1.1] tracking-tight mb-4">
          Three steps. That's it.
        </h2>
        <p className="animate-on-scroll text-center text-sm sm:text-base text-gray-500 mb-14 max-w-lg mx-auto">
          From screen to polished video in minutes — no tool-switching, no learning curve.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="animate-on-scroll relative"
              data-delay={String(i * 0.08)}
            >
              {/* Connector line (desktop only, between cards) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-2 w-4 h-px bg-gradient-to-r from-gray-300 to-transparent z-10" />
              )}

              <div className="glass-card p-6 md:p-7 text-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-500 mx-auto mb-5">
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-primary-400 tracking-widest uppercase mb-2 block">
                  Step {step.number}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: page.tsx에 HowItWorks 추가**

`src/app/page.tsx`에서 Hero 뒤, Features 앞에 삽입:

```tsx
const HowItWorks = dynamic(() => import('../components/HowItWorks'))
```

그리고 렌더링 순서:
```tsx
<Hero />
<HowItWorks />
<Features />
```

**Step 3: 확인**

브라우저에서 히어로 아래에 3-step 카드가 나타나는지 확인. 스크롤 애니메이션이 동작하는지 확인.

---

## Task 3: TrustSignals 섹션 — 프라이버시 & 기술 신뢰 배지

**Files:**
- Create: `src/components/TrustSignals.tsx`
- Modify: `src/app/page.tsx`

**Why:** 화면 녹화 앱은 민감한 데이터를 다루므로, "100% 오프라인 처리"는 핵심 차별점이자 구매 결정 요인이다. 현재 FAQ에 묻혀 있는 정보를 시각적으로 강조한다.

**Step 1: TrustSignals 컴포넌트 생성**

```tsx
'use client'

import { useScrollReveal } from '../hooks/useScrollReveal'

const signals = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
      </svg>
    ),
    title: '100% Offline',
    description: 'Your recordings never leave your Mac. No cloud, no tracking.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Apple Silicon Native',
    description: 'Built for M-series chips. Fast, efficient, and power-friendly.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'No Account Required',
    description: 'Download and start recording — zero sign-up friction.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Lightweight & Fast',
    description: 'Under 50MB install. Launches instantly, records without lag.',
  },
]

export default function TrustSignals() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className="pb-[40px] md:pb-[60px] px-5 bg-[#FAFBFF]">
      <div className="max-w-4xl mx-auto">
        <div className="animate-on-scroll grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {signals.map((signal, i) => (
            <div
              key={signal.title}
              className="animate-on-scroll text-center p-5"
              data-delay={String(i * 0.06)}
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 mx-auto mb-3">
                {signal.icon}
              </div>
              <h4 className="text-[14px] font-semibold text-gray-900 mb-1">{signal.title}</h4>
              <p className="text-[12px] text-gray-500 leading-relaxed">{signal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: page.tsx에 추가**

```tsx
const TrustSignals = dynamic(() => import('../components/TrustSignals'))
```

위치: HowItWorks 뒤, Features 앞:
```tsx
<HowItWorks />
<TrustSignals />
<Features />
```

**Step 3: 확인**

4개 신뢰 배지가 한 줄(데스크톱) 또는 2x2 그리드(모바일)로 표시되는지 확인.

---

## Task 4: FeatureEdit 다크 섹션 전환 — 시각적 리듬 만들기

**Files:**
- Modify: `src/components/FeatureEdit.tsx`

**Why:** 히어로 이후 8개 섹션이 전부 같은 `#FAFBFF` 배경이다. FeatureEdit을 다크로 전환하면 라이트 → 다크 → 라이트 리듬이 생겨 시각적 단조로움이 해소된다.

**Step 1: 섹션 배경 및 텍스트 색상 반전**

`FeatureEdit.tsx:112`의 section 클래스를 변경:

현재:
```tsx
<section ref={sectionRef} className="section-glow ambient-blue pt-[40px] pb-[60px] md:pt-[80px] md:pb-[100px] px-5 bg-[#FAFBFF]">
```

변경:
```tsx
<section ref={sectionRef} className="pt-[40px] pb-[60px] md:pt-[80px] md:pb-[100px] px-5 bg-[#0a0a12] relative overflow-hidden">
  {/* Ambient glow for dark section */}
  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70%] max-w-[800px] h-[60%] rounded-full bg-[radial-gradient(ellipse,rgba(96,144,212,0.08)_0%,transparent_70%)] pointer-events-none" />
```

그리고 section의 닫는 태그 전에 있던 `</div>` 구조는 유지.

**Step 2: 텍스트 색상 업데이트**

- h2의 `text-gray-900` → `text-white`
- 탭 버튼의 `text-gray-900` → `text-white`, `text-gray-500` → `text-gray-400`
- `bg-gray-100` → `bg-white/10`, `text-gray-400` → `text-gray-500`
- `glass-card-static` 사용 부분: 다크 배경에 맞게 `!bg-white/5 !border-white/10` 추가
- active 탭의 `bg-blue-100 text-[#6090d4]` → `bg-[#6090d4]/20 text-[#82aee0]`
- hover 상태의 `hover:bg-gray-50` → `hover:bg-white/5`

**Step 3: 이미지 컨테이너 스타일 업데이트**

`.glass-card-static` 래퍼의 filter를 더 강하게:
```tsx
style={{ filter: 'drop-shadow(0 16px 48px rgba(0,0,0,0.7))' }}
```

**Step 4: 섹션 상하 그라디언트 전환 추가**

섹션 시작과 끝에 부드러운 배경 전환:
```tsx
{/* Top transition from light to dark */}
<div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#FAFBFF] to-transparent" />
{/* Bottom transition from dark to light */}
<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAFBFF] to-transparent" />
```

**Step 5: 확인**

FeatureEdit 섹션이 다크 배경에 밝은 텍스트로 표시되는지 확인. 위아래 섹션과의 전환이 부드러운지 확인.

---

## Task 5: AI Upscale 드래그 슬라이더 — 인터랙티브 Before/After

**Files:**
- Modify: `src/components/FeatureAIUpscale.tsx`

**Why:** 현재 50% 고정 분할은 인터랙션이 없다. 사용자가 직접 드래그하여 비교할 수 있으면 engagement가 크게 증가한다.

**Step 1: 상태 및 이벤트 핸들러 추가**

컴포넌트 상단에 추가:
```tsx
import { useRef, useState, useCallback } from 'react'

// ... existing useScrollReveal
const [sliderPos, setSliderPos] = useState(50)
const containerRef = useRef<HTMLDivElement>(null)
const isDragging = useRef(false)

const updatePosition = useCallback((clientX: number) => {
  if (!containerRef.current) return
  const rect = containerRef.current.getBoundingClientRect()
  const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
  setSliderPos((x / rect.width) * 100)
}, [])

const handlePointerDown = useCallback((e: React.PointerEvent) => {
  isDragging.current = true
  ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  updatePosition(e.clientX)
}, [updatePosition])

const handlePointerMove = useCallback((e: React.PointerEvent) => {
  if (!isDragging.current) return
  updatePosition(e.clientX)
}, [updatePosition])

const handlePointerUp = useCallback(() => {
  isDragging.current = false
}, [])
```

**Step 2: Before/After 영역 교체**

현재 코드 (`FeatureAIUpscale.tsx:26-63`)를 교체:

```tsx
<div className="animate-on-scroll">
  <div
    ref={containerRef}
    className="relative w-full max-w-[960px] mx-auto aspect-[16/9] rounded-2xl overflow-hidden select-none cursor-col-resize touch-none"
    onPointerDown={handlePointerDown}
    onPointerMove={handlePointerMove}
    onPointerUp={handlePointerUp}
  >
    {/* After (sharp) — full width underneath */}
    <div className="absolute inset-0">
      <img
        src="/images/upscale.png"
        alt="After — 4K upscaled"
        className="w-full h-full object-cover"
        draggable={false}
        style={{
          filter: 'contrast(1.06) saturate(1.1) brightness(1.02)',
        }}
      />
    </div>

    {/* Before (blurred) — clipped by slider position */}
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ width: `${sliderPos}%` }}
    >
      <img
        src="/images/upscale.png"
        alt="Before — 720p"
        className="h-full object-cover"
        draggable={false}
        style={{
          width: `${10000 / sliderPos}%`,
          maxWidth: 'none',
          filter: 'blur(1.4px) contrast(0.96) saturate(0.93)',
        }}
      />
    </div>

    {/* Slider line + handle */}
    <div
      className="absolute top-0 bottom-0 z-10 -translate-x-1/2 flex flex-col items-center"
      style={{ left: `${sliderPos}%` }}
    >
      <div className="w-[3px] h-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.3)]" />
      <div className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      </div>
    </div>

    {/* Labels */}
    <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-black/10">
      <span className="text-[12px] md:text-[13px] font-semibold text-white/70">720p</span>
    </div>
    <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-black/10">
      <span className="text-[12px] md:text-[13px] font-semibold text-[#D3B65F]">4K</span>
    </div>
  </div>
</div>
```

**Step 3: 확인**

브라우저에서 AI Upscale 섹션의 이미지 위에서 마우스 드래그로 분할 위치가 변경되는지 확인. 모바일에서 터치 드래그도 확인.

---

## Task 6: PricingPreview 섹션 — 가격 투명성

**Files:**
- Create: `src/components/PricingPreview.tsx`
- Modify: `src/app/page.tsx`

**Why:** 가격 정보가 랜딩페이지에 전혀 없다. "무료"의 범위를 모르면 다운로드를 망설인다. 가격 투명성이 신뢰를 구축한다.

**Step 1: PricingPreview 컴포넌트 생성**

```tsx
'use client'

import Link from 'next/link'
import { useScrollReveal } from '../hooks/useScrollReveal'

const DOWNLOAD_URL = 'https://grkyrqhgfgthpghircbu.supabase.co/functions/v1/download'

export default function PricingPreview() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className="section-glow ambient-purple pt-[40px] pb-[60px] md:pt-[80px] md:pb-[100px] px-5 bg-[#FAFBFF]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="animate-on-scroll text-[28px] md:text-[48px] lg:text-[56px] font-[650] text-gray-900 leading-[1.1] tracking-tight mb-4">
          Start free. Upgrade when you're ready.
        </h2>
        <p className="animate-on-scroll text-sm sm:text-base text-gray-500 mb-12 max-w-lg mx-auto">
          Record, edit, and export with no time limits. Unlock AI Upscale, premium presets, and more with Pro.
        </p>

        <div className="animate-on-scroll grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
          {/* Free */}
          <div className="glass-card p-7 text-left">
            <span className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-3 block">Free</span>
            <div className="text-3xl font-bold text-gray-900 mb-1">$0</div>
            <p className="text-sm text-gray-500 mb-5">Forever free, no strings attached.</p>
            <ul className="space-y-2.5">
              {['Screen, window & area recording', 'Full timeline editor', 'Cut, trim, & speed control', 'Export to MP4, GIF, WebM'].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13px] text-gray-600">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="glass-card p-7 text-left !border-primary-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl tracking-wider uppercase">
              Popular
            </div>
            <span className="text-xs font-bold text-primary-400 tracking-widest uppercase mb-3 block">Pro</span>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold text-gray-900">$8</span>
              <span className="text-sm text-gray-400">/mo</span>
            </div>
            <p className="text-sm text-gray-500 mb-5">Billed yearly. Lifetime option available.</p>
            <ul className="space-y-2.5">
              {['Everything in Free', 'AI Upscale up to 4K', 'Premium styling presets', 'Priority support'].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13px] text-gray-600">
                  <svg className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="animate-on-scroll flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={DOWNLOAD_URL} className="btn-block text-white font-semibold px-8 py-3 text-base">
            Download Free for Mac
          </a>
          <Link href="/pricing" className="text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors">
            See all plans &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: page.tsx에 추가**

```tsx
const PricingPreview = dynamic(() => import('../components/PricingPreview'))
```

위치: BeyondBasics 뒤, FAQ 앞:
```tsx
<BeyondBasics />
<PricingPreview />
<FAQ />
```

**Step 3: 확인**

Free vs Pro 2열 비교 카드가 표시되는지 확인. "See all plans" 링크가 /pricing으로 이동하는지 확인.

---

## Task 7: FinalCTA 섹션 — 마지막 전환 포인트

**Files:**
- Create: `src/components/FinalCTA.tsx`
- Modify: `src/app/page.tsx`

**Why:** 이것이 가장 임팩트 높은 변경이다. 현재 FAQ 후 바로 Footer로 끝난다. 페이지 끝까지 스크롤한 고관여 사용자를 전환시킬 마지막 기회가 완전히 빠져 있다.

**Step 1: FinalCTA 컴포넌트 생성**

```tsx
'use client'

import { analytics } from '../lib/analytics'
import { useScrollReveal } from '../hooks/useScrollReveal'

const DOWNLOAD_URL = 'https://grkyrqhgfgthpghircbu.supabase.co/functions/v1/download'

export default function FinalCTA() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className="relative py-[60px] md:py-[100px] px-5 bg-[#0a0a12] overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(168,85,247,0.15)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(236,72,153,0.1)_0%,transparent_70%)]" />
      </div>

      {/* Top transition */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#FAFBFF] to-transparent" />

      <div className="relative max-w-2xl mx-auto text-center">
        <h2 className="animate-on-scroll text-[28px] md:text-[48px] lg:text-[56px] font-[650] text-white leading-[1.1] tracking-tight mb-5">
          Ready to make screen recording effortless?
        </h2>
        <p className="animate-on-scroll text-base md:text-lg text-white/50 mb-10 max-w-lg mx-auto leading-relaxed">
          Download Clipa Studio for free. No account needed. No watermark. Just record, edit, and share.
        </p>

        <div className="animate-on-scroll flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href={DOWNLOAD_URL}
            onClick={() => analytics.downloadClick("final-cta")}
            rel="noopener"
            className="btn-block text-white font-semibold px-10 py-4 text-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Download Free for Mac
          </a>
        </div>

        <p className="animate-on-scroll text-[13px] text-white/30">
          macOS 15.0+ &middot; Apple Silicon optimized &middot; 100% offline
        </p>
      </div>
    </section>
  )
}
```

**Step 2: page.tsx에 추가**

```tsx
const FinalCTA = dynamic(() => import('../components/FinalCTA'))
```

위치: FAQ 뒤, Footer 앞:
```tsx
<FAQ />
<FinalCTA />
```

Note: FinalCTA는 `<main>` 바깥, Footer 앞에 배치한다:
```tsx
</main>
<FinalCTA />
<Footer />
```

**Step 3: 확인**

FAQ 아래에 다크 배경 + 보라/핑크 gradient mesh + "Ready to make screen recording effortless?" 헤드라인 + 다운로드 버튼이 표시되는지 확인.

---

## Task 8: page.tsx 최종 조립 + 섹션 간격 조정

**Files:**
- Modify: `src/app/page.tsx`

**Why:** 모든 신규 컴포넌트를 올바른 순서로 조립하고, import 및 렌더링 순서를 정리한다.

**Step 1: page.tsx 최종 구조**

```tsx
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import Hero from '../components/Hero'

const HowItWorks = dynamic(() => import('../components/HowItWorks'))
const TrustSignals = dynamic(() => import('../components/TrustSignals'))
const Features = dynamic(() => import('../components/Features'))
const FeatureRecord = dynamic(() => import('../components/FeatureRecord'))
const FeatureEdit = dynamic(() => import('../components/FeatureEdit'))
const FeatureStyling = dynamic(() => import('../components/FeatureStyling'))
const FeatureAIUpscale = dynamic(() => import('../components/FeatureAIUpscale'))
const BeyondBasics = dynamic(() => import('../components/BeyondBasics'))
const PricingPreview = dynamic(() => import('../components/PricingPreview'))
const FAQ = dynamic(() => import('../components/FAQ'))
const FinalCTA = dynamic(() => import('../components/FinalCTA'))
const Footer = dynamic(() => import('../components/Footer'))

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content">
        <Hero />
        <HowItWorks />
        <TrustSignals />
        <Features />
        <FeatureRecord />
        <FeatureEdit />
        <FeatureStyling />
        <FeatureAIUpscale />
        <BeyondBasics />
        <PricingPreview />
        <FAQ />
      </main>
      <FinalCTA />
      <Footer />
    </div>
  )
}
```

**Step 2: 확인**

전체 페이지 플로우를 브라우저에서 위에서 아래로 확인:
1. Header
2. Hero (다운로드 CTA + See it in action)
3. HowItWorks (3단계)
4. TrustSignals (4개 배지)
5. Features (인테그레이션)
6. FeatureRecord
7. FeatureEdit (다크 배경)
8. FeatureStyling
9. FeatureAIUpscale (드래그 슬라이더)
10. BeyondBasics
11. PricingPreview (Free vs Pro)
12. FAQ
13. FinalCTA (다크 배경)
14. Footer

---

## 최종 체크리스트

- [ ] 히어로에 다운로드 CTA가 프라이머리로 표시됨
- [ ] HowItWorks 3단계가 히어로 아래에 표시됨
- [ ] TrustSignals 4개 배지가 표시됨
- [ ] FeatureEdit이 다크 배경으로 전환됨
- [ ] AI Upscale 슬라이더가 드래그로 동작함
- [ ] PricingPreview Free/Pro 카드가 표시됨
- [ ] FinalCTA가 FAQ 아래에 표시됨
- [ ] 모바일 반응형 정상 동작
- [ ] 스크롤 애니메이션 정상 동작
- [ ] 다운로드 링크 analytics 트래킹 정상
