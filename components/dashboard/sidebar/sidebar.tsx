'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PanelLeftClose, PanelLeftOpen, Receipt } from 'lucide-react';
import { useSidebar } from './sidebar-context';
import { sidebarItems } from './sidebar-items';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleCollapse } = useSidebar();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r bg-background/80 backdrop-blur-sm transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
        'hidden md:block'
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b px-3">
          <div className={cn(
            "flex items-center gap-2 transition-all duration-300",
            isCollapsed ? "justify-center" : "justify-between",
            "w-full"
          )}>
            <Link href="/" className="flex items-center gap-2">
              <div className={cn(
                "transition-all duration-300",
                isCollapsed ? "w-8 h-8" : "w-6 h-6"
              )}>
                <Receipt className={cn(
                  "text-purple-500 transition-all duration-300",
                  isCollapsed ? "h-8 w-8" : "h-6 w-6"
                )} />
              </div>
              {!isCollapsed && (
                <span className="font-bold text-lg">Invoice App</span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={toggleCollapse}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <TooltipProvider delayDuration={0}>
            <nav className="flex flex-col gap-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                if (isCollapsed) {
                  return (
                    <Tooltip key={item.href}>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive ? 'secondary' : 'ghost'}
                          className={cn(
                            'w-full justify-center',
                            isActive && 'bg-muted/50'
                          )}
                          asChild
                        >
                          <Link href={item.href}>
                            <item.icon className="h-5 w-5" />
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right" sideOffset={20}>
                        {item.title}
                      </TooltipContent>
                    </Tooltip>
                  );
                }

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