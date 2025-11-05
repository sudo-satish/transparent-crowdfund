import { SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
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
                          Stop Mixing Personal Money with Collections
                        </h1>
                        <h2 className="text-lg font-medium leading-normal text-[#495057] mb-6">
                          Separate account for all your group collections —
                          Shagun, Donations, Party Funds & More
                        </h2>
                      </div>
                      <SignUpButton mode="modal">
                        <Button className="flex min-w-[84px] max-w-[280px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-6 bg-[#0dccf2] text-white text-lg font-bold leading-normal tracking-[0.015em] hover:bg-[#0bb8d9] shadow-lg">
                          <span className="truncate">
                            Start Collecting Money
                          </span>
                        </Button>
                      </SignUpButton>
                    </div>
                    <div className="w-full lg:w-1/2 flex items-center justify-center">
                      <div className="w-full max-w-lg rounded-xl shadow-2xl p-6 border border-gray-200 bg-white backdrop-blur-[10px]">
                        <div className="space-y-4">
                          <div className="text-center mb-4">
                            <div className="text-3xl mb-2">💰</div>
                            <h3 className="text-lg font-semibold text-[#111718]">
                              Separate Collection Account
                            </h3>
                          </div>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between p-2 bg-green-50 rounded">
                              <span>Shagun Collection</span>
                              <span className="font-semibold text-green-600">
                                ₹25,000
                              </span>
                            </div>
                            <div className="flex justify-between p-2 bg-blue-50 rounded">
                              <span>Party Fund</span>
                              <span className="font-semibold text-blue-600">
                                ₹15,000
                              </span>
                            </div>
                            <div className="flex justify-between p-2 bg-purple-50 rounded">
                              <span>Bhandara Fund</span>
                              <span className="font-semibold text-purple-600">
                                ₹8,000
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Problem-Solution Section */}
              {/* <div className="px-6 sm:px-10 py-16 bg-gray-50">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#111718] mb-4">
                    Why Your Life Gets Easier
                  </h2>
                  <p className="text-lg text-[#495057] max-w-3xl mx-auto">
                    No more confusion, no more manual tracking, no more lost
                    money in personal accounts
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {problemSolutions.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{item.icon}</div>
                        <div>
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
              </div> */}

              {/* Use Cases Section */}
              <div className="px-6 sm:px-10 py-16 bg-white">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#111718] mb-4">
                    Perfect For Every Collection Need
                  </h2>
                  <p className="text-lg text-[#495057] max-w-3xl mx-auto">
                    From traditional ceremonies to modern crowdfunding - we've
                    got you covered
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {useCases.map((useCase, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-3">{useCase.icon}</div>
                        <h3 className="text-xl font-bold text-[#111718] mb-2">
                          {useCase.title}
                        </h3>
                        <p className="text-[#495057] text-sm mb-4">
                          {useCase.description}
                        </p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-blue-700 text-xs font-medium text-center">
                          {useCase.benefit}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Benefits Section */}
              <div className="px-6 sm:px-10 py-16 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#111718] mb-4">
                    Why Choose RaiseIt?
                  </h2>
                  <p className="text-lg text-[#495057] max-w-3xl mx-auto">
                    Built specifically for Indian collection needs with features
                    that matter
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

              {/* How It Works Section */}
              <div className="px-6 sm:px-10 py-16 bg-white">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#111718] mb-4">
                    How It Works - Simple as 1-2-3
                  </h2>
                  <p className="text-lg text-[#495057] max-w-3xl mx-auto">
                    Set up your collection in minutes, not hours
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {steps.map((step, index) => (
                    <div key={index} className="relative">
                      <div className="bg-white p-8 rounded-xl border-2 border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-[#0dccf2]">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#0dccf2] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div className="text-4xl mb-6 text-center">
                          {step.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-[#111718] text-center">
                          {step.title}
                        </h3>
                        <p className="text-[#495057] text-center text-sm">
                          {step.description}
                        </p>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-2xl text-[#0dccf2]">
                          →
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Proof Section */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#6DD5FA] to-[#7928CA] opacity-20"></div>
                <div className="relative px-6 sm:px-10 py-16">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#111718] mb-4">
                      Trusted by Thousands
                    </h2>
                    <p className="text-lg text-[#495057]">
                      Join families and communities across India
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                      <div
                        key={index}
                        className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100"
                      >
                        <div className="text-center mb-4">
                          <div className="text-2xl mb-2">
                            {testimonial.icon}
                          </div>
                          <h4 className="font-bold text-[#111718]">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-[#495057]">
                            {testimonial.role}
                          </p>
                        </div>
                        <p className="text-[#495057] text-sm text-center italic">
                          "{testimonial.quote}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="relative overflow-hidden bg-gradient-to-r from-[#0dccf2] to-[#7928CA]">
                <div className="relative flex flex-col items-center justify-center gap-8 px-6 py-20 text-center sm:px-10">
                  <div className="flex flex-col gap-6">
                    <h1 className="text-white text-4xl font-bold leading-tight sm:text-5xl max-w-4xl">
                      Stop Losing Money in Personal Accounts
                    </h1>
                    <p className="text-white/90 text-xl font-medium max-w-3xl mx-auto">
                      Join 10,000+ families who've collected over ₹50 lakhs with
                      complete transparency
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm">
                      <span>✓ Separate Collection Account</span>
                      <span>✓ Lifetime History</span>
                      <span>✓ No Manual Tracking</span>
                      <span>✓ Complete Visibility</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <SignUpButton mode="modal">
                      <Button className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-white text-[#0dccf2] text-lg font-bold leading-normal hover:bg-gray-100 shadow-xl">
                        <span className="truncate">Start Your Collection</span>
                      </Button>
                    </SignUpButton>
                  </div>
                  <div className="text-white/70 text-sm">
                    Free to start • No setup fees • Secure payments
                  </div>
                </div>
              </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-10">
              <div className="max-w-[1100px] mx-auto">
                {/* Mobile-first layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  {/* Brand Section - Full width on mobile */}
                  <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-3">
                      <Image
                        src="/logo.png"
                        alt="GroupFund"
                        width={126}
                        height={36}
                        className="rounded-sm"
                      />
                    </div>
                    <p className="text-sm text-[#60838a] max-w-xs mx-auto sm:mx-0">
                      Your transparent fundraising partner.
                    </p>
                    {/* Social links on mobile - moved here for better UX */}
                    <div className="flex gap-4 justify-center sm:justify-start lg:hidden">
                      <a
                        href="#"
                        className="text-[#60838a] hover:text-[#0dccf2] transition-colors p-2 hover:bg-white rounded-full"
                        aria-label="Twitter"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="text-[#60838a] hover:text-[#0dccf2] transition-colors p-2 hover:bg-white rounded-full"
                        aria-label="LinkedIn"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Company Links */}
                  <div className="flex flex-col gap-3 sm:gap-4 text-center sm:text-left">
                    <h4 className="font-bold text-[#111718] text-base">Company</h4>
                    <div className="flex flex-col gap-2 sm:gap-3">
                      <Link
                        href="/about"
                        className="text-sm text-[#60838a] hover:text-[#0dccf2] transition-colors py-1"
                      >
                        About
                      </Link>
                      <Link
                        href="/how-it-works"
                        className="text-sm text-[#60838a] hover:text-[#0dccf2] transition-colors py-1"
                      >
                        How it Works
                      </Link>
                      <Link
                        href="/causes"
                        className="text-sm text-[#60838a] hover:text-[#0dccf2] transition-colors py-1"
                      >
                        Causes
                      </Link>
                      <Link
                        href="/contact"
                        className="text-sm text-[#60838a] hover:text-[#0dccf2] transition-colors py-1"
                      >
                        Contact
                      </Link>
                    </div>
                  </div>

                  {/* Legal Links */}
                  <div className="flex flex-col gap-3 sm:gap-4 text-center sm:text-left">
                    <h4 className="font-bold text-[#111718] text-base">Legal</h4>
                    <div className="flex flex-col gap-2 sm:gap-3">
                      <Link
                        href="/terms"
                        className="text-sm text-[#60838a] hover:text-[#0dccf2] transition-colors py-1"
                      >
                        Terms of Service
                      </Link>
                      <Link
                        href="/privacy"
                        className="text-sm text-[#60838a] hover:text-[#0dccf2] transition-colors py-1"
                      >
                        Privacy Policy
                      </Link>
                    </div>
                  </div>

                  {/* Social Links - Desktop only */}
                  <div className="hidden lg:flex flex-col gap-4">
                    <h4 className="font-bold text-[#111718] text-base">Follow Us</h4>
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="text-[#60838a] hover:text-[#0dccf2] transition-colors p-2 hover:bg-white rounded-full"
                        aria-label="Twitter"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="text-[#60838a] hover:text-[#0dccf2] transition-colors p-2 hover:bg-white rounded-full"
                        aria-label="LinkedIn"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 sm:mt-12 border-t border-gray-200 pt-6 sm:pt-8 text-center">
                  <p className="text-sm text-[#60838a]">
                    © 2024 RaiseIt. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

const problemSolutions = [
  {
    icon: "💰",
    title: "Shagun Collection Made Easy",
    problem:
      "Money gets mixed with personal transactions, hard to track who gave what amount",
    solution:
      "Separate account with automatic tracking. See exactly who contributed how much, forever",
  },
  {
    icon: "🎉",
    title: "Party Fund Management",
    problem:
      "Using personal account, manual tracking, confusion about contributions",
    solution:
      "Dedicated party fund with real-time visibility for all contributors",
  },
  {
    icon: "🙏",
    title: "Religious Event Collections",
    problem:
      "Manual tracking of Bhandara/Jagran funds, no transparency for donors",
    solution:
      "Digital collection with complete transparency and automatic record keeping",
  },
  {
    icon: "📱",
    title: "Lifetime History Access",
    problem:
      "Lost records, no way to remember past contributions when attending others' events",
    solution:
      "Permanent history helps you reciprocate appropriately at future events",
  },
];

const useCases = [
  {
    icon: "💍",
    title: "Shagun Collection",
    description: "Wedding ceremonies, engagements, and celebrations",
    benefit:
      "Track every Shagun with contributor details for lifetime reference",
  },
  {
    icon: "🎊",
    title: "Group Party Fund",
    description: "Office parties, friend gatherings, celebration events",
    benefit: "Everyone can see contributions and expenses in real-time",
  },
  {
    icon: "🙏",
    title: "Religious Events",
    description: "Bhandara, Jagran, temple donations, community events",
    benefit: "Transparent religious fund collection with proper accountability",
  },
  {
    icon: "❤️",
    title: "Donation Drives",
    description: "Charity, medical help, disaster relief, community support",
    benefit: "Build trust with complete transparency of fund usage",
  },
  {
    icon: "🌱",
    title: "Crowdfunding",
    description: "Cleanliness drives, social causes, community projects",
    benefit: "Rally community support with visible progress tracking",
  },
  {
    icon: "🎓",
    title: "Educational Fund",
    description: "School fees, coaching classes, educational support",
    benefit: "Collect and manage educational expenses transparently",
  },
];

const keyFeatures = [
  {
    icon: "🔒",
    title: "Separate Account",
    description: "No mixing with personal money. Complete visibility of funds.",
  },
  {
    icon: "📊",
    title: "Auto Tracking",
    description: "No manual work. Every transaction recorded automatically.",
  },
  {
    icon: "♾️",
    title: "Lifetime History",
    description: "Access your collection history anytime, anywhere, forever.",
  },
  {
    icon: "👥",
    title: "Contributor List",
    description: "See who contributed what amount with complete details.",
  },
];

const steps = [
  {
    icon: "📝",
    title: "Create Collection",
    description:
      "Set up your Shagun, party fund, or donation drive in 2 minutes. Add details and share with contributors.",
  },
  {
    icon: "💳",
    title: "Receive Payments",
    description:
      "Contributors pay directly to your separate collection account. No personal account mixing.",
  },
  {
    icon: "📱",
    title: "Track & Manage",
    description:
      "Monitor all contributions in real-time. Access complete history anytime for future reference.",
  },
];

const testimonials = [
  {
    icon: "👰",
    name: "Priya Sharma",
    role: "Bride's Family",
    quote:
      "Collected ₹2.5 lakhs in Shagun without any confusion. Now I know exactly who gave what for future reference!",
  },
  {
    icon: "🎉",
    name: "Rajesh Kumar",
    role: "Office Party Organizer",
    quote:
      "No more awkward conversations about who paid what. Everyone can see the contributions and expenses clearly.",
  },
  {
    icon: "🙏",
    name: "Sunita Devi",
    role: "Temple Committee",
    quote:
      "Our Bhandara collection became so transparent. Devotees trust us more seeing exactly how funds are used.",
  },
];
