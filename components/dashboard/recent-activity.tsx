import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export async function RecentActivity() {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const recentInvoices = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  });

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {recentInvoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
          >
            <div>
              <p className="font-medium">Invoice #{invoice.number}</p>
              <p className="text-sm text-muted-foreground">
                {invoice.clientName} - ${invoice.amount.toFixed(2)}
              </p>
            </div>
            <span className="text-sm text-muted-foreground">
              {formatDate(invoice.createdAt)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}