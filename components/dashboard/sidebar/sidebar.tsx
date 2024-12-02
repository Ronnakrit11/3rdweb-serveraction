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
    <div
      className={cn(
        'flex flex-col h-screen border-r bg-muted/10 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="p-4 flex items-center justify-between">
        <Link 
          href="/" 
          className={cn(
            "flex items-center gap-2",
            isCollapsed ? "justify-center w-full" : ""
          )}
        >
          <Receipt className="h-6 w-6 text-purple-500 shrink-0" />
          {!isCollapsed && (
            <span className="font-bold text-xl whitespace-nowrap">Invoice App</span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", isCollapsed && "absolute right-2")}
          onClick={toggleCollapse}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="flex-1 flex flex-col gap-2 p-4">
        <TooltipProvider delayDuration={0}>
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-start gap-2',
                      isActive && 'bg-muted/50',
                      isCollapsed && 'justify-center'
                    )}
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!isCollapsed && <span className="whitespace-nowrap">{item.title}</span>}
                    </Link>
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    {item.title}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
}