import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react';
// import axios from 'axios';
import UserDashboard from '../components/UserDashboard';
import { Octokit } from "@octokit/rest";

const Page = async () => {
    const session = await auth();
    const user = session?.user;
    if (!user) redirect('/');
    console.log('session.sessionToken123@', session)
    const octokit = new Octokit({
        // @ts-ignore
        auth: session.accessToken
    });

    // Fetch authenticated user details
    const { data: userData } = await octokit.rest.users.getAuthenticated();
    // Fetch repositories for authenticated user
    // const
    console.log(userData)
    const { data: repositories } = await octokit.rest.repos.listForAuthenticatedUser({
        visibility: 'all',
        affiliation: 'owner,collaborator',
        sort: 'updated',
        per_page: 100,
    });

    return (
        <div>
            {/* Optionally display access token for debugging  */}
            {
                // @ts-ignore
                // user && <p className='text-indigo-500'>sessionToken: {session.sessionToken}</p>
            }
            {/* Pass userData and repositories to UserDashboard */}
            {/* // @ts-ignore */}
            {
                // @ts-ignore
                <UserDashboard userData={userData} repositories={repositories} />
            }
        </div>
    );
};

export default Page;
