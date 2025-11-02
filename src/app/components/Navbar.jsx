"use client";

import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
  SignOutButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { LoadingLink } from "../components/LoadingLink";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { user, isSignedIn } = useUser();
  const pathname = usePathname();
  const showDashboardButton = pathname !== "/dashboard" && pathname !== "/";

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-[#0dccf2] flex items-center gap-2"
            >
              <span className="text-2xl">🏷️</span>
              GroupFund
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {!isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm border-[#0dccf2] text-[#0dccf2] hover:bg-[#0dccf2]/10"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    size="sm"
                    className="text-sm bg-[#0dccf2] hover:bg-[#0bb8d9] text-white"
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </>
            ) : (
              <>
                <span className="text-sm text-gray-600">
                  Welcome, {user?.firstName || user?.username || "User"}
                </span>
                <UserButton afterSignOutUrl="/" />
                <SignOutButton afterSignOutUrl="/">
                  <Button variant="outline" size="sm" className="text-sm">
                    Logout
                  </Button>
                </SignOutButton>
              </>
            )}
            {showDashboardButton && (
              <LoadingLink
                href="/dashboard"
                className="inline-flex items-center"
              >
                <Button size="sm" className="text-sm bg-[#0dccf2] hover:bg-[#0bb8d9] text-white flex items-center gap-2">
                  {/* simple dashboard icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="7" height="9" rx="1" />
                    <rect x="14" y="3" width="7" height="5" rx="1" />
                    <rect x="14" y="12" width="7" height="9" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                  </svg>
                  Dashboard
                </Button>
              </LoadingLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
