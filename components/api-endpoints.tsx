"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ApiEndpoints() {
  const endpoints = [
    {
      category: "Market Data",
      items: [
        {
          name: "GET /v1/market/ticker",
          description: "Get ticker information for all trading pairs or a specific pair",
          parameters: "symbol (optional): Trading pair symbol (e.g., BTC/USDT)",
          response: "Current price, 24h change, high, low, and volume",
        },
        {
          name: "GET /v1/market/orderbook",
          description: "Get order book data for a specific trading pair",
          parameters: "symbol: Trading pair symbol, depth (optional): Order book depth",
          response: "Bids and asks with price and quantity",
        },
        {
          name: "GET /v1/market/trades",
          description: "Get recent trades for a specific trading pair",
          parameters: "symbol: Trading pair symbol, limit (optional): Number of trades to return",
          response: "Recent trades with price, quantity, and timestamp",
        },
        {
          name: "GET /v1/market/klines",
          description: "Get candlestick data for a specific trading pair",
          parameters:
            "symbol: Trading pair symbol, interval: Candlestick interval, limit (optional): Number of candles",
          response: "Open, high, low, close, and volume data for each candle",
        },
      ],
    },
    {
      category: "Trading",
      items: [
        {
          name: "POST /v1/order/new",
          description: "Place a new order",
          parameters:
            "symbol: Trading pair, side: buy/sell, type: limit/market, quantity, price (for limit orders), client_order_id (optional)",
          response: "Order ID, status, and details",
        },
        {
          name: "DELETE /v1/order/cancel",
          description: "Cancel an existing order",
          parameters: "order_id or client_order_id",
          response: "Confirmation of cancellation",
        },
        {
          name: "GET /v1/order/status",
          description: "Check the status of an order",
          parameters: "order_id or client_order_id",
          response: "Order status and details",
        },
        {
          name: "GET /v1/orders/open",
          description: "Get all open orders",
          parameters: "symbol (optional): Trading pair symbol",
          response: "List of open orders with details",
        },
      ],
    },
    {
      category: "Account",
      items: [
        {
          name: "GET /v1/account/balance",
          description: "Get account balance information",
          parameters: "asset (optional): Specific asset to query",
          response: "Available and locked balances for each asset",
        },
        {
          name: "GET /v1/account/trades",
          description: "Get trade history for the account",
          parameters: "symbol (optional): Trading pair, start_time, end_time, limit (optional)",
          response: "List of trades with details",
        },
        {
          name: "GET /v1/account/deposits",
          description: "Get deposit history",
          parameters: "asset (optional), status (optional), start_time, end_time, limit (optional)",
          response: "List of deposits with details",
        },
        {
          name: "GET /v1/account/withdrawals",
          description: "Get withdrawal history",
          parameters: "asset (optional), status (optional), start_time, end_time, limit (optional)",
          response: "List of withdrawals with details",
        },
      ],
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      <div className="absolute -top-20 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-pink-500 rounded-full blur-[100px] opacity-20"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
              Comprehensive API
            </span>{" "}
            Endpoints
          </h2>
          <p className="text-gray-300 text-lg">
            Access market data, execute trades, and manage your account with our extensive API endpoints.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <Accordion type="single" collapsible className="space-y-6">
                {endpoints.map((category, categoryIndex) => (
                  <motion.div
                    key={categoryIndex}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        {category.category}
                      </h3>
                    </div>

                    {category.items.map((endpoint, endpointIndex) => (
                      <AccordionItem
                        key={endpointIndex}
                        value={`${categoryIndex}-${endpointIndex}`}
                        className="border border-purple-500/20 rounded-lg mb-4 overflow-hidden"
                      >
                        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-purple-900/20 data-[state=open]:bg-purple-900/20">
                          <div className="text-left">
                            <div className="font-mono text-purple-400">{endpoint.name}</div>
                            <div className="text-sm text-gray-400 mt-1">{endpoint.description}</div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-3 bg-black/40">
                          <div className="space-y-3">
                            <div>
                              <div className="text-sm font-medium text-gray-300">Parameters:</div>
                              <div className="text-sm text-gray-400">{endpoint.parameters}</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-300">Response:</div>
                              <div className="text-sm text-gray-400">{endpoint.response}</div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
