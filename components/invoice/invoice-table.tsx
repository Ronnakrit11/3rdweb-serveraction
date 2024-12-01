"use client";

import { Invoice } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { InvoiceMenu } from "@/app/dashboard/invoices/components/invoice-menu";

interface InvoiceTableProps {
  invoices: Invoice[];
}

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice #</TableHead>
            <TableHead className="min-w-[200px]">Client</TableHead>
            <TableHead className="min-w-[100px]">Amount</TableHead>
            <TableHead className="min-w-[120px]">Due Date</TableHead>
            <TableHead className="min-w-[100px]">Status</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.number}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium truncate max-w-[200px]">
                    {invoice.clientName}
                  </div>
                  <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                    {invoice.clientEmail}
                  </div>
                </div>
              </TableCell>
              <TableCell>{formatCurrency(invoice.amount)}</TableCell>
              <TableCell>{formatDate(invoice.dueDate)}</TableCell>
              <TableCell>
                <Badge
                  className={
                    invoice.status === "paid"
                      ? "bg-green-500"
                      : invoice.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }
                >
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell>
                <InvoiceMenu invoiceId={invoice.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}