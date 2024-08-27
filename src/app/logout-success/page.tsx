// src/app/logout-success/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LogoutSuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page or any other page after logout
    router.push('/');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Logging you out...</p>
    </div>
  );
};

export default LogoutSuccessPage;
