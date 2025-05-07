"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronUp, ChevronDown, Star, Award, CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define trader data type
interface TraderData {
  id: string
  rank: number
  name: string
  avatar: string
  verified: boolean
  featured: boolean
  walletAddress: string
  roi: {
    daily: number
    weekly: number
    monthly: number
    yearly: number
  }
  winRate: number
  followers: number
  trades: number
  totalProfit: number
  riskLevel: "low" | "medium" | "high"
  tradingStyles: string[]
  performanceChart: number[]
  bio: string
}

// Generate realistic trader data
const generateTraders = (): TraderData[] => {
  const tradingStyles = ["spot", "futures", "options", "defi", "arbitrage", "swing", "scalping"]
  const riskLevels: ("low" | "medium" | "high")[] = ["low", "medium", "high"]

  const traders: TraderData[] = []

  for (let i = 1; i <= 20; i++) {
    // Generate realistic ROI values based on risk level
    const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)]
    let roiMultiplier = 1

    if (riskLevel === "low") roiMultiplier = 0.7
    if (riskLevel === "medium") roiMultiplier = 1
    if (riskLevel === "high") roiMultiplier = 1.5

    // Generate random performance chart data
    const performanceChart = Array(30)
      .fill(0)
      .map(() => {
        return Math.random() * 10 * roiMultiplier - (riskLevel === "high" ? 3 : 1)
      })

    // Calculate cumulative performance
    let cumulativePerformance = 100
    const finalPerformanceChart = performanceChart.map((daily) => {
      cumulativePerformance *= 1 + daily / 100
      return cumulativePerformance
    })

    // Select 1-3 random trading styles
    const numStyles = Math.floor(Math.random() * 3) + 1
    const selectedStyles = []
    for (let j = 0; j < numStyles; j++) {
      const style = tradingStyles[Math.floor(Math.random() * tradingStyles.length)]
      if (!selectedStyles.includes(style)) {
        selectedStyles.push(style)
      }
    }

    // Generate realistic win rate based on risk level
    let winRate = 0
    if (riskLevel === "low") winRate = 65 + Math.random() * 20
    if (riskLevel === "medium") winRate = 55 + Math.random() * 25
    if (riskLevel === "high") winRate = 45 + Math.random() * 30

    // Generate followers count (more successful traders have more followers)
    const monthlyROI = (Math.random() * 15 + 5) * roiMultiplier
    const followersBase = monthlyROI * 100
    const followers = Math.floor(followersBase * (0.8 + Math.random() * 0.4))

    // Generate total profit
    const totalProfit = Math.floor(monthlyROI * 10000 * (0.7 + Math.random() * 0.6))

    // Generate number of trades
    const trades = Math.floor(
      (Math.random() * 500 + 100) * (riskLevel === "high" ? 1.5 : riskLevel === "medium" ? 1 : 0.7),
    )

    // Create trader object
    traders.push({
      id: `trader-${i}`,
      rank: i,
      name: `Trader${i}`,
      avatar:
        i <= 5
          ? `/crypto-trader-avatar-${i}.png`
          : `/placeholder.svg?height=100&width=100&query=crypto trader avatar ${i}`,
      verified: Math.random() > 0.3,
      featured: Math.random() > 0.8,
      walletAddress: `0x${Math.random().toString(16).substring(2, 14)}...${Math.random().toString(16).substring(2, 6)}`,
      roi: {
        daily: Math.random() * 1.5 * roiMultiplier,
        weekly: (Math.random() * 7 + 1) * roiMultiplier,
        monthly: monthlyROI,
        yearly: (Math.random() * 120 + 30) * roiMultiplier,
      },
      winRate,
      followers,
      trades,
      totalProfit,
      riskLevel,
      tradingStyles: selectedStyles,
      performanceChart: finalPerformanceChart,
      bio: `Professional crypto trader specializing in ${selectedStyles.join(", ")}. ${
        riskLevel === "low"
          ? "Focused on consistent gains with minimal risk."
          : riskLevel === "medium"
            ? "Balanced approach to risk and reward."
            : "High-risk strategies for maximum returns."
      }`,
    })
  }

  // Sort by monthly ROI by default
  return traders.sort((a, b) => b.roi.monthly - a.roi.monthly)
}

