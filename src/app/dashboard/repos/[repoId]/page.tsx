// app/pay/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useSession } from 'next-auth/react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useParams, useRouter } from 'next/navigation';

const PayPage: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { publicKey, sendTransaction, connected } = useWallet();
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [amount, setAmount] = useState<number>(2); // Default amount set to 2 SOL
    const [peopleCount, setPeopleCount] = useState<number>(1); // Default number of people to fund
    const [error, setError] = useState<string | null>(null);
    const [repoDetails, setRepoDetails] = useState<any>(null);
    const [reward, setReward] = useState<number | null>(1.6);
    const params = useParams();
    const repoId = params.repoId; // Assuming repoId is passed as a route parameter
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [status]);

    useEffect(() => {
        if (publicKey) {
            setWalletAddress(publicKey.toString());
        }
    }, [publicKey]);

    useEffect(() => {
        const fetchRepoDetails = async () => {
            try {
                const response = await fetch(`https://api.github.com/repositories/${repoId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch repository details');
                }
                const data = await response.json();
                setRepoDetails(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (repoId) {
            fetchRepoDetails();
        }
    }, [repoId]);

    useEffect(() => {
        // Calculate reward based on the amount entered and number of contributors
        if (amount >= 2 && peopleCount > 0) {
            const contributionPerPerson = (amount * 0.8) / peopleCount; // Amount each contributor gets
            // const calculatedReward = Math.ceil(((contributionPerPerson * 0.9) * Math.pow(10, 9)) / (5 * Math.pow(10, 6)));
            setReward(contributionPerPerson);
        } else {
            setReward(null); // Reset reward if conditions aren't met
        }
    }, [amount, peopleCount]);

    const handlePayment = async () => {
        if (!walletAddress) return;

        const connection = new Connection('https://api.devnet.solana.com');
        const toPubkey = new PublicKey('BK9Tq1BbtZvbBPkxrfeTNW1MU8cTS4tC8upB5ShWPZvg'); // Replace with your Solana public key

        // Convert amount to lamports
        const lamports = amount * LAMPORTS_PER_SOL;

        if (lamports < 2 * LAMPORTS_PER_SOL) {
            setError('The minimum amount to send is 2 SOL.');
            return;
        }

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey!,
                toPubkey,
                lamports: lamports,
            })
        );

        try {
            const signature = await sendTransaction(transaction, connection);
            setMessage(`Transaction sent with signature: ${signature} \\n .....`);
            setError(null); // Reset error message on success
            const response = await fetch('/api/addRepo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...repoDetails, lamports, peopleCount
                }),
            });
        } catch (err) {
            setMessage('Transaction failed. Please try again.');
            setError(`${err}`);
        }
    };

    useEffect(() => {
        // Set error if amount is less than 2 SOL
        if (amount < 2) {
            setError('The amount must be at least 2 SOL.');
        } else {
            setError(null); // Reset error if valid
        }
        if (reward && reward < 0.00005) {
          setError('The reward must be at least 0.00005');
        }
    }, [amount, reward]);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen justify-center p-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Connect your Solana Wallet and Pay</h1>

            {repoDetails && (
                <div className="mb-4 p-4 border rounded bg-white shadow">
                    <h2 className="text-xl font-semibold">{repoDetails.name}</h2>
                    <p className='mb-4'>{repoDetails.description}</p>
                    <a href={repoDetails.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        View Repository on GitHub
                    </a>
                </div>
            )}

            <WalletMultiButton />

            {connected && (
                <>
                    <p className="mt-4">Connected Wallet: <span className="font-semibold">{walletAddress}</span></p>

                    <div className="mt-4">
                        <label htmlFor="amount" className="block text-gray-700">Enter amount to pay (in SOL):</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                            min="2" // Minimum amount set to 2 SOL
                            step="0.01"
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="peopleCount" className="block text-gray-700">Number of pr merges to fund:</label>
                        <input
                            type="number"
                            id="peopleCount"
                            value={peopleCount}
                            onChange={(e) => setPeopleCount(Math.max(1, parseInt(e.target.value) || 1))} // Ensure it's a natural number
                            min="1" // Minimum number of people set to 1
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </div>

                    {error && <p className="text-red-500 mt-2">{error}</p>}

                    {reward !== null && (
                        <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
                            <p className="font-semibold">Each contributors will receive: {reward} solana</p>
                        </div>
                    )}

                    <button 
                        onClick={handlePayment} 
                        disabled={amount < 2 || error !== null} // Disable button if amount is invalid or error exists
                        className={`mt-4 p-2 ${amount < 2 || error ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded transition duration-200`}>
                        Pay {amount} SOL
                    </button>
                    <div className={(message.length > 15 && message[15] == 'l') ? 'text-red-500 bg-blue-500 m-2 p-2' : 'text-green-500 bg-blue-500 m-2 p-2'}>
                        {message}
                    </div>
                    <div className='text-blue-500 bg-lime-500 font-medium p-2 m-2'>
                        As transaction succeds wil create an webhook for pr merges on your repository
                    </div>
                </>
            )}
        </div>
    );
};

export default PayPage;
