import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const customer = await prisma.customer.findUnique({
      where: {
        id: params.id,
        userId,
      },
    });

    if (!customer) {
      return new NextResponse('Customer not found', { status: 404 });
    }

    const updatedCustomer = await prisma.customer.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        email,
      },
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error('[CUSTOMER_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

type DeleteParams = {
  params: {
    id: string;
  };
};

export async function DELETE(
  _request: Request,
  { params }: DeleteParams
  
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const customer = await prisma.customer.findUnique({
      where: {
        id: params.id,
        userId,
      },
    });

    if (!customer) {
      return new NextResponse('Customer not found', { status: 404 });
    }

    await prisma.customer.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[CUSTOMER_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}