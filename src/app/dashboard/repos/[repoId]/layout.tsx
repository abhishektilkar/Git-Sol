// app/layout.tsx
import AppBar from '@/app/components/AppBar';
import Footer from '@/app/components/Footer';
import { SolanaWalletProvider } from '@/app/components/SolanaWalletProvider';
// import './globals.css';

export default function RepoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <>
                    <AppBar />
                    <SolanaWalletProvider>
                        {children}
                    </SolanaWalletProvider>
                    <Footer />
                </>
            </body>
        </html>
    );
}
