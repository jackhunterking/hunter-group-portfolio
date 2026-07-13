import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { upsertCapitalInvestor } from "@/lib/hubspot";
import { sendCapitalIntakeNotification } from "@/lib/email";

const meetingPreferences = ["Toronto", "Istanbul", "Remote"] as const;
const preferredLanguages = ["Turkish", "English", "Both"] as const;
const investableRanges = [
  "$25k-$100k",
  "$100k-$250k",
  "$250k-$500k",
  "$500k-$1M",
  "$1M+",
] as const;
const timelines = ["Now", "1-3 months", "3-6 months", "6+ months"] as const;
const objectives = ["Income", "Growth", "Balanced", "Capital preservation"] as const;
const riskComforts = ["Conservative", "Moderate", "Growth-oriented", "Unsure"] as const;
const investorStatuses = [
  "Accredited investor",
  "Eligible investor",
  "Permitted client",
  "Unsure",
] as const;
const productInterests = [
  "Legacy / Epiphany",
  "Lankin Apartment REIT",
  "Canadian multifamily generally",
  "Direct / JV opportunities",
] as const;

const Body = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  city: z.string().min(1),
  country: z.string().min(1),
  meetingPreference: z.enum(meetingPreferences),
  preferredLanguage: z.enum(preferredLanguages),
  investableRange: z.enum(investableRanges),
  timeline: z.enum(timelines),
  objective: z.enum(objectives),
  riskComfort: z.enum(riskComforts),
  investorStatus: z.enum(investorStatuses),
  interestedProducts: z.array(z.enum(productInterests)).min(1),
  message: z.string().optional(),
  contactConsent: z.literal(true),
  documentConsent: z.literal(true),
  riskConsent: z.literal(true),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const hubspot = await upsertCapitalInvestor(data);
  if (!hubspot.ok) {
    console.error("Capital HubSpot capture failed:", hubspot.error);
  }

  const notification = await sendCapitalIntakeNotification(data);
  if (!notification.ok) {
    console.error("Capital intake notification failed:", notification.error);
  }

  return NextResponse.json({
    ok: true,
    captured: hubspot.ok,
    notified: notification.ok,
    contactId: hubspot.contactId,
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "capital-intake",
    hubspotConfigured: Boolean(process.env.HUBSPOT_ACCESS_TOKEN),
    resendConfigured: Boolean(process.env.RESEND_API_KEY),
  });
}
