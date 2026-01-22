const stats = [
  { value: '10K+', label: 'Downloads' },
  { value: '4.9', label: 'User Rating', suffix: '/5' },
  { value: '50K+', label: 'Videos Created' },
  { value: '24/7', label: 'Available' },
]

export default function SocialProof() {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-1">
                {stat.value}
                {stat.suffix && <span className="text-slate-400 text-xl">{stat.suffix}</span>}
              </div>
              <div className="text-slate-500 text-sm lg:text-base">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
