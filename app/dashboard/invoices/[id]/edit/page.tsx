import { Suspense } from 'react';
import { EditInvoiceContent } from '../components/edit-invoice-content';
import { Skeleton } from '@/components/ui/skeleton';

interface EditInvoicePageProps {
  params: {
    id: string;
  };
}

export default function EditInvoicePage({ params }: EditInvoicePageProps) {
  return (
    <Suspense fallback={<EditInvoiceSkeleton />}>
      <EditInvoiceContent id={params.id} />
    </Suspense>
  );
}

function EditInvoiceSkeleton() {
  return (
    <div className="container mx-auto py-10">
      <Skeleton className="h-10 w-[300px] mb-8" />
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <div className="grid gap-8 sm:grid-cols-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}