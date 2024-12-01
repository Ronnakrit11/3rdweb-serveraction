import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { DashboardStats } from "@/components/dashboard/stats";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const { userId } = auth();

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

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Dashboard"
        text="Welcome to your dashboard overview."
      />
      <div className="grid gap-8">
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