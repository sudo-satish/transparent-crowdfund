import { SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
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
                        How RaiseIt Works
                      </h1>
                      <p className="text-lg font-medium leading-normal text-[#495057] max-w-3xl mx-auto">
                        Set up your collection in minutes, not hours. Simple as 1-2-3 with complete transparency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Steps Section */}
              <div className="px-6 sm:px-10 py-16 bg-white">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#111718] mb-4">
                    Simple 3-Step Process
                  </h2>
                  <p className="text-lg text-[#495057] max-w-3xl mx-auto">
                    From setup to collection completion - everything is designed to be effortless
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
                        <p className="text-[#495057] text-center text-sm mb-4">
                          {step.description}
                        </p>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-blue-700 text-xs font-medium text-center">
                            {step.benefit}
                          </p>
                        </div>
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
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

const steps = [
  {
    icon: "📝",
    title: "Create Collection",
    description: "Set up your Shagun, party fund, or donation drive in 2 minutes. Add details and share with contributors.",
    benefit: "Separate account created instantly - no mixing with personal money"
  },
  {
    icon: "💳",
    title: "Receive Payments",
    description: "Contributors pay directly to your separate collection account. No personal account mixing.",
    benefit: "Real-time notifications and automatic tracking of every contribution"
  },
  {
    icon: "📱",
    title: "Track & Manage",
    description: "Monitor all contributions in real-time. Access complete history anytime for future reference.",
    benefit: "Lifetime access to contributor details and transaction history"
  },
]; 
             {/* Detailed Process */}
              <div className="px-6 sm:px-10 py-16 bg-gray-50">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#111718] mb-4">
                    Detailed Process Breakdown
                  </h2>
                  <p className="text-lg text-[#495057] max-w-3xl mx-auto">
                    Understanding each step in detail to make your collection journey smooth
                  </p>
                </div>
                <div className="space-y-12 max-w-4xl mx-auto">
                  {detailedSteps.map((step, index) => (
                    <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-shrink-0">
                          <div className="bg-[#0dccf2] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl">{step.icon}</span>
                            <h3 className="text-2xl font-bold text-[#111718]">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-[#495057] mb-6 leading-relaxed">
                            {step.description}
                          </p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                              <h4 className="font-semibold text-green-800 mb-2">What You Get:</h4>
                              <ul className="text-green-700 text-sm space-y-1">
                                {step.benefits.map((benefit, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                              <h4 className="font-semibold text-blue-800 mb-2">Key Features:</h4>
                              <ul className="text-blue-700 text-sm space-y-1">
                                {step.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="px-6 sm:px-10 py-16 bg-white">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#111718] mb-4">
                    What Makes RaiseIt Different
                  </h2>
                  <p className="text-lg text-[#495057] max-w-3xl mx-auto">
                    Features designed specifically for Indian collection needs
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {keyFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-300"
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

              {/* FAQ Section */}
              <div className="px-6 sm:px-10 py-16 bg-gray-50">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#111718] mb-4">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-lg text-[#495057] max-w-3xl mx-auto">
                    Common questions about how RaiseIt works
                  </p>
                </div>
                <div className="max-w-4xl mx-auto space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                      <h4 className="text-lg font-bold text-[#111718] mb-3">
                        {faq.question}
                      </h4>
                      <p className="text-[#495057] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="relative overflow-hidden bg-gradient-to-r from-[#0dccf2] to-[#7928CA]">
                <div className="relative flex flex-col items-center justify-center gap-8 px-6 py-20 text-center sm:px-10">
                  <div className="flex flex-col gap-6">
                    <h1 className="text-white text-4xl font-bold leading-tight sm:text-5xl max-w-4xl">
                      Ready to Get Started?
                    </h1>
                    <p className="text-white/90 text-xl font-medium max-w-3xl mx-auto">
                      Set up your first collection in under 5 minutes. No technical knowledge required.
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

const detailedSteps = [
  {
    icon: "📝",
    title: "Create Your Collection",
    description: "Start by creating your collection page with all the necessary details. Choose from templates for Shagun, party funds, religious events, or create a custom collection. Add your story, set a target amount, and customize the page to match your event.",
    benefits: [
      "Separate collection account created instantly",
      "Professional collection page with your branding",
      "Multiple payment options for contributors",
      "Mobile-optimized for easy sharing"
    ],
    features: [
      "Pre-built templates for common use cases",
      "Custom branding and messaging",
      "Target amount and deadline settings",
      "Privacy controls for contributor visibility"
    ]
  },
  {
    icon: "💳",
    title: "Share and Collect",
    description: "Share your collection link via WhatsApp, SMS, email, or social media. Contributors can pay instantly using UPI, cards, or net banking. Every payment goes directly to your separate collection account - never mixed with personal money.",
    benefits: [
      "Instant payment processing",
      "Real-time contribution notifications",
      "Automatic receipt generation",
      "Complete payment security"
    ],
    features: [
      "Multiple sharing options",
      "UPI, Card, and Net Banking support",
      "Instant payment confirmations",
      "Automated thank you messages"
    ]
  },
  {
    icon: "📱",
    title: "Track and Manage",
    description: "Monitor your collection progress in real-time through your dashboard. See who contributed, when, and how much. Download reports, send updates to contributors, and access your complete collection history anytime.",
    benefits: [
      "Real-time collection tracking",
      "Detailed contributor analytics",
      "Lifetime history access",
      "Professional reporting"
    ],
    features: [
      "Live dashboard with analytics",
      "Contributor management tools",
      "Export options for records",
      "Mobile app for on-the-go tracking"
    ]
  }
];

const keyFeatures = [
  {
    icon: "🔒",
    title: "Separate Account",
    description: "No mixing with personal money. Complete visibility and control of collected funds."
  },
  {
    icon: "📊",
    title: "Auto Tracking",
    description: "No manual work required. Every transaction recorded automatically with details."
  },
  {
    icon: "♾️",
    title: "Lifetime History",
    description: "Access your collection history anytime, anywhere, forever. Never lose track again."
  },
  {
    icon: "👥",
    title: "Contributor List",
    description: "See who contributed what amount with complete contact details and timestamps."
  }
];

const faqs = [
  {
    question: "How long does it take to set up a collection?",
    answer: "You can create and launch your collection in under 5 minutes. Simply choose a template, add your details, and start sharing the link with contributors."
  },
  {
    question: "Is my money safe and separate from personal accounts?",
    answer: "Yes, absolutely. Every collection gets its own separate account that's completely isolated from your personal banking. You have full control and visibility over these funds."
  },
  {
    question: "Can contributors see who else has contributed?",
    answer: "You can choose the privacy level. Contributors can see the total amount and number of contributors, but individual contributor details are only visible to you unless you choose to make them public."
  },
  {
    question: "What payment methods do you support?",
    answer: "We support all major payment methods including UPI (GPay, PhonePe, Paytm), credit/debit cards, net banking, and digital wallets for maximum convenience."
  },
  {
    question: "How do I access my collection history later?",
    answer: "Your collection history is stored permanently in your account. You can access it anytime through your dashboard, download reports, and even reference past collections when creating new ones."
  },
  {
    question: "Are there any fees for using RaiseIt?",
    answer: "RaiseIt is free to start and use. We only charge a small transaction fee (similar to other payment platforms) when money is collected, ensuring our interests are aligned with your success."
  }
];