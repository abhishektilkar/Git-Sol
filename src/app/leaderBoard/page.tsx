import prisma from '@/lib/prisma';
import { FC } from 'react';

// Simulate fetching data from a server/database
const fetchUserData = async () => {
    try {
        await prisma.$connect();
        const topUsers = await prisma.user.findMany({
            orderBy: {
                lamportsEarned: 'desc', // Order by lamportEarned in descending order
            },
            take: 50, // Limit the results to the top 50 users
            select: { // Select the fields you want to retrieve
                id: true,
                name: true,
                lamportsEarned: true,
                gitUserId: true, // Include the githubId
            },
        });
        return topUsers || [];
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
};

const Leaderboard: FC = async () => {
    const users = await fetchUserData();

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Leaderboard</h2>
            <ol className="space-y-4">
                {
                    (users || []).map((user, index) => (
                        <li
                            key={user.id}
                            className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm"
                        >
                            <div className="flex items-center space-x-3">
                                <span className="text-lg font-semibold text-gray-700">{index + 1}.</span>
                                <span className="text-xl font-medium text-gray-900">{user.name}</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-lg font-semibold text-green-500">
                                    {user.lamportsEarned.toLocaleString()} lamports
                                </span>
                                <span className="text-sm text-gray-600">
                                    GitHub ID: {user.gitUserId}
                                </span>
                            </div>
                        </li>
                    ))}
            </ol>
        </div>
    );
};

const PayPage: FC = () => {
    return (
        <main className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-10">Welcome to the leaderborad of top Solana Earners to</h1>
                <Leaderboard />
            </div>
        </main>
    );
};

export default PayPage;
