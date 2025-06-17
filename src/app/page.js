import { SignInButton, SignUpButton, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = auth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-indigo-600">
                GroupFund
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {!userId ? (
                <>
                  <SignInButton mode="modal">
                    <Button variant="ghost" size="sm" className="text-sm">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm" className="text-sm">Get Started</Button>
                  </SignUpButton>
                </>
              ) : (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-semibold">
                      Dashboard
                    </Button>
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
              Collect Funds{" "}
              <span className="block sm:inline">Together,{" "}</span>
              <span className="text-indigo-600 relative inline-block">
                Transparently
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-indigo-200 rounded-full"></span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto">
              Whether it's a group trip, team event, or community project, GroupFund makes it easy to collect and track contributions from everyone involved.
            </p>
            <div className="flex justify-center gap-4">
              {!userId ? (
                <SignUpButton mode="modal">
                  <Button size="lg" className="text-base md:text-lg px-6 md:px-8 bg-indigo-600 hover:bg-indigo-700">
                    Start Collecting
                  </Button>
                </SignUpButton>
              ) : (
                <Link href="/create-fund">
                  <Button size="lg" className="text-base md:text-lg px-6 md:px-8 bg-indigo-600 hover:bg-indigo-700">
                    Create Fund
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How GroupFund Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, transparent, and efficient group funding
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl border-2 transition-all duration-300 ${index === 0
                  ? 'bg-indigo-50 border-indigo-200 shadow-lg scale-105'
                  : 'border-gray-200 hover:shadow-lg'
                  }`}
              >
                <div className="text-4xl mb-6">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {step.description}
                </p>
                {index === 0 && (
                  <div className="mt-6">
                    <Link href="/create-fund">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                        Create Fund Now
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose GroupFund?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for groups who value transparency and simplicity
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl border-2 transition-all duration-300 ${index === 0
                  ? 'bg-white border-indigo-200 shadow-lg scale-105'
                  : 'bg-white border-gray-200 hover:shadow-lg'
                  }`}
              >
                <div className="flex items-start">
                  <div className={`text-3xl mr-6 ${index === 0 ? 'text-indigo-600' : 'text-gray-600'}`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Ready to Start Your Group Fund?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of groups who trust GroupFund for transparent and hassle-free fund collection.
          </p>
          {!userId ? (
            <SignUpButton mode="modal">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started Now
              </Button>
            </SignUpButton>
          ) : (
            <Link href="/create-fund">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Create Fund
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

const steps = [
  {
    icon: "🎯",
    title: "Create Your Fund",
    description: "Set up a fund for your group, set a goal, and invite members to contribute.",
  },
  {
    icon: "💸",
    title: "Collect Contributions",
    description: "Members can easily contribute their share through secure payment methods.",
  },
  {
    icon: "📊",
    title: "Track Progress",
    description: "Watch the fund grow in real-time with transparent contribution tracking.",
  },
];

const features = [
  {
    icon: "👥",
    title: "Group Management",
    description: "Easily manage your group members and their contributions in one place.",
  },
  {
    icon: "🔍",
    title: "Real-time Updates",
    description: "See every contribution as it happens with instant notifications.",
  },
  {
    icon: "📱",
    title: "Easy Access",
    description: "Access your fund from anywhere, anytime, on any device.",
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    description: "All transactions are secure and protected with industry-standard encryption.",
  },
];
