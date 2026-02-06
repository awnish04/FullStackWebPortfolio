import { NextRequest, NextResponse } from "next/server";

// This is now a proper Next.js API route
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "GraphQL API endpoint" });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "GraphQL API endpoint" });
}
