"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Trophy, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LeaderboardHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/grid-pattern.png')",
          backgroundSize: "cover",
        }}
      ></div>

      <div className="container relative z-10 mx-auto px-4 py-20 text-center md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3">
              <Trophy className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Trader Leaderboard
          </h1>
          <p className="mb-8 text-lg text-gray-300 md:text-xl">
            Discover the top-performing traders on Trady. Follow their strategies, analyze their performance, and copy
            their trades to boost your crypto portfolio.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
              size="lg"
            >
              Find Traders to Copy
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="border-purple-500 text-purple-300 hover:bg-purple-950/50">
              Learn About CopySwap
            </Button>
          </div>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600/20">
              <TrendingUp className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Top Performance</h3>
            <p className="text-gray-300">
              Our leaderboard ranks traders based on consistent performance across various market conditions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-pink-600/20">
              <Users className="h-6 w-6 text-pink-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Verified Traders</h3>
            <p className="text-gray-300">
              All traders on our leaderboard are verified with transparent trading history and risk metrics.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-purple-400"
              >
                <path d="M12 2v20" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Real Profits</h3>
            <p className="text-gray-300">
              Track actual profit metrics, not just percentage gains. See real value created by top traders.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
