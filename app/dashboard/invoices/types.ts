import { Invoice, InvoiceItem, InvoiceStatus } from "@prisma/client";

export type InvoiceWithItems = Invoice & {
  items: InvoiceItem[];
};

export type InvoiceFormData = {
  clientName: string;
  clientEmail: string;
  dueDate: Date;
  status: InvoiceStatus;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
};