import { NextResponse } from "next/server";
import { CAPITAL_SCHEMA_VERSION, getOfferingBySlug } from "@/lib/capital/repository";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const offering = getOfferingBySlug(slug);
  if (!offering) return NextResponse.json({ error: "Offering not found" }, { status: 404 });
  return NextResponse.json({ schemaVersion: CAPITAL_SCHEMA_VERSION, data: offering }, { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
