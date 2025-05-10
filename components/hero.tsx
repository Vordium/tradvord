"use client"

import { useEffect, useRef, useState } from "react"
import { createChart } from "lightweight-charts"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2 } from "lucide-react"

export default function Hero() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [orderType, setOrderType] = useState<"limit" | "market">("limit")
  const [price, setPrice] = useState("")
  const [amount, setAmount] = useState("")
  const [orderBook, setOrderBook] = useState<{ price: number; amount: number; type: "buy" | "sell" }[]>([])

  useEffect(() => {
    if (!chartContainerRef.current) {
      console.error("Chart container is not initialized.")
      return
    }

    console.log("Chart container ref:", chartContainerRef.current) // Debugging step

    try {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.offsetWidth,
        height: 400,
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

      const candleSeries = chart.addCandlestickSeries({
        upColor: "#4CAF50",
        downColor: "#F44336",
        borderDownColor: "#F44336",
        borderUpColor: "#4CAF50",
        wickDownColor: "#F44336",
        wickUpColor: "#4CAF50",
      })

      // Example data
      candleSeries.setData([
        { time: "2023-01-01", open: 100, high: 110, low: 90, close: 105 },
        { time: "2023-01-02", open: 105, high: 115, low: 95, close: 100 },
      ])

      return () => {
        chart.remove()
      }
    } catch (error) {
      console.error("Error initializing chart:", error)
    }
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
    <section className="relative min-h-screen flex flex-col items-center pt-20">
      <div
        className={`${
          isFullScreen ? "fixed inset-0 z-50 bg-black overflow-auto" : "container mx-auto z-10 py-20"
        }`}
        style={isFullScreen ? { width: "100vw", height: "100vh", padding: 0, margin: 0 } : {}}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div
            className={`relative col-span-3 bg-gray-900 p-4 rounded-lg shadow-lg`}
            style={{
              width: "100%",
              height: isFullScreen ? "80vh" : "400px",
              border: "1px solid #4CAF50",
            }}
          >
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
            <div
              ref={chartContainerRef}
              className="w-full h-full bg-gray-900 rounded-lg shadow-lg"
            ></div>
          </div>

          {/* Order Book */}
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
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
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
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