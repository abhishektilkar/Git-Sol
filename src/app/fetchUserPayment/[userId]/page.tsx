'use client'
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Page: React.FC = () => {
    const { data: session, status } = useSession();
    const user = session?.user;
    const router = useRouter();

    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            setIsRedirecting(true);
        } else if (status === 'authenticated') {
            const userId = router.query.userId;
        }
    }, [status]);

    if (isRedirecting) {
        window.location.href = '/';
        return null;
    }

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    return (
        <div>
            Testing
        </div>
    );
};

export default Page;
