"use client"

import { useEffect, useState } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, Tooltip, LineElement, PointElement } from "chart.js"
import { Chart } from "react-chartjs-2"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2 } from "lucide-react"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, TimeScale, Tooltip, LineElement, PointElement)

export default function Hero() {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [chartData, setChartData] = useState<any>(null)
  const [orderType, setOrderType] = useState<"limit" | "market">("limit")
  const [price, setPrice] = useState("")
  const [amount, setAmount] = useState("")
  const [orderBook, setOrderBook] = useState<{ price: number; amount: number; type: "buy" | "sell" }[]>([])

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
        )
        const data = await response.json()

        // Format data for Chart.js
        const formattedData = data.prices.map(([time, price]: [number, number]) => ({
          x: new Date(time),
          y: price,
        }))

        setChartData({
          datasets: [
            {
              label: "BTC/USD",
              data: formattedData,
              borderColor: "#4CAF50",
              backgroundColor: "rgba(76, 175, 80, 0.2)",
              tension: 0.4,
            },
          ],
        })
      } catch (error) {
        console.error("Error fetching chart data:", error)
      }
    }

    fetchChartData()
  }, [])

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  const handleOrderSubmit = () => {
    if (!price || !amount) {
      alert("Please enter both price and amount.")
      return
    }

    const newOrder = {
      price: parseFloat(price),
      amount: parseFloat(amount),
      type: orderType === "limit" ? "buy" : "sell",
    }

    setOrderBook((prev) => [...prev, newOrder])
    setPrice("")
    setAmount("")
  }

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div
        className={`${
          isFullScreen ? "fixed inset-0 z-50 bg-black overflow-auto" : "container mx-auto px-4 z-10 py-20"
        }`}
        style={isFullScreen ? { width: "100vw", height: "100vh", padding: 0, margin: 0 } : {}}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className={`relative ${isFullScreen ? "col-span-2" : "col-span-3"} bg-gray-900 p-4 rounded-lg`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white">BTC/USD Chart</h2>
              <button
                onClick={toggleFullScreen}
                className="px-3 py-1 rounded-[3px] text-sm bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 flex items-center border border-gray-500"
              >
                {isFullScreen ? (
                  <Minimize2 className="h-5 w-5" />
                ) : (
                  <Maximize2 className="h-5 w-5" />
                )}
              </button>
            </div>
            {chartData ? (
              <Chart
                type="line"
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      type: "time",
                      time: {
                        unit: "day",
                      },
                      grid: {
                        color: "#2D3748",
                      },
                      ticks: {
                        color: "#FFFFFF",
                      },
                    },
                    y: {
                      grid: {
                        color: "#2D3748",
                      },
                      ticks: {
                        color: "#FFFFFF",
                      },
                    },
                  },
                }}
              />
            ) : (
              <div className="text-white text-center">Loading chart...</div>
            )}
          </div>

          {/* Order Book */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-white mb-4">Order Book</h2>
            <div className="h-64 overflow-y-auto">
              {orderBook.length > 0 ? (
                <table className="w-full text-sm text-gray-300">
                  <thead>
                    <tr>
                      <th className="text-left">Price (USD)</th>
                      <th className="text-left">Amount</th>
                      <th className="text-left">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderBook.map((order, index) => (
                      <tr key={index} className="border-t border-gray-700">
                        <td>{order.price.toFixed(2)}</td>
                        <td>{order.amount.toFixed(2)}</td>
                        <td className={order.type === "buy" ? "text-green-500" : "text-red-500"}>{order.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-gray-500 text-center">No orders yet.</div>
              )}
            </div>
          </div>

          {/* Order Placement */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-white mb-4">Place Order</h2>
            <div className="flex gap-4 mb-4">
              <Button
                onClick={() => setOrderType("limit")}
                className={`px-4 py-2 rounded-full ${
                  orderType === "limit" ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300"
                }`}
              >
                Limit Order
              </Button>
              <Button
                onClick={() => setOrderType("market")}
                className={`px-4 py-2 rounded-full ${
                  orderType === "market" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300"
                }`}
              >
                Market Order
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              <input
                type="number"
                placeholder="Price (USD)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600"
              />
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600"
              />
              <Button
                onClick={handleOrderSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-md"
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
