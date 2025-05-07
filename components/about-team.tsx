export default function AboutTeam() {
  const team = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Former quant trader with 10+ years experience in traditional finance and 5+ years in crypto.",
      image: "/placeholder.svg?height=400&width=400&query=professional%20headshot%20of%20tech%20CEO",
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      bio: "Blockchain developer since 2015, previously led engineering teams at major crypto exchanges.",
      image: "/placeholder.svg?height=400&width=400&query=professional%20headshot%20of%20female%20tech%20executive",
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Product",
      bio: "Product leader with experience at top fintech companies, focused on user-centric design.",
      image: "/placeholder.svg?height=400&width=400&query=professional%20headshot%20of%20product%20manager",
    },
    {
      name: "Priya Patel",
      role: "Head of Operations",
      bio: "Operations expert with background in scaling fintech startups globally.",
      image: "/placeholder.svg?height=400&width=400&query=professional%20headshot%20of%20operations%20director",
    },
    {
      name: "David Kim",
      role: "Lead Blockchain Engineer",
      bio: "Core contributor to multiple DeFi protocols, specializing in smart contract security.",
      image: "/placeholder.svg?height=400&width=400&query=professional%20headshot%20of%20software%20engineer",
    },
    {
      name: "Emma Wilson",
      role: "Head of Marketing",
      bio: "Marketing strategist with experience building brands in both traditional finance and crypto.",
      image: "/placeholder.svg?height=400&width=400&query=professional%20headshot%20of%20marketing%20director",
    },
  ]

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We're a diverse team of experts from finance, technology, and design, united by our passion for building the
            future of decentralized finance.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
              <img
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                className="w-full h-[400px] object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-purple-400 font-medium mb-2">{member.role}</p>
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
