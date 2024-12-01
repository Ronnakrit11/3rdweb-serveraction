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

  try {
    const rawData = {
      clientName: formData.get('clientName') as string,
      clientEmail: formData.get('clientEmail') as string,
      amount: parseFloat(formData.get('amount') as string),
      dueDate: new Date(formData.get('dueDate') as string),
      status: (formData.get('status') as InvoiceStatus) || 'pending',
      items: JSON.parse(formData.get('items') as string),
    };

    // Validate required fields
    if (!rawData.clientName || !rawData.clientEmail || !rawData.amount || !rawData.dueDate || !rawData.items) {
      throw new Error('Missing required fields');
    }

    // Validate items array
    if (!Array.isArray(rawData.items) || rawData.items.length === 0) {
      throw new Error('At least one item is required');
    }

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
    return { success: true, invoice };
  } catch (error) {
    console.error('Create invoice error:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to create invoice. Please check your input and try again.');
  }
}

export async function updateInvoice(id: string, formData: FormData) {
  headers();
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    // First verify the invoice exists and belongs to the user
    const existingInvoice = await prisma.invoice.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!existingInvoice || existingInvoice.userId !== userId) {
      throw new Error("Invoice not found or unauthorized");
    }

    const rawData = {
      clientName: formData.get('clientName') as string,
      clientEmail: formData.get('clientEmail') as string,
      amount: parseFloat(formData.get('amount') as string),
      dueDate: new Date(formData.get('dueDate') as string),
      status: (formData.get('status') as InvoiceStatus) || 'pending',
      items: JSON.parse(formData.get('items') as string),
    };

    // Use a transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // Delete existing items
      await tx.invoiceItem.deleteMany({
        where: { invoiceId: id },
      });

      // Update invoice and create new items
      await tx.invoice.update({
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
    });

    revalidatePath('/dashboard/invoices');
    revalidatePath(`/dashboard/invoices/${id}`);
    
    return { success: true };
  } catch (error) {
    console.error('Update invoice error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to update invoice');
  }
}

export async function deleteInvoice(id: string) {
  headers();
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
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
    return { success: true };
  } catch (error) {
    console.error('Delete invoice error:', error);
    throw new Error('Failed to delete invoice');
  }
}