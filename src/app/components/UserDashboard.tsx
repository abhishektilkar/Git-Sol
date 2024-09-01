'use client'
import React, { useState } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import prisma from '@/lib/prisma';
// import { PublicKey } from '@solana/web3.js';
// import { Textarea } from '@/components/ui/textarea';

interface UserDashboardProps {
  userData: {
    id: number;
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    html_url: string;
    twitter_username?: string;
    blog?: string;
    location?: string;
    company?: string;
    followers?: number;
    following?: number;
  };
  repositories: {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    language: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    created_at: string;
    updated_at: string;
    license?: {
      name: string;
    };
  }[];
  user: {
    id: string;
    gitUserId: string;
    name?: string;
    solanaAddress?: string;
    lamportsEarned: number;
    lamportsLeft: number;
  };
}

// Define a mapping of languages to SVG icons
const languageIcons: Record<string, React.ReactNode> = {
  JavaScript: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 4.5A9.004 9.004 0 0012 21a9.004 9.004 0 007.5-7.5h-5.5v-3h5.5zM12 6v3.5h3.5v-3h-3.5z" />
    </svg>
  ),
  Python: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12l2 2m0 0l2-2m-2 2v-7m2 0l2 2M4 12l2 2m0 0l2-2m-2 2V7m2 5l2 2m0 0l2-2m-2 2v-7m2 0l2 2M6 12l2 2m0 0l2-2m-2 2V7m2 5l2 2m0 0l2-2m-2 2v-7m2 0l2 2" />
    </svg>
  ),
  Ruby: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 10h12M6 14h12M6 18h12M4 6l4 4M4 10l4 4M4 14l4 4M16 6l4 4M16 10l4 4M16 14l4 4" />
    </svg>
  ),
  Java: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8.25l9-5.25 9 5.25v7.5L12 21 3 15.75V8.25z" />
    </svg>
  ),
  CSharp: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 2h12v20H6V2zM12 16h-3v-2h3v-2H9v-2h3V8H9V6h3V4H9V2h6v2h-3v2h3v2h-3v2h3v2h-3v2h3v2h-3v2h3v-2h3v-2h-3z" />
    </svg>
  ),
  TypeScript: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path fill="currentColor" d="M1.25 0h21.5A1.25 1.25 0 0 1 24 1.25v21.5A1.25 1.25 0 0 1 22.75 24H1.25A1.25 1.25 0 0 1 0 22.75V1.25A1.25 1.25 0 0 1 1.25 0zm3.66 18.47L5.71 18.5 8.78 14H6.36l-.65 1.12v1.34l.07.03a7.1 7.1 0 0 1-.56.82L4.94 18h-2.2l2.38-3.29c-.28-.44-.44-.9-.55-1.38-.1-.48-.17-.98-.17-1.49 0-.8.28-1.52.78-2.1L4.7 10h2.57l2.13 2.72 1.76-2.7h2.48l-3.08 4.76 1.71 2.62H9.47L7.61 15h2.06l1.55 2.47v1.5l-2.22-2.4zm4.55-5.5l.23-.25c.06-.07.12-.14.18-.21l1.78 1.98-.09.02c-.21.09-.45.14-.71.14a.94.94 0 0 1-.91-.91c0-.48.36-.9.84-.94.07-.01.14-.01.21-.01h.07c.41 0 .79.16 1.06.43zm2.47 0c.07-.07.14-.15.22-.22l1.43 1.62c-.21.07-.45.12-.71.12-.7 0-1.26-.57-1.26-1.27a1.27 1.27 0 0 1 1.27-1.27c.26 0 .49.05.71.12zm3.08 1.56l.09.03c.17.07.34.16.51.27.02.01.04.02.06.03a1.25 1.25 0 0 1 .23 1.73 1.23 1.23 0 0 1-.98.48c-.54 0-1.03-.21-1.41-.6l.03-.05.23-.25c.03-.04.06-.08.1-.12l.1-.1a1.27 1.27 0 0 1-.25-1.72z" />
    </svg>
  ),
  MIT: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M5 13H3v-2h2V6h2v5h2v2H7v5H5v-2zm10-1h-4v-2h2v-5h2v5h2v2h-2v5h-2v-5zm-2 0h-2v-2h2v2z" />
    </svg>
  ),
  Apache: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 3v18m6-6l-6 6-6-6" />
    </svg>
  ),
  GPL: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M7 11.5L12 8l5 3.5v7L12 15 7 18.5v-7z" />
    </svg>
  ),
  Default: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" />
    </svg>
  ),
};

