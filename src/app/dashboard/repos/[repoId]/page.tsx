import { auth } from '@/auth';
import { Octokit } from '@octokit/rest';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface PageProps {
  params: {
    repoId: string;
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  const { repoId } = params;

  const session = await auth();
    const user = session?.user;
    if (!user) redirect('/');
    
    try {    
        const octokit = new Octokit({
            // @ts-ignore
            auth: session.accessToken
        });

        const { data: userData } = await octokit.rest.users.getAuthenticated();
        const { data: repository } = await octokit.request('GET /repositories/{repo_id}', {
            repo_id: repoId,
          });
          const owner: string = userData?.login;
          const repo: string = repository?.name;
        //   console.log(repository)
        await octokit.request('GET /repos/{owner}/{repo}', {
            owner: userData?.login,
            repo: repository?.name,
          });
        console.log('value123@');
        // await octokit.request('POST /repos/{owner}/{repo}/hooks', {
        //     owner,
        //     repo,
        //     name: 'web',
        //     active: true,
        //     events: [
        //         'pull_request'
        //     ],
        //     config: {
        //     url: 'https://projectv-delta.vercel.app/api/webhook',
        //     content_type: 'json',
        //     insecure_ssl: '0'
        //     },
        //     headers: {
        //     'X-GitHub-Api-Version': '2022-11-28'
        //     }
        // })
    } catch(error) {
        console.log(error);
    }

  return (
    <div>
      <h1>Repository ID: {repoId}</h1>
      {/* Fetch and display data related to this repoId */}
    </div>
  );
};

export default Page;
