export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-6 pb-6 lg:pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 md:w-96 h-64 md:h-96 bg-sky-200 rounded-full blur-3xl opacity-30 animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-64 md:w-96 h-64 md:h-96 bg-indigo-200 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-10 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 animate-fade-in-up delay-100 leading-tight">
              What
              <span className="block">Pro Creators</span>
              <span className="gradient-text block mt-1 sm:mt-2">Don't Tell You</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10 animate-fade-in-up delay-200 tracking-wide">
              Create professional tutorials and demos effortlessly.
              Screen Pro automatically zooms and highlights where your cursor goes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in-up delay-300" id="download">
              <a
                href="#"
                className="btn-primary inline-flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span>Download for Mac</span>
              </a>
              <a
                href="#demo"
                className="btn-secondary inline-flex items-center justify-center gap-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-100 animate-fade-in-up delay-400">
              <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-5 text-[10px] sm:text-xs text-slate-500">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No account required
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No watermark
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited recordings
                </div>
              </div>
            </div>
          </div>

          {/* Right: App Preview */}
          <div className="relative animate-fade-in-up delay-200 mt-4 lg:mt-0">
            {/* Mac Window Mockup */}
            <div className="mac-window relative mx-auto max-w-lg lg:max-w-none">
              <div className="mac-window-header">
                <div className="mac-window-dot mac-window-dot-red" />
                <div className="mac-window-dot mac-window-dot-yellow" />
                <div className="mac-window-dot mac-window-dot-green" />
                <span className="ml-3 sm:ml-4 text-[10px] sm:text-xs text-gray-400 font-medium">Screen Pro</span>
              </div>
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 aspect-video">
                {/* Screen content mockup */}
                <div className="absolute inset-2 sm:inset-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  {/* Simulated code editor */}
                  <div className="p-2 sm:p-4 font-mono text-[8px] sm:text-xs">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-slate-500 mb-2 sm:mb-3">
                      <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-sky-500/30" />
                      <span>app.tsx</span>
                    </div>
                    <div className="space-y-1 sm:space-y-1.5 text-slate-400">
                      <p><span className="text-purple-400">const</span> <span className="text-sky-400">app</span> = () =&gt; {'{'}</p>
                      <p className="pl-2 sm:pl-4"><span className="text-purple-400">return</span> (</p>
                      <p className="pl-4 sm:pl-8 text-orange-300">&lt;div&gt;Hello&lt;/div&gt;</p>
                      <p className="pl-2 sm:pl-4">)</p>
                      <p>{'}'}</p>
                    </div>
                  </div>
                </div>

                {/* Cursor with zoom effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-cursor-move">
                  {/* Zoom ring */}
                  <div className="absolute -inset-4 sm:-inset-8 border-2 border-sky-400/30 rounded-full animate-cursor-zoom" />
                  <div className="absolute -inset-6 sm:-inset-12 border border-sky-400/20 rounded-full animate-cursor-zoom" style={{ animationDelay: '0.2s' }} />

                  {/* Cursor */}
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4l16 8-7 2-2 7z" />
                  </svg>
                </div>

                {/* Zoom indicator - hidden on mobile */}
                <div className="hidden sm:flex absolute bottom-2 sm:bottom-4 right-2 sm:right-4 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-sky-500/20 backdrop-blur border border-sky-400/30 text-sky-300 text-[10px] sm:text-xs font-medium items-center gap-1.5 sm:gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  Auto Zoom: ON
                </div>

                {/* macOS Recording Control Bar */}
                <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-3 px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
                  {/* Timer */}
                  <span className="text-white text-xs sm:text-lg font-medium tabular-nums">01:32</span>

                  {/* Divider */}
                  <div className="w-px h-4 sm:h-6 bg-slate-600" />

                  {/* Control Buttons */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    {/* Pause Button */}
                    <button className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-slate-600 flex items-center justify-center">
                      <svg className="w-2 h-2 sm:w-3.5 sm:h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    </button>
                    {/* Stop Button */}
                    <button className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-red-900/80 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-sm bg-red-500" />
                    </button>
                  </div>

                  {/* Divider - hidden on small mobile */}
                  <div className="hidden xs:block w-px h-4 sm:h-6 bg-slate-600" />

                  {/* Audio Meters - hidden on mobile, shown on tablet+ */}
                  <div className="hidden md:flex items-center gap-2 sm:gap-3">
                    {/* System Audio */}
                    <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-slate-700/50">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                      </svg>
                      {/* Level Bars */}
                      <div className="flex items-end gap-px h-3 sm:h-4">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-0.5 sm:w-1 rounded-sm ${
                              i < 4 ? 'bg-green-500' : i < 6 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{
                              height: `${4 + i * 1.5}px`
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Microphone */}
                    <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-slate-700/50">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
                      </svg>
                      {/* Level Bars */}
                      <div className="flex items-end gap-px h-3 sm:h-4">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-0.5 sm:w-1 rounded-sm ${
                              i < 3 ? 'bg-green-500' : i < 5 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{
                              height: `${4 + i * 2}px`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature badges - below mockup */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6">
              <div className="px-4 py-2.5 rounded-xl bg-white shadow-md shadow-slate-200/50 border border-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-700">Auto Focus</span>
              </div>

              <div className="px-4 py-2.5 rounded-xl bg-white shadow-md shadow-slate-200/50 border border-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-700">Easy Edit</span>
              </div>

              <div className="px-4 py-2.5 rounded-xl bg-white shadow-md shadow-slate-200/50 border border-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-700">Quick Export</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
