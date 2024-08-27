// components/AuthButtons.tsx
"use client";

import { signIn, signOut, useSession } from 'next-auth/react';

const AuthButtons = () => {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button onClick={() => signIn('github')}>Sign in with GitHub</button>
      ) : (
        <>
          <p>Welcome, {session.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
          {/* @ts-ignore */}
          <p>Your GitHub Access Token: {session.accessToken}</p>
        </>
      )}
    </div>
  );
};

export default AuthButtons;