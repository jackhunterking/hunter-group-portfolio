# Hunter Group Web — jackhunter.com

Production Next.js platform for Jack & Tara Hunter, built for Vercel deployment with HubSpot lead capture and Resend email delivery. This app now serves as the shared home for real estate and Hunter Group Capital experiences.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **CSS Modules** for component styles (no Tailwind, design tokens in `app/globals.css`)
- **HubSpot** for lead capture (`lib/hubspot.ts`)
- **Resend** for transactional email (`lib/email.ts`)
- **Vercel** for hosting

## Product direction

- Keep real estate and capital in this single app unless there is a clear operational need to split them later.
- Reuse the existing lead capture, analytics, content, and deployment setup across both business lines.
- Treat `app/hunter-group-capital/` as the canonical capital section rather than building a new sibling app.

## Project structure

```
/
├── app/
│   ├── layout.tsx                  # Root layout with font setup
│   ├── globals.css                 # Design tokens (brand colors, fonts)
│   ├── page.tsx                    # Homepage (jackhunter.com)
│   ├── rehber/
│   │   ├── page.tsx                # /rehber lead magnet landing
│   │   ├── page.module.css
│   │   ├── alici/
│   │   │   └── page.tsx            # /rehber/alici buyer thank-you
│   │   └── satici/
│   │       └── page.tsx            # /rehber/satici seller thank-you
│   └── api/
│       └── lead-capture/
│           └── route.ts            # POST endpoint: HubSpot + email
├── components/
│   ├── Nav.tsx                     # Shared site navigation
│   ├── HomeHero.tsx                # Homepage hero
│   ├── HeroSection.tsx             # /rehber hero
│   ├── AboutSection.tsx            # Biz Kimiz — Jack & Tara
│   ├── ServicesSection.tsx         # Hizmetler grid
│   ├── PromiseSection.tsx          # Brand promise + contact
│   ├── GuideCard.tsx               # Interactive form (redirects on success)
│   ├── ThankYouLayout.tsx          # Shared layout for thank-you pages
│   ├── LogoStrip.tsx
│   └── Footer.tsx
├── lib/
│   ├── hubspot.ts                  # HubSpot CRM integration
│   └── email.ts                    # Resend email integration
├── public/
│   ├── logos/                      # All Hunter logo variants
│   └── guides/                     # PDF guides (drop your PDFs here)
└── .env.example                    # Copy to .env.local for local dev
```

## Page routes

| Path              | Purpose                                                      |
| ----------------- | ------------------------------------------------------------ |
| `/`               | Homepage — hero, about, services, brand promise, contact     |
| `/rehber`         | Lead magnet landing — buyer & seller guide selection         |
| `/rehber/alici`   | Thank-you page after buyer guide submission (or direct link) |
| `/rehber/satici`  | Thank-you page after seller guide submission                 |
| `/api/lead-capture` | POST — captures lead to HubSpot, sends email via Resend    |

---

## Local development

```bash
# Install
npm install

# Copy env template and fill in your keys
cp .env.example .env.local

# Run dev server
npm run dev
```

Visit `http://localhost:3000` for homepage, `http://localhost:3000/rehber` for the lead magnet page.

---

## Deployment to Vercel + GitHub

### Step 1 — Initialize git and push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Jack Hunter Real Estate site"

# Create a new repo on GitHub (https://github.com/new), then:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jackhunter.git
git push -u origin main
```

### Step 2 — Connect to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Framework preset: **Next.js** (auto-detected)
4. Click **Deploy** — first deploy will succeed but env vars aren't set yet

### Step 3 — Add environment variables in Vercel

Vercel Project → Settings → Environment Variables. Add each from `.env.example`:

| Variable                | Where to get it                                                       |
| ----------------------- | --------------------------------------------------------------------- |
| `HUBSPOT_ACCESS_TOKEN`  | HubSpot → Settings → Integrations → Private Apps → Create private app |
| `RESEND_API_KEY`        | resend.com → API Keys → Create API Key                                |
| `RESEND_FROM_EMAIL`     | `Jack Hunter <hello@jackhunter.com>` (must be on verified domain)     |
| `RESEND_REPLY_TO`       | `hello@jackhunter.com`                                                |
| `NEXT_PUBLIC_SITE_URL`  | `https://jackhunter.com`                                              |

Then **Redeploy** (Vercel Project → Deployments → ⋯ → Redeploy).

### Step 4 — Point jackhunter.com at Vercel

Vercel Project → Settings → Domains → Add `jackhunter.com`.

Vercel will tell you which DNS records to add at your domain registrar:

- **A record** `@` → `76.76.21.21`
- **CNAME** `www` → `cname.vercel-dns.com`

(Exact values shown in Vercel's UI.)

Once DNS propagates (usually 5–60 min), SSL is provisioned automatically.

---

## HubSpot setup

1. **Create a Private App**

   - HubSpot → Settings → Integrations → Private Apps → "Create private app"
   - Name: `Jack Hunter Website Lead Capture`
   - **Scopes**: `crm.objects.contacts.read`, `crm.objects.contacts.write`
   - Copy the access token → add as `HUBSPOT_ACCESS_TOKEN` in Vercel

2. **Create custom contact properties** (HubSpot → Settings → Properties → Contact properties → Create property)

   | Property name      | Internal name      | Type             |
   | ------------------ | ------------------ | ---------------- |
   | Lead Source        | `lead_source`      | Single-line text |
   | Lead Type          | `lead_type`        | Single-line text |
   | Guide Requested    | `guide_requested`  | Single-line text |

   (Internal names must match exactly — they're referenced in `lib/hubspot.ts`.)

3. **Build a list / workflow** in HubSpot to nurture leads tagged `lead_source = Instagram - ManyChat` and segment by `lead_type` (buyer / seller).

---

## Resend setup

1. Sign up at resend.com
2. **Domains** → Add Domain → `jackhunter.com`
3. Add the SPF, DKIM, and DMARC records Resend shows you to your DNS
4. Wait for verification (usually 5–60 min)
5. **API Keys** → Create API Key → copy to `RESEND_API_KEY` in Vercel

---

## Adding the actual guide PDFs

Drop your final PDFs into `public/guides/` with these exact filenames:

- `public/guides/ev-alma-rehberi.pdf`
- `public/guides/ev-satma-rehberi.pdf`

Commit, push, redeploy. The email template links to them automatically.

---

## Hooking up ManyChat

In ManyChat, set your follow-trigger action to send a message with a button linking to:

```
https://jackhunter.com/rehber
```

That's it. The user lands on the page, picks Alıcı or Satıcı, drops their email, gets the PDF in their inbox, and shows up in HubSpot tagged as a buyer or seller lead.

---

## Things still to do (TODO)

- [ ] Drop real hero photo into `public/jack-tara-hero.jpg` and uncomment the `<Image>` in `components/HeroSection.tsx`
- [ ] Drop the two guide PDFs into `public/guides/`
- [ ] Add RE/MAX Hallmark official logo to `public/logos/` and wire into `HeroSection.tsx` and `LogoStrip.tsx`
- [ ] Add Platinum / Executive / 100% Club official badges to `public/logos/` and wire into `LogoStrip.tsx`
- [ ] Optional: replace `public/guides/` static PDFs with Vercel Blob signed URLs (so links expire)
- [ ] Optional: build full homepage replacing `app/page.tsx`

---

## Health check

After deploy, verify the API is wired:

```bash
curl https://jackhunter.com/api/lead-capture
# → { "ok": true, "service": "lead-capture", "hubspotConfigured": true, "resendConfigured": true }
```

If either flag is `false`, your env vars aren't set on Vercel.
