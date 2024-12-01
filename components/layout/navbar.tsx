"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";
import { SignInButton, useAuth } from "@clerk/nextjs";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 8L27.7128 27H4.2872L16 8Z" fill="white"/>
              </svg>
              <span className="font-bold text-xl">thirdweb</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="#" 
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Products
            </Link>
            <Link 
              href="#" 
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Solutions
            </Link>
            <Link 
              href="#" 
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Developer
            </Link>
            <Link 
              href="/pricing" 
              className={`text-sm font-medium transition-colors ${
                isActive("/pricing") ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Pricing
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              Contact Us
            </Button>
            {!isSignedIn && (
              <SignInButton mode="modal">
                <Button className="gradient-border bg-white/5 hover:bg-white/10 transition-colors text-gray-300 hover:text-white">
                  Login
                </Button>
              </SignInButton>
            )}
            {isSignedIn && <UserButton />}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="#" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md">
              Products
            </Link>
            <Link href="#" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md">
              Solutions
            </Link>
            <Link href="#" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md">
              Developer
            </Link>
            <Link 
              href="/pricing" 
              className={`block px-3 py-2 text-base font-medium hover:bg-white/5 rounded-md ${
                isActive("/pricing") ? "text-white bg-white/5" : "text-gray-300 hover:text-white"
              }`}
            >
              Pricing
            </Link>
            <div className="px-3 py-2">
              {!isSignedIn && (
                <SignInButton mode="modal">
                  <Button className="w-full mb-2 gradient-border bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white">
                    Login
                  </Button>
                </SignInButton>
              )}
              {isSignedIn && <UserButton />}
              <Button variant="outline" className="w-full text-gray-300 hover:text-white">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}