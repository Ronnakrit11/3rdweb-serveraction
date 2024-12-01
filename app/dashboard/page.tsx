import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { DashboardStats } from "@/components/dashboard/stats";
import { DashboardSummary } from "@/components/dashboard/summary";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { headers } from 'next/headers';

export default async function DashboardPage() {
  // Force dynamic rendering
  headers();
  
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Fetch user's invoice statistics
  const invoiceStats = await prisma.invoice.groupBy({
    by: ['status'],
    where: {
      userId: userId,
    },
    _count: true,
    _sum: {
      amount: true,
    },
  });

  // Calculate total amounts
  const totalAmount = invoiceStats.reduce((acc, curr) => acc + (curr._sum.amount || 0), 0);
  const totalInvoices = invoiceStats.reduce((acc, curr) => acc + curr._count, 0);
  const paidInvoices = invoiceStats.find(stat => stat.status === 'paid')?._count || 0;
  const pendingAmount = invoiceStats
    .find(stat => stat.status === 'pending')?._sum.amount || 0;

  // Get unique client count
  const uniqueClients = await prisma.invoice.groupBy({
    by: ['clientEmail'],
    where: {
      userId: userId,
    },
    _count: true,
  });

  const totalClients = uniqueClients.length;

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Dashboard"
        text="Welcome to your dashboard overview."
      />
      <div className="grid gap-8">
        <DashboardSummary 
          totalClients={totalClients}
          totalAmount={totalAmount}
          paidInvoices={paidInvoices}
          totalInvoices={totalInvoices}
        />
        <DashboardStats 
          totalAmount={totalAmount}
          totalInvoices={totalInvoices}
          paidInvoices={paidInvoices}
          pendingAmount={pendingAmount}
        />
        <RecentActivity />
      </div>
    </DashboardShell>
  );
}