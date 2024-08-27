// components/UserDashboard.tsx
import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Octokit } from '@octokit/rest';
import Link from 'next/link';
import LogoutButton from './LogoutButton'; // Import the client component

interface Repository {
  id: number;
  name: string;
}

interface Contribution {
  id: number;
  message: string;
  date: string;
}

interface PullRequest {
  id: number;
  title: string;
}

const UserDashboard = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect('/');
  }

  const octokit = new Octokit({
    // @ts-ignore
    auth: session.accessToken,
  });

  // Fetch data from GitHub
  const [repoResponse, prResponse] = [{data: []}, {data: []}]

  const repositories: Repository[] = repoResponse.data.map((repo: any) => ({
    id: repo.id,
    name: repo.name,
  }));

  const pullRequests: PullRequest[] = prResponse.data.map((pr: any) => ({
    id: pr.id,
    title: pr.title,
  }));

  // Example data for contributions
  const contributions: Contribution[] = [
    { id: 1, message: 'Fixed bug in issue tracker', date: '2024-08-20' },
    { id: 2, message: 'Updated documentation', date: '2024-08-22' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <Link href="/repositories" className="block py-2 px-4 text-gray-700 hover:bg-blue-500 hover:text-white transition duration-200 rounded">
                Repositories
              </Link>
            </li>
            <li>
              <Link href="/contributions" className="block py-2 px-4 text-gray-700 hover:bg-blue-500 hover:text-white transition duration-200 rounded">
                Contributions
              </Link>
            </li>
            <li>
              <Link href="/pull-requests" className="block py-2 px-4 text-gray-700 hover:bg-blue-500 hover:text-white transition duration-200 rounded">
                Pull Requests
              </Link>
            </li>
            <li>
              <Link href="/issues" className="block py-2 px-4 text-gray-700 hover:bg-blue-500 hover:text-white transition duration-200 rounded">
                Issues
              </Link>
            </li>
            <li>
              <Link href="/settings" className="block py-2 px-4 text-gray-700 hover:bg-blue-500 hover:text-white transition duration-200 rounded">
                Settings
              </Link>
            </li>
            <li>
              <LogoutButton /> {/* Use the client component */}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name || 'User'}!</h1>

        {/* Repositories */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Repositories</h2>
            <Link href="/create-repo">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                Create Repository
              </button>
            </Link>
          </div>
          {repositories.length === 0 ? (
            <p>No repositories found.</p>
          ) : (
            <ul className="space-y-2">
              {repositories.map((repo) => (
                <li key={repo.id} className="bg-gray-100 p-2 rounded flex justify-between items-center">
                  <span>{repo.name}</span>
                  <Link href={`/repositories/${repo.id}`} className="text-blue-500 hover:underline">View</Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Contributions */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Contributions</h2>
          {contributions.length === 0 ? (
            <p>No contributions found.</p>
          ) : (
            <ul className="space-y-2">
              {contributions.map((contribution) => (
                <li key={contribution.id} className="bg-gray-100 p-2 rounded">
                  {contribution.message} on {new Date(contribution.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Pull Requests */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Pull Requests</h2>
          {pullRequests.length === 0 ? (
            <p>No pull requests found.</p>
          ) : (
            <ul className="space-y-2">
              {pullRequests.map((pr) => (
                <li key={pr.id} className="bg-gray-100 p-2 rounded flex justify-between items-center">
                  <span>#{pr.id} {pr.title}</span>
                  <Link href={`/pull-requests/${pr.id}`} className="text-blue-500 hover:underline">View</Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
