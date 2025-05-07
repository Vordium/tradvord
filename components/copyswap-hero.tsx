"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function CopyswapHero() {
  const router = useRouter()

  const handleStartCopyTrading = () => {
    // Smooth scroll to traders section
    document.getElementById("traders-section")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 to-transparent"></div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-sm mb-6"
          >
            <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-purple-400"></span>
            New Feature
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 mb-6"
          >
            CopySwap
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl"
          >
            Automatically copy the trades of successful crypto traders and earn while you learn.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mb-10"
          >
            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 flex flex-col items-center hover:border-purple-500/40 transition-all">
              <TrendingUp className="h-10 w-10 text-purple-400 mb-3" />
              <h3 className="text-lg font-medium text-white mb-2">Copy Top Traders</h3>
              <p className="text-gray-400 text-sm text-center">Follow strategies of proven successful traders</p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 flex flex-col items-center hover:border-purple-500/40 transition-all">
              <Shield className="h-10 w-10 text-purple-400 mb-3" />
              <h3 className="text-lg font-medium text-white mb-2">Risk Management</h3>
              <p className="text-gray-400 text-sm text-center">Set allocation limits and customize risk levels</p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 flex flex-col items-center hover:border-purple-500/40 transition-all">
              <Zap className="h-10 w-10 text-purple-400 mb-3" />
              <h3 className="text-lg font-medium text-white mb-2">Instant Execution</h3>
              <p className="text-gray-400 text-sm text-center">Trades are copied in real-time with minimal slippage</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button onClick={handleStartCopyTrading} className="px-8 py-6 h-auto text-lg group">
              Start Copy Trading
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
