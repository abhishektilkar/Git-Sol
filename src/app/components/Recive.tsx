'use client'
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define a type for the user prop
interface User {
    id: string;
    gitUserId: string;
    name?: string;
    solanaAddress?: string;
    lamportsEarned: number;
    lamportsLeft: number;
    lastTransaction?: Date;
}

// Define the props interface
interface ReciveProps {
    user: User;
}

let differenceInDays = 0;
let fetched = false;

// Function to handle payment fetching
const Recive: React.FC<ReciveProps> = ({ user }) => {
    const amount = user.lamportsLeft - 25000; // Calculate the final amount

    const now: Date = new Date();
    // @ts-ignore
    const past: Date = new Date(user?.lastTransaction);

    const differenceInMilliseconds: number = now.getTime() - past.getTime();
    differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    const fetchPayment = async () => {
        fetched = true;
        console.log("fetch Solana");
        
        try {
            const response = await fetch('/api/fetchsolana', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    amount: user.lamportsLeft - 25000,
                    solanaAddress: user.solanaAddress,
                    userGitId: user.gitUserId
                }),
            });

            const valResponse = await response.json();

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            console.log('Started the transactions');
            // Show the toast notification here
            toast.success(`Transaction started successfully! payment Signature is: ${valResponse?.data.signature}` );
        } catch (error) {
            console.error('Error fetching payments:', error);
            // @ts-ignore
            toast.error('Error fetching payments: ' + error?.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <ToastContainer />
            <h2 className="text-xl font-semibold text-center mb-1">Receive Payment</h2>
            <p>Make sure to already save your solana address</p>
            <div className="flex flex-col items-center mt-3">
                { ((!user.lastTransaction || differenceInDays >= 1) && !fetched) ? <> 
                    {!user.solanaAddress ? (
                        <p className="mt-2 text-red-600 text-center">
                            Solana address is not set. Please save a valid Solana address to fetch payment.
                        </p>
                    ) : user.lamportsLeft > 50000 ? (
                        <button 
                            onClick={fetchPayment} 
                            className="w-full p-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                        >
                            Fetch {user.lamportsLeft - 25000} lamports
                        </button>
                    ) : (
                        <p className="mt-2 text-red-600 text-center">
                            You need at least 50,000 lamports to fetch payment.
                        </p>
                    )}
                </> : <>
                    <p className="mt-2 text-red-600 text-center">
                        Please wait a day for next transactions
                    </p>
                </>}
            </div>
        </div>
    );
};

export default Recive;
