import { useState, useEffect } from 'react'
import { analytics } from '../lib/analytics'

type AnimationPhase = 'move' | 'click' | 'zoom'

interface AnimationStep {
  x: number
  y: number
  target: string
}

export default function Demo() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [phase, setPhase] = useState<AnimationPhase>('move')

  // Animation positions
  const animationSteps: AnimationStep[] = [
    { x: 18, y: 35, target: 'stats1' },
    { x: 33, y: 35, target: 'stats2' },
    { x: 35, y: 65, target: 'chart' },
    { x: 78, y: 60, target: 'recent' },
    { x: 50, y: 18, target: 'nav' },
  ]

  useEffect(() => {
    if (!isPlaying) return

    const phaseTimings = {
      move: 1400,
      click: 500,
      zoom: 1800,
    }

    const timeout = setTimeout(() => {
      if (phase === 'move') {
        setPhase('click')
      } else if (phase === 'click') {
        setPhase('zoom')
      } else {
        setCurrentStep((prev) => (prev + 1) % animationSteps.length)
        setPhase('move')
      }
    }, phaseTimings[phase])

    return () => clearTimeout(timeout)
  }, [isPlaying, phase, currentStep, animationSteps.length])

  const currentAnim = animationSteps[currentStep]
  const isZoomed = phase === 'zoom'
  const isClicking = phase === 'click' || phase === 'zoom'
  const totalPhases = animationSteps.length * 3
  const currentPhaseIndex = currentStep * 3 + (phase === 'move' ? 0 : phase === 'click' ? 1 : 2)
  const progress = ((currentPhaseIndex + 1) / totalPhases) * 100

  return (
    <section id="demo" className="section-padding bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            See It In Action
          </div>
          <h2 className="heading-lg font-bold text-slate-900 mb-4">
            Watch Screen Pro
            <span className="gradient-text"> in action</span>
          </h2>
          <p className="text-lg text-slate-600">
            See how easy it is to create professional screen recordings with automatic cursor zoom.
          </p>
        </div>

        {/* Video container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 rounded-3xl blur-2xl" />

            {/* Video frame */}
            <div className="relative mac-window">
              <div className="mac-window-header">
                <div className="mac-window-dot mac-window-dot-red" />
                <div className="mac-window-dot mac-window-dot-yellow" />
                <div className="mac-window-dot mac-window-dot-green" />
                <span className="ml-4 text-xs text-gray-400 font-medium">Screen Pro Demo</span>
                {/* Recording indicator */}
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs text-red-400">REC</span>
                </div>
              </div>

              {/* Video placeholder */}
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 aspect-video overflow-hidden">
                {/* Background grid */}
                <div className="absolute inset-0 bg-grid opacity-10" />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-purple-600/5" />

                {/* Demo content preview - Dashboard UI with zoom effect */}
                <div
                  className="absolute inset-6 rounded-xl border border-slate-700/50 overflow-hidden bg-slate-900/80 backdrop-blur origin-center"
                  style={{
                    transform: isZoomed
                      ? `scale(1.9) translate(${25 - currentAnim.x * 0.5}%, ${25 - currentAnim.y * 0.5}%)`
                      : 'scale(1) translate(0, 0)',
                    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {/* Top navigation bar */}
                  <div className="h-10 bg-slate-800/80 border-b border-slate-700/50 flex items-center px-4 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-white">Analytics</span>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="flex gap-1 bg-slate-700/50 rounded-lg p-1">
                        <button className={`px-3 py-1 text-xs rounded-md transition-all duration-200 ${currentAnim.target === 'nav' && isZoomed ? 'text-white bg-violet-500' : 'text-white bg-slate-600/80'}`}>Overview</button>
                        <button className="px-3 py-1 text-xs text-slate-400">Reports</button>
                        <button className="px-3 py-1 text-xs text-slate-400">Settings</button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500" />
                    </div>
                  </div>

                  {/* Dashboard content */}
                  <div className="p-4 space-y-4">
                    {/* Stats row */}
                    <div className="grid grid-cols-4 gap-3">
                      <div className={`bg-slate-800/60 rounded-lg p-3 border transition-all duration-200 ${currentAnim.target === 'stats1' && isZoomed ? 'border-violet-400/50 ring-2 ring-violet-400/20' : 'border-slate-700/30'}`}>
                        <div className="text-[10px] text-slate-400 mb-1">Total Views</div>
                        <div className="text-lg font-bold text-white">24.5K</div>
                        <div className="text-[9px] text-emerald-400 flex items-center gap-1 mt-1">
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          +12.5%
                        </div>
                      </div>
                      <div className={`bg-slate-800/60 rounded-lg p-3 border transition-all duration-200 ${currentAnim.target === 'stats2' && isZoomed ? 'border-violet-400/50 ring-2 ring-violet-400/20' : 'border-slate-700/30'}`}>
                        <div className="text-[10px] text-slate-400 mb-1">Recordings</div>
                        <div className="text-lg font-bold text-white">1,847</div>
                        <div className="text-[9px] text-emerald-400 flex items-center gap-1 mt-1">
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          +8.2%
                        </div>
                      </div>
                      <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/30">
                        <div className="text-[10px] text-slate-400 mb-1">Active Users</div>
                        <div className="text-lg font-bold text-white">892</div>
                        <div className="text-[9px] text-emerald-400 flex items-center gap-1 mt-1">
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          +23.1%
                        </div>
                      </div>
                      <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/30">
                        <div className="text-[10px] text-slate-400 mb-1">Avg. Duration</div>
                        <div className="text-lg font-bold text-white">4:32</div>
                        <div className="text-[9px] text-violet-400 flex items-center gap-1 mt-1">
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          min
                        </div>
                      </div>
                    </div>

                    {/* Chart and list row */}
                    <div className="grid grid-cols-3 gap-3">
                      {/* Chart */}
                      <div className={`col-span-2 bg-slate-800/60 rounded-lg p-3 border transition-all duration-200 ${currentAnim.target === 'chart' && isZoomed ? 'border-violet-400/50 ring-2 ring-violet-400/20' : 'border-slate-700/30'}`}>
                        <div className="text-[10px] text-slate-400 mb-3">Weekly Performance</div>
                        <div className="flex items-end justify-between h-20 gap-2">
                          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                              <div
                                className="w-full rounded-sm bg-gradient-to-t from-violet-500/80 to-purple-500/80 transition-all duration-300"
                                style={{
                                  height: `${h}%`,
                                  opacity: currentAnim.target === 'chart' && isZoomed ? 1 : 0.8
                                }}
                              />
                              <span className="text-[8px] text-slate-500">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recent activity */}
                      <div className={`bg-slate-800/60 rounded-lg p-3 border transition-all duration-200 ${currentAnim.target === 'recent' && isZoomed ? 'border-violet-400/50 ring-2 ring-violet-400/20' : 'border-slate-700/30'}`}>
                        <div className="text-[10px] text-slate-400 mb-2">Recent</div>
                        <div className="space-y-2">
                          {[
                            { name: 'Tutorial.mp4', size: '24 MB' },
                            { name: 'Demo_v2.mp4', size: '18 MB' },
                            { name: 'Meeting.mp4', size: '45 MB' },
                          ].map((item, i) => (
                            <div key={i} className={`flex items-center gap-2 p-1 rounded transition-all duration-200 ${currentAnim.target === 'recent' && isZoomed && i === 0 ? 'bg-violet-500/20' : ''}`}>
                              <div className="w-5 h-5 rounded bg-gradient-to-br from-violet-500/30 to-purple-500/30 flex items-center justify-center">
                                <svg className="w-2.5 h-2.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[9px] text-white truncate">{item.name}</div>
                                <div className="text-[8px] text-slate-500">{item.size}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated Cursor */}
                <div
                  className="absolute z-20 pointer-events-none"
                  style={{
                    left: `${currentAnim.x}%`,
                    top: `${currentAnim.y}%`,
                    transition: 'left 1s cubic-bezier(0.4, 0, 0.2, 1), top 1s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {/* Click effect - shows on click phase */}
                  {isClicking && (
                    <div className="absolute top-0 left-0">
                      <div
                        className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/30"
                        style={{
                          animation: 'clickRipple 0.5s ease-out forwards'
                        }}
                      />
                      <div
                        className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/50"
                        style={{
                          animation: 'clickRipple 0.35s ease-out forwards'
                        }}
                      />
                    </div>
                  )}

                  {/* Zoom circle indicator - shows after click during zoom */}
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-violet-400"
                    style={{
                      width: isZoomed ? '5rem' : '1.5rem',
                      height: isZoomed ? '5rem' : '1.5rem',
                      opacity: isZoomed ? 1 : 0,
                      boxShadow: isZoomed ? '0 0 30px rgba(139, 92, 246, 0.5), inset 0 0 20px rgba(139, 92, 246, 0.1)' : 'none',
                      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />

                  {/* Cursor icon */}
                  <svg className="w-5 h-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4l16 8-7 2-2 7z" />
                  </svg>
                </div>

                {/* Bottom controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/80 to-transparent z-10">
                  {/* Progress bar */}
                  <div className="w-full h-1 bg-slate-700 rounded-full mb-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                      style={{
                        width: `${progress}%`,
                        transition: 'width 0.5s ease-out'
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>0:{String(Math.floor(progress / 100 * 18)).padStart(2, '0')} / 0:18</span>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          analytics.demoInteract(isPlaying ? 'pause' : 'play')
                          setIsPlaying(!isPlaying)
                        }}
                        className="hover:text-white transition-colors"
                      >
                        {isPlaying ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </button>
                      <button className="hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      </button>
                      <button className="hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="text-center text-slate-500 mt-6 text-sm">
            Auto cursor zoom in action - Click pause to stop the animation
          </p>
        </div>
      </div>

      {/* Click animation keyframes */}
      <style>{`
        @keyframes clickRipple {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}
