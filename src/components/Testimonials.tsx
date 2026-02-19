const testimonials = [
  {
    quote: "I used to spend 2 hours editing zoom effects into a 10-minute tutorial. With Penguin, it's done before I even stop recording. My subscribers noticed the quality jump immediately.",
    author: "Sarah Chen",
    role: "YouTube Creator, 120K subs",
    avatar: "SC",
    color: "sky",
  },
  {
    quote: "As a developer, I need my documentation videos to be clear and focused. Penguin's cursor zoom automatically highlights the exact code I'm working on. It just gets it.",
    author: "Michael Roberts",
    role: "Senior Software Engineer",
    avatar: "MR",
    color: "blue",
  },
  {
    quote: "I've tried Screen Studio, Loom, and OBS. Penguin gives me the same pro-quality output at half the price — and the auto-zoom is genuinely better.",
    author: "Emily Park",
    role: "UX Designer & Educator",
    avatar: "EP",
    color: "cyan",
  },
]

const colorVariants = {
  sky: 'from-sky-400 to-sky-500',
  blue: 'from-blue-400 to-blue-500',
  cyan: 'from-cyan-400 to-cyan-500',
}

export default function Testimonials() {
  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dots" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-slate-600 text-sm font-medium mb-4 shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Loved by Creators
          </div>
          <h2 className="heading-lg font-bold text-slate-900 mb-4">
            Creators who switched
            <span className="gradient-text"> never went back</span>
          </h2>
          <p className="text-lg text-slate-600">
            Join thousands of creators, developers, and educators who make better content with Penguin.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card p-8 hover-lift bg-white"
            >
              {/* Quote icon */}
              <div className="mb-6">
                <svg className="w-10 h-10 text-slate-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote */}
              <p className="text-slate-600 leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colorVariants[testimonial.color as keyof typeof colorVariants]} flex items-center justify-center text-white font-semibold text-sm`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.author}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rating summary */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-lg border border-slate-100">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-slate-600 font-medium">4.9 out of 5</span>
            <span className="text-slate-400">from 500+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  )
}
