import { NextResponse } from 'next/server';

export async function POST(req: Request) {

    const body = await req.json();
    console.log('Received webhook:', body);

    const event = req.headers.get('x-github-event');
    if (event === 'pull_request') {
        const action = body.action;

        if (action === 'closed' && body.pull_request.merged) {
            console.log('Pull request merged:', body.pull_request);

        }
    } else {
        console.log('Received an event that is not a pull request:', event);
    }

    return NextResponse.json({ message: 'Webhook received' });
}
