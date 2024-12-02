'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Receipt, Menu } from 'lucide-react';
import { sidebarItems } from './sidebar-items';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useSidebar } from './sidebar-context';

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleCollapse } = useSidebar();

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2">
          <Receipt className="h-6 w-6 text-purple-500" />
          <span className="font-bold text-lg">Invoice App</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="flex flex-col gap-1">
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
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-20 h-screen w-64 border-r bg-background/80 backdrop-blur-sm transition-all duration-300 lg:block',
          isCollapsed ? '-translate-x-full' : 'translate-x-0',
          'hidden lg:block'
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}