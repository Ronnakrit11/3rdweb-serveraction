import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const services = await prisma.service.findMany({
      where: {
        userId,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('[SERVICES_GET]', error);
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
    const { name, price } = body;

    if (!name || !price) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const service = await prisma.service.create({
      data: {
        userId,
        name,
        price,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error('[SERVICES_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}