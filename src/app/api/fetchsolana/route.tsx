// src/app/api/updateSolanaAddress/route.ts
import { NextResponse } from 'next/server';
import { Connection, Keypair, Transaction, SystemProgram } from '@solana/web3.js';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const { userId, solanaAddress, amount } = await request.json();

  const connection = new Connection('https://api.devnet.solana.com');
  const fromWallet = Keypair.fromSecretKey(Uint8Array.from([9,117,136,189,55,62,209,153,241,233,131,58,202,154,9,250,86,131,148,56,15,133,245,52,62,208,12,162,29,64,211,48,153,58,228,120,26,9,229,78,255,80,162,96,30,247,141,163,50,229,27,93,129,247,143,215,225,238,93,152,167,45,122,41]));

  try {
    await prisma.$connect();
    await prisma.user.update({
      where: { id: userId },
      data: {
        lamportsLeft: { decrement: amount },
        lastTransaction: new Date(),
      },
    });

    const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromWallet.publicKey,
          toPubkey: solanaAddress,
          lamports: amount,
        })
      );
  
    const signature = await connection.sendTransaction(transaction, [fromWallet]);
    await connection.confirmTransaction(signature);
    return NextResponse.json({ message: 'Payment sent successfully', signature });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send payment' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
