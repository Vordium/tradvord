"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function ApiPricing() {
  const plans = [
    {
      name: "Basic",
      description: "For developers getting started",
      price: "Free",
      features: [
        "100 requests per minute",
        "Public market data access",
        "WebSocket market data streams",
        "Basic support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      description: "For active traders and small businesses",
      price: "$99",
      period: "per month",
      features: [
        "1,000 requests per minute",
        "Full market data access",
        "Trading API access",
        "WebSocket order updates",
        "Priority support",
        "Historical data access",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For institutions and high-frequency traders",
      price: "Custom",
      features: [
        "Custom rate limits",
        "Dedicated endpoints",
        "Advanced order types",
        "Dedicated account manager",
        "24/7 premium support",
        "Custom integration support",
        "SLA guarantees",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
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
              API Pricing
            </span>{" "}
            Plans
          </h2>
          <p className="text-gray-300 text-lg">
            Choose the plan that fits your development needs with transparent pricing and no hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
              <div
                className={`relative h-full bg-black/60 backdrop-blur-sm border ${
                  plan.popular ? "border-purple-500/50" : "border-purple-500/20"
                } rounded-xl p-6 flex flex-col transition-all duration-300 group-hover:border-purple-500/40 group-hover:translate-y-[-5px] ${
                  plan.popular ? "shadow-glow-purple" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="text-4xl font-bold">
                    {plan.price}
                    {plan.period && <span className="text-gray-400 text-lg font-normal"> {plan.period}</span>}
                  </div>
                </div>

                <div className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-glow-purple"
                      : "bg-black/60 border border-purple-500/30 hover:bg-purple-900/20 text-white"
                  } rounded-xl py-6`}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
