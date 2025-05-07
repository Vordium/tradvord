export default function AboutHistory() {
  const milestones = [
    {
      year: "2019",
      title: "Founded",
      description: "Trady was founded with a vision to make decentralized trading accessible to everyone.",
    },
    {
      year: "2020",
      title: "Seed Funding",
      description: "Raised $5M in seed funding from leading crypto venture capital firms.",
    },
    {
      year: "2021",
      title: "Beta Launch",
      description: "Launched our beta platform with support for Ethereum and Polygon networks.",
    },
    {
      year: "2022",
      title: "Series A",
      description: "Secured $25M in Series A funding to expand our team and product offerings.",
    },
    {
      year: "2023",
      title: "Multi-chain Support",
      description: "Expanded to support 10+ blockchain networks and introduced advanced trading features.",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Reached 1 million users worldwide and launched institutional trading services.",
    },
  ]

  return (
    <section className="py-20 bg-black/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            From a small team with a big vision to a leading platform in decentralized finance, here's how we've grown
            over the years.
          </p>
        </div>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-purple-600 to-pink-600" />

          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />

                {/* Content */}
                <div className="w-1/2" />
                <div className={`w-1/2 ${index % 2 === 0 ? "pl-12" : "pr-12"}`}>
                  <div className="bg-black/50 p-6 rounded-lg border border-purple-900/50">
                    <div className="text-purple-400 font-bold text-xl mb-2">{milestone.year}</div>
                    <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-gray-300">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
