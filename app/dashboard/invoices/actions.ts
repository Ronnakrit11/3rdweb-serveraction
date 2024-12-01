'use server';

import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { InvoiceStatus } from "@prisma/client";
import { headers } from 'next/headers';

export async function createInvoice(formData: FormData) {
  headers();
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const rawData = {
    clientName: formData.get('clientName') as string,
    clientEmail: formData.get('clientEmail') as string,
    amount: parseFloat(formData.get('amount') as string),
    dueDate: new Date(formData.get('dueDate') as string),
    status: (formData.get('status') as InvoiceStatus) || 'pending',
    items: JSON.parse(formData.get('items') as string),
  };

  const invoice = await prisma.invoice.create({
    data: {
      userId,
      number: `INV-${Date.now()}`,
      clientName: rawData.clientName,
      clientEmail: rawData.clientEmail,
      amount: rawData.amount,
      status: rawData.status,
      dueDate: rawData.dueDate,
      items: {
        create: rawData.items,
      },
    },
  });

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  headers();
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!invoice || invoice.userId !== userId) {
    throw new Error("Not found or unauthorized");
  }

  const rawData = {
    clientName: formData.get('clientName') as string,
    clientEmail: formData.get('clientEmail') as string,
    amount: parseFloat(formData.get('amount') as string),
    dueDate: new Date(formData.get('dueDate') as string),
    status: (formData.get('status') as InvoiceStatus) || 'pending',
    items: JSON.parse(formData.get('items') as string),
  };

  // Delete existing items
  await prisma.invoiceItem.deleteMany({
    where: { invoiceId: id },
  });

  const updatedInvoice = await prisma.invoice.update({
    where: { id },
    data: {
      clientName: rawData.clientName,
      clientEmail: rawData.clientEmail,
      amount: rawData.amount,
      dueDate: rawData.dueDate,
      status: rawData.status,
      items: {
        create: rawData.items,
      },
    },
  });

  revalidatePath('/dashboard/invoices');
  revalidatePath(`/dashboard/invoices/${id}`);
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  headers();
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id },
  });

  if (!invoice || invoice.userId !== userId) {
    throw new Error("Not found or unauthorized");
  }

  await prisma.invoice.delete({
    where: { id },
  });

  revalidatePath('/dashboard/invoices');
}