import { NextResponse } from "next/server";
import mockData from "../mockData.json";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("search");

    const experience = searchParams.get("experience") === "true";
    const travel = searchParams.get("travel") === "true";
    const urgent = searchParams.get("urgent") === "true";

    let filteredAuthors = mockData.authors;

    if (query && query.length >= 3) {
        filteredAuthors = filteredAuthors.filter((author: any) =>
            author.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    if (experience) {
        filteredAuthors = filteredAuthors.filter((author: any) => author.experience_with_hb === true);
    }

    if (travel) {
        filteredAuthors = filteredAuthors.filter((author: any) => author.ready_for_travel === true);
    }

    if (urgent) {
        filteredAuthors = filteredAuthors.filter((author: any) => author.ready_for_urgent === true);
    }

    // При необходимости можно добавить обработку других фильтров, например formats и topics

    return NextResponse.json({ authors: filteredAuthors });
}
