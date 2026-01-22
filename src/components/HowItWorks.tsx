const steps = [
  {
    number: '01',
    title: 'Hit Record',
    description: 'Click the record button and select your capture area. Full screen or custom region - your choice.',
    visual: (
      <div className="relative w-full aspect-square flex items-center justify-center">
        <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-50 border border-sky-200/50" />
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform">
          <div className="w-8 h-8 rounded bg-white" />
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-white shadow-lg text-sm font-medium text-slate-700">
          Ready to record
        </div>
      </div>
    ),
  },
  {
    number: '02',
    title: 'Auto Zoom Magic',
    description: 'As you move your cursor, Screen Pro automatically zooms and focuses on the important areas.',
    visual: (
      <div className="relative w-full aspect-square flex items-center justify-center">
        <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-50 border border-indigo-200/50" />
        <div className="relative">
          {/* Zoom circles */}
          <div className="absolute -inset-8 border-2 border-dashed border-indigo-300 rounded-full animate-cursor-zoom" />
          <div className="absolute -inset-16 border border-dashed border-indigo-200 rounded-full animate-cursor-zoom" style={{ animationDelay: '0.5s' }} />
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-white shadow-lg text-sm font-medium text-slate-700 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Zoom: 2.0x
        </div>
      </div>
    ),
  },
  {
    number: '03',
    title: 'Edit & Export',
    description: 'Fine-tune your zoom points, trim the video, and export in your preferred format instantly.',
    visual: (
      <div className="relative w-full aspect-square flex items-center justify-center">
        <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 border border-emerald-200/50" />
        <div className="relative flex flex-col items-center">
          {/* Timeline mockup */}
          <div className="w-48 h-10 rounded-lg bg-white shadow-lg mb-4 overflow-hidden">
            <div className="h-full flex items-center px-3 gap-2">
              <div className="w-1/4 h-6 rounded bg-emerald-200" />
              <div className="w-1/3 h-6 rounded bg-emerald-300" />
              <div className="w-1/4 h-6 rounded bg-emerald-200" />
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-white shadow-lg text-sm font-medium text-emerald-600 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Export ready
        </div>
      </div>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dots" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-slate-600 text-sm font-medium mb-4 shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Simple Process
          </div>
          <h2 className="heading-lg font-bold text-slate-900 mb-4">
            <span className="whitespace-nowrap">From recording to sharing</span>
            <span className="gradient-text block">in 3 easy steps</span>
          </h2>
          <p className="text-base lg:text-lg text-slate-600 whitespace-nowrap">
            No complicated setup. No steep learning curve. Just effortless screen recording.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/3 left-full w-full h-px">
                  <div className="w-full h-full bg-gradient-to-r from-slate-300 via-slate-200 to-transparent" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-300" />
                </div>
              )}

              {/* Card */}
              <div className="card p-6 h-full hover-lift bg-white">
                {/* Visual */}
                <div className="mb-6">
                  {step.visual}
                </div>

                {/* Content */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white text-sm font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
