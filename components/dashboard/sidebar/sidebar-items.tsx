import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    Package,
  } from 'lucide-react';
  
  export const sidebarItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Invoices',
      href: '/dashboard/invoices',
      icon: FileText,
    },
    {
      title: 'Services',
      href: '/dashboard/services',
      icon: Package,
    },
    {
      title: 'Customers',
      href: '/dashboard/customers',
      icon: Users,
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
    },
  ];