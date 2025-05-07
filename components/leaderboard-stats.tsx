"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Users, Zap, BarChart3 } from "lucide-react"

export default function LeaderboardStats() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    {
      title: "Active Traders",
      value: "12,845",
      change: "+12.3%",
      positive: true,
      icon: <Users className="h-5 w-5 text-purple-400" />,
    },
    {
      title: "Total Profit Generated",
      value: "$142.8M",
      change: "+8.7%",
      positive: true,
      icon: <TrendingUp className="h-5 w-5 text-green-400" />,
    },
    {
      title: "Avg. Monthly ROI",
      value: "9.4%",
      change: "+2.1%",
      positive: true,
      icon: <BarChart3 className="h-5 w-5 text-blue-400" />,
    },
    {
      title: "Trades This Week",
      value: "387,291",
      change: "+15.6%",
      positive: true,
      icon: <Zap className="h-5 w-5 text-yellow-400" />,
    },
  ]

  return (
    <div className="rounded-xl bg-gray-800/30 p-6 backdrop-blur-sm">
      <h2 className="mb-6 text-xl font-bold text-white">Leaderboard Overview</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="rounded-lg bg-gray-800/50 p-4"
          >
            <div className="mb-2 flex items-center">
              <div className="mr-2 rounded-full bg-gray-700 p-2">{stat.icon}</div>
              <span className="text-sm font-medium text-gray-400">{stat.title}</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className={`ml-2 text-sm font-medium ${stat.positive ? "text-green-400" : "text-red-400"}`}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
