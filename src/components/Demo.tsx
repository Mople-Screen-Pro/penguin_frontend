export default function Demo() {
  return (
    <section id="demo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            See It in Action
          </h2>
          <p className="text-xl text-gray-600">
            Watch how Screen Pro works in this demo video
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl aspect-video flex items-center justify-center shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
            <div className="relative text-center text-white">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-lg text-gray-300">Demo Video</p>
              <p className="text-sm text-gray-500 mt-2">Click to play</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
              <div className="h-full w-0 bg-blue-500"></div>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-6 text-sm">
            Actual app demo video coming soon
          </p>
        </div>
      </div>
    </section>
  )
}
