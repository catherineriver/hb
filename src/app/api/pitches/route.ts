import { NextResponse } from "next/server";
import mockData from "../mockData.json";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const topicsParam = searchParams.get("topics");
    const formatsParam = searchParams.get("format");
    const regionsParam = searchParams.get("region");
    const statusParams = searchParams.get("status");

    let filtered = mockData.pitches;

    if (topicsParam) {
        const topics = topicsParam.split(",");
        filtered = filtered.filter(p =>
            p.content?.topics?.some((t: string) => topics.includes(t))
        );
    }

    if (formatsParam) {
        const formats = formatsParam.split(",");
        filtered = filtered.filter(p =>
            formats.includes(p.content?.format)
        );
    }

    if (regionsParam) {
        const region = regionsParam.split(",");
        filtered = filtered.filter(p =>
            region.includes(p.content?.location)
        );
    }

    if (statusParams) {
        const status = statusParams.split(",");
        filtered = filtered.filter(p =>
            status.includes(p.content?.status)
        );
    }

    return NextResponse.json(filtered);
}
