import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // Placeholder for n8n webhook: Webcam Frame -> Emotion Analysis

    return NextResponse.json({
        message: 'Emotion analysis complete',
        results: {
            primaryEmotion: 'Attentive',
            score: 0.85,
            breakdown: {
                happy: 45,
                neutral: 35,
                stressed: 15,
                confused: 5
            }
        },
        status: 'success'
    });
}
