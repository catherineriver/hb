import { NextResponse } from 'next/server';
import mockData from "../../mockData.json";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    const pitch = mockData.data.find((a) => String(a.id) === id);

    if (!pitch) {
        return NextResponse.json({ error: 'Pitch not found' }, { status: 404 });
    }

    return NextResponse.json(pitch);
}
