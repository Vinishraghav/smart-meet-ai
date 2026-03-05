import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { meetingId, duration } = await request.json();

    return NextResponse.json({
        status: 'completed',
        endTime: new Date().toISOString(),
        processed: true,
        message: 'Meeting session successfully concluded and sent for AI processing'
    });
}
