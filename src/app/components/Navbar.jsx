"use client";

import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
  useClerk, // changed
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { LoadingLink } from "../components/LoadingLink";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk(); // changed
  const router = useRouter();
  const pathname = usePathname();
  const showDashboardButton = pathname !== "/dashboard" && pathname !== "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(); // sign out via Clerk
      router.push("/"); // then redirect to home
    } catch (err) {
      console.error("Sign out failed", err);
    }
  };

  // Close sidebar when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-[#0dccf2] flex items-center gap-2"
              >
               <Image
                  src="/logo.png"
                  alt="GroupFund"
                  width={130}
                  height={72}
                  className="rounded-sm"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {/* Navigation Links */}
              <div className="flex items-center gap-6">
                <Link
                  href="/causes"
                  className="text-sm text-gray-600 hover:text-[#0dccf2] transition-colors"
                >
                  Causes
                </Link>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-[#0dccf2] transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/how-it-works"
                  className="text-sm text-gray-600 hover:text-[#0dccf2] transition-colors"
                >
                  How it Works
                </Link>
              </div>
              
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
                  <span className="text-sm text-gray-600 hidden lg:block">
                    Welcome, {user?.firstName || user?.username || "User"}
                  </span>
                  <UserButton afterSignOutUrl="/" />
                  <Button onClick={handleLogout} variant="outline" size="sm" className="text-sm">
                    Logout
                  </Button>
                </>
              )}
              {showDashboardButton && (
                <LoadingLink
                  href="/dashboard"
                  className="inline-flex items-center"
                >
                  <Button size="sm" className="text-sm bg-[#0dccf2] hover:bg-[#0bb8d9] text-white flex items-center gap-2">
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
                    <span className="hidden lg:inline">Dashboard</span>
                  </Button>
                </LoadingLink>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0dccf2] transition-colors duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`block h-6 w-6 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {!isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="GroupFund"
                  width={120}
                  height={54}
                  className="rounded-sm"
                />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex flex-col h-full pt-6 pb-4 px-4 space-y-6">
              {/* Navigation Links */}
              <div className="flex flex-col space-y-4">
                <Link
                  href="/causes"
                  className="text-gray-600 hover:text-[#0dccf2] transition-colors py-2 px-3 rounded-md hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Causes
                </Link>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-[#0dccf2] transition-colors py-2 px-3 rounded-md hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/how-it-works"
                  className="text-gray-600 hover:text-[#0dccf2] transition-colors py-2 px-3 rounded-md hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  How it Works
                </Link>
              </div>
              
              {/* Divider */}
              <div className="border-t border-gray-200"></div>
              
              {!isSignedIn ? (
                <div className="flex flex-col space-y-4">
                  <SignInButton mode="modal">
                    <Button
                      variant="outline"
                      className="w-full justify-center border-[#0dccf2] text-[#0dccf2] hover:bg-[#0dccf2]/10 transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button
                      className="w-full justify-center bg-[#0dccf2] hover:bg-[#0bb8d9] text-white transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              ) : (
                <div className="flex flex-col space-y-6">
                  {/* User Info */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <UserButton afterSignOutUrl="/" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.firstName || user?.username || "User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.emailAddresses?.[0]?.emailAddress}
                      </p>
                    </div>
                  </div>

                  {/* Navigation Items */}
                  <div className="flex flex-col space-y-3">
                    {showDashboardButton && (
                      <LoadingLink
                        href="/dashboard"
                        className="block"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button className="w-full justify-start bg-[#0dccf2] hover:bg-[#0bb8d9] text-white flex items-center gap-3 h-12 transition-colors duration-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
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
                    
                    <Button 
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }} 
                      variant="outline" 
                      className="w-full justify-start h-12 flex items-center gap-3 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16,17 21,12 16,7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
