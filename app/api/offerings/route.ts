import { NextResponse } from "next/server";
import { CAPITAL_SCHEMA_VERSION, getOfferings } from "@/lib/capital/repository";

export function GET() {
  return NextResponse.json({ schemaVersion: CAPITAL_SCHEMA_VERSION, data: getOfferings() }, { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
