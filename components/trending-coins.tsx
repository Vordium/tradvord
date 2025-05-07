"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUp, ArrowDown, AlertTriangle, TrendingUp, Flame, BarChart3 } from "lucide-react"
import { fetchTrendingCoins, formatCurrency, formatPercentage } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TrendingCoins() {
  const [trendingCoins, setTrendingCoins] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)
  const [activeTab, setActiveTab] = useState("market-cap")

  // Update the useEffect hook to handle errors better and add retry logic
  useEffect(() => {
    let isMounted = true
    let retryCount = 0
    const maxRetries = 2

    const fetchData = async () => {
      try {
        if (retryCount > 0) {
          console.log(`Retrying fetch (${retryCount}/${maxRetries})...`)
        }

        setLoading(true)
        const data = await fetchTrendingCoins()

        if (isMounted) {
          // Take only the first 5 coins for display
          const topFiveCoins = data.slice(0, 5)
          setTrendingCoins(topFiveCoins)
          setLoading(false)
          setError(null) // Clear any previous errors

          // Check if we're using fallback data
          setUsingFallback(data[0]?.id === "bitcoin" && data.length >= 5)

          retryCount = 0 // Reset retry count on success
        }
      } catch (err) {
        console.error("Error in trending component:", err)

        if (isMounted) {
          if (retryCount < maxRetries) {
            // Retry with exponential backoff
            retryCount++
            const backoffTime = 1000 * Math.pow(2, retryCount)
            console.log(`Will retry in ${backoffTime}ms`)
            setTimeout(fetchData, backoffTime)
          } else {
            setError("Failed to load live data. Using fallback data.")
            setUsingFallback(true)
            setLoading(false)
          }
        }
      }
    }

    fetchData()

    // Refresh data every 60 seconds (increased from 30 to reduce API calls)
    const intervalId = setInterval(fetchData, 60000)

    return () => {
      isMounted = false
      clearInterval(intervalId)
    }
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Social sentiment data (simulated)
  const socialSentiment = [
    { positive: 78, neutral: 15, negative: 7 },
    { positive: 65, neutral: 20, negative: 15 },
    { positive: 82, neutral: 10, negative: 8 },
    { positive: 58, neutral: 27, negative: 15 },
    { positive: 72, neutral: 18, negative: 10 },
  ]

  // Volume change data (simulated)
  const volumeChange = [42, -15, 87, 23, -8]

  // Social mentions data (simulated)
  const socialMentions = [
    { twitter: 12500, reddit: 8700, telegram: 5600 },
    { twitter: 8900, reddit: 4300, telegram: 3200 },
    { twitter: 15600, reddit: 9800, telegram: 7400 },
    { twitter: 7200, reddit: 3500, telegram: 2800 },
    { twitter: 10800, reddit: 6200, telegram: 4100 },
  ]

  return (
    <section className="py-12 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <Flame className="h-5 w-5 mr-2 text-orange-500" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Top Trending Cryptocurrencies
                </span>
              </h2>
              <p className="text-gray-400">Real-time data for the hottest cryptocurrencies right now</p>
            </div>

            {usingFallback && (
              <div className="flex items-center text-amber-400 text-sm bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-800/50">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span>Using demo data</span>
              </div>
            )}
          </div>
        </motion.div>

        <Tabs defaultValue="market-cap" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-black/60 border border-purple-500/20">
            <TabsTrigger value="market-cap" className="data-[state=active]:bg-purple-900/30">
              <BarChart3 className="h-4 w-4 mr-2" />
              Market Cap
            </TabsTrigger>
            <TabsTrigger value="social-sentiment" className="data-[state=active]:bg-purple-900/30">
              <TrendingUp className="h-4 w-4 mr-2" />
              Social Sentiment
            </TabsTrigger>
            <TabsTrigger value="volume" className="data-[state=active]:bg-purple-900/30">
              <BarChart3 className="h-4 w-4 mr-2" />
              Volume Change
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {error && (
          <div className="mb-6 text-center text-amber-400 p-4 bg-amber-950/30 rounded-xl border border-amber-800/30">
            {error}
          </div>
        )}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {loading
            ? Array(5)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl blur-sm"></div>
                    <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <Skeleton className="w-8 h-8 rounded-full mr-3" />
                          <div>
                            <Skeleton className="h-4 w-20 mb-1" />
                            <Skeleton className="h-3 w-12" />
                          </div>
                        </div>
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <Skeleton className="h-6 w-24 mb-1" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-10 w-24" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Skeleton className="h-3 w-16 mb-1" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                        <div>
                          <Skeleton className="h-3 w-16 mb-1" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            : trendingCoins.map((coin, index) => {
                const isPositive = coin.price_change_percentage_24h >= 0

                return (
                  <motion.div key={coin.id || index} variants={item} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                    <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-purple-500/40 group-hover:translate-y-[-5px] shadow-glow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full mr-3 overflow-hidden bg-purple-900/30">
                            <img
                              src={coin.image || `/placeholder.svg?height=32&width=32&query=${coin.symbol || "crypto"}`}
                              alt={coin.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = `/placeholder.svg?height=32&width=32&query=${coin.symbol || "crypto"}`
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-bold">{coin.name}</h3>
                            <span className="text-sm text-gray-400">{coin.symbol?.toUpperCase()}</span>
                          </div>
                        </div>
                        <div className="bg-purple-900/30 text-purple-400 text-xs px-2 py-1 rounded-full border border-purple-500/30">
                          #{coin.market_cap_rank || index + 1}
                        </div>
                      </div>

                      {activeTab === "market-cap" && (
                        <>
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <div className="text-xl font-bold">{formatCurrency(coin.current_price)}</div>
                              <div
                                className={`flex items-center text-sm ${
                                  isPositive ? "text-green-400" : "text-red-400"
                                }`}
                              >
                                {isPositive ? (
                                  <ArrowUp className="h-3 w-3 mr-1" />
                                ) : (
                                  <ArrowDown className="h-3 w-3 mr-1" />
                                )}
                                {formatPercentage(coin.price_change_percentage_24h)}
                              </div>
                            </div>

                            <div className="h-10 w-24">
                              {coin.sparkline_in_7d?.price ? (
                                <svg viewBox="0 0 100 30" className="w-full h-full">
                                  <defs>
                                    <linearGradient id={`gradient-trending-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                      <stop offset="0%" stopColor={isPositive ? "#9333ea" : "#ef4444"} />
                                      <stop offset="100%" stopColor={isPositive ? "#ec4899" : "#f43f5e"} />
                                    </linearGradient>
                                  </defs>
                                  {/* Create sparkline from price data */}
                                  {(() => {
                                    const prices = coin.sparkline_in_7d.price
                                    if (!prices || prices.length === 0) return null

                                    // Sample the prices to get ~10 points
                                    const sampleRate = Math.max(1, Math.floor(prices.length / 10))
                                    const sampledPrices = prices.filter((_, i) => i % sampleRate === 0)

                                    // Find min and max for scaling
                                    const min = Math.min(...sampledPrices)
                                    const max = Math.max(...sampledPrices)
                                    const range = max - min

                                    // Scale to fit in the 30px height
                                    const scaled = sampledPrices.map((p) => 30 - ((p - min) / (range || 1)) * 25)

                                    // Create path
                                    const points = scaled
                                      .map((y, i) => {
                                        const x = (i / (sampledPrices.length - 1)) * 100
                                        return `${i === 0 ? "M" : "L"} ${x},${y}`
                                      })
                                      .join(" ")

                                    return (
                                      <path
                                        d={points}
                                        fill="none"
                                        stroke={`url(#gradient-trending-${index})`}
                                        strokeWidth="2"
                                      />
                                    )
                                  })()}
                                </svg>
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-gray-500 text-xs">
                                  No data
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <div className="text-gray-400">Volume 24h</div>
                              <div>{formatCurrency(coin.total_volume, "USD", true)}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Market Cap</div>
                              <div>{formatCurrency(coin.market_cap, "USD", true)}</div>
                            </div>
                          </div>
                        </>
                      )}

                      {activeTab === "social-sentiment" && (
                        <>
                          <div className="mb-4">
                            <div className="text-gray-400 text-sm mb-1">Social Sentiment</div>
                            <div className="flex h-6 rounded-full overflow-hidden bg-gray-800">
                              <div
                                className="bg-green-500"
                                style={{ width: `${socialSentiment[index]?.positive || 70}%` }}
                              ></div>
                              <div
                                className="bg-gray-500"
                                style={{ width: `${socialSentiment[index]?.neutral || 20}%` }}
                              ></div>
                              <div
                                className="bg-red-500"
                                style={{ width: `${socialSentiment[index]?.negative || 10}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs mt-1">
                              <div className="text-green-400">{socialSentiment[index]?.positive || 70}% Positive</div>
                              <div className="text-red-400">{socialSentiment[index]?.negative || 10}% Negative</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="text-center">
                              <div className="text-gray-400 text-xs">Twitter</div>
                              <div className="font-medium">
                                {(socialMentions[index]?.twitter || 10000).toLocaleString()}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-gray-400 text-xs">Reddit</div>
                              <div className="font-medium">
                                {(socialMentions[index]?.reddit || 5000).toLocaleString()}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-gray-400 text-xs">Telegram</div>
                              <div className="font-medium">
                                {(socialMentions[index]?.telegram || 3000).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {activeTab === "volume" && (
                        <>
                          <div className="mb-4">
                            <div className="text-gray-400 text-sm mb-1">24h Volume Change</div>
                            <div className="flex items-center">
                              <div
                                className={`text-xl font-bold ${
                                  (volumeChange[index] || 0) >= 0 ? "text-green-400" : "text-red-400"
                                }`}
                              >
                                {(volumeChange[index] || 0) >= 0 ? "+" : ""}
                                {volumeChange[index] || 0}%
                              </div>
                              {(volumeChange[index] || 0) >= 0 ? (
                                <ArrowUp className="h-5 w-5 ml-1 text-green-400" />
                              ) : (
                                <ArrowDown className="h-5 w-5 ml-1 text-red-400" />
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <div className="text-gray-400">Current Volume</div>
                              <div>{formatCurrency(coin.total_volume, "USD", true)}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Avg 7d Volume</div>
                              <div>
                                {formatCurrency(
                                  coin.total_volume * (1 - (volumeChange[index] || 0) / 100),
                                  "USD",
                                  true,
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )
              })}
        </motion.div>
      </div>
    </section>
  )
}
