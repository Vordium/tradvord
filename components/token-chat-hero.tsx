"use client"

import { motion } from "framer-motion"

export default function TokenChatHero() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 100%, rgba(124, 58, 237, 0.1) 0%, rgba(219, 39, 119, 0.1) 100%)`,
        }}
      />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Token Chat
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Join token-specific chat rooms to discuss price movements, news, and trading strategies with the community
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-3 py-1 bg-purple-900/30 border border-purple-500/30 rounded-full text-sm text-purple-300">
              Real-time discussions
            </span>
            <span className="px-3 py-1 bg-pink-900/30 border border-pink-500/30 rounded-full text-sm text-pink-300">
              Price alerts
            </span>
            <span className="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full text-sm text-blue-300">
              Community insights
            </span>
            <span className="px-3 py-1 bg-green-900/30 border border-green-500/30 rounded-full text-sm text-green-300">
              Sentiment analysis
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
