# Overlap Matrix

| Area | `jack-ve-tara-codex` | `hunter-real-estate` | Opportunity for `hunter-group-capital` |
| --- | --- | --- | --- |
| Brand / people | Jack and Tara social content workflow | Jack and Tara public-facing real estate site | Reuse founder narrative, bios, trust signals, and visual consistency |
| Content engine | Multi-platform posting instructions, scripts, and workflow assets | Marketing site content and lead capture pages | Use the posting workflow repo to power Capital campaign execution |
| Web product | No production app shell; mainly project instructions and tooling | Full Next.js website with route structure and components | Reuse site architecture patterns, component ideas, and content sections where appropriate |
| Lead generation | Operational support for publishing and messaging | HubSpot + Resend powered lead capture flows | Adapt lead capture patterns for investor, partner, and capital inquiries |
| Data / analytics | Workflow artifacts and source-drift tooling | PostHog, HubSpot, Resend integrations | Standardize conversion tracking and intake flows across future Capital pages |
| Deployment assumptions | Local Codex/Desktop-driven workflow | Vercel-hosted production site | Likely keep Capital as a deployable web app plus optional supporting ops workflow |

## Recommendation

Build `apps/hunter-group-capital/` as a new standalone web app that borrows:

- brand and trust language from `hunter-real-estate`
- campaign operations patterns from `jack-ve-tara-codex`
- lead capture, analytics, and deployment conventions from `hunter-real-estate`

Do not extract shared packages until the new Capital app reveals which parts are truly reusable.
