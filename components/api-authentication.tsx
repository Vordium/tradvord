"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

export default function ApiAuthentication() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <section className="py-20 relative">
      <div className="absolute -top-20 right-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>

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
              Simple Authentication
            </span>{" "}
            & Integration
          </h2>
          <p className="text-gray-300 text-lg">
            Our API uses industry-standard authentication methods and provides SDKs for popular programming languages.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <Tabs defaultValue="rest" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="rest">REST API</TabsTrigger>
                  <TabsTrigger value="websocket">WebSocket</TabsTrigger>
                  <TabsTrigger value="sdk">SDK</TabsTrigger>
                </TabsList>
                <TabsContent value="rest" className="space-y-4">
                  <div className="bg-black/80 rounded-lg p-4 border border-purple-500/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-purple-400 text-sm">Authentication Example</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          copyToClipboard(
                            'curl -X GET "https://api.trady.so/v1/market/ticker" \\\n  -H "X-API-KEY: your_api_key" \\\n  -H "X-API-SIGNATURE: your_signature" \\\n  -H "X-API-TIMESTAMP: 1625097600000"',
                          )
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <pre className="text-gray-300 text-sm overflow-x-auto">
                      <code>
                        {`curl -X GET "https://api.trady.so/v1/market/ticker" \\
  -H "X-API-KEY: your_api_key" \\
  -H "X-API-SIGNATURE: your_signature" \\
  -H "X-API-TIMESTAMP: 1625097600000"`}
                      </code>
                    </pre>
                  </div>

                  <div className="bg-black/80 rounded-lg p-4 border border-purple-500/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-purple-400 text-sm">Response Example</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          copyToClipboard(
                            '{\n  "success": true,\n  "data": {\n    "btc_usdt": {\n      "last_price": "48652.23",\n      "24h_change": "5.34",\n      "24h_high": "49102.56",\n      "24h_low": "47201.89",\n      "24h_volume": "1243.56"\n    }\n  }\n}',
                          )
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <pre className="text-gray-300 text-sm overflow-x-auto">
                      <code>
                        {`{
  "success": true,
  "data": {
    "btc_usdt": {
      "last_price": "48652.23",
      "24h_change": "5.34",
      "24h_high": "49102.56",
      "24h_low": "47201.89",
      "24h_volume": "1243.56"
    }
  }
}`}
                      </code>
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="websocket" className="space-y-4">
                  <div className="bg-black/80 rounded-lg p-4 border border-purple-500/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-purple-400 text-sm">WebSocket Connection</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          copyToClipboard(
                            'const socket = new WebSocket("wss://stream.trady.so/v1");\n\nsocket.onopen = () => {\n  socket.send(JSON.stringify({\n    method: "SUBSCRIBE",\n    params: ["btc_usdt@ticker"],\n    id: 1\n  }));\n};',
                          )
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <pre className="text-gray-300 text-sm overflow-x-auto">
                      <code>
                        {`const socket = new WebSocket("wss://stream.trady.so/v1");

socket.onopen = () => {
  socket.send(JSON.stringify({
    method: "SUBSCRIBE",
    params: ["btc_usdt@ticker"],
    id: 1
  }));
};`}
                      </code>
                    </pre>
                  </div>

                  <div className="bg-black/80 rounded-lg p-4 border border-purple-500/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-purple-400 text-sm">WebSocket Event</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          copyToClipboard(
                            'socket.onmessage = (event) => {\n  const data = JSON.parse(event.data);\n  console.log("Ticker update:", data);\n  // Handle the ticker data\n};',
                          )
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <pre className="text-gray-300 text-sm overflow-x-auto">
                      <code>
                        {`socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("Ticker update:", data);
  // Handle the ticker data
};`}
                      </code>
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="sdk" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/80 rounded-lg p-4 border border-purple-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-400 text-sm">JavaScript/TypeScript</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            copyToClipboard(
                              'import { TradyClient } from "trady-api";\n\nconst client = new TradyClient({\n  apiKey: "your_api_key",\n  apiSecret: "your_api_secret"\n});\n\nconst ticker = await client.getTicker("BTC/USDT");\nconsole.log(ticker);',
                            )
                          }
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <pre className="text-gray-300 text-sm overflow-x-auto">
                        <code>
                          {`import { TradyClient } from "trady-api";

const client = new TradyClient({
  apiKey: "your_api_key",
  apiSecret: "your_api_secret"
});

const ticker = await client.getTicker("BTC/USDT");
console.log(ticker);`}
                        </code>
                      </pre>
                    </div>

                    <div className="bg-black/80 rounded-lg p-4 border border-purple-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-400 text-sm">Python</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            copyToClipboard(
                              'from trady_api import TradyClient\n\nclient = TradyClient(\n    api_key="your_api_key",\n    api_secret="your_api_secret"\n)\n\nticker = client.get_ticker("BTC/USDT")\nprint(ticker)',
                            )
                          }
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <pre className="text-gray-300 text-sm overflow-x-auto">
                        <code>
                          {`from trady_api import TradyClient

client = TradyClient(
    api_key="your_api_key",
    api_secret="your_api_secret"
)

ticker = client.get_ticker("BTC/USDT")
print(ticker)`}
                        </code>
                      </pre>
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-gray-400 mb-4">Available for multiple programming languages</p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <div className="px-4 py-2 bg-purple-900/30 rounded-lg border border-purple-500/30">
                        JavaScript
                      </div>
                      <div className="px-4 py-2 bg-purple-900/30 rounded-lg border border-purple-500/30">Python</div>
                      <div className="px-4 py-2 bg-purple-900/30 rounded-lg border border-purple-500/30">Java</div>
                      <div className="px-4 py-2 bg-purple-900/30 rounded-lg border border-purple-500/30">Go</div>
                      <div className="px-4 py-2 bg-purple-900/30 rounded-lg border border-purple-500/30">Ruby</div>
                      <div className="px-4 py-2 bg-purple-900/30 rounded-lg border border-purple-500/30">PHP</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
