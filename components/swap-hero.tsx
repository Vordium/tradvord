"use client"

import { motion } from "framer-motion"
import { ArrowRightLeft, Zap } from "lucide-react"

export default function SwapHero() {
  return (
    <section className="pt-32 pb-16 relative" id="swap-hero">
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
              <ArrowRightLeft className="h-4 w-4 inline-block mr-1" />
              Swap Tokens
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
              Fast & Secure Token Swaps
            </span>{" "}
            with Low Fees
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Trade tokens across multiple chains with the best rates and minimal slippage. No registration required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-purple-900/20 px-4 py-2 rounded-lg border border-purple-500/30">
              <Zap className="h-5 w-5 text-purple-400 mr-2" />
              <span className="text-sm">
                <span className="font-bold text-purple-400">0.1%</span> Swap Fee
              </span>
            </div>
            <div className="flex items-center bg-purple-900/20 px-4 py-2 rounded-lg border border-purple-500/30">
              <Zap className="h-5 w-5 text-purple-400 mr-2" />
              <span className="text-sm">
                <span className="font-bold text-purple-400">$2.5B+</span> 24h Volume
              </span>
            </div>
            <div className="flex items-center bg-purple-900/20 px-4 py-2 rounded-lg border border-purple-500/30">
              <Zap className="h-5 w-5 text-purple-400 mr-2" />
              <span className="text-sm">
                <span className="font-bold text-purple-400">5+</span> Chains Supported
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
