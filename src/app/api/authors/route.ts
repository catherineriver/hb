// app/api/authors/route.ts
import { NextResponse } from "next/server";
import mockData from "../mockData.json";

export async function GET(request: Request) {
    // Извлекаем query-параметры
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    // const location = searchParams.get("location");
    // const topics = searchParams.get("topics");
    // const formats = searchParams.get("formats");

    let filteredAuthors = mockData.authors;

    if (query) {
        filteredAuthors = filteredAuthors.filter((author: any) =>
            author.name.toLowerCase().includes(query.toLowerCase())
        );
    }


    return NextResponse.json({ authors: filteredAuthors });
}
