import { Suspense } from 'react';
import { ServiceForm } from './components/service-form';
import { ServiceList } from './components/service-list';
import { Skeleton } from '@/components/ui/skeleton';

export default function ServicesPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Services</h1>
      <div className="grid gap-8">
        <ServiceForm />
        <Suspense fallback={<Skeleton className="h-[200px]" />}>
          <ServiceList />
        </Suspense>
      </div>
    </div>
  );
}