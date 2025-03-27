import { NextResponse } from 'next/server';
import mockData from "../../mockData.json";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    const pitch = mockData.pitches.find((a) => String(a.id) === id);

    if (!pitch) {
        return NextResponse.json({ error: 'Pitch not found' }, { status: 404 });
    }

    return NextResponse.json(pitch);
}

export async function PATCH(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    const body = await request.json();
    const { status } = body;

    const pitchIndex = mockData.pitches.findIndex((a) => String(a.id) === id);

    if (pitchIndex === -1) {
        return NextResponse.json({ error: 'Pitch not found' }, { status: 404 });
    }

    mockData.pitches[pitchIndex].content.status = status;

    return NextResponse.json({ success: true, status });
}
