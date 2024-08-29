// app/api/webhook/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

const secret = process.env.GITHUB_WEBHOOK_SECRET; 

// Function to verify the GitHub webhook signature
const verifySignature = (req: Request): boolean => {
    const signature = req.headers.get('x-hub-signature-256');
    const payload = req.body;

    if (!signature || !payload) return false;

    // @ts-ignore
    const hmac = crypto.createHmac('sha256', secret);
    const digest = `sha256=${hmac.update(JSON.stringify(payload)).digest('hex')}`;
    return signature === digest;
};

export async function POST(req: Request) {
    // Verify the GitHub webhook signature
    if (!verifySignature(req)) {
        return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }

    // Log the received event
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
