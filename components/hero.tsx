"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Maximize2, Minimize2 } from "lucide-react"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [portfolio, setPortfolio] = useState<{ coin: string; amount: number; price: string }[]>([])
  const [ethPrice, setEthPrice] = useState("Loading...")
  const [btcVolume, setBtcVolume] = useState("Loading...")
  const [totalMarketCap, setTotalMarketCap] = useState("Loading...")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {
      x: number
      y: number
      radius: number
      color: string
      speedX: number
      speedY: number
    }[] = []

    const colors = ["#9333ea", "#ec4899", "#06b6d4"]

    for (let i = 0; i < 50; i++) {
      const radius = Math.random() * 2 + 1
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      })
    }

    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 2,
        )
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(1, "transparent")
        ctx.fillStyle = gradient
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2)
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/global")
        const data = await response.json()
        setEthPrice(`$${data.data.market_cap_percentage.eth.toFixed(2)}%`)
        setBtcVolume(`$${(data.data.total_volume.usd / 1e9).toFixed(2)}B`)
        setTotalMarketCap(`$${(data.data.total_market_cap.usd / 1e12).toFixed(2)}T`)
      } catch (error) {
        console.error("Error fetching market data:", error)
      }
    }

    fetchMarketData()
    const interval = setInterval(fetchMarketData, 60000) // Update every 60 seconds
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!chartContainerRef.current) {
      console.error("Chart container is not initialized.")
      return
    }

    const initializeWidget = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          container_id: chartContainerRef.current.id,
          autosize: true,
          symbol: "BTCUSD",
          interval: "60", // Default to 1-hour interval
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1", // Candlestick chart
          locale: "en",
          toolbar_bg: "#1A202C",
          enable_publishing: false,
          allow_symbol_change: true,
          studies: ["MACD@tv-basicstudies"], // Example indicator
        })
      } else {
        console.error("TradingView widget is not available.")
      }
    }

    if (window.TradingView) {
      initializeWidget()
    } else {
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/tv.js"
      script.async = true
      script.onload = initializeWidget
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [])

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  const fetchPortfolioPrices = async () => {
    if (portfolio.length === 0) return

    try {
      const ids = portfolio.map((item) => item.coin).join(",")
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
      )
      const data = await response.json()

      setPortfolio((prevPortfolio) =>
        prevPortfolio.map((item) => ({
          ...item,
          price: data[item.coin]?.usd ? `$${data[item.coin].usd.toFixed(2)}` : "N/A",
        }))
      )
    } catch (error) {
      console.error("Error fetching portfolio prices:", error)
    }
  }

  useEffect(() => {
    fetchPortfolioPrices()
    const interval = setInterval(fetchPortfolioPrices, 60000) // Update prices every 60 seconds
    return () => clearInterval(interval)
  }, [portfolio])

  const addToPortfolio = (coin: string) => {
    if (portfolio.find((item) => item.coin === coin)) return
    setPortfolio([...portfolio, { coin, amount: 0, price: "Loading..." }])
  }

  const removeFromPortfolio = (coin: string) => {
    setPortfolio(portfolio.filter((item) => item.coin !== coin))
  }

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ pointerEvents: "none" }} />
      <div
        className={`${
          isFullScreen ? "fixed inset-0 z-50 bg-black overflow-hidden" : "container mx-auto px-4 z-10 py-20"
        }`}
        style={isFullScreen ? { width: "100vw", height: "100vh", padding: 0, margin: 0 } : {}}
      >
        <div
          className={`grid ${isFullScreen ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"} gap-12 items-center`}
          style={isFullScreen ? { height: "100%" } : {}}
        >
          {!isFullScreen && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/50">
                <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  The Future of Web3 Trading
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="block">Trade Smarter with</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
                  Next-Gen Crypto
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-lg">
                Experience lightning-fast trades, minimal fees, and advanced analytics on our decentralized trading
                platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8 py-6 shadow-glow-purple">
                  Start Trading
                </Button>
                <Button variant="outline" className="rounded-full px-8 py-6 border-purple-500/50 hover:bg-purple-900/20">
                  Explore Features <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex -space-x-2">
                  {[1, 2].map((i) => (
                    <img
                      key={i}
                      src={`/${i}.svg`}
                      alt={`Image ${i}`}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-black"
                    />
                  ))}
                </div>
                <span>+10k traders joined this month</span>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div
              className={`relative bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-xl border border-purple-500/30 p-6 shadow-2xl ${
                isFullScreen ? "rounded-none" : "rounded-3xl"
              }`}
            >
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    Trading Dashboard
                  </div>
                  <button
                    onClick={toggleFullScreen}
                    className="px-3 py-1 rounded-[3px] text-sm bg-gray-700 text-gray-300 flex items-center border border-gray-500"
                  >
                    {isFullScreen ? (
                      <Minimize2 className="h-5 w-5" />
                    ) : (
                      <Maximize2 className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <div
                  id="tradingview_chart"
                  ref={chartContainerRef}
                  className={`relative ${
                    isFullScreen ? "h-full w-full" : "h-64"
                  } overflow-hidden ${isFullScreen ? "rounded-none" : "rounded-3xl"}`}
                  style={
                    isFullScreen
                      ? {
                          height: "calc(100vh - 60px)", // Equal margin from top, bottom, left, and right
                          width: "calc(100vw - 60px)",
                          margin: "30px auto", // Center the chart
                          overflow: "hidden",
                        }
                      : {}
                  }
                ></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Portfolio Section */}
        {!isFullScreen && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/50 rounded-xl p-4 border border-purple-500/20">
              <div className="text-sm text-gray-400">ETH Price</div>
              <div className="text-xl font-bold text-white">{ethPrice}</div>
            </div>
            <div className="bg-black/50 rounded-xl p-4 border border-purple-500/20">
              <div className="text-sm text-gray-400">BTC Volume (24h)</div>
              <div className="text-xl font-bold text-white">{btcVolume}</div>
            </div>
            <div className="bg-black/50 rounded-xl p-4 border border-purple-500/20">
              <div className="text-sm text-gray-400">Total Market Cap</div>
              <div className="text-xl font-bold text-white">{totalMarketCap}</div>
            </div>
            <div className="bg-black/50 rounded-xl p-4 border border-purple-500/20 col-span-1 md:col-span-3">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">Your Portfolio</div>
                <div className="text-sm text-purple-400">View All</div>
              </div>
              <div className="mt-2 space-y-2">
                {portfolio.map((item) => (
                  <div key={item.coin} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2"></div>
                      <div>
                        <div className="text-white">{item.coin.toUpperCase()}</div>
                        <div className="text-xs text-gray-400">Amount: {item.amount}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white">{item.price}</div>
                      <Button
                        onClick={() => removeFromPortfolio(item.coin)}
                        className="bg-red-600 text-white text-sm px-4 py-2"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
