import { Connection, PublicKey, Transaction, Keypair } from '@solana/web3.js';
import { Program, AnchorProvider, web3, Idl } from '@project-serum/anchor';

const programId = new PublicKey('aEEs3sYsTisWLNGYcUhiHLRQ7Km1jG8W4R1Qw1BGdGc');
const idl = {"version":"0.1.0","name":"my_payment_contract","instructions":[{"name":"storePayment","accounts":[{"name":"paymentAccount","isMut":true,"isSigner":false},{"name":"user","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false}],"args":[{"name":"userId","type":"string"},{"name":"repositoryId","type":"string"},{"name":"transactionSignature","type":"string"},{"name":"paymentType","type":{"defined":"PaymentType"}}]},{"name":"fetchPayments","accounts":[{"name":"paymentAccount","isMut":true,"isSigner":false},{"name":"systemProgram","isMut":false,"isSigner":false}],"args":[{"name":"userId","type":{"option":"string"}},{"name":"repositoryId","type":{"option":"string"}},{"name":"transactionSignature","type":{"option":"string"}},{"name":"paymentType","type":{"option":{"defined":"PaymentType"}}}],"returns":{"defined":"Payment"}}],"accounts":[{"name":"Payment","type":{"kind":"struct","fields":[{"name":"userId","type":"string"},{"name":"repositoryId","type":"string"},{"name":"transactionSignature","type":"string"},{"name":"paymentType","type":{"defined":"PaymentType"}}]}}],"types":[{"name":"PaymentType","type":{"kind":"enum","variants":[{"name":"Sent"},{"name":"Received"}]}}]};

const privateKey = Uint8Array.from([9,117,136,189,55,62,209,153,241,233,131,58,202,154,9,250,86,131,148,56,15,133,245,52,62,208,12,162,29,64,211,48,153,58,228,120,26,9,229,78,255,80,162,96,30,247,141,163,50,229,27,93,129,247,143,215,225,238,93,152,167,45,122,41]);



const keypair = Keypair.fromSecretKey(privateKey);
const wallet = {
    publicKey: keypair.publicKey,
    signTransaction: async (transaction: web3.Transaction) => {
        transaction.sign(keypair);
        return transaction;
    },
    signAllTransactions: async (transactions: web3.Transaction[]) => {
        return transactions.map((tx) => {
            tx.sign(keypair);
            return tx;
        });
    },
};

const connection = new Connection(web3.clusterApiUrl('devnet'));
const provider = new AnchorProvider(connection, wallet, { preflightCommitment: 'processed' });
const program = new Program(idl as Idl, programId, provider);

// Define PaymentType as an object
const PaymentType = {
    Sent: { Sent: {} },
    Received: { Received: {} }
};

// Function to save a payment
const savePayment = async (
    userId: string,
    repositoryId: string,
    transactionSignature: string,
    paymentType: 'Sent' | 'Received'
) => {
    try {
        const [paymentAccount, bump] = PublicKey.findProgramAddressSync(
            [Buffer.from('payment'), Buffer.from(userId), Buffer.from(repositoryId)],
            programId
        );

        // Create a proper PaymentType enum object
        const paymentTypeEnum = paymentType === 'Sent' ? { Sent: {} } : { Received: {} };

        const tx = await program.methods
            .storePayment(userId, repositoryId, transactionSignature, paymentTypeEnum)
            .accounts({
                paymentAccount,
                user: wallet.publicKey, 
                systemProgram: web3.SystemProgram.programId,
            })
            .signers([keypair])
            .rpc();

        console.log('Transaction ID:', tx);
    } catch (error) {
        console.error('Error storing payment:', error);
    }
};

// Function to fetch payments based on the provided arguments
const fetchPayments = async (
    userId?: string,
    repositoryId?: string,
    transactionSignature?: string,
    paymentType?: 'Sent' | 'Received'
) => {
    try {
        const [paymentAccount] = PublicKey.findProgramAddressSync(
            [Buffer.from('payment'), Buffer.from(userId || ''), Buffer.from(repositoryId || '')],
            programId
        );

        const payment = await program.methods
            .fetchPayments(
                userId ? userId : null,
                repositoryId ? repositoryId : null,
                transactionSignature ? transactionSignature : null,
                paymentType ? PaymentType[paymentType] : null  // Convert to enum object
            )
            .accounts({
                paymentAccount,
                systemProgram: web3.SystemProgram.programId,
            })
            .rpc();

        console.log('Fetched Payment:', payment);
        return payment;
    } catch (error) {
        console.error('Error fetching payments:', error);
    }
};
export default { fetchPayments, savePayment };
