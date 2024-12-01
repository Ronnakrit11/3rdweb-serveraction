import { prisma } from "@/lib/db";
import { InvoiceCard } from "./invoice-card";

interface InvoiceListProps {
  userId: string;
}

export async function InvoiceList({ userId }: InvoiceListProps) {
  const invoices = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (invoices.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No invoices found. Create your first invoice!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {invoices.map((invoice) => (
        <InvoiceCard key={invoice.id} invoice={invoice} />
      ))}
    </div>
  );
}