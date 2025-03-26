import { NextResponse } from "next/server";
import mockData from "../mockData.json";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const formatsQuery = searchParams.get("formats");
    const topicsQuery = searchParams.get("topics");

    let filteredPitches = mockData.data;

    if (formatsQuery) {
        const formats = formatsQuery.split(",");
        filteredPitches = filteredPitches.filter((author: any) =>
            formats.some((format: string) => author.formats.includes(format))
        );
    }

    if (topicsQuery) {
        const topics = topicsQuery.split(",");
        filteredPitches = filteredPitches.filter((author: any) =>
            topics.some((topic: string) => author.topics.includes(topic))
        );
    }

    return NextResponse.json({ pitches: filteredPitches });
}
