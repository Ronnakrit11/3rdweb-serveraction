'use client';

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/dashboard/sidebar/sidebar-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, SignInButton } from "@clerk/nextjs";

export function Navbar() {
  const pathname = usePathname();
  const { toggleCollapse } = useSidebar();
  const { isSignedIn } = useAuth();

  const menuItems = [
    { label: "Products", href: "/products" },
    { label: "Solutions", href: "/solutions" },
    { label: "Developer", href: "/developer" },
    { label: "Pricing", href: "/pricing" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            {isSignedIn && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleCollapse}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">Invoice App</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {isSignedIn && (
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  pathname.startsWith("/dashboard")
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <Button className="gradient-border bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white">
                  Login
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
    
  );
}