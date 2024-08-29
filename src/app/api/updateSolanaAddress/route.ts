// src/app/api/updateSolanaAddress/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure this imports your Prisma instance

export async function POST(request: Request) {
  const { gitUserId, solanaAddress } = await request.json();

  try {
    await prisma.$connect();
    await prisma.user.update({
      where: { gitUserId },
      data: { solanaAddress },
    });
    return NextResponse.json({ message: 'Address updated successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update address' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
