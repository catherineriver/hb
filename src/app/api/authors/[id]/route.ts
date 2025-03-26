import { NextResponse } from 'next/server';
import mockData from "../../mockData.json";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    const author = mockData.authors.find((a) => String(a.id) === id);

    if (!author) {
        return NextResponse.json({ error: 'Author not found' }, { status: 404 });
    }

    return NextResponse.json(author);
}
