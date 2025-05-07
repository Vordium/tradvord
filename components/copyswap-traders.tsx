"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Filter, Star, TrendingUp, Users, Search, X, Check } from "lucide-react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

// Trader data
const allTraders = [
  {
    id: 1,
    name: "CryptoWhale",
    avatar: "/trader1.jpg",
    verified: true,
    followers: 12453,
    roi: {
      "30d": 28.4,
      "90d": 67.2,
      allTime: 312.5,
    },
    winRate: 78,
    riskScore: "Medium",
    riskLevel: 3,
    trades: 342,
    avgHoldTime: "4.2 days",
    bio: "DeFi specialist focusing on mid-cap gems with strong fundamentals",
    tags: ["DeFi", "Mid-Cap", "Fundamentals"],
    trending: true,
  },
  {
    id: 2,
    name: "AlphaSeeker",
    avatar: "/trader2.jpg",
    verified: true,
    followers: 8721,
    roi: {
      "30d": 32.1,
      "90d": 54.8,
      allTime: 287.3,
    },
    winRate: 72,
    riskScore: "High",
    riskLevel: 4,
    trades: 521,
    avgHoldTime: "1.8 days",
    bio: "Momentum trader specializing in breakouts and trend following",
    tags: ["Momentum", "Breakouts", "Technical"],
    trending: false,
  },
  {
    id: 3,
    name: "TokenSage",
    avatar: "/sarah.jpg",
    verified: true,
    followers: 15832,
    roi: {
      "30d": 18.7,
      "90d": 72.5,
      allTime: 425.8,
    },
    winRate: 81,
    riskScore: "Low",
    riskLevel: 2,
    trades: 187,
    avgHoldTime: "12.5 days",
    bio: "Long-term investor focusing on layer-1 protocols and infrastructure",
    tags: ["Layer-1", "Infrastructure", "Long-term"],
    trending: true,
  },
  {
    id: 4,
    name: "NFTHunter",
    avatar: "/trader1.jpg",
    verified: false,
    followers: 6543,
    roi: {
      "30d": 41.2,
      "90d": 83.6,
      allTime: 356.9,
    },
    winRate: 68,
    riskScore: "Very High",
    riskLevel: 5,
    trades: 412,
    avgHoldTime: "3.1 days",
    bio: "NFT and gaming token specialist with focus on metaverse projects",
    tags: ["NFT", "Gaming", "Metaverse"],
    trending: true,
  },
  {
    id: 5,
    name: "StableFarmer",
    avatar: "/trader2.jpg",
    verified: true,
    followers: 9876,
    roi: {
      "30d": 12.3,
      "90d": 38.7,
      allTime: 186.2,
    },
    winRate: 92,
    riskScore: "Very Low",
    riskLevel: 1,
    trades: 156,
    avgHoldTime: "18.3 days",
    bio: "Yield farming expert focusing on stablecoins and low-risk strategies",
    tags: ["Yield", "Stablecoins", "Low-risk"],
    trending: false,
  },
  {
    id: 6,
    name: "MoonShooter",
    avatar: "/sarah.jpg",
    verified: false,
    followers: 7654,
    roi: {
      "30d": 52.8,
      "90d": 124.5,
      allTime: 478.2,
    },
    winRate: 62,
    riskScore: "Very High",
    riskLevel: 5,
    trades: 287,
    avgHoldTime: "1.2 days",
    bio: "High-risk trader focusing on new token launches and micro-caps",
    tags: ["Micro-Cap", "New Launches", "High-Risk"],
    trending: true,
  },
  {
    id: 7,
    name: "ChartMaster",
    avatar: "/trader1.jpg",
    verified: true,
    followers: 11234,
    roi: {
      "30d": 22.6,
      "90d": 58.3,
      allTime: 276.5,
    },
    winRate: 84,
    riskScore: "Medium",
    riskLevel: 3,
    trades: 423,
    avgHoldTime: "3.7 days",
    bio: "Technical analyst specializing in chart patterns and indicators",
    tags: ["Technical", "Chart Patterns", "Indicators"],
    trending: false,
  },
]

