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
import { CustomerMenu } from './customer-menu';
import type { Customer } from '@/app/types';

export async function CustomerList() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const customers = await prisma.customer.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (customers.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No customers found.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer: Customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>
                {new Date(customer.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <CustomerMenu customer={customer} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}