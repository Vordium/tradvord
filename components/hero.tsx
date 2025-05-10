"use client"

import { useEffect, useRef, useState } from "react"
import { createChart } from "lightweight-charts"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2 } from "lucide-react"

export default function Hero() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)

  useEffect(() => {
    if (!chartContainerRef.current) {
      console.error("Chart container is not initialized.")
      return
    }

    // Ensure the container has valid dimensions
    const containerWidth = chartContainerRef.current.offsetWidth
    const containerHeight = chartContainerRef.current.offsetHeight || 400
    if (containerWidth === 0 || containerHeight === 0) {
      console.error("Chart container has invalid dimensions.")
      return
    }

    try {
      const chart = createChart(chartContainerRef.current, {
        width: containerWidth,
        height: containerHeight,
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
      const chartData = [
        { time: "2023-01-01", open: 100, high: 110, low: 90, close: 105 },
        { time: "2023-01-02", open: 105, high: 115, low: 95, close: 100 },
      ]

      if (chartData.length === 0) {
        console.error("No data provided for the chart.")
      } else {
        candleSeries.setData(chartData)
      }

      // Resize chart on window resize
      const handleResize = () => {
        if (chartContainerRef.current) {
          chart.applyOptions({
            width: chartContainerRef.current.offsetWidth,
            height: chartContainerRef.current.offsetHeight || 400,
          })
        }
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
        chart.remove()
      }
    } catch (error) {
      console.error("Error initializing chart:", error)
    }
  }, [])

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-20">
      <div
        className={`${
          isFullScreen ? "fixed inset-0 z-50 bg-black overflow-hidden" : "container mx-auto z-10 py-20"
        }`}
        style={isFullScreen ? { width: "100vw", height: "100vh", padding: 0, margin: 0 } : {}}
      >
        <div
          className="relative bg-gray-900 p-4 rounded-lg shadow-lg"
          style={{
            width: "100%",
            height: isFullScreen ? "80vh" : "400px",
            overflow: "hidden", // Prevent overflow
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
            style={{ position: "relative", display: "block" }}
          ></div>
        </div>
      </div>
    </section>
  )
}