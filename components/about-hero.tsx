import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutHero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 z-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
              About Copto
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Building the future of decentralized trading and financial infrastructure
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/careers">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
