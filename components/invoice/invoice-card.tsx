import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Invoice } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface InvoiceCardProps {
  invoice: Invoice & {
    items: {
      id: string;
      description: string;
      quantity: number;
      unitPrice: number;
    }[];
  };
}

export function InvoiceCard({ invoice }: InvoiceCardProps) {
  const statusColor: any = {
    pending: "bg-yellow-500",
    paid: "bg-green-500",
    overdue: "bg-red-500",
  };

  return (
    <Link href={`/dashboard/invoices/${invoice.id}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Invoice #{invoice.number}</CardTitle>
            <Badge className={statusColor[invoice?.status || 'pending']}>{invoice.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Client: {invoice.clientName}
            </p>
            <p className="text-sm text-muted-foreground">
              Amount: ${invoice.amount.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              Due Date: {formatDate(invoice.dueDate)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}