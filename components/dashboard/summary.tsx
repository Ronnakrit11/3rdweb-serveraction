"use client";

import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { Users, DollarSign, CheckCircle } from "lucide-react";
import Link from "next/link";

interface DashboardSummaryProps {
  totalClients: number;
  totalAmount: number;
  paidInvoices: number;
  totalInvoices: number;
}

export function DashboardSummary({
  totalClients,
  totalAmount,
  paidInvoices,
  totalInvoices,
}: DashboardSummaryProps) {
  const paymentRate = (paidInvoices / totalInvoices) * 100;
  
  const getPaymentRateColor = (rate: number) => {
    if (rate >= 80) return "text-green-500";
    if (rate >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getPaymentRateBg = (rate: number) => {
    if (rate >= 80) return "bg-green-500/10";
    if (rate >= 50) return "bg-yellow-500/10";
    return "bg-red-500/10";
  };

  const summaryItems = [
    {
      title: "Total Revenue",
      value: formatCurrency(totalAmount),
      icon: DollarSign,
      description: "All time revenue",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500",
      href: "/dashboard/invoices",
    },
    {
      title: "Payment Rate",
      value: `${paymentRate.toFixed(1)}%`,
      icon: CheckCircle,
      description: `${paidInvoices} out of ${totalInvoices} invoices paid`,
      iconBg: getPaymentRateBg(paymentRate),
      iconColor: getPaymentRateColor(paymentRate),
      valueColor: getPaymentRateColor(paymentRate),
      href: "/dashboard/invoices?status=paid",
    },
    {
      title: "Total Clients",
      value: totalClients,
      icon: Users,
      description: "Unique clients",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500",
      href: "/dashboard/invoices",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {summaryItems.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={item.href}>
            <Card className="p-6 hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${item.iconBg}`}>
                  <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </p>
                  <h3 className={`text-2xl font-bold ${item.valueColor || ''}`}>
                    {item.value}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
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