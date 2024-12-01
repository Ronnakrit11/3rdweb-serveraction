import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Invoice, InvoiceItem, InvoiceStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

interface InvoiceCardProps {
  invoice: Invoice & {
    items: InvoiceItem[];
  };
}

export function InvoiceCard({ invoice }: InvoiceCardProps) {
  const statusColor = {
    [InvoiceStatus.pending]: "bg-yellow-500",
    [InvoiceStatus.paid]: "bg-green-500",
    [InvoiceStatus.rejected]: "bg-red-500",
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Invoice #{invoice.number}</CardTitle>
          <Badge className={statusColor[invoice.status]}>{invoice.status}</Badge>
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
  );
}