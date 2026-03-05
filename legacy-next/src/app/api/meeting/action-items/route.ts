import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // n8n flow: fetch extracted action items for meetingId

    return NextResponse.json({
        actionItems: [
            { id: 'ai1', task: 'Finalize Webhook Integration', assignee: 'Alice', dueDate: '2026-03-08', completed: false },
            { id: 'ai2', task: 'Mobile view UI refinement', assignee: 'David', dueDate: '2026-03-07', completed: true },
        ],
        status: 'success'
    });
}
