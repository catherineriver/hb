import { NextResponse } from 'next/server';
import mockData from "../../mockData.json";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const author = mockData.authors.find((a) => String(a.id) === params.id);

    if (!author) {
        return NextResponse.json({ error: 'Author not found' }, { status: 404 });
    }

    return NextResponse.json(author);
}
