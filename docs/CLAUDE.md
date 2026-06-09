# CLAUDE.md — Hunter Group Site

Context for Claude Code. Read this and `hunter-merged-site-build-spec.md` before making changes.

## What this project is

Bilingual (Turkish-first) website for Hunter Group — a RE/MAX Hallmark real estate brokerage **and** an RMA Mortgage brokerage. Built with **Next.js (App Router) + TypeScript**. Deps: `next`, `react`, `resend`, `zod`.

## What we're building

Folding the old Kredibaba mortgage site into this one as a new **Finansman** tab — the new hero of the site. Full plan, route tree, port matrix, and phased order are in `hunter-merged-site-build-spec.md`. **Work Phase 1 first; don't jump ahead.**

## Existing structure (reuse, don't recreate)

- `app/page.tsx` — single-page homepage composed of section components
- `components/` — `Nav`, `Footer`, `HomeHero`, `ServicesSection`, `CapitalTeaser`, `ContactSection`, etc.
- `app/hunter-x-capital/` — investment page (to be demoted later, not now)
- `app/rehber/alici`, `app/rehber/satici` — guide lead-capture funnels (+ `/tesekkur`)
- `app/api/lead-capture/route.ts` — Resend email handler. **Reuse this for Finansman leads.**
- i18n: copy is keyed via a `t.*` translation object (see `Nav.tsx`). Match this pattern; do not hardcode Turkish strings in components.

## Guardrails — do not violate

1. **Do not import or port the Kredibaba logged-in app** (Dashboard, Documents, Properties, Realtors, Referrals, Toolkit, Supabase auth). It is parked. Marketing/content pages only.
2. **Keep the two regulated identities separate.** RE/MAX Hallmark (real estate) and RMA Mortgage (mortgage) never share a disclosure block or brokerage label. Finansman pages carry RMA + FSRA identity; real-estate pages carry RE/MAX.
3. **Rates are manual only.** Use a `HERO_RATES` constant; if a rate is unavailable show `Güncelleniyor` — never invent, interpolate, or fetch a live rate. Always render the disclosure modal (rates are examples, not guaranteed, approval depends on file/lender).
4. **Turkish-first.** All new UI copy is Turkish first, English second, through the i18n layer.
5. **Reuse existing components and styling tokens.** Match the current design system; don't introduce a new color palette.

## Local preview

```bash
npm install        # first time only
npm run dev        # http://localhost:3000
```

After building, tell me what to open (e.g. http://localhost:3000/finansman) so I can check it.
