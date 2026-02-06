const steps = [
  {
    number: '01',
    title: 'Record',
    description: 'Click record and capture your screen. Full screen or custom area.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    color: 'violet',
  },
  {
    number: '02',
    title: 'Auto Zoom',
    description: 'Screen Pro automatically zooms to follow your cursor movements.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
      </svg>
    ),
    color: 'purple',
  },
  {
    number: '03',
    title: 'Export',
    description: 'Download your professional video in MP4 format instantly.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    color: 'emerald',
  },
]

const colorVariants = {
  violet: {
    bg: 'bg-violet-500',
    light: 'bg-violet-100',
    text: 'text-violet-600',
    border: 'border-violet-200',
  },
  purple: {
    bg: 'bg-purple-500',
    light: 'bg-purple-100',
    text: 'text-purple-600',
    border: 'border-purple-200',
  },
  emerald: {
    bg: 'bg-emerald-500',
    light: 'bg-emerald-100',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
  },
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Quick & Easy
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Professional recordings in
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> 3 simple steps</span>
          </h2>
          <p className="text-lg text-slate-600">
            No learning curve. No complicated settings. Just effortless screen recording.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-200 via-purple-200 to-emerald-200 -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, index) => {
              const colors = colorVariants[step.color as keyof typeof colorVariants]
              return (
                <div key={index} className="relative group">
                  {/* Card */}
                  <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/50 transition-all duration-300 text-center">
                    {/* Step number */}
                    <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      {step.icon}
                    </div>

                    {/* Number badge */}
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${colors.light} ${colors.text} text-sm font-bold mb-4`}>
                      {step.number}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-600">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow connector (hidden on last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20">
                      <div className="w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA hint */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-4">Ready to get started?</p>
          <button
            onClick={() => document.getElementById("download")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-violet-600 font-semibold hover:text-violet-700 transition-colors"
          >
            Download Screen Pro
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
