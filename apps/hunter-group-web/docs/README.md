# Hunter Group — project docs

This is the **single working folder** for the Hunter Group site. Everything lives here:

- **The live site** — this Next.js (App Router) app (`app/`, `components/`, `lib/`). Run it with `npm run dev`.
- **`docs/`** — the merge guidance below.
- **`_kredibaba-source/`** — the retired Kredibaba Vite SPA, kept as **read-only reference** only (it is git-ignored and never built). Its content is being *ported* into this Next app, not copied.

## Guidance docs
- [`CLAUDE.md`](./CLAUDE.md) — context + guardrails for working on this site.
- [`hunter-merged-site-build-spec.md`](./hunter-merged-site-build-spec.md) — full merge plan, route tree, port matrix, phased order.
- [`claude-code-phase1-prompt.md`](./claude-code-phase1-prompt.md) — the original Phase 1 kickoff prompt.

> Make all adjustments in this folder. The two were **not** fused into one build (different stacks); the Next app is the one real codebase and Kredibaba rides along as reference.
