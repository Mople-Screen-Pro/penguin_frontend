'use client'

import { useEffect, useRef, useState } from 'react'

const videos = [
  // Start-up
  {
    src: '/stitch.mp4', label: 'Stitch', role: 'Data', category: 'Start-up',
    description: 'Demo data pipelines and integration workflows with clarity.',
    color: 'bg-pink-500',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9 2v6.5L4.5 18c-.5 1 .2 2 1.3 2h12.4c1.1 0 1.8-1 1.3-2L15 8.5V2h1V0H8v2h1zm1 0h4v7l4.5 9.5H5.5L10 9V2z"/></svg>,
  },
  {
    src: '/calendly.mp4', label: 'Calendly', role: 'Scheduling', category: 'Start-up',
    description: 'Create product tours and onboarding guides for your users.',
    color: 'bg-blue-500',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.655 14.262c.281 0 .557.023.828.064 0 .005-.005.01-.005.014-.105.267-.234.534-.381.786l-1.219 2.106c-1.112 1.936-3.177 3.127-5.411 3.127h-2.432c-2.23 0-4.294-1.191-5.412-3.127l-1.218-2.106a6.251 6.251 0 0 1 0-6.252l1.218-2.106C6.736 4.832 8.8 3.641 11.035 3.641h2.432c2.23 0 4.294 1.191 5.411 3.127l1.219 2.106c.147.252.271.519.381.786 0 .004.005.009.005.014-.267.041-.543.064-.828.064-1.816 0-2.501-.607-3.291-1.306-.764-.676-1.711-1.517-3.44-1.517h-1.029c-1.251 0-2.387.455-3.2 1.278-.796.805-1.233 1.904-1.233 3.099v1.411c0 1.196.437 2.295 1.233 3.099.813.823 1.949 1.278 3.2 1.278h1.034c1.729 0 2.676-.841 3.439-1.517.791-.703 1.471-1.306 3.287-1.301Zm.005-3.237c.399 0 .794-.036 1.179-.11-.002-.004-.002-.01-.002-.014-.073-.414-.193-.823-.349-1.218.731-.12 1.407-.396 1.986-.819 0-.004-.005-.013-.005-.018-.331-1.085-.832-2.101-1.489-3.03-.649-.915-1.435-1.719-2.331-2.395-1.867-1.398-4.088-2.138-6.428-2.138-1.448 0-2.855.28-4.175.841-1.273.543-2.423 1.315-3.407 2.299S2.878 6.552 2.341 7.83c-.557 1.324-.842 2.726-.842 4.175 0 1.448.281 2.855.842 4.174.542 1.274 1.314 2.423 2.298 3.407s2.129 1.761 3.407 2.299c1.324.556 2.727.841 4.175.841 2.34 0 4.561-.74 6.428-2.137a10.815 10.815 0 0 0 2.331-2.396c.652-.929 1.158-1.949 1.489-3.03 0-.004.005-.014.005-.018-.579-.423-1.255-.699-1.986-.819.161-.395.276-.804.349-1.218.005-.009.005-.014.005-.023.869.166 1.692.506 2.404 1.035.685.505.552 1.075.446 1.416C22.184 20.437 17.619 24 12.221 24c-6.625 0-12-5.375-12-12s5.37-12 12-12c5.398 0 9.963 3.563 11.471 8.464.106.341.239.915-.446 1.421-.717.529-1.535.873-2.404 1.034.128.716.128 1.45 0 2.166-.387-.074-.782-.11-1.182-.11-4.184 0-3.968 2.823-6.736 2.823h-1.029c-1.899 0-3.15-1.357-3.15-3.095v-1.411c0-1.738 1.251-3.094 3.15-3.094h1.034c2.768 0 2.552 2.823 6.731 2.827Z"/></svg>,
  },
  {
    src: '/miro.mp4', label: 'Miro', role: 'Collaboration', category: 'Start-up',
    description: 'Record whiteboard sessions and brainstorming walkthroughs.',
    color: 'bg-yellow-500',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.392 0H13.9L17 4.808 10.444 0H6.949l3.102 6.3L3.494 0H0l3.05 8.131L0 24h3.494L10.05 6.985 6.949 24h3.494L17 5.494 13.899 24h3.493L24 3.672 17.392 0z"/></svg>,
  },
  // Educator
  {
    src: '/education.mp4', label: 'Education', role: 'Educators', category: 'Educator',
    description: 'Create engaging tutorials and course content effortlessly.',
    color: 'bg-amber-500',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15v-3.75m0 0h-.008v.008H6.75V11.25Z" /></svg>,
  },
  // Social
  {
    src: '/figma2.mp4', label: 'YouTube', role: 'Creators', category: 'Social',
    description: 'Record tutorials and reviews, then upload directly to YouTube.',
    color: 'bg-red-500',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
  {
    src: '/github.mp4', label: 'TikTok', role: 'Influencers', category: 'Social',
    description: 'Turn screen recordings into short-form content for TikTok.',
    color: 'bg-gray-900',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
  },
  {
    src: '/vscode2.mp4', label: 'Instagram', role: 'Marketers', category: 'Social',
    description: 'Create polished video content for Instagram Reels and Stories.',
    color: 'bg-pink-500',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>,
  },
  // Design
  {
    src: '/figma.mp4', label: 'Figma', role: 'Designers', category: 'Design',
    description: 'Showcase design decisions and iterate faster with visual feedback.',
    color: 'bg-purple-500',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 00-3.019 3.019c0 1.678 1.368 3.07 3.088 3.07 1.691 0 3.068-1.378 3.068-3.07v-3.019H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.098-7.509a3.023 3.023 0 00-3.019 3.019 3.023 3.023 0 003.019 3.019h.098a3.023 3.023 0 003.019-3.019 3.023 3.023 0 00-3.019-3.019h-.098z"/></svg>,
  },
  {
    src: '/canva.mp4', label: 'Canva', role: 'Content Creators', category: 'Design',
    description: 'Record design walkthroughs and create stunning visual content.',
    color: 'bg-cyan-500',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.14 16.09c-.564.94-1.88 1.51-3.36 1.51-2.72 0-5.28-2.1-5.28-5.52 0-3.18 2.28-6.48 6.12-6.48 1.68 0 2.88.84 2.88 1.92 0 .84-.6 1.32-1.14 1.32-.42 0-.78-.24-.78-.72 0-.36.18-.6.18-.96 0-.42-.42-.72-1.08-.72-2.16 0-3.78 2.34-3.78 4.92 0 2.16 1.32 3.96 3.48 3.96 1.14 0 2.04-.54 2.64-1.26l.12.03z"/></svg>,
  },
  // Work
  {
    src: '/hero.mp4', label: 'Notion', role: 'Product Managers', category: 'Work',
    description: 'Embed video updates in Notion docs to align your team async.',
    color: 'bg-gray-800',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.29 2.168c-.42-.326-.98-.7-2.055-.607L3.01 2.721c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.886l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933zM1.936 1.035l13.86-1.026c1.7-.14 2.1.047 2.8.56l3.876 2.707c.56.42.746.933.746 1.54v15.09c0 .98-.373 1.54-1.215 1.634l-15.503.933c-.654.046-1.026-.046-1.4-.466L1.43 19.1c-.42-.56-.607-1.026-.607-1.634V2.575c0-.748.28-1.4 1.12-1.54z"/></svg>,
  },
  {
    src: '/figma2.mp4', label: 'Slack', role: 'Teams', category: 'Work',
    description: 'Share quick video messages in Slack instead of long threads.',
    color: 'bg-emerald-500',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>,
  },
  // Dev
  {
    src: '/github.mp4', label: 'GitHub', role: 'Developers', category: 'Dev',
    description: 'Record code walkthroughs and share with your team instantly.',
    color: 'bg-gray-900',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
  },
  {
    src: '/vscode.mp4', label: 'VS Code', role: 'Engineers', category: 'Dev',
    description: 'Document technical flows and debug sessions for knowledge sharing.',
    color: 'bg-sky-500',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 00-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 00-1.276.057L.327 7.261A1 1 0 00.326 8.74L3.899 12 .326 15.26a1 1 0 00.001 1.479L1.65 17.94a.999.999 0 001.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 001.704.29l4.942-2.377A1.5 1.5 0 0024 20.06V3.939a1.5 1.5 0 00-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>,
  },
]

const categories = ['Start-up', 'Educator', 'Social', 'Design', 'Work', 'Dev'] as const

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('Start-up')
  const [displayCategory, setDisplayCategory] = useState('Start-up')
  const [textAnimating, setTextAnimating] = useState(false)
  const prevCatRef = useRef<string | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const groupRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Play video on hover, pause on leave
  const handleCardEnter = (i: number) => {
    setHoveredCard(i)
    const video = videoRefs.current[i]
    if (video) {
      video.currentTime = 0
      video.play().catch(() => {})
    }
  }

  const handleCardLeave = (i: number) => {
    setHoveredCard(null)
    const video = videoRefs.current[i]
    if (video) video.pause()
  }

  const handleCardClick = (i: number) => {
    setExpandedCard(expandedCard === i ? null : i)
  }

  const closeExpanded = () => {
    setExpandedCard(null)
  }

  const manualScrollRef = useRef<string | null>(null)
  const tabContainerRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 })

  const scrollToCategory = (cat: string) => {
    setActiveCategory(cat)
    manualScrollRef.current = cat
    const groupEl = groupRefs.current[cat]
    const scroll = scrollRef.current
    if (groupEl && scroll) {
      const scrollRect = scroll.getBoundingClientRect()
      const groupRect = groupEl.getBoundingClientRect()
      const currentScrollLeft = scroll.scrollLeft
      const groupLeft = groupRect.left - scrollRect.left + currentScrollLeft
      const groupWidth = groupRect.width
      const containerWidth = scrollRect.width
      const centerOffset = groupLeft - (containerWidth - groupWidth) / 2
      const maxScroll = scroll.scrollWidth - containerWidth
      scroll.scrollTo({
        left: Math.max(0, Math.min(centerOffset, maxScroll)),
        behavior: 'smooth',
      })
      setTimeout(() => { manualScrollRef.current = null }, 800)
    }
  }

  // Track active category on scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handleScroll = () => {
      if (manualScrollRef.current) return
      const scrollLeft = el.scrollLeft + 60
      const maxScroll = el.scrollWidth - el.clientWidth
      // If scrolled to the end, pick the last category
      if (el.scrollLeft >= maxScroll - 20) {
        setActiveCategory(categories[categories.length - 1])
        return
      }
      let current: string | null = null
      for (const cat of categories) {
        const groupEl = groupRefs.current[cat]
        if (groupEl && groupEl.offsetLeft <= scrollLeft) {
          current = cat
        }
      }
      if (current) setActiveCategory(current)
    }
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  // Update sliding pill position
  useEffect(() => {
    const tab = tabRefs.current[activeCategory]
    const container = tabContainerRef.current
    if (tab && container) {
      const containerRect = container.getBoundingClientRect()
      const tabRect = tab.getBoundingClientRect()
      setPillStyle({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      })
    }
  }, [activeCategory])

  // Animate text when category changes
  useEffect(() => {
    const cat = activeCategory
    if (cat === prevCatRef.current) return
    prevCatRef.current = cat

    const timer = setTimeout(() => {
      setDisplayCategory(cat)
      setTextAnimating(false)
    }, 250)

    // Use requestAnimationFrame to avoid synchronous setState in effect
    requestAnimationFrame(() => setTextAnimating(true))

    return () => clearTimeout(timer)
  }, [activeCategory])

  // Auto-play videos visible in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.index)
          const video = videoRefs.current[idx]
          if (!video) return
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.5 }
    )
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card)
    })
    return () => observer.disconnect()
  }, [])

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = (entry.target as HTMLElement).dataset.delay || '0'
            setTimeout(() => entry.target.classList.add('visible'), parseFloat(delay) * 1000)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    }
    return () => observer.disconnect()
  }, [])

  // Listen for hero tag clicks
  useEffect(() => {
    const handler = (e: Event) => {
      const index = (e as CustomEvent).detail
      if (typeof index === 'number') {
        const card = cardRefs.current[index]
        if (card && scrollRef.current) {
          scrollRef.current.scrollTo({
            left: card.offsetLeft - 40,
            behavior: 'smooth',
          })
        }
      }
    }
    window.addEventListener('select-feature', handler)
    return () => window.removeEventListener('select-feature', handler)
  }, [])

  // Build grouped data
  const grouped = categories.map((cat) => ({
    name: cat,
    items: videos
      .map((v, i) => ({ ...v, globalIndex: i }))
      .filter((v) => v.category === cat),
  }))

  return (
    <section id="features" ref={sectionRef} className="pt-16 pb-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="animate-on-scroll text-5xl md:text-6xl font-bold text-center text-white mb-3 tracking-tight leading-tight min-h-[140px] md:min-h-[160px] flex items-center justify-center">
          <span>How{' '}
            <span
              className="gradient-text inline-block transition-all duration-300 ease-out"
              style={{
                opacity: textAnimating ? 0 : 1,
                transform: textAnimating ? 'translateY(20px) scale(0.9)' : 'translateY(0) scale(1)',
                filter: textAnimating ? 'blur(8px)' : 'blur(0px)',
              }}
            >
              {displayCategory}
            </span>
            {' '}Expert Themselves
          </span>
        </h2>

        {/* Category tabs with sliding pill */}
        <div className="flex justify-center mb-10">
          <div
            ref={tabContainerRef}
            className="relative inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.06]"
          >
            {/* Sliding pill */}
            <div
              className="absolute top-1 bottom-1 rounded-full bg-white/10 transition-all duration-300 ease-out"
              style={{ left: pillStyle.left, width: pillStyle.width }}
            />
            {categories.map((cat) => (
              <button
                key={cat}
                ref={(el) => { tabRefs.current[cat] = el }}
                onClick={() => scrollToCategory(cat)}
                className={`relative z-10 px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer outline-none focus:outline-none focus:ring-0 ${
                  activeCategory === cat
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal scroll card list */}
      <div
        ref={scrollRef}
        className="animate-on-scroll flex gap-6 overflow-x-auto px-6 md:px-10 pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {grouped.map((group) => (
          <div key={group.name} ref={(el) => { groupRefs.current[group.name] = el }} className="flex gap-6 shrink-0">
            {group.items.map((video, idx) => (
              <div
                key={video.label}
                ref={(el) => { cardRefs.current[video.globalIndex] = el }}
                data-index={video.globalIndex}
                className="shrink-0 w-[540px] md:w-[640px] group"
                onMouseEnter={() => handleCardEnter(video.globalIndex)}
                onMouseLeave={() => handleCardLeave(video.globalIndex)}
                onClick={() => handleCardClick(video.globalIndex)}
              >
                {/* Category label on first card of group */}
                {idx === 0 && (
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                      {group.name}
                    </span>
                    <div className="flex-1 h-px bg-gray-800" />
                  </div>
                )}
                {idx !== 0 && <div className="mb-3 h-[18px]" />}

                {/* Card */}
                <div className={`rounded-2xl overflow-hidden ring-1 ring-gray-800 transition-all duration-300 ${
                  hoveredCard === video.globalIndex
                    ? 'ring-gray-600 shadow-2xl shadow-white/5 scale-[1.02]'
                    : 'hover:ring-gray-700'
                }`}>
                  {/* Video */}
                  <div className="relative aspect-video bg-gray-900">
                    <video
                      ref={(el) => { videoRefs.current[video.globalIndex] = el }}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      loop
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                  </div>

                  {/* Card footer */}
                  <div className="px-4 py-3 bg-[#111]">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${video.color} text-white flex items-center justify-center shrink-0`}>
                        {video.icon}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate">{video.label}</h4>
                        <p className="text-xs text-gray-500 truncate">{video.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Expanded video overlay */}
      {expandedCard !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer animate-in fade-in duration-200"
          onClick={closeExpanded}
        >
          <div
            className="relative w-[90vw] max-w-5xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-700/60">
              <video
                className="w-full aspect-video object-cover bg-gray-900"
                src={videos[expandedCard].src}
                autoPlay
                muted
                playsInline
                loop
              />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${videos[expandedCard].color} text-white flex items-center justify-center shrink-0`}>
                {videos[expandedCard].icon}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">{videos[expandedCard].label}</h4>
                <p className="text-sm text-gray-400">{videos[expandedCard].description}</p>
              </div>
            </div>
            {/* Close button */}
            <button
              onClick={closeExpanded}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer outline-none focus:outline-none focus:ring-0"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
