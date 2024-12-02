import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const formData = await req.formData();
    const customerId = formData.get('customerId') as string;
    const dueDate = new Date(formData.get('dueDate') as string);
    const status = formData.get('status') as string;
    const items = JSON.parse(formData.get('items') as string);

    // Get customer details
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return new NextResponse('Customer not found', { status: 404 });
    }

    // Get service details and calculate total amount
    const serviceIds = items.map((item: any) => item.serviceId);
    const services = await prisma.service.findMany({
      where: {
        id: {
          in: serviceIds,
        },
      },
    });

    const servicesMap = new Map(services.map(service => [service.id, service]));
    const totalAmount = items.reduce((sum: number, item: any) => {
      const service = servicesMap.get(item.serviceId);
      if (!service) return sum;
      return sum + (service.price * item.quantity);
    }, 0);

    // Create invoice with items
    const invoice = await prisma.invoice.create({
      data: {
        userId,
        number: `INV-${Date.now()}`,
        clientName: customer.name,
        clientEmail: customer.email,
        amount: totalAmount,
        status: status as any,
        dueDate,
        items: {
          create: items.map((item: any) => {
            const service = servicesMap.get(item.serviceId);
            return {
              description: service?.name || '',
              quantity: item.quantity,
              unitPrice: service?.price || 0,
            };
          }),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ success: true, invoice });
  } catch (error) {
    console.error('[INVOICES_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}