import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { upsertContact } from "@/lib/hubspot";
import { sendGuideEmail } from "@/lib/email";

/**
 * POST /api/lead-capture
 *
 * Body: { email: string, guide: "alici" | "satici", source?: string }
 *
 * Behavior:
 * 1. Validate input
 * 2. Create or update contact in HubSpot
 * 3. Send the appropriate guide via Resend
 * 4. Return success or partial-success
 *
 * Note: this route returns 200 even if email send fails, as long as the lead
 * was captured in HubSpot, Jack can manually follow up. Adjust if stricter.
 */

const Body = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  guide: z.enum(["alici", "satici"]),
  source: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
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

  const { email, guide, source, firstName, lastName } = parsed.data;

  // Capture lead in HubSpot
  const hubspot = await upsertContact({
    email,
    guide,
    source: source ?? "Instagram - ManyChat",
    firstName,
    lastName,
  });

  if (!hubspot.ok) {
    console.error("HubSpot capture failed:", hubspot.error);
    // Continue with email send, lead is more important than CRM in the moment
  }

  // Send the guide
  const emailResult = await sendGuideEmail({ email, guide });

  if (!emailResult.ok) {
    console.error("Email send failed:", emailResult.error);
    return NextResponse.json(
      {
        ok: false,
        captured: hubspot.ok,
        error: "E-posta gönderilemedi. Lütfen tekrar deneyin veya bizimle iletişime geçin.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    captured: hubspot.ok,
    contactId: hubspot.contactId,
  });
}

// Health check
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "lead-capture",
    hubspotConfigured: Boolean(process.env.HUBSPOT_ACCESS_TOKEN),
    resendConfigured: Boolean(process.env.RESEND_API_KEY),
  });
}
