const features = [
  {
    title: 'One-Click Recording',
    description: 'Start recording your entire screen or select a specific area instantly. No complex setup required.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    color: 'sky',
  },
  {
    title: 'Smart Zoom Editing',
    description: 'Fine-tune zoom levels after recording. Adjust, remove, or add zoom points exactly where you need them.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: 'violet',
  },
  {
    title: 'Export Anywhere',
    description: 'Download in popular formats including MP4 and WebM. Share directly or upload to any platform.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    color: 'emerald',
  },
]

const colorVariants = {
  sky: {
    bg: 'bg-sky-50',
    border: 'border-sky-100',
    icon: 'text-sky-600',
    glow: 'group-hover:shadow-sky-200/50',
  },
  violet: {
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    icon: 'text-violet-600',
    glow: 'group-hover:shadow-violet-200/50',
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    icon: 'text-emerald-600',
    glow: 'group-hover:shadow-emerald-200/50',
  },
}

export default function Features() {
  return (
    <section id="features" className="py-12 lg:py-16 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Powerful Features
          </div>
          <h2 className="heading-lg font-bold text-slate-900 mb-4 tracking-wide leading-relaxed">
            Everything you need for
            <span className="gradient-text"> professional recordings</span>
          </h2>
          <p className="text-base lg:text-lg text-slate-600 whitespace-nowrap">
            Simple yet powerful tools to create stunning screen recordings without the learning curve.
          </p>
        </div>

        {/* Main feature - Auto Cursor Zoom */}
        <div className="mb-16">
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 lg:p-12 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />

            <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-6">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Core Feature
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Auto Cursor Zoom
                </h3>
                <p className="text-lg text-slate-300 mb-8">
                  The magic behind professional-looking tutorials. Screen Pro automatically follows your cursor and intelligently zooms in to highlight what matters most.
                </p>
                <ul className="space-y-4">
                  {[
                    'Real-time cursor tracking',
                    'Smooth, natural zoom transitions',
                    'Customizable zoom intensity',
                    'Works with any application',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className="relative">
                <div className="relative rounded-2xl bg-slate-800/50 border border-slate-700/50 p-6 backdrop-blur">
                  {/* Mini screen mockup */}
                  <div className="aspect-video rounded-lg bg-slate-900 relative overflow-hidden">
                    {/* Simulated content */}
                    <div className="absolute inset-0 p-4">
                      <div className="h-full flex gap-4">
                        {/* Sidebar */}
                        <div className="w-1/4 space-y-2">
                          <div className="h-4 w-full bg-slate-700/50 rounded" />
                          <div className="h-4 w-3/4 bg-slate-700/50 rounded" />
                          <div className="h-4 w-5/6 bg-slate-700/50 rounded" />
                        </div>
                        {/* Main content */}
                        <div className="flex-1 space-y-3">
                          <div className="h-6 w-1/2 bg-slate-700/50 rounded" />
                          <div className="h-4 w-full bg-slate-700/30 rounded" />
                          <div className="h-4 w-5/6 bg-slate-700/30 rounded" />
                          <div className="h-4 w-4/5 bg-slate-700/30 rounded" />
                        </div>
                      </div>
                    </div>

                    {/* Zoom overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Zoom rings */}
                        <div className="absolute -inset-6 border-2 border-sky-400/40 rounded-full animate-cursor-zoom" />
                        <div className="absolute -inset-10 border border-sky-400/20 rounded-full animate-cursor-zoom" style={{ animationDelay: '0.3s' }} />

                        {/* Magnified area */}
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-500/20 to-indigo-500/20 backdrop-blur-sm border border-sky-400/30 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4 4l16 8-7 2-2 7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Zoom level indicator */}
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-slate-400">Zoom Level</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full" />
                      </div>
                      <span className="text-sky-400 font-medium">2.0x</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Other features grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const colors = colorVariants[feature.color as keyof typeof colorVariants]
            return (
              <div
                key={index}
                className={`group card p-8 hover-lift ${colors.glow}`}
              >
                <div className={`w-14 h-14 rounded-2xl ${colors.bg} ${colors.border} border flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                  <div className={colors.icon}>{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
