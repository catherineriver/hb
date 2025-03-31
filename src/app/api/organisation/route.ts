import { NextResponse } from 'next/server';
import mockData from "../mockData.json";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  const organization = mockData.organisations.find((org) => org.id === id);

  if (!organization) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(organization);
}
