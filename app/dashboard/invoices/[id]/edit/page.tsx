import { Suspense } from 'react';
import { EditInvoiceContent } from '../components/edit-invoice-content';
import { Skeleton } from '@/components/ui/skeleton';

interface EditInvoicePageProps {
  params: {
    id: string;
  };
}
type PageProps = Promise<{
  id: string;
}>

export default async function EditInvoicePage(props: { params: PageProps }) {
  const params = await props.params;
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
        <div className="space-y-4">
          <Skeleton className="h-6 w-24" />
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="grid gap-4 sm:grid-cols-[1fr,auto,auto]">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-32" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}