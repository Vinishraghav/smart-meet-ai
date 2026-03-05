import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { title, participants } = await request.json();

    return NextResponse.json({
        meetingId: `m${Date.now()}`,
        status: 'active',
        startTime: new Date().toISOString(),
        message: 'Meeting session successfully initialized'
    });
}
