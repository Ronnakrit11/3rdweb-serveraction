import {
  LayoutDashboard,
  FileText,
  Users,
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
] as const;