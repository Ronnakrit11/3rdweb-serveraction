import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { InvoiceForm } from "../../components/invoice-form";

export default async function EditInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const invoice = await prisma.invoice.findUnique({
    where: {
      id: params.id,
      userId,
    },
    include: {
      items: true,
    },
  });

  if (!invoice) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Edit Invoice #{invoice.number}</h1>
      <InvoiceForm invoice={invoice} mode="edit" />
    </div>
  );
}