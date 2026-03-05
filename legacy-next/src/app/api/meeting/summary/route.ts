import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // n8n connection: fetch stored AI summary for specific meetingId

    return NextResponse.json({
        meetingId: id || 'm1',
        summary: "The team reviewed the current progress of the Q3 project and identified bottlenecks in the API phase.",
        keyPoints: [
            "Design drafts were approved with minor changes.",
            "Agreed on using n8n for workflow automation."
        ],
        decisions: [
            "Deploy testing environment by Friday.",
            "Switch to GraphQL for analytics."
        ],
        status: 'success'
    });
}
