import { NextResponse } from 'next/server';
import mockData from "../../mockData.json";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  const organisation = mockData.organisations.find((org) => org.id === id);

  if (!organisation) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(organisation);
}
