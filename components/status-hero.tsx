"use client"

import { motion } from "framer-motion"

export default function StatusHero() {
  return (
    <section className="pt-32 pb-16 relative">
      <div className="absolute -top-20 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-pink-500 rounded-full blur-[100px] opacity-20"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/50">
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              System Status
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
              Trady Platform
            </span>{" "}
            Status
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Check the current status of all Trady services and view recent incidents.
          </p>
          <div className="inline-flex items-center bg-green-900/30 text-green-400 px-4 py-2 rounded-full border border-green-500/30">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
            <span className="font-medium">All Systems Operational</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
