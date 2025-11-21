"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/auth-context";

export default function Navbar() {
  const { signOut, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-50 bg-slate-900 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              StreamMatch
            </span>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/matches"
                className="text-gray-300 hover:text-pink-400 font-medium transition-colors duration-200"
              >
                Discover
              </Link>
              <Link
                href="/matches/list"
                className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Matches
              </Link>
              <Link
                href="/chat"
                className="text-gray-300 hover:text-green-400 font-medium transition-colors duration-200"
              >
                Messages
              </Link>
              <Link
                href="/profile"
                className="text-gray-300 hover:text-purple-400 font-medium transition-colors duration-200"
              >
                Profile
              </Link>
            </div>
          )}

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            {user ? (
              <button
                onClick={signOut}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </button>
            ) : (
                <div>
                    
                </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 pb-4 mt-2 border-t border-gray-700 pt-4">

            {user ? (
              <>
                {/* Mobile Navigation Links */}
                <Link
                  href="/matches"
                  className="text-gray-300 hover:text-pink-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Discover
                </Link>
                <Link
                  href="/matches/list"
                  className="text-gray-300 hover:text-blue-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Matches
                </Link>
                <Link
                  href="/chat"
                  className="text-gray-300 hover:text-green-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Messages
                </Link>
                <Link
                  href="/profile"
                  className="text-gray-300 hover:text-purple-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>

                {/* Mobile SignOut */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut();
                  }}
                  className="w-full text-left px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
                <div>

                </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
