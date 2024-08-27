// components/LogoutButton.tsx
'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/logout-success' }); // Redirect after sign-out
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left py-2 px-4 text-gray-700 hover:bg-red-500 hover:text-white transition duration-200 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
