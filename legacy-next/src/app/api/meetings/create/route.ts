import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        const { title = 'Instant Meeting', hostEmail = 'host@smartmeet.ai' } = body;

        // Generate a short unique ID (hex-like or nanoid-like)
        const generateId = () => {
            const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < 8; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        };

        const meetingId = generateId();

        // This would normally save to a DB (PostgreSQL/Supabase)
        // For now, we return the structure the client expects

        return NextResponse.json({
            meetingId,
            meetingLink: `/meet/${meetingId}`,
            status: 'created'
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create meeting' }, { status: 500 });
    }
}
