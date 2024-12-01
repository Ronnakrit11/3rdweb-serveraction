import { Suspense } from 'react';
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { InvoiceTable } from "@/components/invoice/invoice-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/db";
import { InvoiceStatus } from "@prisma/client";
import { InvoiceFilters } from "./components/invoice-filters";
import { headers } from 'next/headers';
import { InvoiceModal } from "./components/invoice-modal";
import { Skeleton } from '@/components/ui/skeleton';

interface PageProps {
  searchParams?: {
    status?: string;
    search?: string;
  };
}

async function InvoicesContent({ searchParams }: PageProps) {
  headers();
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    // Validate status parameter
    const status = searchParams?.status;
    const isValidStatus = status && ['pending', 'paid', 'rejected'].includes(status);

    // Get search params
    const search = searchParams?.search || '';

    // Build where clause
    const where = {
      userId,
      ...(isValidStatus ? { status: status as InvoiceStatus } : {}),
      ...(search
        ? {
          OR: [
            { clientName: { contains: search, mode: "insensitive" as const } },
            { clientEmail: { contains: search, mode: "insensitive" as const } },
          ],
        }
        : {}),
    };

    const invoices = await prisma.invoice.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: true,
      },
    });

    return (
      <div className="container mx-auto px-4 py-6 lg:py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold">
            Invoices
            {isValidStatus &&
              ` - ${status.charAt(0).toUpperCase() + status.slice(1)}`}
          </h1>
          <InvoiceModal />
        </div>

        <InvoiceFilters />

        {invoices.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              {search
                ? "No invoices found matching your search."
                : isValidStatus
                  ? `No ${status} invoices found.`
                  : "No invoices found. Create your first invoice!"}
            </p>
          </div>
        ) : (
          <div className="border rounded-lg overflow-x-auto">
            <InvoiceTable invoices={invoices} />
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch invoices:', error);
    return (
      <div className="container mx-auto px-4 py-6 lg:py-10">
        <div className="text-center py-10">
          <p className="text-destructive">
            Failed to load invoices. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}

export default function InvoicesPage(props: PageProps) {
  return (
    <Suspense fallback={<InvoicesLoading />}>
      <InvoicesContent {...props} />
    </Suspense>
  );
}

function InvoicesLoading() {
  return (
    <div className="container mx-auto px-4 py-6 lg:py-10">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}