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
                CrowdFund
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {!userId ? (
                <>
                  <SignInButton mode="modal">
                    <Button variant="ghost">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button>Get Started</Button>
                  </SignUpButton>
                </>
              ) : (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Fund Your Dreams with{" "}
            <span className="text-indigo-600">CrowdFund</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Join thousands of creators and innovators who are turning their ideas into reality through the power of community funding.
          </p>
          <div className="flex justify-center gap-4">
            {!userId ? (
              <SignUpButton mode="modal">
                <Button size="lg" className="text-lg px-8">
                  Start Your Campaign
                </Button>
              </SignUpButton>
            ) : (
              <Link href="/create-campaign">
                <Button size="lg" className="text-lg px-8">
                  Create Campaign
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose CrowdFund?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="text-indigo-600 text-4xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our community of creators and backers today. Your next big idea is just a click away.
          </p>
          {!userId ? (
            <SignUpButton mode="modal">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started Now
              </Button>
            </SignUpButton>
          ) : (
            <Link href="/create-campaign">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Create Campaign
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: "🚀",
    title: "Quick Setup",
    description: "Launch your campaign in minutes with our easy-to-use platform.",
  },
  {
    icon: "💎",
    title: "Secure Payments",
    description: "Safe and secure payment processing for all transactions.",
  },
  {
    icon: "🌐",
    title: "Global Reach",
    description: "Connect with backers from around the world.",
  },
];
