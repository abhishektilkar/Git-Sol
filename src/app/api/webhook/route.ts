import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    // Parse the incoming JSON body
    const body = await req.json();
    console.log('Received webhook:', body);

    // Check if the event is a pull request event
    const event = req.headers.get('x-github-event');
    if (event === 'pull_request') {
        const action = body.action;

        // Handle only merged pull requests
        if (action === 'closed' && body.pull_request.merged) {
            console.log('Pull request merged:', body.pull_request);

            // Your logic for handling the merged pull request
            // Example: trigger a deployment, send a notification, etc.
        }
    } else {
        console.log('Received an event that is not a pull request:', event);
    }

    // Respond to GitHub to acknowledge receipt of the event
    return NextResponse.json({ message: 'Webhook received' });
}
