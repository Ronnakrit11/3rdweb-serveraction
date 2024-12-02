import { Suspense } from 'react';
import { CustomerForm } from './components/customer-form';
import { CustomerList } from './components/customer-list';
import { Skeleton } from '@/components/ui/skeleton';

export default function CustomersPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Customers</h1>
      <div className="grid gap-8">
        <CustomerForm />
        <Suspense fallback={<Skeleton className="h-[200px]" />}>
          <CustomerList />
        </Suspense>
      </div>
    </div>
  );
}