export default function AboutMission() {
  return (
    <section className="py-20 bg-black/50">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
                Our Mission
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              At Copto, we're on a mission to revolutionize cryptocurrency trading by providing a platform that combines
              cutting-edge technology with an intuitive user experience.
            </p>
            <p className="text-gray-300 mb-6">
              We believe in a future where financial services are open, transparent, and accessible to everyone,
              regardless of their location or background.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Accessibility</h3>
                  <p className="text-gray-400">Making crypto trading accessible to everyone, everywhere</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Innovation</h3>
                  <p className="text-gray-400">Pushing the boundaries of what's possible in DeFi</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Security</h3>
                  <p className="text-gray-400">Ensuring the highest standards of security and reliability</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75"></div>
            <div className="relative bg-black rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-300 mb-6">
                We envision a world where decentralized finance is the norm, not the exception. Where anyone can access
                sophisticated financial tools without intermediaries or gatekeepers.
              </p>
              <p className="text-gray-300">
                By building intuitive interfaces on top of powerful blockchain technology, we're making this vision a
                reality, one trade at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
