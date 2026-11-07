import { NextResponse } from "next/server";

// Dependency-free liveness probe for the platform health check.
// Kept free of data fetching so a slow dependency can never fail a good deploy.
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Trash Fest 2027",
    timestamp: new Date().toISOString(),
  });
}
