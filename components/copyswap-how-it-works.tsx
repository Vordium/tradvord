"use client"

import { Search, UserCheck, Settings, TrendingUp, DollarSign, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useRouter } from "next/navigation"

export default function CopyswapHowItWorks() {
  const router = useRouter()
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const handleGetStarted = () => {
    // Scroll to traders section
    document.getElementById("traders-section")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">How CopySwap Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Follow these simple steps to start copying the trades of successful crypto traders and potentially grow your
            portfolio
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          <motion.div
            variants={item}
            className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 relative hover:border-purple-500/40 transition-all"
          >
            <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-glow-sm">
              1
            </div>
            <div className="h-16 w-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4 mt-2">
              <Search className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Find Traders</h3>
            <p className="text-gray-400">
              Browse through our curated list of top-performing traders. Filter by performance metrics, risk level, and
              trading style to find the perfect match.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 relative hover:border-purple-500/40 transition-all"
          >
            <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-glow-sm">
              2
            </div>
            <div className="h-16 w-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4 mt-2">
              <UserCheck className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Select Traders</h3>
            <p className="text-gray-400">
              Choose one or multiple traders to copy. You can diversify your strategy by following traders with
              different approaches and risk profiles.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 relative hover:border-purple-500/40 transition-all"
          >
            <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-glow-sm">
              3
            </div>
            <div className="h-16 w-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4 mt-2">
              <Settings className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Configure Settings</h3>
            <p className="text-gray-400">
              Set your allocation amount, risk level, and other parameters. You can customize how much of your portfolio
              to allocate to each trader.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 relative hover:border-purple-500/40 transition-all"
          >
            <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-glow-sm">
              4
            </div>
            <div className="h-16 w-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4 mt-2">
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Auto-Copy Trades</h3>
            <p className="text-gray-400">
              Once set up, our system will automatically copy the trades of your selected traders in real-time, with
              minimal slippage and optimal execution.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 relative hover:border-purple-500/40 transition-all"
          >
            <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-glow-sm">
              5
            </div>
            <div className="h-16 w-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4 mt-2">
              <DollarSign className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Track Performance</h3>
            <p className="text-gray-400">
              Monitor your portfolio's performance in real-time. See detailed analytics on each trader's contribution to
              your overall returns.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:shadow-glow-sm transition-all"
          >
            <h3 className="text-xl font-bold text-white mb-4">Ready to Start?</h3>
            <p className="text-white mb-6">
              Join thousands of traders who are already growing their portfolios with CopySwap
            </p>
            <button
              className="bg-white text-purple-600 font-bold py-2 px-6 rounded-lg flex items-center hover:bg-gray-100 transition-colors"
              onClick={handleGetStarted}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