export default function LeaderboardTable() {
  const [traders, setTraders] = useState<TraderData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortColumn, setSortColumn] = useState("roi")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedTrader, setSelectedTrader] = useState<TraderData | null>(null)
  const [copyAmount, setCopyAmount] = useState("1000")
  const [isFollowing, setIsFollowing] = useState<Record<string, boolean>>({})
  const [copiedTraders, setCopiedTraders] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const data = generateTraders()
      setTraders(data)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const sortedTraders = [...traders].sort((a, b) => {
    let valueA, valueB

    switch (sortColumn) {
      case "roi":
        valueA = a.roi.monthly
        valueB = b.roi.monthly
        break

      case "winRate":
        valueA = a.winRate
        valueB = b.winRate
        break

      case "followers":
        valueA = a.followers
        valueB = b.followers
        break

      case "trades":
        valueA = a.trades
        valueB = b.trades
        break

      case "profit":
        valueA = a.totalProfit
        valueB = b.totalProfit
        break

      default:
        valueA = a.roi.monthly
        valueB = b.roi.monthly
    }

    return sortDirection === "asc" ? valueA - valueB : valueB - valueA
  })

  const toggleFollow = (traderId: string) => {
    setIsFollowing((prev) => ({
      ...prev,
      [traderId]: !prev[traderId],
    }))
  }

  const handleCopyTrader = (trader: TraderData) => {
    setCopiedTraders((prev) => ({
      ...prev,
      [trader.id]: true,
    }))
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  if (isLoading) {
    return (
      <div className="rounded-xl bg-gray-800/30 p-6 backdrop-blur-sm">
        <div className="flex animate-pulse flex-col space-y-4">
          <div className="h-10 w-full rounded bg-gray-700"></div>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-16 w-full rounded bg-gray-700"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl bg-gray-800/30 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700 bg-gray-800/50 text-left text-sm font-medium text-gray-400">
              <th className="whitespace-nowrap px-4 py-3 text-center">#</th>
              <th className="whitespace-nowrap px-4 py-3">Trader</th>
              <th className="cursor-pointer whitespace-nowrap px-4 py-3" onClick={() => handleSort("roi")}>
                <div className="flex items-center">
                  <span>Monthly ROI</span>
                  {sortColumn === "roi" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </th>
              <th className="cursor-pointer whitespace-nowrap px-4 py-3" onClick={() => handleSort("winRate")}>
                <div className="flex items-center">
                  <span>Win Rate</span>
                  {sortColumn === "winRate" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </th>
              <th className="cursor-pointer whitespace-nowrap px-4 py-3" onClick={() => handleSort("followers")}>
                <div className="flex items-center">
                  <span>Followers</span>
                  {sortColumn === "followers" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </th>
              <th className="cursor-pointer whitespace-nowrap px-4 py-3" onClick={() => handleSort("trades")}>
                <div className="flex items-center">
                  <span>Trades</span>
                  {sortColumn === "trades" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </th>
              <th className="cursor-pointer whitespace-nowrap px-4 py-3" onClick={() => handleSort("profit")}>
                <div className="flex items-center">
                  <span>Total Profit</span>
                  {sortColumn === "profit" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </th>
              <th className="whitespace-nowrap px-4 py-3">Risk</th>
              <th className="whitespace-nowrap px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTraders.map((trader, index) => (
              <motion.tr
                key={trader.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-gray-700 text-sm text-white hover:bg-gray-700/30"
              >
                <td className="px-4 py-4 text-center font-bold">
                  {trader.rank <= 3 ? (
                    <div className="flex justify-center">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${
                          trader.rank === 1 ? "bg-yellow-500" : trader.rank === 2 ? "bg-gray-400" : "bg-amber-700"
                        }`}
                      >
                        {trader.rank}
                      </div>
                    </div>
                  ) : (
                    trader.rank
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={trader.avatar || "/placeholder.svg"}
                        alt={trader.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <span className="font-medium">{trader.name}</span>
                        {trader.verified && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <CheckCircle className="ml-1 h-4 w-4 text-blue-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Verified Trader</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        {trader.featured && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Award className="ml-1 h-4 w-4 text-purple-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Featured Trader</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">{trader.walletAddress}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className={`font-bold ${trader.roi.monthly >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {formatPercentage(trader.roi.monthly)}
                  </div>
                  <div className="text-xs text-gray-400">{formatPercentage(trader.roi.weekly)} weekly</div>
                </td>
                <td className="px-4 py-4">
                  <div className="font-medium">{trader.winRate.toFixed(1)}%</div>
                </td>
                <td className="px-4 py-4">
                  <div className="font-medium">{formatNumber(trader.followers)}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="font-medium">{formatNumber(trader.trades)}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="font-medium">{formatCurrency(trader.totalProfit)}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <div className={`mr-2 h-3 w-3 rounded-full ${getRiskColor(trader.riskLevel)}`}></div>
                    <span className="capitalize">{trader.riskLevel}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${isFollowing[trader.id] ? "text-yellow-400" : "text-gray-400"} hover:text-yellow-400`}
                      onClick={() => toggleFollow(trader.id)}
                    >
                      <Star className="h-4 w-4" fill={isFollowing[trader.id] ? "currentColor" : "none"} />
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-purple-500 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
                          onClick={() => setSelectedTrader(trader)}
                        >
                          Copy
                        </Button>
                      </DialogTrigger>
                      {selectedTrader && (
                        <DialogContent className="border-gray-700 bg-gray-800 text-white sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Copy Trader: {selectedTrader.name}</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Set up automatic copying of this trader's positions.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="mt-4 grid gap-4">
                            <div className="flex items-center gap-4">
                              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                                <Image
                                  src={selectedTrader.avatar || "/placeholder.svg"}
                                  alt={selectedTrader.name}
                                  width={64}
                                  height={64}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <h3 className="text-lg font-bold">{selectedTrader.name}</h3>
                                  {selectedTrader.verified && <CheckCircle className="ml-1 h-4 w-4 text-blue-400" />}
                                </div>
                                <p className="text-sm text-gray-400">{selectedTrader.bio}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 rounded-lg bg-gray-700/50 p-3">
                              <div>
                                <div className="text-sm text-gray-400">Monthly ROI</div>
                                <div
                                  className={`text-lg font-bold ${selectedTrader.roi.monthly >= 0 ? "text-green-400" : "text-red-400"}`}
                                >
                                  {formatPercentage(selectedTrader.roi.monthly)}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-400">Win Rate</div>
                                <div className="text-lg font-bold">{selectedTrader.winRate.toFixed(1)}%</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-400">Risk Level</div>
                                <div className="flex items-center text-lg font-bold">
                                  <div
                                    className={`mr-2 h-3 w-3 rounded-full ${getRiskColor(selectedTrader.riskLevel)}`}
                                  ></div>
                                  <span className="capitalize">{selectedTrader.riskLevel}</span>
                                </div>
                              </div>
                            </div>

                            <Tabs defaultValue="allocation">
                              <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                                <TabsTrigger value="allocation">Allocation</TabsTrigger>
                                <TabsTrigger value="settings">Settings</TabsTrigger>
                              </TabsList>
                              <TabsContent value="allocation" className="mt-4">
                                <div className="space-y-4">
                                  <div>
                                    <label className="mb-2 block text-sm font-medium">Copy Amount (USD)</label>
                                    <Input
                                      type="text"
                                      value={copyAmount}
                                      onChange={(e) => setCopyAmount(e.target.value)}
                                      className="border-gray-700 bg-gray-700 text-white"
                                    />
                                  </div>

                                  <div>
                                    <label className="mb-2 block text-sm font-medium">Estimated Monthly Return</label>
                                    <div className="text-xl font-bold text-green-400">
                                      {formatCurrency(
                                        (Number.parseFloat(copyAmount) * selectedTrader.roi.monthly) / 100,
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-400">
                                      Based on {formatPercentage(selectedTrader.roi.monthly)} monthly ROI
                                    </p>
                                  </div>
                                </div>
                              </TabsContent>
                              <TabsContent value="settings" className="mt-4">
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="font-medium">Copy All Trades</div>
                                      <div className="text-sm text-gray-400">Copy every trade this trader makes</div>
                                    </div>
                                    <div className="relative h-6 w-12 cursor-pointer rounded-full bg-gray-600">
                                      <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white"></div>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="font-medium">Proportional Copying</div>
                                      <div className="text-sm text-gray-400">Match position sizes proportionally</div>
                                    </div>
                                    <div className="relative h-6 w-12 cursor-pointer rounded-full bg-purple-600">
                                      <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"></div>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="font-medium">Stop Loss Protection</div>
                                      <div className="text-sm text-gray-400">Set automatic stop losses</div>
                                    </div>
                                    <div className="relative h-6 w-12 cursor-pointer rounded-full bg-purple-600">
                                      <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"></div>
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </div>

                          <DialogFooter className="mt-6">
                            <Button variant="ghost" onClick={() => setSelectedTrader(null)}>
                              Cancel
                            </Button>
                            <Button
                              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                              onClick={() => {
                                handleCopyTrader(selectedTrader)
                                setSelectedTrader(null)
                              }}
                            >
                              Start Copying
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      )}
                    </Dialog>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <div className="space-y-2 p-1">
                            <p className="font-medium">{trader.name}</p>
                            <p className="text-xs">{trader.bio}</p>
                            <div className="flex flex-wrap gap-1">
                              {trader.tradingStyles.map((style) => (
                                <Badge key={style} variant="outline" className="border-gray-600 bg-gray-700/50">
                                  {style}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-gray-700 bg-gray-800/50 px-4 py-3">
        <div className="text-sm text-gray-400">
          Showing <span className="font-medium text-white">20</span> of{" "}
          <span className="font-medium text-white">100</span> traders
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700">
            Previous
          </Button>
          <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
