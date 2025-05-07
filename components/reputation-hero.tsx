import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ReputationHero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px] z-0"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full border border-purple-500/20 backdrop-blur-sm">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Introducing Wallet Reputation System
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Build Trust in the{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Crypto Ecosystem
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Our reputation system analyzes on-chain activity, trading behavior, and platform engagement to create a
            comprehensive trust score for every wallet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-lg shadow-glow-md">
              Check Your Reputation
            </Button>
            <Button
              variant="outline"
              className="border-purple-500/30 hover:bg-purple-900/20 text-white px-8 py-6 rounded-lg"
            >
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