const UserDashboard: React.FC<UserDashboardProps> = ({ userData, repositories, user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [walletAddress, setWalletAddress] = useState(user.solanaAddress || '');
  const reposPerPage = 5;
  const router = useRouter(); 
  const walletAddressSol = user.solanaAddress;
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repositories.slice(indexOfFirstRepo, indexOfLastRepo);
  const totalPages = Math.ceil(repositories.length / reposPerPage);
  const [saveAddress, setSaveAddress] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getLanguageIcon = (language: string) => {
    return languageIcons[language] || languageIcons['Default'];
  };

  const getLicenseIcon = (licenseName?: string) => {
    switch (licenseName) {
      case 'MIT':
        return languageIcons['MIT'];
      case 'Apache':
        return languageIcons['Apache'];
      case 'GPL':
        return languageIcons['GPL'];
      default:
        return languageIcons['Default'];
    }
  };

  const handleCreateOrUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (walletAddress) {
      setSaveAddress(true);
      try {
        const response = await fetch('/api/updateSolanaAddress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gitUserId: String(userData.id),
            solanaAddress: walletAddress,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update address');
        }
        // setWalletAddress(walletAddress);
        console.log('Address updated successfully');
      } catch (error) {
        console.error('Error updating address:', error);
      }
    }
  };

  const handleRewardClick = (repoId: number) => {
    router.push(`/dashboard/repos/${repoId}`);
  };

  return (
    <div className="p-6 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
      {/* User Info Section */}
      <div className="flex-none lg:w-auto lg:flex-shrink-0">
        <div className="bg-white shadow-lg rounded-lg border border-gray-200" style={{ width: 'clamp(22rem, 30vw, 36rem)' }}>
          <div className="flex flex-col items-center p-4">
            <img
              src={userData.avatar_url}
              alt={`${userData.name}'s avatar`}
              className="w-48 h-48 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-indigo-500 mb-4"
            />
            <div className="text-left w-full px-4">
              <h1 className="text-2xl font-bold mb-1">{userData.name}</h1>
              <p className="text-lg text-gray-600 mb-2">@{userData.login}</p>
              <p className="text-gray-700 mb-2">{userData.bio}</p>
              {userData.location && <p className="text-gray-500 mb-1">Location: {userData.location}</p>}
              {userData.blog && <p className="text-gray-500 mb-1">Blog: <a href={userData.blog} className="text-blue-500 hover:underline">{userData.blog}</a></p>}
              {userData.twitter_username && <p className="text-gray-500 mb-1">Twitter: <a href={`https://twitter.com/${userData.twitter_username}`} className="text-blue-500 hover:underline">@{userData.twitter_username}</a></p>}
              {/* Display lamportsEarned and lamportsLeft */}
              <div className="mt-4">
                <p className="text-lg font-semibold">Lamports Earned: {user.lamportsEarned}</p>
                <p className="text-lg font-semibold">Lamports Left: {user.lamportsLeft}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Repositories Section */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Repositories</h2>
        <div className="space-y-4">
          {currentRepos.map((repo) => (
            <div key={repo.id} className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 hover:bg-gray-50 transition-colors duration-200 max-w-lg">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xl font-semibold">
                {repo.name}
              </a>
              {repo.description && (
                <p className="mt-2 text-gray-600">{repo.description}</p>
              )}
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  {getLanguageIcon(repo.language)}
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  {getLicenseIcon(repo.license?.name)}
                  {repo.license?.name || 'No License'}
                </span>
              </div>
              <p className="mt-2 text-gray-500 text-xs">Updated: {format(new Date(repo.updated_at), 'MM/dd/yyyy')}</p>
              <button
                onClick={() => handleRewardClick(repo.id)}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Reward Contributors
              </button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-between items-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Wallet Address Section */} 
      { !user.solanaAddress &&
      <div className="flex-none lg:w-auto lg:flex-shrink-0 mt-6 lg:mt-0">
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold mb-4">Manage Your Solana Wallet Address</h2>
          <form onSubmit={handleCreateOrUpdate} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your Solana wallet address"
              value={walletAddressSol}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <button
              type="submit"
              disabled={saveAddress}
              className="px-4 py-2 bg-green-500 disabled:bg-green-500/75 text-white rounded-lg hover:bg-green-600"
            >
              Save Address
            </button>
          </form>
        </div>
      </div> }
    </div>
  );
};

export default UserDashboard;
