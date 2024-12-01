"use client";

import { Card } from "@/components/ui/card";
import { 
  Activity, 
  CreditCard, 
  DollarSign, 
  Users 
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

interface DashboardStatsProps {
  totalAmount: number;
  totalInvoices: number;
  paidInvoices: number;
  pendingAmount: number;
}

export function DashboardStats({ 
  totalAmount,
  totalInvoices,
  paidInvoices,
  pendingAmount
}: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(totalAmount),
      icon: DollarSign,
      description: `From ${totalInvoices} total invoices`,
      href: "/dashboard/invoices",
    },
    {
      title: "Paid Invoices",
      value: paidInvoices.toString(),
      icon: Users,
      description: `${((paidInvoices / totalInvoices) * 100).toFixed(1)}% completion rate`,
      href: "/dashboard/invoices?status=paid",
    },
    {
      title: "Pending Amount",
      value: formatCurrency(pendingAmount),
      icon: CreditCard,
      description: "Awaiting payment",
      href: "/dashboard/invoices?status=pending",
    },
    {
      title: "Active Invoices",
      value: totalInvoices.toString(),
      icon: Activity,
      description: "Currently in system",
      href: "/dashboard/invoices",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={stat.href}>
            <Card className="p-6 hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <stat.icon className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}