'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const videos = [
  {
    src: '/github.mp4', label: 'GitHub', role: 'Developers',
    description: 'Record code walkthroughs and share with your team instantly.',
    color: 'bg-gray-900',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
  },
  {
    src: '/figma.mp4', label: 'Figma', role: 'Designers',
    description: 'Showcase design decisions and iterate faster with visual feedback.',
    color: 'bg-purple-500',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 00-3.019 3.019c0 1.678 1.368 3.07 3.088 3.07 1.691 0 3.068-1.378 3.068-3.07v-3.019H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.098-7.509a3.023 3.023 0 00-3.019 3.019 3.023 3.023 0 003.019 3.019h.098a3.023 3.023 0 003.019-3.019 3.023 3.023 0 00-3.019-3.019h-.098z"/></svg>,
  },
  {
    src: '/figma2.mp4', label: 'Figma 2', role: 'Product Managers',
    description: 'Align your team with clear, async video updates on product progress.',
    color: 'bg-blue-500',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 00-3.019 3.019c0 1.678 1.368 3.07 3.088 3.07 1.691 0 3.068-1.378 3.068-3.07v-3.019H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.098-7.509a3.023 3.023 0 00-3.019 3.019 3.023 3.023 0 003.019 3.019h.098a3.023 3.023 0 003.019-3.019 3.023 3.023 0 00-3.019-3.019h-.098z"/></svg>,
  },
  {
    src: '/vscode.mp4', label: 'VS Code', role: 'Engineers',
    description: 'Document technical flows and debug sessions for knowledge sharing.',
    color: 'bg-sky-500',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 00-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 00-1.276.057L.327 7.261A1 1 0 00.326 8.74L3.899 12 .326 15.26a1 1 0 00.001 1.479L1.65 17.94a.999.999 0 001.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 001.704.29l4.942-2.377A1.5 1.5 0 0024 20.06V3.939a1.5 1.5 0 00-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>,
  },
  {
    src: '/vscode2.mp4', label: 'VS Code 2', role: 'Educators',
    description: 'Create engaging tutorials and course content effortlessly.',
    color: 'bg-emerald-500',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 00-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 00-1.276.057L.327 7.261A1 1 0 00.326 8.74L3.899 12 .326 15.26a1 1 0 00.001 1.479L1.65 17.94a.999.999 0 001.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 001.704.29l4.942-2.377A1.5 1.5 0 0024 20.06V3.939a1.5 1.5 0 00-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>,
  },
]

const features = [
  {
    title: 'Record Instantly',
    description: 'One click to capture your screen. Full screen or custom area — Penguin is ready when you are, with zero setup time.',
    cta: 'Start recording',
    gradient: 'from-primary-500/20 via-primary-400/10 to-primary-300/20',
  },
  {
    title: 'Edit with Ease',
    description: 'Trim, adjust timing, and polish your recording with built-in editing tools. No need to switch to another app.',
    cta: 'See the editor',
    gradient: 'from-blue-500/20 via-blue-400/10 to-indigo-300/20',
  },
  {
    title: 'Export in Minutes',
    description: 'Export as MP4 and share instantly. YouTube, Notion, Slack, docs — your video works everywhere, right away.',
    cta: 'Try it out',
    gradient: 'from-emerald-500/20 via-teal-400/10 to-cyan-300/20',
  },
]

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [activeVideo, setActiveVideo] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [displayRole, setDisplayRole] = useState(videos[0].role)

  const handleVideoChange = useCallback((index: number) => {
    if (index === activeVideo) return
    setTransitioning(true)

    setTimeout(() => {
      setActiveVideo(index)
      setDisplayRole(videos[index].role)
      videoRefs.current.forEach((video, i) => {
        if (!video) return
        if (i === index) {
          video.currentTime = 0
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      })

      setTimeout(() => setTransitioning(false), 50)
    }, 250)
  }, [activeVideo])

  useEffect(() => {
    const currentVideo = videoRefs.current[activeVideo]
    if (!currentVideo) return

    const handleEnded = () => {
      const next = (activeVideo + 1) % videos.length
      handleVideoChange(next)
    }

    currentVideo.loop = false
    currentVideo.addEventListener('ended', handleEnded)
    return () => {
      currentVideo.removeEventListener('ended', handleEnded)
      currentVideo.loop = true
    }
  }, [activeVideo, handleVideoChange])

  // Listen for hero tag clicks
  useEffect(() => {
    const handler = (e: Event) => {
      const index = (e as CustomEvent).detail;
      if (typeof index === "number") handleVideoChange(index);
    };
    window.addEventListener("select-feature", handler);
    return () => window.removeEventListener("select-feature", handler);
  }, [handleVideoChange]);

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

  return (
    <section id="features" ref={sectionRef} className="pt-16 pb-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Video Showcase with Tabs */}
        <div>
          <h2 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-3 tracking-tight leading-tight min-h-[140px] md:min-h-[160px] flex items-center justify-center">
            <span>How <span className={`gradient-text inline-block transition-all duration-300 ${transitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>{displayRole}</span> Expert Themselves</span>
          </h2>


          {/* Video with Side Tabs */}
          <div className="animate-on-scroll scale-in max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              {/* Video Area */}
              <div className={`flex-1 rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-200/60 transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
                {videos.map((video, i) => (
                  <video
                    key={video.src}
                    ref={(el) => { videoRefs.current[i] = el }}
                    className={`w-full aspect-video object-cover bg-gray-100 ${activeVideo === i ? 'block' : 'hidden'}`}
                    autoPlay={i === activeVideo}
                    muted
                    playsInline
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                ))}
              </div>
              {/* Right Side Tabs */}
              <div className="w-full md:w-72 flex flex-col gap-4">
                {videos.map((video, i) => (
                  <button
                    key={video.src}
                    onClick={() => handleVideoChange(i)}
                    className={`flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-300 cursor-pointer ${
                      activeVideo === i
                        ? 'opacity-100'
                        : 'opacity-40 hover:opacity-70'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full ${video.color} text-white flex items-center justify-center flex-shrink-0`}>
                      {video.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-900">{video.role}</h4>
                      <p className={`text-sm text-gray-500 mt-0.5 leading-snug transition-all duration-300 ${activeVideo === i ? 'block' : 'hidden md:block'}`}>{video.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
