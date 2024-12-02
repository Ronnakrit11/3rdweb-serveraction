import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const customers = await prisma.customer.findMany({
      where: {
        userId,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error('[CUSTOMERS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { name, email } = body;

    if (!name || !email) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const customer = await prisma.customer.create({
      data: {
        userId,
        name,
        email,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.error('[CUSTOMERS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}