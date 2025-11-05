import { SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CausesPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-white text-[#111718] font-display overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col max-w-[1100px] flex-1">
            {/* Space for overlay navbar */}
            <div className="h-20"></div>

            {/* Hero Section */}
            <main className="w-full">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#6DD5FA] to-[#7928CA] opacity-20"></div>
                <div className="relative">
                  <div className="flex flex-col gap-10 px-6 py-16 sm:px-10 sm:py-24 text-center">
                    <div className="flex flex-col gap-6">
                      <h1 className="text-[#111718] text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">
                        Perfect For Every Collection Need
                      </h1>
                      <p className="text-lg font-medium leading-normal text-[#495057] max-w-3xl mx-auto">
                        From traditional ceremonies to modern crowdfunding - we've got you covered with transparent, secure collection management
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Use Cases Grid */}
              <div className="px-6 sm:px-10 py-16 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {useCases.map((useCase, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-center mb-6">
                        <div className="text-5xl mb-4">{useCase.icon}</div>
                        <h3 className="text-xl font-bold text-[#111718] mb-3">
                          {useCase.title}
                        </h3>
                        <p className="text-[#495057] text-sm mb-4 leading-relaxed">
                          {useCase.description}
                        </p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <p className="text-blue-700 text-xs font-medium text-center">
                          {useCase.benefit}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-[#111718] mb-2">Perfect for:</h4>
                        <ul className="text-xs text-[#495057] space-y-1">
                          {useCase.examples.map((example, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="text-[#0dccf2]">•</span>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Choose Section */}
              <div className="px-6 sm:px-10 py-16 bg-gray-50">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#111718] mb-4">
                    Why RaiseIt Works for Every Cause
                  </h2>
                  <p className="text-lg text-[#495057] max-w-3xl mx-auto">
                    Built specifically for Indian collection needs with features that matter most
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {keyFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-300"
                    >
                      <div className="text-[#0dccf2] mb-4">
                        <span className="text-3xl">{feature.icon}</span>
                      </div>
                      <h4 className="text-[#111718] text-lg font-bold mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-[#60838a] text-sm">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Stories */}
              <div className="px-6 sm:px-10 py-16 bg-white">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#111718] mb-4">
                    Real Success Stories
                  </h2>
                  <p className="text-lg text-[#495057] max-w-3xl mx-auto">
                    See how different causes have benefited from transparent collection management
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {successStories.map((story, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-100"
                    >
                      <div className="text-center mb-4">
                        <div className="text-3xl mb-3">{story.icon}</div>
                        <h4 className="font-bold text-[#111718] text-lg mb-2">
                          {story.title}
                        </h4>
                        <p className="text-[#0dccf2] font-semibold text-xl mb-2">
                          {story.amount}
                        </p>
                        <p className="text-sm text-[#495057] mb-4">
                          {story.description}
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-green-700 text-xs font-medium text-center">
                          "{story.quote}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="relative overflow-hidden bg-gradient-to-r from-[#0dccf2] to-[#7928CA]">
                <div className="relative flex flex-col items-center justify-center gap-8 px-6 py-20 text-center sm:px-10">
                  <div className="flex flex-col gap-6">
                    <h1 className="text-white text-4xl font-bold leading-tight sm:text-5xl max-w-4xl">
                      Ready to Start Your Collection?
                    </h1>
                    <p className="text-white/90 text-xl font-medium max-w-3xl mx-auto">
                      Join thousands who've successfully managed their collections with complete transparency
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <SignUpButton mode="modal">
                      <Button className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-white text-[#0dccf2] text-lg font-bold leading-normal hover:bg-gray-100 shadow-xl">
                        <span className="truncate">Start Your Collection</span>
                      </Button>
                    </SignUpButton>
                    <Link href="/how-it-works">
                      <Button className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-transparent border-2 border-white text-white text-lg font-bold leading-normal hover:bg-white/10 shadow-xl">
                        <span className="truncate">Learn How It Works</span>
                      </Button>
                    </Link>
                  </div>
                  <div className="text-white/70 text-sm">
                    Free to start • No setup fees • Secure payments
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

const useCases = [
  {
    icon: "💍",
    title: "Shagun Collection",
    description: "Traditional wedding ceremonies, engagements, and celebration events with cultural significance",
    benefit: "Track every Shagun with contributor details for lifetime reference and future reciprocity",
    examples: [
      "Wedding ceremonies",
      "Engagement parties", 
      "Anniversary celebrations",
      "Housewarming ceremonies",
      "Baby shower events"
    ]
  },
  {
    icon: "🎊",
    title: "Group Party Fund",
    description: "Office parties, friend gatherings, and celebration events that require group contributions",
    benefit: "Everyone can see contributions and expenses in real-time with complete transparency",
    examples: [
      "Office farewell parties",
      "Birthday celebrations",
      "Festival gatherings",
      "Reunion events",
      "Achievement celebrations"
    ]
  },
  {
    icon: "🙏",
    title: "Religious Events",
    description: "Sacred ceremonies, community religious events, and spiritual gatherings requiring fund collection",
    benefit: "Transparent religious fund collection with proper accountability and devotee trust",
    examples: [
      "Bhandara organization",
      "Jagran ceremonies",
      "Temple donations",
      "Community pujas",
      "Religious festivals"
    ]
  },
  {
    icon: "❤️",
    title: "Donation Drives",
    description: "Charitable causes, medical emergencies, and community support initiatives",
    benefit: "Build donor trust with complete transparency of fund collection and usage",
    examples: [
      "Medical emergency funds",
      "Disaster relief drives",
      "Charity initiatives",
      "Community support",
      "Educational scholarships"
    ]
  },
  {
    icon: "🌱",
    title: "Social Causes",
    description: "Environmental initiatives, community development projects, and social improvement drives",
    benefit: "Rally community support with visible progress tracking and impact measurement",
    examples: [
      "Cleanliness drives",
      "Tree plantation",
      "Community gardens",
      "Infrastructure projects",
      "Awareness campaigns"
    ]
  },
  {
    icon: "🎓",
    title: "Educational Fund",
    description: "Academic support, coaching classes, and educational development initiatives",
    benefit: "Collect and manage educational expenses transparently with clear fund allocation",
    examples: [
      "School fee support",
      "Coaching class funds",
      "Educational materials",
      "Scholarship programs",
      "Study group expenses"
    ]
  },
];

const keyFeatures = [
  {
    icon: "🔒",
    title: "Separate Account",
    description: "No mixing with personal money. Complete visibility and control of collected funds.",
  },
  {
    icon: "📊",
    title: "Auto Tracking",
    description: "No manual work required. Every transaction recorded automatically with details.",
  },
  {
    icon: "♾️",
    title: "Lifetime History",
    description: "Access your collection history anytime, anywhere, forever. Never lose track again.",
  },
  {
    icon: "👥",
    title: "Contributor List",
    description: "See who contributed what amount with complete contact details and timestamps.",
  },
];

const successStories = [
  {
    icon: "💍",
    title: "Wedding Shagun",
    amount: "₹2.5 Lakhs",
    description: "Collected from 150+ relatives and friends with complete transparency",
    quote: "Now I know exactly who gave what for future reference. No more guessing!"
  },
  {
    icon: "🙏",
    title: "Temple Bhandara",
    amount: "₹1.2 Lakhs", 
    description: "Community religious event with 200+ devotees contributing",
    quote: "Devotees trust us more seeing exactly how their donations are being used."
  },
  {
    icon: "❤️",
    title: "Medical Emergency",
    amount: "₹3.8 Lakhs",
    description: "Life-saving surgery fund collected from extended network",
    quote: "The transparency helped us gain trust and collect funds quickly when time mattered most."
  },
];