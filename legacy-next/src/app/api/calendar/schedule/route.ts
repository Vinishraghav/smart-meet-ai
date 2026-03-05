import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { title, date, time, participants } = await request.json();

    // Future n8n flow:
    // 1. Post to Google Calendar/Outlook API
    // 2. Add to internal database
    // 3. Send email invitations

    return NextResponse.json({
        meetingId: `m${Date.now()}`,
        title,
        scheduledAt: `${date} ${time}`,
        participants: participants || [],
        status: 'scheduled',
        message: 'Meeting successfully scheduled in calendar'
    });
}
