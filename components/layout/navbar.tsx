'use client';

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/dashboard/sidebar/sidebar-context";

export function Navbar() {
  const { toggleCollapse } = useSidebar();

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleCollapse}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="ml-auto flex items-center gap-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
}