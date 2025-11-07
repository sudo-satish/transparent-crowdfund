import { SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const missionPoints = [
  {
    icon: "🎯",
    title: "Transparency First",
    description: "Every rupee collected and spent should be visible to all contributors, building trust and accountability in every collection."
  },
  {
    icon: "🔒",
    title: "Separate & Secure", 
    description: "Collections should never mix with personal money. Dedicated accounts ensure clarity and prevent confusion."
  },
  {
    icon: "📱",
    title: "Simple & Accessible",
    description: "Technology should make collections easier, not complicated. Simple tools that anyone can use without technical knowledge."
  }
];

const problemSolutions = [
  {
    icon: "💰",
    title: "Shagun Collection Made Easy",
    problem: "Money gets mixed with personal transactions, hard to track who gave what amount",
    solution: "Separate account with automatic tracking. See exactly who contributed how much, forever"
  },
  {
    icon: "🎉",
    title: "Party Fund Management", 
    problem: "Using personal account, manual tracking, confusion about contributions",
    solution: "Dedicated party fund with real-time visibility for all contributors"
  },
  {
    icon: "🙏",
    title: "Religious Event Collections",
    problem: "Manual tracking of Bhandara/Jagran funds, no transparency for donors",
    solution: "Digital collection with complete transparency and automatic record keeping"
  },
  {
    icon: "📱",
    title: "Lifetime History Access",
    problem: "Lost records, no way to remember past contributions when attending others' events",
    solution: "Permanent history helps you reciprocate appropriately at future events"
  }
];

const values = [
  {
    icon: "🔍",
    title: "Transparency",
    description: "Complete visibility into every transaction and fund usage for all stakeholders."
  },
  {
    icon: "🤝",
    title: "Trust",
    description: "Building lasting relationships through reliable, secure, and honest collection management."
  },
  {
    icon: "⚡",
    title: "Simplicity",
    description: "Making complex collection management simple and accessible for everyone."
  },
  {
    icon: "🛡️",
    title: "Security",
    description: "Protecting your funds and data with bank-grade security and compliance."
  }
];

const impactStats = [
  {
    number: "10,000+",
    label: "Happy Families",
    description: "Trust RaiseIt for their collections"
  },
  {
    number: "₹50L+",
    label: "Collected",
    description: "Total funds managed transparently"
  },
  {
    number: "25,000+",
    label: "Collections",
    description: "Successfully completed"
  },
  {
    number: "99.9%",
    label: "Uptime",
    description: "Reliable service guarantee"
  }
];

export default function AboutPage() {
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
                  <div className="flex flex-col gap-10 px-6 py-16 sm:px-10 sm:py-24 lg:flex-row lg:items-center">
                    <div className="flex flex-col gap-6 lg:justify-center w-full lg:w-1/2">
                      <div className="flex flex-col gap-4 text-left">
                        <h1 className="text-[#111718] text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">
                          About RaiseIt
                        </h1>
                        <h2 className="text-lg font-medium leading-normal text-[#495057] mb-6">
                          Your transparent fundraising partner, built specifically for Indian collection needs
                        </h2>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 flex items-center justify-center">
                      <div className="w-full max-w-lg rounded-xl shadow-2xl p-8 border border-gray-200 bg-white backdrop-blur-[10px]">
                        <div className="text-center">
                          <Image
                            src="/logo.png"
                            alt="RaiseIt Logo"
                            width={200}
                            height={72}
                            className="mx-auto mb-4"
                          />
                          <p className="text-[#495057] text-sm">
                            Empowering transparent collections since 2024
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mission Section */}
              <div className="px-6 sm:px-10 py-16 bg-gray-50">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#111718] mb-4">
                    Our Mission
                  </h2>
                  <p className="text-lg text-[#495057] max-w-4xl mx-auto leading-relaxed">
                    We believe that every collection - whether it's Shagun for a wedding, funds for a community event, 
                    or donations for a cause - deserves complete transparency and trust. Our mission is to eliminate 
                    the confusion, manual tracking, and mixing of personal money that happens in traditional collection methods.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {missionPoints.map((point, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center"
                    >
                      <div className="text-4xl mb-4">{point.icon}</div>
                      <h3 className="text-xl font-bold text-[#111718] mb-3">
                        {point.title}
                      </h3>
                      <p className="text-[#495057] text-sm leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Problem We Solve */}
              <div className="px-6 sm:px-10 py-16 bg-white">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#111718] mb-4">
                    The Problem We Solve
                  </h2>
                  <p className="text-lg text-[#495057] max-w-3xl mx-auto">
                    Traditional collection methods create confusion, lack transparency, and mix personal money with collections
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {problemSolutions.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{item.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#111718] mb-3">
                            {item.title}
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                              <p className="text-red-700 text-sm font-medium">
                                Before: {item.problem}
                              </p>
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                              <p className="text-green-700 text-sm font-medium">
                                Now: {item.solution}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Our Values */}
              <div className="px-6 sm:px-10 py-16 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#111718] mb-4">
                    Our Values
                  </h2>
                  <p className="text-lg text-[#495057] max-w-3xl mx-auto">
                    The principles that guide everything we do at RaiseIt
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {values.map((value, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-300"
                    >
                      <div className="text-[#0dccf2] mb-4">
                        <span className="text-3xl">{value.icon}</span>
                      </div>
                      <h4 className="text-[#111718] text-lg font-bold mb-2">
                        {value.title}
                      </h4>
                      <p className="text-[#60838a] text-sm">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Stats */}
              <div className="px-6 sm:px-10 py-16 bg-white">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#111718] mb-4">
                    Our Impact
                  </h2>
                  <p className="text-lg text-[#495057] max-w-3xl mx-auto">
                    Numbers that show the trust and success of our community
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                  {impactStats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center"
                    >
                      <div className="text-4xl font-bold text-[#0dccf2] mb-2">
                        {stat.number}
                      </div>
                      <div className="text-[#111718] font-semibold mb-1">
                        {stat.label}
                      </div>
                      <div className="text-[#495057] text-sm">
                        {stat.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Section */}
              <div className="px-6 sm:px-10 py-16 bg-gray-50">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#111718] mb-4">
                    Built for India, by Indians
                  </h2>
                  <p className="text-lg text-[#495057] max-w-3xl mx-auto">
                    We understand Indian collection culture because we live it. From Shagun traditions to 
                    community Bhandaras, we've experienced the challenges firsthand and built solutions that work.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
                  <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="text-3xl mb-3">🇮🇳</div>
                      <h4 className="font-bold text-[#111718] mb-2">Indian-First Design</h4>
                      <p className="text-[#495057] text-sm">Built specifically for Indian collection needs and cultural practices</p>
                    </div>
                    <div>
                      <div className="text-3xl mb-3">🤝</div>
                      <h4 className="font-bold text-[#111718] mb-2">Community Focused</h4>
                      <p className="text-[#495057] text-sm">Understanding the importance of trust and transparency in Indian communities</p>
                    </div>
                    <div>
                      <div className="text-3xl mb-3">💡</div>
                      <h4 className="font-bold text-[#111718] mb-2">Innovation Driven</h4>
                      <p className="text-[#495057] text-sm">Constantly improving based on real user feedback and needs</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="relative overflow-hidden bg-gradient-to-r from-[#0dccf2] to-[#7928CA]">
                <div className="relative flex flex-col items-center justify-center gap-8 px-6 py-20 text-center sm:px-10">
                  <div className="flex flex-col gap-6">
                    <h1 className="text-white text-4xl font-bold leading-tight sm:text-5xl max-w-4xl">
                      Join Our Mission
                    </h1>
                    <p className="text-white/90 text-xl font-medium max-w-3xl mx-auto">
                      Be part of the transparent collection revolution. Start your collection today.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <SignUpButton mode="modal">
                      <Button className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-white text-[#0dccf2] text-lg font-bold leading-normal hover:bg-gray-100 shadow-xl">
                        <span className="truncate">Start Your Collection</span>
                      </Button>
                    </SignUpButton>
                    <Link href="/causes">
                      <Button className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-transparent border-2 border-white text-white text-lg font-bold leading-normal hover:bg-white/10 shadow-xl">
                        <span className="truncate">Explore Use Cases</span>
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