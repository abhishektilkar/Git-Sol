// app/api/wallet/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the import path as necessary
import { validateSolanaAddress } from '@/lib/validators'; // Example: your address validation function
import paymentService from '@/lib/solanasClient'

export async function POST(req: Request) {
    try {
        const { id, owner, lamports, peopleCount, signature } = await req.json();


        // Create or update the user with the wallet address
        // const user = await prisma.repository.upsert({
        //     where: { gitRepoId: id },
        //     update: { }, // Update user details if they exist
        //     create: { gitRepoId: id, repoOwnerId: owner.id, totalAmount: lamports, totalContributors: peopleCount , currentContributors: 0 }, // Create new user
        // });
        console.log(String(owner.id), String(id), String(signature), 'Received');
        await paymentService.savePayment(String(owner.id), String(id), String(signature), 'Received');



        return NextResponse.json({ message: 'Suncess user repo' });
    } catch (error) {
        console.error('Error saving wallet address:', error);
        return NextResponse.json({ error: 'Failed to save wallet address' }, { status: 500 });
    }
}
