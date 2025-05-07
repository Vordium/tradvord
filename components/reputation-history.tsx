"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { Button } from "@/components/ui/button"

// Generate reputation history data
const generateHistoryData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const currentMonth = new Date().getMonth()

  // Start with a base score between 500-650
  let score = Math.floor(Math.random() * (650 - 500 + 1)) + 500

  // Generate 12 months of data
  return Array.from({ length: 12 }, (_, i) => {
    const monthIndex = (currentMonth - 11 + i) % 12
    const month = months[monthIndex < 0 ? monthIndex + 12 : monthIndex]

    // Add some random variation to the score
    const change = Math.floor(Math.random() * 40) - 15
    score += change

    // Keep score within bounds
    score = Math.max(350, Math.min(850, score))

    // Add some events
    let event = null
    if (i === 3) {
      event = "Completed KYC verification"
      score += 25
    } else if (i === 7) {
      event = "Started copy trading"
      score += 15
    } else if (i === 10) {
      event = "Enabled 2FA"
      score += 20
    }

    return {
      month,
      score: Math.round(score),
      event,
    }
  })
}

const historyData = generateHistoryData()

export default function ReputationHistory() {
  const [timeframe, setTimeframe] = useState("1y")

  // Filter data based on timeframe
  const getFilteredData = () => {
    switch (timeframe) {
      case "3m":
        return historyData.slice(-3)
      case "6m":
        return historyData.slice(-6)
      case "1y":
      default:
        return historyData
    }
  }

  const filteredData = getFilteredData()

  // Calculate score change
  const scoreChange = filteredData[filteredData.length - 1].score - filteredData[0].score
  const scoreChangePercent = ((scoreChange / filteredData[0].score) * 100).toFixed(1)

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload

      return (
        <div className="bg-gray-900 border border-purple-500/20 p-3 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-300">{label}</p>
          <p className="text-lg font-bold text-white">{`Score: ${data.score}`}</p>
          {data.event && (
            <div className="mt-2 pt-2 border-t border-gray-700">
              <p className="text-sm text-purple-400">{data.event}</p>
            </div>
          )}
        </div>
      )
    }

    return null
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-2xl p-8 shadow-glow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Reputation History</h2>
                <p className="text-gray-300">Track how your reputation has changed over time</p>
              </div>

              <div className="flex space-x-2 mt-4 md:mt-0">
                <Button
                  variant={timeframe === "3m" ? "default" : "outline"}
                  onClick={() => setTimeframe("3m")}
                  className={
                    timeframe === "3m"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border-purple-500/30 hover:bg-purple-900/20"
                  }
                >
                  3M
                </Button>
                <Button
                  variant={timeframe === "6m" ? "default" : "outline"}
                  onClick={() => setTimeframe("6m")}
                  className={
                    timeframe === "6m"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border-purple-500/30 hover:bg-purple-900/20"
                  }
                >
                  6M
                </Button>
                <Button
                  variant={timeframe === "1y" ? "default" : "outline"}
                  onClick={() => setTimeframe("1y")}
                  className={
                    timeframe === "1y"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border-purple-500/30 hover:bg-purple-900/20"
                  }
                >
                  1Y
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/10 flex-1">
                <p className="text-sm text-gray-400 mb-1">Current Score</p>
                <p className="text-2xl font-bold">{filteredData[filteredData.length - 1].score}</p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/10 flex-1">
                <p className="text-sm text-gray-400 mb-1">Score Change</p>
                <p className={`text-2xl font-bold ${scoreChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {scoreChange >= 0 ? "+" : ""}
                  {scoreChange} pts
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/10 flex-1">
                <p className="text-sm text-gray-400 mb-1">Percentage Change</p>
                <p className={`text-2xl font-bold ${scoreChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {scoreChange >= 0 ? "+" : ""}
                  {scoreChangePercent}%
                </p>
              </div>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#4b5563" }} />
                  <YAxis domain={[350, 850]} tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#4b5563" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine
                    y={750}
                    stroke="#10b981"
                    strokeDasharray="3 3"
                    label={{ value: "Excellent", position: "right", fill: "#10b981" }}
                  />
                  <ReferenceLine
                    y={650}
                    stroke="#3b82f6"
                    strokeDasharray="3 3"
                    label={{ value: "Good", position: "right", fill: "#3b82f6" }}
                  />
                  <ReferenceLine
                    y={550}
                    stroke="#f59e0b"
                    strokeDasharray="3 3"
                    label={{ value: "Fair", position: "right", fill: "#f59e0b" }}
                  />
                  <ReferenceLine
                    y={450}
                    stroke="#f97316"
                    strokeDasharray="3 3"
                    label={{ value: "Needs Improvement", position: "right", fill: "#f97316" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="url(#colorScore)"
                    strokeWidth={3}
                    dot={{ fill: "#a855f7", stroke: "#a855f7", strokeWidth: 2, r: 4 }}
                    activeDot={{ fill: "#ec4899", stroke: "#ec4899", strokeWidth: 2, r: 6 }}
                  />
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Key Events</h3>
              <div className="space-y-3">
                {filteredData
                  .filter((item) => item.event)
                  .map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mt-1.5 mr-3"></div>
                      <div>
                        <p className="text-sm text-gray-300">
                          {item.month}: <span className="text-purple-400">{item.event}</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          Score impact: +
                          {item.event?.includes("KYC") ? "25" : item.event?.includes("copy") ? "15" : "20"} points
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