// Risk level colors
const getRiskColor = (level: number) => {
  switch (level) {
    case 1:
      return "text-green-400 bg-green-900/20 border-green-500/30"
    case 2:
      return "text-blue-400 bg-blue-900/20 border-blue-500/30"
    case 3:
      return "text-yellow-400 bg-yellow-900/20 border-yellow-500/30"
    case 4:
      return "text-orange-400 bg-orange-900/20 border-orange-500/30"
    case 5:
      return "text-red-400 bg-red-900/20 border-red-500/30"
    default:
      return "text-gray-400 bg-gray-900/20 border-gray-500/30"
  }
}

type SortOption = "roi30d" | "roi90d" | "roiAllTime" | "winRate" | "followers" | "trades"

export default function CopyswapTraders() {
  const [traders, setTraders] = useState(allTraders)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("roi30d")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filterRisk, setFilterRisk] = useState<number[]>([1, 2, 3, 4, 5])
  const [filterTags, setFilterTags] = useState<string[]>([])
  const [filterVerified, setFilterVerified] = useState<boolean | null>(null)
  const [filterTrending, setFilterTrending] = useState<boolean | null>(null)
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [copiedTraders, setCopiedTraders] = useState<number[]>([])
  const [watchlist, setWatchlist] = useState<number[]>([])
  const [showCopyDialog, setShowCopyDialog] = useState(false)
  const [selectedTrader, setSelectedTrader] = useState<any>(null)
  const [allocationAmount, setAllocationAmount] = useState("1000")
  const [maxRiskPerTrade, setMaxRiskPerTrade] = useState("10")

  // Get all unique tags from traders
  const allTags = Array.from(new Set(allTraders.flatMap((trader) => trader.tags)))

  // Apply filters and sorting
  useEffect(() => {
    let filteredTraders = [...allTraders]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredTraders = filteredTraders.filter(
        (trader) =>
          trader.name.toLowerCase().includes(query) ||
          trader.bio.toLowerCase().includes(query) ||
          trader.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Apply risk filter
    if (filterRisk.length > 0) {
      filteredTraders = filteredTraders.filter((trader) => filterRisk.includes(trader.riskLevel))
    }

    // Apply tags filter
    if (filterTags.length > 0) {
      filteredTraders = filteredTraders.filter((trader) => trader.tags.some((tag) => filterTags.includes(tag)))
    }

    // Apply verified filter
    if (filterVerified !== null) {
      filteredTraders = filteredTraders.filter((trader) => trader.verified === filterVerified)
    }

    // Apply trending filter
    if (filterTrending !== null) {
      filteredTraders = filteredTraders.filter((trader) => trader.trending === filterTrending)
    }

    // Apply sorting
    filteredTraders.sort((a, b) => {
      let valueA, valueB

      switch (sortBy) {
        case "roi30d":
          valueA = a.roi["30d"]
          valueB = b.roi["30d"]
          break
        case "roi90d":
          valueA = a.roi["90d"]
          valueB = b.roi["90d"]
          break
        case "roiAllTime":
          valueA = a.roi.allTime
          valueB = b.roi.allTime
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
        default:
          valueA = a.roi["30d"]
          valueB = b.roi["30d"]
      }

      return sortOrder === "asc" ? valueA - valueB : valueB - valueA
    })

    setTraders(filteredTraders)
  }, [searchQuery, sortBy, sortOrder, filterRisk, filterTags, filterVerified, filterTrending])

  const getSortLabel = () => {
    switch (sortBy) {
      case "roi30d":
        return "ROI (30d)"
      case "roi90d":
        return "ROI (90d)"
      case "roiAllTime":
        return "ROI (All Time)"
      case "winRate":
        return "Win Rate"
      case "followers":
        return "Followers"
      case "trades":
        return "Trades"
      default:
        return "ROI (30d)"
    }
  }

  const handleCopyTrader = (trader: any) => {
    setSelectedTrader(trader)
    setShowCopyDialog(true)
  }

  const confirmCopyTrader = () => {
    if (!selectedTrader) return

    // Add trader to copied list if not already there
    if (!copiedTraders.includes(selectedTrader.id)) {
      setCopiedTraders([...copiedTraders, selectedTrader.id])

      toast({
        title: "Trader Copied Successfully",
        description: `You are now copying ${selectedTrader.name} with $${allocationAmount} allocation.`,
      })
    }

    setShowCopyDialog(false)
  }

  const toggleWatchlist = (traderId: number) => {
    if (watchlist.includes(traderId)) {
      setWatchlist(watchlist.filter((id) => id !== traderId))
      toast({
        title: "Removed from Watchlist",
        description: "Trader has been removed from your watchlist.",
      })
    } else {
      setWatchlist([...watchlist, traderId])
      toast({
        title: "Added to Watchlist",
        description: "Trader has been added to your watchlist.",
      })
    }
  }

  const resetFilters = () => {
    setSearchQuery("")
    setFilterRisk([1, 2, 3, 4, 5])
    setFilterTags([])
    setFilterVerified(null)
    setFilterTrending(null)
    setShowFilterDialog(false)
  }

  const applyFilters = () => {
    setShowFilterDialog(false)
    toast({
      title: "Filters Applied",
      description: "Your filter settings have been applied.",
    })
  }

  return (
    <section id="traders-section" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Top Traders</h2>
            <p className="text-gray-400">Copy the best-performing traders on the platform</p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-4 md:mt-0 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search traders..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center w-full md:w-auto"
              onClick={() => setShowFilterDialog(true)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center w-full md:w-auto">
                  Sort by: {getSortLabel()}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={() => setSortBy("roi30d")}>
                  ROI (30d)
                  {sortBy === "roi30d" && <Check className="h-4 w-4 ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("roi90d")}>
                  ROI (90d)
                  {sortBy === "roi90d" && <Check className="h-4 w-4 ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("roiAllTime")}>
                  ROI (All Time)
                  {sortBy === "roiAllTime" && <Check className="h-4 w-4 ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("winRate")}>
                  Win Rate
                  {sortBy === "winRate" && <Check className="h-4 w-4 ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("followers")}>
                  Followers
                  {sortBy === "followers" && <Check className="h-4 w-4 ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("trades")}>
                  Trades
                  {sortBy === "trades" && <Check className="h-4 w-4 ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                  {sortOrder === "desc" ? "Descending ↓" : "Ascending ↑"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {traders.length === 0 ? (
          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <Search className="h-12 w-12 text-gray-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No traders found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {traders.map((trader) => (
              <div
                key={trader.id}
                className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="relative">
                      <Image
                        src={trader.avatar || "/placeholder.svg"}
                        alt={trader.name}
                        width={64}
                        height={64}
                        className="rounded-full border-2 border-purple-500/50"
                      />
                      {trader.trending && (
                        <div className="absolute -top-2 -right-2 bg-pink-600 rounded-full p-1">
                          <TrendingUp className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="ml-4">
                      <div className="flex items-center">
                        <h3 className="text-xl font-bold text-white">{trader.name}</h3>
                        {trader.verified && (
                          <div className="ml-2 bg-blue-500 rounded-full p-0.5" title="Verified Trader">
                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{trader.bio}</p>
                      <div className="flex items-center mt-2">
                        <div className="flex items-center text-gray-400 text-xs mr-4">
                          <Users className="h-3 w-3 mr-1" />
                          {trader.followers.toLocaleString()} followers
                        </div>
                        <div className="flex items-center text-gray-400 text-xs">
                          <div className={`px-2 py-0.5 rounded-full border ${getRiskColor(trader.riskLevel)}`}>
                            {trader.riskScore} Risk
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto mt-4 md:mt-0 md:ml-8">
                    <div className="bg-black/30 rounded-lg p-3 border border-gray-800">
                      <p className="text-xs text-gray-500 mb-1">30d ROI</p>
                      <p className={`text-lg font-bold ${trader.roi["30d"] >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {trader.roi["30d"] >= 0 ? "+" : ""}
                        {trader.roi["30d"]}%
                      </p>
                    </div>

                    <div className="bg-black/30 rounded-lg p-3 border border-gray-800">
                      <p className="text-xs text-gray-500 mb-1">Win Rate</p>
                      <p className="text-lg font-bold text-white">{trader.winRate}%</p>
                    </div>

                    <div className="bg-black/30 rounded-lg p-3 border border-gray-800">
                      <p className="text-xs text-gray-500 mb-1">Trades</p>
                      <p className="text-lg font-bold text-white">{trader.trades}</p>
                    </div>

                    <div className="bg-black/30 rounded-lg p-3 border border-gray-800">
                      <p className="text-xs text-gray-500 mb-1">Avg Hold</p>
                      <p className="text-lg font-bold text-white">{trader.avgHoldTime}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center ml-0 md:ml-6 mt-4 md:mt-0 w-full md:w-auto">
                    <Button
                      className={`w-full md:w-auto mb-2 ${copiedTraders.includes(trader.id) ? "bg-green-600 hover:bg-green-700" : ""}`}
                      onClick={() => handleCopyTrader(trader)}
                    >
                      {copiedTraders.includes(trader.id) ? "Copying" : "Copy Trader"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full md:w-auto"
                      onClick={() => toggleWatchlist(trader.id)}
                    >
                      <Star
                        className={`h-4 w-4 mr-2 ${watchlist.includes(trader.id) ? "text-yellow-400 fill-yellow-400" : ""}`}
                      />
                      {watchlist.includes(trader.id) ? "Watchlisted" : "Add to Watchlist"}
                    </Button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {trader.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-purple-900/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {traders.length > 0 && traders.length < allTraders.length && (
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
              <X className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {traders.length === allTraders.length && (
          <div className="mt-8 text-center">
            <Button variant="outline">
              Load More Traders
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Filter Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filter Traders</DialogTitle>
            <DialogDescription>Customize your trader search with these filters.</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <h4 className="text-sm font-medium mb-3">Risk Level</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { level: 1, label: "Very Low" },
                  { level: 2, label: "Low" },
                  { level: 3, label: "Medium" },
                  { level: 4, label: "High" },
                  { level: 5, label: "Very High" },
                ].map((risk) => (
                  <Badge
                    key={risk.level}
                    variant={filterRisk.includes(risk.level) ? "default" : "outline"}
                    className={`cursor-pointer ${filterRisk.includes(risk.level) ? "bg-purple-600" : "bg-black/40"}`}
                    onClick={() => {
                      if (filterRisk.includes(risk.level)) {
                        setFilterRisk(filterRisk.filter((r) => r !== risk.level))
                      } else {
                        setFilterRisk([...filterRisk, risk.level])
                      }
                    }}
                  >
                    {risk.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Trading Style</h4>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={filterTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer ${filterTags.includes(tag) ? "bg-purple-600" : "bg-black/40"}`}
                    onClick={() => {
                      if (filterTags.includes(tag)) {
                        setFilterTags(filterTags.filter((t) => t !== tag))
                      } else {
                        setFilterTags([...filterTags, tag])
                      }
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Trader Status</h4>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={filterVerified === true ? "default" : "outline"}
                  className={`cursor-pointer ${filterVerified === true ? "bg-purple-600" : "bg-black/40"}`}
                  onClick={() => setFilterVerified(filterVerified === true ? null : true)}
                >
                  Verified Only
                </Badge>
                <Badge
                  variant={filterTrending === true ? "default" : "outline"}
                  className={`cursor-pointer ${filterTrending === true ? "bg-purple-600" : "bg-black/40"}`}
                  onClick={() => setFilterTrending(filterTrending === true ? null : true)}
                >
                  Trending Only
                </Badge>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
            <Button variant="outline" onClick={resetFilters}>
              Reset
            </Button>
            <Button onClick={applyFilters}>Apply Filters</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Copy Trader Dialog */}
      <Dialog open={showCopyDialog} onOpenChange={setShowCopyDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Copy Trader: {selectedTrader?.name}</DialogTitle>
            <DialogDescription>Set your allocation and risk parameters for this trader.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">Allocation Amount ($)</label>
              <Input
                type="number"
                value={allocationAmount}
                onChange={(e) => setAllocationAmount(e.target.value)}
                placeholder="1000"
              />
              <p className="text-xs text-gray-500 mt-1">Amount to allocate to this trader's strategies</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Maximum Risk Per Trade (%)</label>
              <Input
                type="number"
                value={maxRiskPerTrade}
                onChange={(e) => setMaxRiskPerTrade(e.target.value)}
                placeholder="10"
              />
              <p className="text-xs text-gray-500 mt-1">Maximum percentage of allocation at risk per trade</p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4">
              <div className="flex items-center mb-3">
                <div className={`px-2 py-0.5 rounded-full border mr-2 ${getRiskColor(selectedTrader?.riskLevel || 3)}`}>
                  {selectedTrader?.riskScore} Risk
                </div>
                <p className="text-sm text-gray-400">{selectedTrader?.winRate}% Win Rate</p>
              </div>
              <p className="text-xs text-gray-500">
                This trader has generated {selectedTrader?.roi["30d"]}% returns in the last 30 days with
                {selectedTrader?.trades} trades. Average holding time is {selectedTrader?.avgHoldTime}.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCopyDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmCopyTrader}>Start Copying</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
