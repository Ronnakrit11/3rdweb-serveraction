'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Receipt } from 'lucide-react';
import { sidebarItems } from './sidebar-items';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background/80 backdrop-blur-sm transition-all duration-300 hidden md:block">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b px-3">
          <Link href="/" className="flex items-center gap-2">
            <Receipt className="h-6 w-6 text-purple-500" />
            <span className="font-bold text-lg">Invoice App</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <TooltipProvider delayDuration={0}>
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
          </TooltipProvider>
        </div>
      </div>
    </aside>
  );
}