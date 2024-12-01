import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { EditInvoiceForm } from "../components/edit-invoice-form";
import { headers } from 'next/headers';

interface EditInvoiceContentProps {
  id: string;
}

export async function EditInvoiceContent({ id }: EditInvoiceContentProps) {
  await headers();
  
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  if (!id) {
    notFound();
  }
  const invoice = await prisma.invoice.findUnique({
    where: {
      id,
      userId,
    },
    include: {
      items: {
        orderBy: {
          id: 'asc'
        }
      }
    },
  });
  


  if (!invoice) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Edit Invoice #{invoice.number}</h1>
      <EditInvoiceForm invoice={invoice} />
    </div>
  );
}