"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [prices, setPrices] = useState<{ BTC: string; ETH: string }>({ BTC: "Loading...", ETH: "Loading..." })
  const [btcChartData, setBtcChartData] = useState<{ labels: string[]; data: number[] }>({ labels: [], data: [] })
  const [timeRange, setTimeRange] = useState("7") // Default to 7 days (1 week)

  const timeRanges = [
    { label: "1 Month", value: "30" },
    { label: "1 Week", value: "7" },
    { label: "1 Day", value: "1" },
    { label: "12 Hours", value: "0.5" },
    { label: "4 Hours", value: "0.1667" },
    { label: "1 Hour", value: "0.0417" },
    { label: "30 Min", value: "0.0208" },
    { label: "15 Min", value: "0.0104" },
    { label: "5 Min", value: "0.0035" },
    { label: "1 Min", value: "0.0017" },
  ]

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
    const fetchPrices = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd")
        const data = await response.json()
        setPrices({
          BTC: `$${data.bitcoin.usd.toLocaleString()}`,
          ETH: `$${data.ethereum.usd.toLocaleString()}`,
        })
      } catch (error) {
        console.error("Error fetching prices:", error)
        setPrices({ BTC: "Error", ETH: "Error" })
      }
    }

    const fetchBtcHistory = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${timeRange}`
        )
        const data = await response.json()
        const labels = data.prices.map((price: [number, number]) =>
          new Date(price[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        )
        const chartData = data.prices.map((price: [number, number]) => price[1])
        setBtcChartData({ labels, data: chartData })
      } catch (error) {
        console.error("Error fetching BTC history:", error)
      }
    }

    fetchPrices()
    fetchBtcHistory()
    const interval = setInterval(() => {
      fetchPrices()
      fetchBtcHistory()
    }, 60000) // Update every 60 seconds

    return () => clearInterval(interval)
  }, [timeRange])

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ pointerEvents: "none" }} />
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-6 shadow-2xl">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    Trading Dashboard
                  </div>
                  <div className="flex space-x-2">
                    {timeRanges.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => setTimeRange(range.value)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          timeRange === range.value
                            ? "bg-purple-500 text-white"
                            : "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-black/50 rounded-xl p-4 border border-purple-500/20">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-gray-300">BTC/USD</div>
                      <div className="text-green-400">{prices.BTC}</div>
                    </div>
                    <div className="h-64 relative overflow-hidden">
                      <Line
                        data={{
                          labels: btcChartData.labels,
                          datasets: [
                            {
                              label: "BTC Price",
                              data: btcChartData.data,
                              borderColor: "#9333ea",
                              backgroundColor: "rgba(147, 51, 234, 0.2)",
                              tension: 0.4,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: { display: false },
                          },
                          layout: {
                            padding: 0,
                          },
                          scales: {
                            x: { grid: { display: false } },
                            y: { grid: { display: false } },
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/50 rounded-xl p-4 border border-purple-500/20">
                      <div className="text-sm text-gray-400">ETH/USD</div>
                      <div className="text-xl font-bold text-white">{prices.ETH}</div>
                    </div>
                    <div className="bg-black/50 rounded-xl p-4 border border-purple-500/20">
                      <div className="text-sm text-gray-400">Volume 24h</div>
                      <div className="text-xl font-bold text-white">$1.2B</div>
                      <div className="text-green-400 text-sm">+12.5%</div>
                    </div>
                    <div className="bg-black/50 rounded-xl p-4 border border-purple-500/20">
                      <div className="text-sm text-gray-400">Market Cap</div>
                      <div className="text-xl font-bold text-white">$42.5B</div>
                      <div className="text-green-400 text-sm">+3.2%</div>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl p-4 border border-purple-500/20">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-400">Your Portfolio</div>
                      <div className="text-sm text-purple-400">View All</div>
                    </div>
                    <div className="mt-2 space-y-2">
                      {[
                        { coin: "BTC", amount: "1.2", value: "$45,230", change: "+2.4%" },
                        { coin: "ETH", amount: "15.8", value: "$32,180", change: "+5.1%" },
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2"></div>
                            <div>
                              <div className="text-white">{item.coin}</div>
                              <div className="text-xs text-gray-400">{item.amount}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white">{item.value}</div>
                            <div className="text-xs text-green-400">{item.change}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
