"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency, formatPercentage } from "@/lib/api"

// Token pairs
const tokenPairs = [
  { id: "eth-usdc", name: "ETH/USDC", price: 3500, change: 2.5 },
  { id: "btc-usdc", name: "BTC/USDC", price: 60000, change: 1.8 },
  { id: "sol-usdc", name: "SOL/USDC", price: 120, change: 5.2 },
  { id: "eth-btc", name: "ETH/BTC", price: 0.058, change: 0.7 },
  { id: "bnb-usdc", name: "BNB/USDC", price: 450, change: -1.2 },
]

// Generate random price data
const generatePriceData = (basePrice: number, dataPoints: number, volatility: number) => {
  const data = []
  let price = basePrice

  for (let i = 0; i < dataPoints; i++) {
    // Random price movement with some trend
    const change = (Math.random() - 0.48) * volatility * basePrice
    price = Math.max(0.001, price + change)
    data.push(price)
  }

  return data
}

export default function SwapChart() {
  const [selectedPair, setSelectedPair] = useState(tokenPairs[0])
  const [timeframe, setTimeframe] = useState("1D")
  const [priceData, setPriceData] = useState<number[]>([])
  const [currentPrice, setCurrentPrice] = useState(selectedPair.price)
  const [priceChange, setPriceChange] = useState(selectedPair.change)
  const [isPositive, setIsPositive] = useState(selectedPair.change >= 0)
  const [isLoading, setIsLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Generate chart data when pair or timeframe changes
  useEffect(() => {
    setIsLoading(true)

    // Different data points and volatility based on timeframe
    const getDataConfig = () => {
      switch (timeframe) {
        case "1H":
          return { points: 60, volatility: 0.0005 }
        case "1D":
          return { points: 24, volatility: 0.001 }
        case "1W":
          return { points: 7, volatility: 0.002 }
        case "1M":
          return { points: 30, volatility: 0.004 }
        case "1Y":
          return { points: 12, volatility: 0.008 }
        default:
          return { points: 24, volatility: 0.001 }
      }
    }

    const { points, volatility } = getDataConfig()

    // Simulate API call delay
    setTimeout(() => {
      const newData = generatePriceData(selectedPair.price, points, volatility)
      setPriceData(newData)
      setCurrentPrice(newData[newData.length - 1])

      // Calculate price change
      const startPrice = newData[0]
      const endPrice = newData[newData.length - 1]
      const change = ((endPrice - startPrice) / startPrice) * 100
      setPriceChange(change)
      setIsPositive(change >= 0)

      setIsLoading(false)
    }, 500)
  }, [selectedPair, timeframe])

  // Draw chart
  useEffect(() => {
    if (!canvasRef.current || priceData.length === 0 || isLoading) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Find min and max for scaling
    const min = Math.min(...priceData) * 0.99
    const max = Math.max(...priceData) * 1.01
    const range = max - min

    // Draw grid lines
    ctx.strokeStyle = "rgba(107, 33, 168, 0.1)"
    ctx.lineWidth = 1

    // Horizontal grid lines
    const gridLines = 5
    for (let i = 0; i <= gridLines; i++) {
      const y = rect.height - (i / gridLines) * rect.height
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(rect.width, y)
      ctx.stroke()
    }

    // Vertical grid lines
    const verticalLines =
      timeframe === "1H" ? 6 : timeframe === "1D" ? 8 : timeframe === "1W" ? 7 : timeframe === "1M" ? 5 : 4
    for (let i = 0; i <= verticalLines; i++) {
      const x = (i / verticalLines) * rect.width
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, rect.height)
      ctx.stroke()
    }

    // Draw price line
    ctx.strokeStyle = isPositive ? "rgba(236, 72, 153, 1)" : "rgba(239, 68, 68, 1)"
    ctx.lineWidth = 2
    ctx.beginPath()

    priceData.forEach((price, i) => {
      const x = (i / (priceData.length - 1)) * rect.width
      const y = rect.height - ((price - min) / range) * rect.height

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw area under the line
    const gradient = ctx.createLinearGradient(0, 0, 0, rect.height)
    if (isPositive) {
      gradient.addColorStop(0, "rgba(236, 72, 153, 0.2)")
      gradient.addColorStop(1, "rgba(236, 72, 153, 0)")
    } else {
      gradient.addColorStop(0, "rgba(239, 68, 68, 0.2)")
      gradient.addColorStop(1, "rgba(239, 68, 68, 0)")
    }

    ctx.fillStyle = gradient
    ctx.beginPath()

    // Start from bottom left
    ctx.moveTo(0, rect.height)

    // Draw line to first data point
    const firstY = rect.height - ((priceData[0] - min) / range) * rect.height
    ctx.lineTo(0, firstY)

    // Draw the price line again
    priceData.forEach((price, i) => {
      const x = (i / (priceData.length - 1)) * rect.width
      const y = rect.height - ((price - min) / range) * rect.height
      ctx.lineTo(x, y)
    })

    // Complete the area by going to bottom right and back to start
    ctx.lineTo(rect.width, rect.height)
    ctx.closePath()
    ctx.fill()
  }, [priceData, isLoading, isPositive, timeframe])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
      <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 shadow-glow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-lg font-bold border-purple-500/30 hover:bg-purple-900/20">
                  {selectedPair.name}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border border-purple-500/30 backdrop-blur-xl">
                {tokenPairs.map((pair) => (
                  <DropdownMenuItem
                    key={pair.id}
                    onClick={() => setSelectedPair(pair)}
                    className={selectedPair.id === pair.id ? "bg-purple-900/30" : ""}
                  >
                    {pair.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="mt-2 flex items-center">
              <span className="text-2xl font-bold mr-2">{formatCurrency(currentPrice)}</span>
              <div className={`flex items-center text-sm ${isPositive ? "text-green-400" : "text-red-400"}`}>
                {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {formatPercentage(priceChange)}
              </div>
            </div>
          </div>

          <Tabs defaultValue="1D" onValueChange={setTimeframe} className="w-full md:w-auto">
            <TabsList className="bg-black/60 border border-purple-500/20 w-full md:w-auto grid grid-cols-5">
              <TabsTrigger value="1H" className="data-[state=active]:bg-purple-900/30">
                1H
              </TabsTrigger>
              <TabsTrigger value="1D" className="data-[state=active]:bg-purple-900/30">
                1D
              </TabsTrigger>
              <TabsTrigger value="1W" className="data-[state=active]:bg-purple-900/30">
                1W
              </TabsTrigger>
              <TabsTrigger value="1M" className="data-[state=active]:bg-purple-900/30">
                1M
              </TabsTrigger>
              <TabsTrigger value="1Y" className="data-[state=active]:bg-purple-900/30">
                1Y
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="relative h-[300px] md:h-[400px]">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <canvas ref={canvasRef} className="w-full h-full" />
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-black/40 rounded-lg border border-purple-500/20 p-3">
            <div className="text-sm text-gray-400 mb-1">24h Volume</div>
            <div className="font-bold">{formatCurrency(Math.random() * 100000000 + 10000000)}</div>
          </div>
          <div className="bg-black/40 rounded-lg border border-purple-500/20 p-3">
            <div className="text-sm text-gray-400 mb-1">24h High</div>
            <div className="font-bold">{formatCurrency(currentPrice * 1.05)}</div>
          </div>
          <div className="bg-black/40 rounded-lg border border-purple-500/20 p-3">
            <div className="text-sm text-gray-400 mb-1">24h Low</div>
            <div className="font-bold">{formatCurrency(currentPrice * 0.95)}</div>
          </div>
          <div className="bg-black/40 rounded-lg border border-purple-500/20 p-3">
            <div className="text-sm text-gray-400 mb-1">Market Cap</div>
            <div className="font-bold">{formatCurrency(Math.random() * 1000000000 + 100000000)}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
