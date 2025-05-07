"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowUp, ArrowDown, Star, ChevronDown, Filter, Search, TrendingUp, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { fetchMarketData, formatCurrency, formatPercentage } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import { debounce } from "lodash"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TrendingList() {
  const [marketData, setMarketData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("market_cap")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [timeframe, setTimeframe] = useState("24h")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  // Fetch market data
  const fetchData = useCallback(
    async (reset = false) => {
      try {
        setLoading(true)
        const currentPage = reset ? 1 : page

        // Add timeout and abort controller
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        const data = await fetchMarketData("usd", 25, currentPage, true, "1h,24h,7d")

        clearTimeout(timeoutId)

        if (data.length === 0) {
          setHasMore(false)
        } else {
          if (reset) {
            setMarketData(data)
          } else {
            setMarketData((prev) => [...prev, ...data])
          }
          setPage(currentPage + 1)
        }

        setLoading(false)
        setError(null) // Clear any previous errors
      } catch (err) {
        console.error("Failed to load market data:", err)
        setError("Failed to load market data. Please try again later.")
        setLoading(false)

        // If we have no data yet, provide some fallback data
        if (marketData.length === 0) {
          // You could add fallback data here similar to the trending coins
          // For now, we'll just show the error message
        }
      }
    },
    [page],
  )

  // Initial data load
  useEffect(() => {
    fetchData(true)

    // Refresh data every 60 seconds
    const intervalId = setInterval(() => fetchData(true), 60000)
    return () => clearInterval(intervalId)
  }, [fetchData])

  // Filter and sort data
  useEffect(() => {
    let result = [...marketData]

    // Apply category filter
    if (activeTab !== "all") {
      // Simulate category filtering
      // In a real app, you would have actual category data
      if (activeTab === "defi") {
        result = result.filter((coin) => ["ethereum", "chainlink", "uniswap", "aave"].includes(coin.id))
      } else if (activeTab === "nft") {
        result = result.filter((coin) => ["flow", "enjin", "decentraland", "sandbox"].includes(coin.id))
      } else if (activeTab === "meme") {
        result = result.filter((coin) => ["dogecoin", "shiba-inu"].includes(coin.id))
      } else if (activeTab === "layer1") {
        result = result.filter((coin) => ["bitcoin", "ethereum", "cardano", "solana", "avalanche-2"].includes(coin.id))
      }
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (coin) => coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    result.sort((a, b) => {
      let valueA, valueB

      // Determine which values to compare based on sortBy
      switch (sortBy) {
        case "price":
          valueA = a.current_price
          valueB = b.current_price
          break
        case "market_cap":
          valueA = a.market_cap
          valueB = b.market_cap
          break
        case "volume":
          valueA = a.total_volume
          valueB = b.total_volume
          break
        case "change":
          const timeKey = `price_change_percentage_${timeframe}`
          valueA = a[timeKey]
          valueB = b[timeKey]
          break
        case "trending":
          // Simulate trending score - in a real app this would come from the API
          valueA = a.market_cap_rank + (a.price_change_percentage_24h > 0 ? -10 : 10)
          valueB = b.market_cap_rank + (b.price_change_percentage_24h > 0 ? -10 : 10)
          break
        default:
          valueA = a.market_cap
          valueB = b.market_cap
      }

      // Handle null/undefined values
      if (valueA === null || valueA === undefined) return 1
      if (valueB === null || valueB === undefined) return -1

      // Sort based on direction
      return sortDirection === "desc" ? valueB - valueA : valueA - valueB
    })

    setFilteredData(result)
  }, [marketData, searchQuery, sortBy, sortDirection, timeframe, activeTab])

  // Handle search with debounce
  const handleSearch = debounce((value: string) => {
    setSearchQuery(value)
  }, 300)

  // Handle sort
  const handleSort = (key: string) => {
    if (sortBy === key) {
      // Toggle direction if same key
      setSortDirection(sortDirection === "desc" ? "asc" : "desc")
    } else {
      // New key, set to desc by default
      setSortBy(key)
      setSortDirection("desc")
    }
  }

  // Get price change percentage based on selected timeframe
  const getPriceChange = (coin: any) => {
    switch (timeframe) {
      case "1h":
        return coin.price_change_percentage_1h_in_currency
      case "7d":
        return coin.price_change_percentage_7d_in_currency
      default:
        return coin.price_change_percentage_24h_in_currency
    }
  }

  // Load more data
  const loadMore = () => {
    if (!loading && hasMore) {
      fetchData()
    }
  }

  // Simulated social data
  const getSocialScore = (coin: any) => {
    // In a real app, this would come from an API
    const baseScore = Math.floor(Math.random() * 100)
    return coin.market_cap_rank < 10 ? baseScore + 20 : baseScore
  }

  const getSocialChange = (coin: any) => {
    // In a real app, this would come from an API
    return Math.floor(Math.random() * 40) - 10
  }

  const getSocialMentions = (coin: any) => {
    // In a real app, this would come from an API
    const base = coin.market_cap_rank < 10 ? 10000 : 5000
    return Math.floor(base * (1 + Math.random()))
  }

  return (
    <section className="py-12 pb-24 relative">
      <div className="absolute -top-20 right-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-pink-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Trending Assets
            </span>
          </h2>
          <p className="text-gray-400">Comprehensive list of trending cryptocurrencies with real-time data</p>
        </motion.div>

        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="bg-black/60 border border-purple-500/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-900/30">
              All Assets
            </TabsTrigger>
            <TabsTrigger value="defi" className="data-[state=active]:bg-purple-900/30">
              DeFi
            </TabsTrigger>
            <TabsTrigger value="nft" className="data-[state=active]:bg-purple-900/30">
              NFTs
            </TabsTrigger>
            <TabsTrigger value="meme" className="data-[state=active]:bg-purple-900/30">
              Meme Coins
            </TabsTrigger>
            <TabsTrigger value="layer1" className="data-[state=active]:bg-purple-900/30">
              Layer 1
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative max-w-xs w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search coins..."
              className="pl-10 bg-black/60 border-purple-500/30 focus:border-purple-500/60 rounded-xl"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-purple-500/30 hover:bg-purple-900/20 shadow-glow-sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border border-purple-500/30 backdrop-blur-xl">
                <DropdownMenuItem>All Coins</DropdownMenuItem>
                <DropdownMenuItem>DeFi</DropdownMenuItem>
                <DropdownMenuItem>NFTs</DropdownMenuItem>
                <DropdownMenuItem>Layer 1</DropdownMenuItem>
                <DropdownMenuItem>Layer 2</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-purple-500/30 hover:bg-purple-900/20">
                  {sortBy === "market_cap"
                    ? "Market Cap"
                    : sortBy === "volume"
                      ? "Volume"
                      : sortBy === "price"
                        ? "Price"
                        : sortBy === "trending"
                          ? "Trending Score"
                          : "Change"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border border-purple-500/30 backdrop-blur-xl">
                <DropdownMenuItem onClick={() => handleSort("market_cap")}>Market Cap</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("volume")}>Volume</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("price")}>Price</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("change")}>Change</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("trending")}>Trending Score</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-purple-500/30 hover:bg-purple-900/20">
                  {timeframe}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border border-purple-500/30 backdrop-blur-xl">
                <DropdownMenuItem onClick={() => setTimeframe("1h")}>1h</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeframe("24h")}>24h</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeframe("7d")}>7d</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {error ? (
          <div className="text-center text-red-400 p-4 bg-red-900/20 rounded-xl border border-red-500/20 mb-6">
            {error}. Please try again later.
          </div>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
            <div className="relative overflow-x-auto rounded-xl border border-purple-500/20 bg-black/60 backdrop-blur-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-purple-500/20">
                    <th className="px-4 py-4 font-medium text-gray-300">#</th>
                    <th className="px-4 py-4 font-medium text-gray-300">Name</th>
                    <th className="px-4 py-4 font-medium text-gray-300">Price</th>
                    <th className="px-4 py-4 font-medium text-gray-300 hidden md:table-cell">Change</th>
                    <th className="px-4 py-4 font-medium text-gray-300 hidden lg:table-cell">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Trend
                      </div>
                    </th>
                    <th className="px-4 py-4 font-medium text-gray-300 hidden xl:table-cell">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Social
                      </div>
                    </th>
                    <th className="px-4 py-4 font-medium text-gray-300 hidden lg:table-cell">Volume</th>
                    <th className="px-4 py-4 font-medium text-gray-300 hidden md:table-cell">Market Cap</th>
                    <th className="px-4 py-4 font-medium text-gray-300"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading && filteredData.length === 0
                    ? Array(10)
                        .fill(0)
                        .map((_, index) => (
                          <tr key={`skeleton-${index}`} className="border-b border-purple-500/10">
                            <td className="px-4 py-4">
                              <Skeleton className="h-4 w-4" />
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center">
                                <Skeleton className="w-8 h-8 rounded-full mr-3" />
                                <div>
                                  <Skeleton className="h-4 w-24 mb-1" />
                                  <Skeleton className="h-3 w-12" />
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <Skeleton className="h-4 w-20" />
                            </td>
                            <td className="px-4 py-4 hidden md:table-cell">
                              <Skeleton className="h-4 w-16" />
                            </td>
                            <td className="px-4 py-4 hidden lg:table-cell">
                              <Skeleton className="h-4 w-16" />
                            </td>
                            <td className="px-4 py-4 hidden xl:table-cell">
                              <Skeleton className="h-4 w-16" />
                            </td>
                            <td className="px-4 py-4 hidden lg:table-cell">
                              <Skeleton className="h-4 w-20" />
                            </td>
                            <td className="px-4 py-4 hidden md:table-cell">
                              <Skeleton className="h-4 w-20" />
                            </td>
                            <td className="px-4 py-4">
                              <Skeleton className="h-4 w-4 rounded-full" />
                            </td>
                          </tr>
                        ))
                    : filteredData.map((coin, index) => {
                        const priceChange = getPriceChange(coin)
                        const isPositive = priceChange >= 0
                        const socialScore = getSocialScore(coin)
                        const socialChange = getSocialChange(coin)
                        const socialMentions = getSocialMentions(coin)

                        return (
                          <motion.tr
                            key={coin.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="border-b border-purple-500/10 hover:bg-purple-900/10"
                          >
                            <td className="px-4 py-4 text-gray-300">{coin.market_cap_rank || index + 1}</td>
                            <td className="px-4 py-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                  <img
                                    src={coin.image || "/placeholder.svg"}
                                    alt={coin.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.src = `https://via.placeholder.com/32/6d28d9/ffffff?text=${coin.symbol.charAt(0).toUpperCase()}`
                                    }}
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">{coin.name}</div>
                                  <div className="text-sm text-gray-400">{coin.symbol.toUpperCase()}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 font-medium">{formatCurrency(coin.current_price)}</td>
                            <td
                              className={`px-4 py-4 hidden md:table-cell ${isPositive ? "text-green-400" : "text-red-400"}`}
                            >
                              <div className="flex items-center">
                                {isPositive ? (
                                  <ArrowUp className="h-3 w-3 mr-1" />
                                ) : (
                                  <ArrowDown className="h-3 w-3 mr-1" />
                                )}
                                {formatPercentage(priceChange)}
                              </div>
                            </td>
                            <td className="px-4 py-4 hidden lg:table-cell">
                              <div className="flex items-center">
                                <div
                                  className={`h-2 w-2 rounded-full mr-2 ${
                                    socialScore > 70
                                      ? "bg-green-500"
                                      : socialScore > 40
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                ></div>
                                <div className="font-medium">{socialScore}</div>
                                <div className={`text-xs ml-2 ${socialChange > 0 ? "text-green-400" : "text-red-400"}`}>
                                  {socialChange > 0 ? "+" : ""}
                                  {socialChange}%
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 hidden xl:table-cell">
                              <div className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1 text-purple-400" />
                                <span>{socialMentions.toLocaleString()}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 hidden lg:table-cell text-gray-300">
                              {formatCurrency(coin.total_volume, "USD", true)}
                            </td>
                            <td className="px-4 py-4 hidden md:table-cell text-gray-300">
                              {formatCurrency(coin.market_cap, "USD", true)}
                            </td>
                            <td className="px-4 py-4">
                              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-yellow-400">
                                <Star className="h-4 w-4" />
                              </Button>
                            </td>
                          </motion.tr>
                        )
                      })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          {loading && filteredData.length > 0 ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : hasMore ? (
            <Button
              variant="outline"
              className="border-purple-500/30 hover:bg-purple-900/20 px-8 rounded-full shadow-glow-sm"
              onClick={loadMore}
              disabled={loading}
            >
              Load More
            </Button>
          ) : (
            <p className="text-gray-400">No more results</p>
          )}
        </div>
      </div>
    </section>
  )
}
