import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import type { Service } from '@/app/types';

export async function ServiceList() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const services = await prisma.service.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (services.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No services found.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service: Service) => (
            <TableRow key={service.id}>
              <TableCell>{service.name}</TableCell>
              <TableCell>{formatCurrency(service.price)}</TableCell>
              <TableCell>
                {new Date(service.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}