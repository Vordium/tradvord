export default function AboutInvestors() {
  const investors = [
    {
      name: "Blockchain Capital",
      logo: "/placeholder.svg?key=28g3x",
    },
    {
      name: "Paradigm",
      logo: "/placeholder.svg?height=100&width=200&query=paradigm%20venture%20logo",
    },
    {
      name: "a16z Crypto",
      logo: "/placeholder.svg?height=100&width=200&query=a16z%20crypto%20logo",
    },
    {
      name: "Coinbase Ventures",
      logo: "/placeholder.svg?height=100&width=200&query=coinbase%20ventures%20logo",
    },
    {
      name: "Polychain Capital",
      logo: "/placeholder.svg?height=100&width=200&query=polychain%20capital%20logo",
    },
    {
      name: "Pantera Capital",
      logo: "/placeholder.svg?height=100&width=200&query=pantera%20capital%20logo",
    },
  ]

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Backed By The Best</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We're proud to be supported by leading investors in blockchain and financial technology.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {investors.map((investor, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-black/50 p-6 rounded-lg border border-purple-900/50 w-full h-32 flex items-center justify-center mb-4">
                <img src={investor.logo || "/placeholder.svg"} alt={investor.name} className="max-h-16 max-w-full" />
              </div>
              <h3 className="text-lg font-medium">{investor.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
