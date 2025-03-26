import { NextResponse } from 'next/server';
import mockData from "../../mockData.json";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const pitch = mockData.data.find((a) => String(a.id) === params.id);

    if (!pitch) {
        return NextResponse.json({ error: 'Pitch not found' }, { status: 404 });
    }

    return NextResponse.json(pitch);
}
