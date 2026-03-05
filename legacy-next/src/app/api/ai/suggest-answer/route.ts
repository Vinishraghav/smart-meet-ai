import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { question } = await request.json();

        // Simulate LLM processing time via n8n
        return NextResponse.json({
            answer: "• Emphasize your experience with React & WebSockets\n• Discuss the n8n webhook architecture you built\n• Focus on scalable microservices",
            contextUsed: true,
            status: 'success'
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to process suggestion' }, { status: 500 });
    }
}
