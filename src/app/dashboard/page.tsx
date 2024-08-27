import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react'
import axios from 'axios'
import UserDashboard from '../components/UserDashboard';
import { Octokit } from "@octokit/rest";

const page = async () => {
    const session = await auth();
    const user = session?.user;
    if (!user) redirect('/');

    const octokit = new Octokit({
        // @ts-ignore
        auth: session.accessToken
    })
    const { data } = await octokit.rest.users.getAuthenticated();
    console.log("Authenticated user's login:", data.login, data);

    return (
        <div>
            {
                // @ts-ignore
                user && <p className='text-indigo-500'>accessToken: {session.accessToken}</p>
            }
            <UserDashboard/>
        </div>
    )
}

export default page