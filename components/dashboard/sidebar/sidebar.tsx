'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Receipt, Menu } from 'lucide-react';
import { sidebarItems } from './sidebar-items';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <Receipt className="h-6 w-6 text-purple-500" />
          <span className="font-bold text-lg">Invoice App</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-1 px-4 py-4">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Button
                key={item.href}
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-2',
                  isActive && 'bg-muted/50'
                )}
                asChild
                onClick={() => setIsMobileOpen(false)}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button - Fixed Position */}
      <div className="fixed top-4 left-4 z-40 lg:hidden">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open Menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-20 hidden h-screen w-64 border-r bg-background/80 backdrop-blur-sm lg:block">
        <SidebarContent />
      </aside>

      {/* Content Padding for Mobile Menu Button */}
      <div className="h-16 lg:hidden" />
    </>
  );
}