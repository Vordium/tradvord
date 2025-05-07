"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { BookOpen, LineChart, Code2, HelpCircle } from "lucide-react"

export default function DocumentationContent() {
  const [activeSection, setActiveSection] = useState("getting-started")

  const sections = {
    "getting-started": {
      title: "Getting Started",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Getting Started with Trady</h2>
          <p>
            Welcome to Trady! This guide will help you get started with our platform and make your first trade. Follow
            these steps to begin your trading journey.
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">1. Create an Account</h3>
            <p>
              To start trading on Trady, you need to create an account. Visit our homepage and click on the "Sign Up"
              button. Fill in your details, verify your email address, and set up two-factor authentication for added
              security.
            </p>

            <h3 className="text-xl font-bold">2. Complete KYC Verification</h3>
            <p>
              Before you can deposit funds and start trading, you need to complete our Know Your Customer (KYC)
              verification process. This involves providing identification documents and proof of address. The
              verification process typically takes 1-2 business days.
            </p>

            <h3 className="text-xl font-bold">3. Deposit Funds</h3>
            <p>
              Once your account is verified, you can deposit funds. We support various deposit methods, including bank
              transfers, credit/debit cards, and cryptocurrency deposits. Navigate to the "Wallet" section and select
              "Deposit" to get started.
            </p>

            <h3 className="text-xl font-bold">4. Navigate the Trading Interface</h3>
            <p>
              Our trading interface is designed to be intuitive and powerful. Familiarize yourself with the order book,
              chart types, and order forms. You can access the trading interface by clicking on "Trading" in the main
              navigation.
            </p>

            <h3 className="text-xl font-bold">5. Place Your First Trade</h3>
            <p>
              Ready to make your first trade? Select a trading pair from the market list, analyze the chart, and decide
              whether to buy or sell. You can place market orders for immediate execution or limit orders at a specific
              price.
            </p>
          </div>
        </div>
      ),
    },
    "trading-guide": {
      title: "Trading Guide",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Trading Guide</h2>
          <p>
            This comprehensive guide covers everything you need to know about trading on the Trady platform, from basic
            concepts to advanced trading strategies.
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Understanding Order Types</h3>
            <p>
              Trady supports various order types to give you flexibility in your trading strategy. Here's an overview of
              the main order types:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Market Order:</strong> Executes immediately at the best available price in the market.
              </li>
              <li>
                <strong>Limit Order:</strong> Executes at a specified price or better. Buy limit orders execute at the
                limit price or lower, while sell limit orders execute at the limit price or higher.
              </li>
              <li>
                <strong>Stop Order:</strong> Becomes a market order when a specified price is reached.
              </li>
              <li>
                <strong>Stop-Limit Order:</strong> Combines features of stop and limit orders. When the stop price is
                reached, it becomes a limit order.
              </li>
            </ul>

            <h3 className="text-xl font-bold">Reading Charts</h3>
            <p>
              Our platform offers multiple chart types and technical indicators to help you analyze market trends and
              make informed trading decisions.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Line Charts:</strong> Show the closing price over time, providing a simple view of price
                movements.
              </li>
              <li>
                <strong>Candlestick Charts:</strong> Display open, high, low, and close prices, helping you identify
                patterns and trends.
              </li>
              <li>
                <strong>Depth Charts:</strong> Visualize the order book, showing the volume of buy and sell orders at
                different price levels.
              </li>
            </ul>

            <h3 className="text-xl font-bold">Risk Management</h3>
            <p>Effective risk management is crucial for successful trading. Here are some key principles to follow:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Never invest more than you can afford to lose.</li>
              <li>Use stop-loss orders to limit potential losses.</li>
              <li>Diversify your portfolio across different assets.</li>
              <li>Start with smaller positions until you gain experience.</li>
              <li>Keep a trading journal to track and learn from your trades.</li>
            </ul>
          </div>
        </div>
      ),
    },
    "api-reference": {
      title: "API Reference",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">API Reference</h2>
          <p>
            Our API provides programmatic access to the Trady platform, allowing you to build trading bots, integrate
            with your applications, and automate your trading strategies.
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Authentication</h3>
            <p>
              All API requests require authentication using API keys. You can generate API keys in your account
              settings. Each request must include the following headers:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <code className="bg-purple-900/30 px-2 py-1 rounded">X-API-KEY</code>: Your API key
              </li>
              <li>
                <code className="bg-purple-900/30 px-2 py-1 rounded">X-API-SIGNATURE</code>: HMAC-SHA256 signature
              </li>
              <li>
                <code className="bg-purple-900/30 px-2 py-1 rounded">X-API-TIMESTAMP</code>: Current timestamp in
                milliseconds
              </li>
            </ul>

            <h3 className="text-xl font-bold">Rate Limits</h3>
            <p>
              API requests are subject to rate limits based on your account tier. Rate limits are applied on a
              per-minute basis and are reset at the beginning of each minute.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Basic:</strong> 100 requests per minute
              </li>
              <li>
                <strong>Pro:</strong> 1,000 requests per minute
              </li>
              <li>
                <strong>Enterprise:</strong> Custom rate limits
              </li>
            </ul>

            <h3 className="text-xl font-bold">Error Handling</h3>
            <p>
              The API returns standard HTTP status codes to indicate the success or failure of a request. In case of an
              error, the response body will contain an error code and message.
            </p>
            <pre className="bg-black/80 p-4 rounded-lg border border-purple-500/20 overflow-x-auto">
              <code className="text-gray-300">
                {`{
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Invalid parameter: symbol"
  }
}`}
              </code>
            </pre>

            <p>
              For a complete list of API endpoints and parameters, please visit our{" "}
              <a href="/api" className="text-purple-400 hover:underline">
                API documentation
              </a>
              .
            </p>
          </div>
        </div>
      ),
    },
    faq: {
      title: "FAQ",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <p>Find answers to common questions about using the Trady platform.</p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold">How do I create an account?</h3>
              <p className="mt-2">
                To create an account, click on the "Sign Up" button on the homepage. Fill in your email address,
                password, and other required information. Verify your email address by clicking on the link sent to your
                inbox, and complete the KYC verification process to start trading.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold">What payment methods do you accept?</h3>
              <p className="mt-2">
                We accept various payment methods, including bank transfers, credit/debit cards, and cryptocurrency
                deposits. The available methods may vary depending on your region. You can view all available options in
                the "Deposit" section of your account.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold">How long does the withdrawal process take?</h3>
              <p className="mt-2">
                Cryptocurrency withdrawals are typically processed within 30 minutes, but may take up to 24 hours during
                high volume periods. Fiat withdrawals via bank transfer usually take 1-3 business days, depending on
                your bank and region.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold">What are the trading fees?</h3>
              <p className="mt-2">
                Our trading fees start at 0.1% for makers and 0.2% for takers. Fee discounts are available based on your
                30-day trading volume and Trady token holdings. For a detailed fee schedule, please visit our{" "}
                <a href="/pricing" className="text-purple-400 hover:underline">
                  Pricing page
                </a>
                .
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold">Is my account secure?</h3>
              <p className="mt-2">
                We implement industry-leading security measures, including two-factor authentication, cold storage for
                95% of assets, regular security audits, and insurance coverage. We recommend enabling all security
                features in your account settings for maximum protection.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold">How can I contact support?</h3>
              <p className="mt-2">
                You can contact our support team through the Help Center by submitting a ticket. For premium and
                enterprise users, we offer priority support with faster response times. Our support team is available
                24/7 to assist you with any issues or questions.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  }

  return (
    <section className="py-12 pb-24 relative">
      <div className="absolute -top-20 right-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>

      <div className="container mx-auto px-4">
        <SidebarProvider>
          <div className="flex">
            <Sidebar className="hidden md:flex md:w-64 border-r border-purple-500/10 pr-4">
              <SidebarContent>
                <SidebarGroup className="mt-8">
                  <SidebarGroupLabel className="text-sm font-medium text-gray-400 mb-3 px-3 uppercase tracking-wider">
                    Documentation
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          isActive={activeSection === "getting-started"}
                          onClick={() => setActiveSection("getting-started")}
                          className="flex items-center gap-3 py-2.5 px-3 rounded-md text-sm transition-all duration-200 hover:bg-purple-500/10 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-500/20 data-[active=true]:to-pink-500/20 data-[active=true]:text-white data-[active=true]:shadow-sm"
                        >
                          <BookOpen className="h-4 w-4 text-purple-400" />
                          Getting Started
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          isActive={activeSection === "trading-guide"}
                          onClick={() => setActiveSection("trading-guide")}
                          className="flex items-center gap-3 py-2.5 px-3 rounded-md text-sm transition-all duration-200 hover:bg-purple-500/10 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-500/20 data-[active=true]:to-pink-500/20 data-[active=true]:text-white data-[active=true]:shadow-sm"
                        >
                          <LineChart className="h-4 w-4 text-purple-400" />
                          Trading Guide
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          isActive={activeSection === "api-reference"}
                          onClick={() => setActiveSection("api-reference")}
                          className="flex items-center gap-3 py-2.5 px-3 rounded-md text-sm transition-all duration-200 hover:bg-purple-500/10 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-500/20 data-[active=true]:to-pink-500/20 data-[active=true]:text-white data-[active=true]:shadow-sm"
                        >
                          <Code2 className="h-4 w-4 text-purple-400" />
                          API Reference
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          isActive={activeSection === "faq"}
                          onClick={() => setActiveSection("faq")}
                          className="flex items-center gap-3 py-2.5 px-3 rounded-md text-sm transition-all duration-200 hover:bg-purple-500/10 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-500/20 data-[active=true]:to-pink-500/20 data-[active=true]:text-white data-[active=true]:shadow-sm"
                        >
                          <HelpCircle className="h-4 w-4 text-purple-400" />
                          FAQ
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>

            <div className="w-full md:pl-6">
              <div className="md:hidden mb-6">
                <Tabs value={activeSection} onValueChange={setActiveSection}>
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                    <TabsTrigger value="trading-guide">Trading Guide</TabsTrigger>
                    <TabsTrigger value="api-reference">API Reference</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6"
                >
                  {sections[activeSection as keyof typeof sections].content}
                </motion.div>
              </div>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </section>
  )
}
