"use client"

import { useEffect, useRef, useState, Fragment } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { createChart, CrosshairMode } from "lightweight-charts"
import { Menu, Transition } from "@headlessui/react"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [chart, setChart] = useState<any>(null)
  const [candlestickSeries, setCandlestickSeries] = useState<any>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [prices, setPrices] = useState<{ BTC: string; ETH: string }>({ BTC: "Loading...", ETH: "Loading..." })
  const [timeRange, setTimeRange] = useState("7") // Default to 7 days (1 week)

  const timeRanges = [
    { label: "1M", value: "30" },
    { label: "1W", value: "7" },
    { label: "1D", value: "1" },
    { label: "12H", value: "0.5" },
    { label: "4H", value: "0.1667" },
    { label: "1H", value: "0.0417" },
    { label: "30min", value: "0.0208" },
    { label: "15min", value: "0.0104" },
    { label: "5min", value: "0.0035" },
    { label: "1min", value: "0.0017" },
  ]

  const mainTimeRanges = timeRanges.filter((range) =>
    ["1D", "12H", "4H", "1H", "30min", "15min", "5min"].includes(range.label)
  )

  const dropdownTimeRanges = timeRanges.filter((range) =>
    ["1M", "1W", "1min"].includes(range.label)
  )

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

    fetchPrices()
    const interval = setInterval(() => {
      fetchPrices()
    }, 60000) // Update every 60 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create the chart
    const newChart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        backgroundColor: "#1A202C",
        textColor: "#E2E8F0",
      },
      grid: {
        vertLines: { color: "#2D3748" },
        horzLines: { color: "#2D3748" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: "#2D3748",
      },
      timeScale: {
        borderColor: "#2D3748",
      },
    });

    // Add the candlestick series
    const series = newChart.addCandlestickSeries({
      upColor: "#4CAF50",
      downColor: "#F44336",
      borderVisible: false,
      wickUpColor: "#4CAF50",
      wickDownColor: "#F44336",
    });

    setChart(newChart);
    setCandlestickSeries(series);

    // Cleanup on unmount
    return () => {
      newChart.remove();
    };
  }, []);

  useEffect(() => {
    const fetchCandlestickData = async () => {
      if (!candlestickSeries) return; // Ensure the series is initialized

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${timeRange}`
        );
        const data = await response.json();
        const candlestickData = data.prices.map((price: [number, number], index: number) => ({
          time: Math.floor(price[0] / 1000),
          open: price[1] * (1 - Math.random() * 0.01),
          high: price[1] * (1 + Math.random() * 0.02),
          low: price[1] * (1 - Math.random() * 0.02),
          close: price[1],
        }));
        candlestickSeries.setData(candlestickData);
      } catch (error) {
        console.error("Error fetching candlestick data:", error);
      }
    };

    fetchCandlestickData();
  }, [timeRange, candlestickSeries]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

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
            className={`relative ${isFullScreen ? "fixed inset-0 z-50 bg-black" : ""}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-6 shadow-2xl">
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    Trading Dashboard
                  </div>
                  <button
                    onClick={toggleFullScreen}
                    className="px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-300"
                  >
                    {isFullScreen ? "Exit Fullscreen" : "Expand Chart"}
                  </button>
                </div>

                <div className="flex flex-wrap items-center space-x-2 mb-6">
                  {mainTimeRanges.map((range) => (
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

                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-300">
                      More
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute mt-2 w-28 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {dropdownTimeRanges.map((range) => (
                          <Menu.Item key={range.value}>
                            {({ active }) => (
                              <button
                                onClick={() => setTimeRange(range.value)}
                                className={`${
                                  active ? "bg-purple-500 text-white" : "text-gray-300"
                                } group flex w-full items-center px-3 py-2 text-sm`}
                              >
                                {range.label}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>

                <div
                  ref={chartContainerRef}
                  className={`relative ${isFullScreen ? "h-full" : "h-64"} overflow-hidden`}
                ></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
