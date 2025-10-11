import { SignInButton, SignUpButton, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { LoadingLink } from "./components/LoadingLink";
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
                    <Button variant="outline" size="sm" className="text-sm border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm" className="text-sm">Get Started</Button>
                  </SignUpButton>
                </>
              ) : (
                <>
                  <LoadingLink href="/dashboard">
                    <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-semibold">
                      Dashboard
                    </Button>
                  </LoadingLink>
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
              Whether it&apos;s a group trip, team event, or community project, GroupFund makes it easy to collect and track contributions from everyone involved.
            </p>
            <div className="flex justify-center gap-4">
              {!userId ? (
                <SignUpButton mode="modal">
                  <Button size="lg" className="text-base md:text-lg px-6 md:px-8 bg-indigo-600 hover:bg-indigo-700">
                    Start Collecting
                  </Button>
                </SignUpButton>
              ) : (
                <LoadingLink href="/create-fund">
                  <Button size="lg" className="text-base md:text-lg px-6 md:px-8 bg-indigo-600 hover:bg-indigo-700">
                    Create Fund
                  </Button>
                </LoadingLink>
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
                    <LoadingLink href="/create-fund">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                        Create Fund Now
                      </Button>
                    </LoadingLink>
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
            <LoadingLink href="/create-fund">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Create Fund
              </Button>
            </LoadingLink>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <Link href="/" className="text-2xl font-bold text-indigo-400 mb-4 block">
                GroupFund
              </Link>
              <p className="text-gray-300 mb-6 max-w-md">
                Collect funds together, transparently. The easiest way to manage group finances
                for trips, events, and shared expenses.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-gray-300 hover:text-white transition-colors">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/refunds" className="text-gray-300 hover:text-white transition-colors">
                    Cancellation & Refunds
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:satishkumr001@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                    satishkumr001@gmail.com
                  </a>
                </li>
                <li>
                  <span className="text-gray-300">Mon-Fri: 9AM-6PM IST</span>
                </li>
                <li>
                  <span className="text-gray-300">Sat: 10AM-4PM IST</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} GroupFund. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms
                </Link>
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy
                </Link>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
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
