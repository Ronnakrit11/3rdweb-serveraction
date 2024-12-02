'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface SidebarContextType {
  isOpen: boolean;
  isDesktop: boolean;
  toggle: () => void;
  close: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if window is desktop size
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setIsOpen(window.innerWidth >= 1024);
    };

    // Set initial value
    checkIsDesktop();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsDesktop);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, isDesktop, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}