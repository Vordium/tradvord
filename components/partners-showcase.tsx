"use client"

import { motion } from "framer-motion"

export default function PartnersShowcase() {
  const partners = [
    {
      name: "CryptoWallet",
      category: "Wallet Provider",
      logo: "/placeholder.svg?height=80&width=200&query=crypto wallet logo",
      description:
        "Integrated wallet solution allowing seamless deposits and withdrawals directly from the Trady platform.",
    },
    {
      name: "DataMetrics",
      category: "Data Provider",
      logo: "/placeholder.svg?height=80&width=200&query=data analytics logo",
      description: "Advanced market data and analytics powering Trady's trading charts and market insights features.",
    },
    {
      name: "SecureVerify",
      category: "KYC Solution",
      logo: "/placeholder.svg?height=80&width=200&query=security verification logo",
      description:
        "Streamlined KYC/AML verification process ensuring regulatory compliance while maintaining user privacy.",
    },
    {
      name: "PayCrypto",
      category: "Payment Processor",
      logo: "/placeholder.svg?height=80&width=200&query=crypto payment logo",
      description:
        "Fiat on-ramp and off-ramp solutions enabling users to easily move between traditional and crypto currencies.",
    },
    {
      name: "TradingBot Pro",
      category: "Trading Tool",
      logo: "/placeholder.svg?height=80&width=200&query=trading bot logo",
      description:
        "Automated trading solutions that integrate with Trady's API to execute sophisticated trading strategies.",
    },
    {
      name: "CryptoNews",
      category: "Media Partner",
      logo: "/placeholder.svg?height=80&width=200&query=crypto news logo",
      description:
        "Real-time news and market insights delivered directly to the Trady platform to keep traders informed.",
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
              Featured
            </span>{" "}
            Partners
          </h2>
          <p className="text-gray-300 text-lg">
            Meet some of the innovative companies that have joined our partner ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 h-full transition-all duration-300 group-hover:border-purple-500/40 group-hover:translate-y-[-5px]">
                <div className="flex items-center mb-4">
                  <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="h-10 mr-4" />
                  <div>
                    <h3 className="text-lg font-bold">{partner.name}</h3>
                    <p className="text-sm text-purple-400">{partner.category}</p>
                  </div>
                </div>
                <p className="text-gray-300">{partner.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-300">
            Interested in becoming a featured partner? <br className="md:hidden" />
            <a href="/contact" className="text-purple-400 hover:text-purple-300 font-medium hover:underline">
              Contact our partnerships team →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
