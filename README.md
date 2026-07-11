# Hunter Group Portfolio

This repository consolidates related Hunter Group properties into one master repo while preserving the original project histories.

## Repository layout

- `apps/jack-ve-tara-codex/`: content operations, posting workflows, shared agent assets, and Python helper scripts.
- `apps/hunter-real-estate/`: production Next.js site for Jack Hunter Real Estate.
- `apps/hunter-group-capital/`: placeholder for the new Hunter Group Capital project.
- `docs/`: consolidation notes and overlap analysis used to guide the next build phase.

## Workspace strategy

The imported projects use different stacks and serve different purposes, so they remain isolated inside `apps/` for now.

- `hunter-real-estate` keeps its own Node.js dependencies and build flow.
- `jack-ve-tara-codex` keeps its own documentation, skills, and Python-based utilities.
- Shared packages are intentionally deferred until reusable code is identified from working implementations.

## Imported source repositories

- `jackhunterking/jack-ve-tara-codex` -> `apps/jack-ve-tara-codex/`
- `jackhunterking/hunter-real-estate` -> `apps/hunter-real-estate/`

Both histories were preserved during import. The source repositories remain standalone and unchanged.

## Next step

Use the overlap notes in `docs/overlap-matrix.md` and `MIGRATION_NOTES.md` to scope the first implementation pass for `apps/hunter-group-capital/`.
