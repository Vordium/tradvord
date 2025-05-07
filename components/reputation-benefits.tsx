import type React from "react"
import { Check, Zap, Shield, Award, Users, TrendingUp } from "lucide-react"

export default function ReputationBenefits() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Benefits of a High Reputation</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Building a strong reputation on our platform unlocks exclusive benefits and opportunities. Improve your
              score to access these premium features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BenefitCard
              icon={<Shield className="h-10 w-10 text-purple-400" />}
              title="Trust Badges"
              description="Display verified trust badges on your profile that showcase your reputation level to other users."
              requiredScore={650}
            />

            <BenefitCard
              icon={<Zap className="h-10 w-10 text-purple-400" />}
              title="Lower Fees"
              description="Enjoy reduced trading fees based on your reputation level, with up to 50% discount for excellent scores."
              requiredScore={700}
            />

            <BenefitCard
              icon={<Award className="h-10 w-10 text-purple-400" />}
              title="Featured Trader"
              description="Get featured in our leaderboards and recommended traders list to attract more followers."
              requiredScore={750}
            />

            <BenefitCard
              icon={<Users className="h-10 w-10 text-purple-400" />}
              title="Higher Copy Limits"
              description="Increase the number of users who can copy your trades and earn more from copy trading fees."
              requiredScore={700}
            />

            <BenefitCard
              icon={<TrendingUp className="h-10 w-10 text-purple-400" />}
              title="Advanced Analytics"
              description="Access premium analytics tools to improve your trading strategy and reputation score."
              requiredScore={650}
            />

            <BenefitCard
              icon={<Zap className="h-10 w-10 text-purple-400" />}
              title="Priority Support"
              description="Get priority customer support with faster response times and dedicated account managers."
              requiredScore={800}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

interface BenefitCardProps {
  icon: React.ReactNode
  title: string
  description: string
  requiredScore: number
}

function BenefitCard({ icon, title, description, requiredScore }: BenefitCardProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-xl p-6 shadow-glow-sm hover:shadow-glow-md transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm mb-4">{description}</p>
      <div className="flex items-center text-sm">
        <Check className="h-4 w-4 text-green-400 mr-2" />
        <span>
          Required Score: <span className="font-medium text-purple-400">{requiredScore}+</span>
        </span>
      </div>
    </div>
  )
}
