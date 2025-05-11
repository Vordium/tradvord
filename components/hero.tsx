"use client"

import { useEffect, useRef, useState } from "react"
import { createChart } from "lightweight-charts"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [ethPrice, setEthPrice] = useState("Loading...")
  const [btcPrice, setBtcPrice] = useState("Loading...")
  const [totalMarketCap, setTotalMarketCap] = useState("Loading...")
  const [portfolio, setPortfolio] = useState<{ coin: string; amount: number; price: string }[]>([])

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.offsetWidth,
      height: 300,
      layout: {
        backgroundColor: "#1A202C",
        textColor: "#FFFFFF",
      },
      grid: {
        vertLines: { color: "#2D3748" },
        horzLines: { color: "#2D3748" },
      },
      crosshair: {
        mode: 1,
      },
      priceScale: {
        borderColor: "#2D3748",
      },
      timeScale: {
        borderColor: "#2D3748",
      },
    })

    const lineSeries = chart.addLineSeries({
      color: "#4CAF50",
      lineWidth: 2,
    })

    // Example data
    lineSeries.setData([
      { time: "2023-01-01", value: 100 },
      { time: "2023-01-02", value: 105 },
      { time: "2023-01-03", value: 102 },
    ])

    return () => {
      chart.remove()
    }
  }, [])

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/global")
        const data = await response.json()
        setEthPrice(`$${data.data.market_cap_percentage.eth.toFixed(2)}%`)
        setBtcPrice(`$${data.data.market_cap_percentage.btc.toFixed(2)}%`)
        setTotalMarketCap(`$${(data.data.total_market_cap.usd / 1e12).toFixed(2)}T`)
      } catch (error) {
        console.error("Error fetching market data:", error)
      }
    }

    fetchMarketData()
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* BTC Price Card */}
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-white mb-2">BTC Price</h2>
            <p className="text-xl text-green-500">{btcPrice}</p>
          </div>

          {/* ETH Price Card */}
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-white mb-2">ETH Price</h2>
            <p className="text-xl text-green-500">{ethPrice}</p>
          </div>

          {/* Total Market Cap Card */}
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-white mb-2">Total Market Cap</h2>
            <p className="text-xl text-green-500">{totalMarketCap}</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg mt-8">
          <h2 className="text-lg font-bold text-white mb-4">Market Chart</h2>
          <div ref={chartContainerRef} className="w-full h-[300px]"></div>
        </div>

        {/* Portfolio Section */}
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg mt-8">
          <h2 className="text-lg font-bold text-white mb-4">Your Portfolio</h2>
          {portfolio.length > 0 ? (
            <ul className="space-y-2">
              {portfolio.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="text-white">{item.coin.toUpperCase()}</span>
                  <span className="text-gray-400">Amount: {item.amount}</span>
                  <span className="text-green-500">{item.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No assets in your portfolio yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}